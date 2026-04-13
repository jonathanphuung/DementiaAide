import type { Metadata } from 'next'
import { Suspense } from 'react';
import { SearchResults } from '@/components/SearchResults';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { getSiteUrl } from '@/lib/site-url'

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: 'Search Results - AI Dementia Care Advice & Video Library',
  description: 'Browse personalized dementia care advice, educational videos, and product recommendations based on your specific caregiving challenges. Get instant AI-powered guidance for Alzheimer\'s and dementia care situations.',
  keywords: [
    'dementia care search', 'alzheimer advice results', 'caregiver video library',
    'dementia product search', 'caregiving solutions', 'dementia behavior help',
    'alzheimer care guidance', 'memory care tips', 'dementia safety solutions'
  ],
  openGraph: {
    title: 'Search Results - DementiaAide Care Resources',
    description: 'Personalized dementia care advice, videos, and product recommendations for your specific caregiving challenges.',
    url: `${siteUrl}/search`
  },
  alternates: {
    canonical: `${siteUrl}/search`
  },
  robots: {
    index: false, // Don't index search result pages
    follow: true
  }
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}