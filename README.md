# DementiaAide

A web platform to help dementia caregivers find advice, resources, and products.

## What it does

DementiaAide helps caregivers get quick answers to their questions. Type in what you're dealing with (like "mom won't eat" or "wandering at night") and get specific advice and product recommendations.

## Main Features

**Care Advice**
- Answers common caregiving questions
- Recognizes 13+ specific situations (wandering, eating issues, aggression, etc.)
- Gives practical tips you can actually use
- Works without any external API - everything runs locally

**Search & Resources**
- Find relevant YouTube videos about dementia care
- Get product suggestions from Amazon based on your search
- Everything loads with proper indicators so you know it's working

**Product Catalog**
- Browse products designed for dementia care
- Categories include memory aids, safety equipment, adaptive clothing
- Amazon integration for purchasing

**Clean Interface**
- Works on phones, tablets, and desktops
- Fast loading with smooth animations
- Simple, clear design

## Tech Stack

Built with Next.js 14, TypeScript, and Tailwind CSS. Uses Radix UI for accessible components and Framer Motion for animations.

The AI advice system uses keyword matching - no external APIs needed. YouTube and Amazon integrations are optional.

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

The site works without any API keys. For YouTube videos and Amazon products, add these to `.env.local`:

```env
NEXT_PUBLIC_YOUTUBE_API_KEYS=your_keys_here
AMAZON_ASSOCIATE_TAG=your_tag
```

## Development Status

**Working:**
- AI advice system
- Search functionality  
- Product catalog
- YouTube integration
- Amazon product recommendations

**To Do:**
- Resources page
- Caregiver support page
- About page
- User accounts
- Better analytics

## Contributing

Found a bug? Have an idea? Open an issue on GitHub.

Want to contribute code? Fork the repo and submit a pull request.

---

Built to help caregivers. Still a work in progress.