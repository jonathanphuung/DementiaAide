# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are dementia caregivers — both family caregivers and professional aides — who arrive with a specific, often urgent situation ("wandering at night," "refusing to eat," "aggressive behavior") rather than to browse. Many are searching while exhausted, stressed, sleep-deprived, or during a difficult moment (frequently late at night, frequently on a phone). Some caregivers are themselves older adults. No accounts exist; every visit is anonymous and single-session.

## Product Purpose

DementiaAide gives caregivers plain-language, practical next steps for real caregiving situations, instantly and without a login wall. A keyword-driven advice engine (not a live LLM call) matches a typed question to a category/scenario and returns an explanation, concrete tips, related guides, and trusted external references. A curated video library (currently disabled pending a vetted playlist) and a small product storefront (own catalog + Amazon affiliate results + Shopify-backed checkout) sit alongside the advice as optional, secondary help — never the primary offer.

## Positioning

Instant, no-signup, plain-language practical guidance for a specific caregiving situation — not a chatbot, not a clinical/medical authority, not a community/forum product. The deliberate choice to keep the advice engine keyword-based rather than a live AI call is a product decision (predictability, no API dependency, no hallucination risk in a health-adjacent context), not a placeholder to "finish."

## Operating Context

Mobile-heavy usage, frequently at night or in a moment of acute stress. A single search produces three things in parallel: AI-style care guidance, a video panel, and an optional "Helpful Tools" product panel (hidden by default, user-revealed) — product suggestions are explicitly secondary to the care guidance. Users may want to share or print a result to reference later or hand to another caregiver (existing share/print functionality on the results panel).

## Capabilities and Constraints

- Search flow: `POST /api/ai/analyze` (keyword-matched `AICareResponse`: category, explanation, tips, matchedResources, trustedSources, relatedTopics, disclaimer, optional urgentNotice), `searchYouTubeVideos` (`lib/youtube`), `searchAmazonProducts` (`lib/amazon`) — all three run in parallel per search and must keep working unchanged through any visual redesign.
- Commerce is dual-provider: Shop Pay (Shopify Storefront cart → hosted checkout, own-catalog products only) or Stripe Checkout, chosen per request. Amazon results are affiliate links out to Amazon, not part of the cart.
- No user accounts; no live production database backing the storefront (own catalog is a static array; Shopify/Stripe/Amazon APIs are the real integrations).
- Video library feature is currently disabled/off pending a real curated playlist — do not present it as live functionality in the redesign.
- An "Ana Garcia" byline is the named author voice behind the care guides — this is a confirmed, binding brand fact (see Brand Commitments), not just default copy.

## Brand Commitments

- Product name **"DementiaAide"** is fixed.
- **"Ana Garcia"** as the named author/voice of the care guides is fixed.
- Everything else — logo mark, color system, typography, layout, component language, tone of visual expression — is open for this redesign; the current blue/white/Inter look is incumbent implementation, not a locked brand identity.
- Medical/care disclaimers currently shown with AI responses must be preserved in any redesign — this is a factual/legal necessity of a health-adjacent advice product, not decorative copy.

## Evidence on Hand

No customer testimonials, press, or case studies exist in the codebase to draw on. Real content that does exist and must be treated as real (not placeholder): the keyword/category tables in `lib/ai.ts` (actual scenario coverage), the own-catalog products in `lib/products.ts`, and the topic guide pages under `app/topics/*`. No user research artifacts beyond the situational/audience facts above.

## Product Principles

1. **The advice comes first.** Every page and every visual choice should make the care guidance clearly primary; commerce (own catalog, Amazon, Shopify) is consistently secondary and optional, never competing for the same attention.
2. **Built for a bad moment, not a demo.** Design for someone stressed, tired, possibly older, often on a small screen, often at night — not for a portfolio screenshot taken in ideal conditions.
3. **Trustworthy, not clinical, not hype.** The product should read as calm and credible without borrowing generic "AI startup" or sterile "medical portal" visual clichés.
4. **No dead ends.** A caregiver who searches something urgent should never land on a page that feels decorative before it feels useful.
5. **Predictable and dependency-light by design.** The keyword-matching engine and no-login model are deliberate; the visual system should reinforce reliability and instant availability, not simulate a "live AI" feel it doesn't have.

## Accessibility & Inclusion

High bar, confirmed explicitly by the user: treat this as a health-adjacent product. WCAG AA+ as a floor — strong color contrast, generous/legible text sizes, large touch targets, minimal-to-no gratuitous motion (short, purposeful motion only), and layouts that hold up for an older or visually-fatigued user on a phone at night.
