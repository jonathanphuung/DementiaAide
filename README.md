# DementiaAide

A web platform to help dementia caregivers find advice, resources, and products.

## What it does

DementiaAide helps caregivers get quick answers to their questions. Type in what you're dealing with (like "mom won't eat" or "wandering at night") and get specific advice and product recommendations.

## Main Features

**Care Advice**
- Answers common caregiving questions
- Recognizes 13+ specific situations (wandering, eating issues, aggression, etc.)
- Gives practical tips you can actually use
- Works completely offline - no external APIs needed

**Video Resources**
- Curated library of 40+ quality dementia care videos
- Organized by topic: wandering, bathing, eating, aggression, sleep, communication, and more
- Hand-picked from trusted sources like Alzheimer's Association
- Matches your search to show the most relevant videos

**Product Search**
- Get product suggestions from Amazon based on your search
- Amazon integration for purchasing (optional)

**Product Catalog**
- Browse products designed for dementia care
- Categories include memory aids, safety equipment, adaptive clothing

**Clean Interface**
- Works on phones, tablets, and desktops
- Fast loading with smooth animations
- Simple, clear design

## Tech Stack

Built with Next.js 14, TypeScript, and Tailwind CSS. Uses Radix UI for accessible components and Framer Motion for animations.

The AI advice system and video library use keyword matching - completely self-contained. Amazon integration is optional.

## Project Structure

```
app/                   # Pages and API routes
components/            # Reusable UI components
lib/                   # Core logic (AI, products, integrations)
types/                 # TypeScript definitions
```

## Setup

Need Node.js 18+ installed.

```bash
git clone https://github.com/jonathanphuung/DementiaAide.git
cd DementiaAide
npm install
npm run dev
```

The site works without any API keys. For Amazon products, add this to `.env.local`:

```env
AMAZON_ASSOCIATE_TAG=your_tag
```

## Deploying To Vercel

This project is already configured as a Next.js app for Vercel. For production and preview deployments, set `NEXT_PUBLIC_SITE_URL` in Vercel to the canonical domain you want search metadata and sitemap URLs to use.

Recommended Vercel environment variables:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=your_tag
GOOGLE_VERIFICATION=your_google_verification_token
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
AMAZON_SPP_CLIENT_ID=...
AMAZON_SPP_SECRET_KEY=...
AMAZON_SPP_REFRESH_TOKEN=...
AMAZON_MARKETPLACE_ID=...
SHOPIFY_STORE_URL=...
SHOPIFY_STOREFRONT_ACCESS_TOKEN=...
STRIPE_SECRET_KEY=...
```

If you only want the public site deployed, the app still builds without the commerce or analytics env vars.

## Development Status

**Working:**
- AI advice system (keyword-based, offline)
- Search functionality  
- Product catalog
- Amazon product recommendations (optional)

**In Progress:**
- Video library (temporarily disabled - needs YouTube playlist)

**To Do:**
- Resources page
- Caregiver support page
- About page
- User accounts
- Better analytics

## TODO: YouTube Video Library

**Current Status:** Video feature is temporarily disabled because we need real, verified video IDs.

**Plan:** Create curated YouTube playlist with quality dementia care videos

**Steps to implement:**

1. **Create YouTube Playlist**
   - Go to YouTube and create a new playlist
   - Name it something like "DementiaAide - Caregiver Resources"
   - Make it Public or Unlisted

2. **Add Quality Videos**
   - Search for dementia care videos from trusted sources:
     - Teepa Snow (dementia care expert)
     - Alzheimer's Association
     - Alzheimer's Society UK
     - National Institute on Aging
     - Dementia UK
   - Categories needed:
     - General dementia care (5+ videos)
     - Wandering and safety (5+ videos)
     - Bathing and personal care (5+ videos)
     - Eating and nutrition (5+ videos)
     - Managing aggression (5+ videos)
     - Sundowning and sleep (5+ videos)
     - Communication tips (5+ videos)
     - Incontinence management (5+ videos)
     - Caregiver self-care (5+ videos)

3. **Extract Video IDs**
   - Option A (Manual): Open each video, copy the ID from URL (after `v=`)
   - Option B (API): Copy the playlist ID and use YouTube Data API to fetch all videos

4. **Update the Code**
   - Edit `lib/youtube.ts`
   - Replace the video library with your curated list
   - Update video titles and descriptions
   - Test that all videos load correctly

5. **Alternative Approach**
   - Could also embed the entire playlist instead of individual videos
   - Or add a "Watch on YouTube" button that links to your playlist

## Contributing

Found a bug? Have an idea? Open an issue on GitHub.

Want to contribute code? Fork the repo and submit a pull request.

---

Built to help caregivers. Still a work in progress.