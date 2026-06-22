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
- Resources library sourced from Ana's public DementiaAide blog posts
- Product catalog

**In Progress:**
- Resources page expansion and topic mapping
- Search speed and relevance improvements

**To Do:**
- YouTube feature is on hold until the founder provides an approved playlist. Do not use the YouTube API/key; manually tag approved playlist videos to current topics when ready.
- Shop feature is on hold because it is not the main focus right now.
- Keep search fast by using local/static topic data where possible.
- Revamp the site direction to feel warmer, more home-y, and more personal.
- Caregiver support page
- About page
- User accounts
- Better analytics

## TODO: YouTube Video Library

**Current Status:** Video feature is on hold. We are waiting for the founder to create and approve a YouTube playlist. We do not want to use the YouTube API because it adds cost and configuration.

**Plan:** When the playlist is ready, manually add the approved videos to the app and tag each video to the current care topics so they can appear in search results.

**Steps to implement:**

1. **Founder creates approved playlist**
   - Playlist can be public or unlisted
   - Only founder-approved videos should be shown in the app

2. **Extract Video IDs Manually**
   - Open each approved video
   - Copy the ID from the URL after `v=`
   - No YouTube API key

3. **Update the Code**
   - Edit `lib/youtube.ts`
   - Replace the disabled video list with approved playlist entries
   - Tag each video to current topics like wandering, eating, bathing, aggression, sundowning, sleep, communication, incontinence, caregiver support, and activities
   - Test that the videos match search results correctly

4. **Alternative Approach**
   - Embed or link the whole approved playlist if individual tagging is not ready yet

## Contributing

Found a bug? Have an idea? Open an issue on GitHub.

Want to contribute code? Fork the repo and submit a pull request.

---

Built to help caregivers. Still a work in progress.
