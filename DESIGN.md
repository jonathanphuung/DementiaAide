---
name: DementiaAide
description: A calm, library-catalog reference system for dementia caregivers — search, find, file, act.
colors:
  ivory-ground: "rgb(247 246 241)"
  card-stock: "rgb(253 252 249)"
  charcoal-ink: "rgb(38 38 36)"
  muted-ink: "rgb(107 106 97)"
  keyline-border: "rgb(220 218 208)"
  teal-stamp: "rgb(15 107 99)"
  teal-tint: "rgb(227 240 238)"
  teal-border: "rgb(169 212 206)"
  sage-law: "rgb(47 90 61)"
  sage-tint: "rgb(231 240 228)"
  sage-border: "rgb(191 220 195)"
  crimson-law: "rgb(176 35 24)"
  crimson-tint: "rgb(251 228 225)"
  crimson-border: "rgb(238 187 180)"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.15
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.15em"
    textTransform: "uppercase"
  body:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "calc(0.625rem - 4px)"
  md: "calc(0.625rem - 2px)"
  lg: "0.625rem"
spacing:
  card-padding-mobile: "1rem"
  card-padding-desktop: "2.5rem"
  section-gap: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.teal-stamp}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
  button-primary-hover:
    backgroundColor: "{colors.teal-stamp}"
  button-outline:
    backgroundColor: "{colors.ivory-ground}"
    textColor: "{colors.charcoal-ink}"
    rounded: "{rounded.md}"
  card:
    backgroundColor: "{colors.card-stock}"
    textColor: "{colors.charcoal-ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-padding-desktop}"
---

# Design System: DementiaAide

## Overview

**Creative North Star: "The Library Card Catalog"**

DementiaAide's home search reads like a trusted reference-library card catalog, not a chatbot or a SaaS landing page. A stressed, exhausted caregiver types one real situation and gets back something that feels filed and findable: an ivory index-card ground, a charcoal-ink headline, and a single card-framed search field with a stamp-ink teal submit square beneath it. The system exists to lower cognitive load under stress — no gradients, no scattered motion, no chat bubbles — just calm, orderly, high-contrast reference material.

This is the confirmed, shipped world after one full re-roll: the round-0 direction (a medication-label amber/brown palette with a navy footer) was explicitly rejected by the user as reading "too brown" and "literally blue." The current world corrects both: the ground is ivory (not amber-tinted), the accent is a committed deep teal (not navy or brown), and the footer inverts to neutral charcoal rather than any blue.

Two colors carry legal, not decorative, meaning: sage is safe/confirmed/tip, crimson is urgent/caution. They are never swapped and never used for anything else. The single teal accent (~#0F6B63) is reserved for brand and calls to action, kept rare rather than washed across the page.

**Key Characteristics:**
- Ivory card-stock ground with charcoal ink — never navy, never brown
- One committed teal accent for brand/CTA; sage and crimson are semantic law, not palette options
- Visible 2px keyline borders frame every card like an index card
- Small, crisp corner radii (0.625rem base) — never fully rounded, never sharp
- One authored entrance motion (quart ease-out, ~0.35s) on results; no per-element animation scatter
- Archivo for display/labels (bold, often uppercase-tracked), Public Sans for body

## Colors

The palette is a restrained ivory-and-charcoal ground with exactly one brand accent and two law colors that are never used decoratively.

### Primary
- **Teal Stamp-Ink** (`rgb(15 107 99)` / `#0F6B63`): the sole brand/CTA accent — primary buttons, active/focus rings, search submit square, numbered chip badges, links on hover. Used sparingly; its rarity is what makes it read as "the" action color.

### Secondary (Semantic Law — not decorative alternates)
- **Sage Law** (`rgb(47 90 61)` / `#2F5A3D`): safe / confirmed / trusted-source states only (e.g. the Trusted Care References cards, the shield-check icon). Never used for brand or as a generic accent.
- **Crimson Law** (`rgb(176 35 24)` / `#B02318`): urgent / caution states only (the "Urgent" ribbon on care guidance, destructive actions). Never used decoratively.

### Neutral
- **Ivory Ground** (`rgb(247 246 241)` / `#F7F6F1`): page background — the card-stock world floor.
- **Card Stock** (`rgb(253 252 249)` / `#FDFCF9`): surface for cards, inputs, popovers — very slightly lighter/warmer than the ground so cards read as a distinct sheet of paper.
- **Charcoal Ink** (`rgb(38 38 36)` / `#262624`): primary text and headline color. Deliberately neutral charcoal — not navy, not brown.
- **Muted Ink** (`rgb(107 106 97)` / `#6B6A61`): secondary/supporting text (subheads, captions, disclaimers).
- **Keyline Border** (`rgb(220 218 208)` / `#DCDAD0`): the default 1-2px card/divider border color, used at full or reduced opacity (`border-foreground/15`, `/10`, `/20`, `/25`).

### Named Rules
**The One Stamp Rule.** Teal is the only brand accent in the system. It never shares CTA/link duty with a second accent color, and it is never applied for decoration alone — only to brand marks, primary actions, and active/focus states.

**The Law Colors Rule.** Sage and crimson are semantic, not aesthetic. Sage always and only means safe/confirmed/tip; crimson always and only means urgent/caution. Neither is ever used where its meaning doesn't apply, and they are never interchanged.

## Typography

**Display Font:** Archivo (with ui-sans-serif, system-ui fallback)
**Body Font:** Public Sans (with ui-sans-serif, system-ui fallback)

**Character:** Archivo's grotesque weight and tight tracking carries headlines, labels, and uppercase micro-copy with catalog-stamp authority; Public Sans stays plain and highly legible for the actual reading material a caregiver needs to absorb under stress.

### Hierarchy
- **Display** (extrabold/800, `text-3xl` to `text-5xl`, tight leading): the hero H1 ("Dementia care help, right when you need it") and top-level section headings (e.g. "Care Guidance").
- **Headline** (extrabold/800, `text-xl`–`text-2xl`): section headers within results (e.g. "Videos For You", "Helpful Tools").
- **Title** (extrabold/800, `text-base`, uppercase, tracked-wide): sub-headers inside a card ("What to Try First", "Helpful Tips").
- **Body** (normal/400, `text-sm`–`text-lg`, `leading-6`/`leading-7`): explanatory copy, tips, descriptions; kept short-measure inside cards (`max-w-2xl`/`max-w-3xl` containers).
- **Label** (bold/700, `text-[10px]`–`text-xs`, uppercase, `tracking-[0.15em]` or `tracking-wide`): category badges, contents-index micro-copy, numbered-chip captions. Always uppercase, always tracked.

### Named Rules
**The Stamped Label Rule.** Any all-caps, tracked micro-label (category badges, "In this answer:", chip captions) is always set in Archivo bold, never Public Sans — it reads as a catalog stamp, not body prose.

## Layout

The home page centers a single max-width card (`max-w-4xl`) in a generous ivory field for the hero/search state, then widens to `max-w-7xl` once results exist, stacking result sections vertically with a consistent `space-y-12` rhythm. Site chrome (nav, footer) runs the standard `max-w-7xl` container. Cards use asymmetric internal padding by breakpoint (`p-4`/`p-5` mobile scaling to `p-8`/`p-10` desktop) rather than a single fixed padding value — density loosens as viewport grows. Popular-search and care-path options render as wrapped chip rows (`flex flex-wrap`), never a fixed grid, so they reflow gracefully at any width. The nav collapses to a single hamburger-triggered panel below `md`; there is no intermediate tablet nav state.

## Elevation & Depth

The system is flat-by-default with a single soft utility shadow (`shadow-sm`) on the hero and results cards — not a layered elevation scale. Depth is conveyed primarily through the 2px keyline border plus the card-stock/ivory tonal step, not through cast shadow. This is deliberate: an index card's edge is what tells you it's a card, not a drop shadow.

### Named Rules
**The Keyline-Over-Shadow Rule.** A card is legible as a card because of its 2px border against the ivory ground, not because of elevation. Shadow (`shadow-sm`) is a minor accent on the outermost hero/result containers only — never stacked into a multi-level elevation system.

## Shapes

Corners are small and crisp: `0.625rem` (`rounded-lg`) on primary cards and sections, stepping down to `calc(0.625rem - 2px)` (`rounded-md`) for inputs, buttons, and nested cards, and `calc(0.625rem - 4px)` (`rounded-sm`) for small inline badges (the numbered chip squares, category tags). Nothing is fully rounded (no pill buttons, no circular avatars) and nothing is sharp-cornered — the radius step is consistent and modest across every surface. Borders are the load-bearing form device: every card, input, and button-outline carries a visible 2px keyline (`border-2 border-foreground/15` or a semantic tint border), reinforcing the "index card" silhouette described in the direction contract.

## Components

### Buttons
- **Shape:** `rounded-md` (`calc(0.625rem - 2px)`), consistent across all variants.
- **Primary:** solid teal background (`bg-primary`), white text, no border — the search submit square and top-level CTAs ("Shop Now").
- **Hover / Focus:** primary darkens via opacity (`hover:bg-primary/90`); all interactive elements get a 4px teal focus ring (`focus-visible:ring-4 ring-ring/30`) — a large, high-visibility ring consistent with the project's accessibility bar.
- **Outline / Ghost:** outline buttons carry an explicit 2px `border-foreground/20` keyline on ivory/card background (used for "Show tools", cart, mobile menu actions); ghost buttons drop the border entirely for the lowest-emphasis actions ("Free Resources").

### Chips (numbered selector chips — signature pattern)
- **Style:** card-stock background, 2px `border-foreground/15` keyline, `rounded-md`; each chip is prefixed with a small teal `rounded-sm` numbered badge (Archivo bold, tabular-nums, white text) rather than an icon.
- **State:** hover shifts the border to teal and the fill to `teal-tint`; disabled during an active search (`opacity-50`). Used for Popular Searches and Care Paths on the pre-search hero.

### Cards / Containers
- **Corner Style:** `rounded-lg` (outer sections), `rounded-md` (nested tip/resource cards).
- **Background:** card-stock (`bg-card`) for primary content cards; `bg-secondary/30`–`/50` (a pale teal-tinted neutral) for lower-emphasis grouping panels (contents index, Helpful Tools shell).
- **Shadow Strategy:** `shadow-sm` only on the outermost hero and results-section cards; nested cards are shadow-free and rely on their border. See Elevation & Depth.
- **Border:** 2px keyline standard; semantic cards borrow the law-color border instead (`border-crimson-border` for the urgent notice, `border-sage-border` for trusted sources, `border-teal-border` for step tips).
- **Internal Padding:** responsive step, `p-4`/`p-5` mobile to `p-8`/`p-10` desktop.

### Inputs / Fields
- **Style:** `rounded-md`, 2px `border-foreground/25` keyline, card-stock/input background, generous padding (`px-5 py-4`, growing to `py-5` desktop) and large text (`text-base`–`text-lg`) — sized for stressed users on any device, consistent with the accessibility bar in PRODUCT.md.
- **Focus:** border shifts to primary teal plus a 4px teal ring (`focus-visible:border-primary focus-visible:ring-4 ring-ring/30`) — no glow/blur effects.

### Navigation
- Card-stock background with a 2px bottom keyline border, `h-20` fixed height. Nav links are muted-ink at rest (`text-foreground/70`), full charcoal on hover, with a teal underline that grows from 0 to full width on hover (`group-hover:w-full`) rather than an instant color swap. Mobile collapses to a full-width dropdown panel below the bar, sharing the same keyline and button styles as desktop.

### Footer (signature — inverted panel)
Full charcoal-ink background (`bg-foreground`) with ivory text (`text-background`) — the one place the palette inverts. This was a direct correction from the rejected round-0 direction, where the footer read as navy; the shipped footer is neutral charcoal, matching the same ink used for headline text elsewhere, so it never introduces a second hue into the system.

## Do's and Don'ts

### Do:
- **Do** keep teal as the only accent used for brand/CTA/focus states; treat it as rare, not a wash.
- **Do** use sage and crimson exclusively for their semantic meaning (safe/tip vs. urgent/caution) — never as generic decorative color.
- **Do** frame cards with a visible 2px keyline border rather than relying on shadow for card definition.
- **Do** use the single authored entrance motion (quart ease-out, `duration: 0.35s`, `ease: [0.25, 1, 0.5, 1]`, translate-y 10px to 0) for revealing new result content; keep it applied once at the section/container level.
- **Do** set uppercase micro-labels in Archivo bold with wide tracking (`tracking-wide` or `tracking-[0.15em]`), never in body-weight Public Sans.
- **Do** use large tap targets and a 4px focus ring on every interactive element (search input, buttons, chips) — the accessibility bar is load-bearing, not optional polish.

### Don't:
- **Don't** introduce a second brand accent color alongside teal, or let sage/crimson bleed into decorative use.
- **Don't** use navy, blue-leaning, or brown/amber tones anywhere in the palette — both were explicitly rejected in the round-0 re-roll.
- **Don't** add per-element scattered animation (staggered lists, individual card fade-ins); the system commits to one restrained entrance motion per result reveal, not motion-per-element.
- **Don't** fully round corners (pill shapes) or leave corners sharp; hold the `0.625rem`/`-2px`/`-4px` radius step.
- **Don't** propagate this system to `/shop`, `/resources`, `/about`, `/caregiver-support`, the `/topics/*` pages, or `components/ProductCatalog.tsx` / `components/Hero.tsx` without first migrating them — those surfaces still run the prior blue/white/Inter system and have not been touched by this build.
