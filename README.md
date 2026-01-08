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

## Development Status

**Working:**
- AI advice system (keyword-based, offline)
- Curated video library (40+ videos, no API needed)
- Search functionality  
- Product catalog
- Amazon product recommendations (optional)

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