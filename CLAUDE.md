# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

DementiaAide is a Next.js site that helps dementia caregivers: a keyword-driven AI advice engine, a curated video library, and a product storefront (own catalog + Amazon affiliate links + Shopify-backed checkout). No user accounts; no real database in production.

## Commands

```bash
npm run dev              # start dev server (Next.js)
npm run build             # production build
npm run start             # run production build
npm run lint               # next lint
node scripts/shopify-check.mjs   # sanity-check Shopify Storefront env vars/config
```

There is no test suite/runner configured in `package.json` — don't assume `npm test` exists.

Node version is pinned via `.nvmrc` (18).

## Architecture

### Care-advice engine is keyword matching, not an LLM call
`lib/ai.ts` (`analyzeCareQuery`, called from `app/api/ai/analyze/route.ts`) detects a category/scenario from the query using large regex/keyword tables, then returns a canned `AICareResponse` (explanation, tips, search suggestions, related topics). Despite the `openai` package being a dependency, this path is self-contained and works with no external API keys — that's a deliberate product decision (see README), not a stub to "finish."

### Two independent product systems
- **Own catalog** (`lib/products.ts`): a hardcoded `Product[]` array (clothing/adaptive wear/awareness items). Each product optionally carries a `shopifyVariantIds` map (keyed by `"size|color"`) linking it to real Shopify variant GIDs for checkout.
- **Amazon affiliate results** (`lib/amazon.ts`, `lib/amazon-spp.ts`): query → keyword-mapped search terms → Amazon product data, cached in-memory for 24h. `lib/amazon-spp.ts` is the Amazon Selling Partner API integration; used from `app/api/amazon/*`.
These are surfaced together in search/shop UI but are not unified into one data model.

### Checkout is dual-provider, decided per-request
`app/api/checkout/route.ts` branches on `paymentMethod`:
- `shop_pay` → builds a Shopify Storefront `cartCreate` mutation directly and redirects to Shopify's hosted checkout. Requires every line item to already have a `shopifyVariantId` (own-catalog products only — Amazon items can't go through Shop Pay).
- anything else → Stripe Checkout Session (falls back gracefully with a 503 if `STRIPE_SECRET_KEY` isn't set).

Cart state itself (add/update/remove lines, not checkout) goes through `lib/shopify/cart.ts` + `lib/shopify/storefront.ts`, which wrap the Shopify Storefront GraphQL API (`cartCreate`, `cartLinesAdd/Update/Remove`, `getCart`). `app/api/cart/*` are thin route wrappers around these. Client-side cart state lives in `components/ShoppingCart.tsx`, provided app-wide via `components/AppProviders.tsx` in the root layout.

Shopify config (`getShopifyStorefrontConfig` in `lib/shopify/storefront.ts`) normalizes `SHOPIFY_STORE_URL` and requires `SHOPIFY_STOREFRONT_ACCESS_TOKEN`; both checkout and cart code paths throw explicit "not configured" errors rather than failing silently when these are missing.

### Prisma schema exists but is not wired into the app
`prisma/schema.prisma` (SQLite datasource) and `scripts/database-import.js` were built for a one-time Shopify → self-hosted-DB migration path. `@prisma/client`/`prisma` are **not** in `package.json` and no app code (`app/`, `lib/`, `components/`) imports `@prisma/client` — only the standalone migration script does. Don't assume a live database backs `User`/`Order`/`Product` etc.; the real data sources at runtime are `lib/products.ts` (static), Shopify Storefront API (cart/checkout), and Amazon APIs (search results).

### `migration/` is exported data, not source
Contains timestamped JSON/CSV dumps from a past Shopify export (products, orders, customers) plus `migration/processed/` (import-ready versions) and `migration/shopify-export/` (raw Shopify CSVs). Reference material for the migration scripts in `scripts/`, not something the running app reads. See `SHOPIFY_EXPORT_GUIDE.md` for the export/import workflow these scripts implement.

### Video library is currently disabled
`lib/youtube.ts` holds the video-matching logic (keyword → curated video list, same style as `lib/ai.ts`), but per the README the feature is off pending a real curated YouTube playlist with verified video IDs.

### Routing / pages (`app/`, App Router)
Top-level pages: `/` (home), `/shop`, `/search`, `/checkout`, `/resources`, `/caregiver-support`, `/about`, plus `/topics/<slug>` for individual care topics (e.g. `wandering-prevention`, `eating-difficulties`). API routes live under `app/api/*` and are grouped by integration (`ai`, `amazon`, `shopify`, `cart`, `checkout`, `shipping`).

### UI components
`components/ui/` is the shadcn/Radix primitive layer (button, dialog, select, etc. — generated, treat as boilerplate). Feature components (`Hero`, `SearchHero`, `ProductCatalog`, `ProductSearch`, `ShoppingCart`, `AmazonProducts`, `CheckoutPage`, etc.) live directly under `components/`. Styling is Tailwind (`tailwind.config.js`) with `tailwindcss-animate`; the README/commit history notes gradients, animations, and Framer Motion usage were deliberately stripped back for performance — avoid reintroducing heavy motion/gradient effects without checking that's actually wanted.

### Site URL resolution
`lib/site-url.ts`'s `getSiteUrl()` is the single source of truth for the canonical site URL (used in metadata, sitemap, OG tags, Stripe success/cancel URLs): prefers `NEXT_PUBLIC_SITE_URL`, falls back to `VERCEL_URL`, then `http://localhost:3000`. Use it instead of hardcoding a domain or reading `NEXT_PUBLIC_SITE_URL` directly.

## Environment variables

See `.env.example` for the full list. Notable groupings:
- **Amazon**: `AMAZON_SPP_CLIENT_ID/SECRET_KEY/REFRESH_TOKEN`, `AMAZON_MARKETPLACE_ID`, `AMAZON_ASSOCIATE_TAG` — optional, site works without them (per README).
- **Shopify**: `SHOPIFY_STORE_URL`, `SHOPIFY_STOREFRONT_ACCESS_TOKEN`, optional `SHOPIFY_STOREFRONT_API_VERSION` (defaults to `2025-10`) — required for cart/Shop Pay checkout.
- **Stripe**: `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` — required for the default (non-Shop-Pay) checkout path.
- **SEO/analytics**: `NEXT_PUBLIC_SITE_URL`, `GOOGLE_ANALYTICS_ID`, `GOOGLE_VERIFICATION`.
- The site is designed to build and run with none of the commerce/analytics vars set — code checks for their presence before using them rather than assuming they exist.
