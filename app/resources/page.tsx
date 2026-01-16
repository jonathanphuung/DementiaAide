import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Construction } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dementia-aide.vercel.app'

export const metadata: Metadata = {
  title: 'Dementia Care Resources - Expert Articles & Educational Materials',
  description: 'Comprehensive dementia and Alzheimer\'s care resources including expert articles, educational guides, caregiver tips, and practical advice for managing daily challenges. Updated regularly by healthcare professionals.',
  keywords: [
    'dementia resources', 'alzheimer care guides', 'caregiver educational materials',
    'dementia care articles', 'alzheimer support guides', 'memory care resources',
    'dementia behavior guides', 'caregiver training materials', 'alzheimer education',
    'dementia safety resources', 'caregiving tips', 'dementia care techniques'
  ],
  openGraph: {
    title: 'Dementia Care Resources - Expert Educational Materials',
    description: 'Access comprehensive dementia care resources, expert articles, and educational guides for caregivers and families.',
    url: `${siteUrl}/resources`
  },
  alternates: {
    canonical: `${siteUrl}/resources`
  }
}

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <Construction className="w-16 h-16 text-blue-600 mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-4">Dementia Care Resources</h1>
            <div className="max-w-2xl">
              <p className="text-xl text-muted-foreground mb-6">
                Comprehensive educational resources and expert articles for dementia and Alzheimer's caregivers.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Our resource library includes evidence-based care guides, practical tips, and expert advice covering all aspects of dementia caregiving from daily activities to behavioral management.
              </p>
              <p className="text-sm text-muted-foreground">
                Full resource library with downloadable guides and video tutorials coming soon.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}