import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Construction } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dementia-aide.vercel.app'

export const metadata: Metadata = {
  title: 'About DementiaAide - Our Mission to Support Dementia Caregivers',
  description: 'Learn about DementiaAide\'s mission to provide AI-powered dementia care resources, expert guidance, and compassionate support for Alzheimer\'s caregivers and families worldwide.',
  keywords: [
    'dementia care mission', 'alzheimer support organization', 'caregiver advocacy',
    'dementia awareness', 'alzheimer resources nonprofit', 'memory care support',
    'dementia education platform', 'caregiver community', 'alzheimer family support'
  ],
  openGraph: {
    title: 'About DementiaAide - Supporting Dementia Caregivers',
    description: 'Our mission is to empower dementia caregivers with AI-powered resources, expert guidance, and compassionate community support.',
    url: `${siteUrl}/about`
  },
  alternates: {
    canonical: `${siteUrl}/about`
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <Construction className="w-16 h-16 text-blue-600 mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-4">About DementiaAide</h1>
            <div className="max-w-2xl">
              <p className="text-xl text-muted-foreground mb-6">
                DementiaAide is dedicated to supporting caregivers and families affected by Alzheimer's disease and dementia through innovative AI-powered resources and expert guidance.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Our platform combines artificial intelligence with expert medical knowledge to provide personalized advice, educational content, and practical solutions for the unique challenges of dementia caregiving.
              </p>
              <p className="text-sm text-muted-foreground">
                More detailed information about our team, mission, and impact coming soon.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}