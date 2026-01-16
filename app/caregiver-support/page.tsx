import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Construction } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dementia-aide.vercel.app'

export const metadata: Metadata = {
  title: 'Caregiver Support - Mental Health & Wellness Resources',
  description: 'Dedicated support for dementia and Alzheimer\'s caregivers including stress management, self-care strategies, support groups, and mental health resources. You\'re not alone in this journey.',
  keywords: [
    'caregiver support', 'dementia caregiver stress', 'alzheimer caregiver help',
    'caregiver burnout prevention', 'caregiver mental health', 'dementia support groups',
    'caregiver self care', 'caregiver wellness', 'alzheimer family support',
    'caregiver counseling', 'dementia caregiver resources', 'caregiver respite'
  ],
  openGraph: {
    title: 'Caregiver Support - Mental Health & Wellness for Dementia Caregivers',
    description: 'Comprehensive support resources for dementia caregivers including stress management, self-care, and community support.',
    url: `${siteUrl}/caregiver-support`
  },
  alternates: {
    canonical: `${siteUrl}/caregiver-support`
  }
}

export default function CaregiverSupportPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <Construction className="w-16 h-16 text-blue-600 mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-4">Caregiver Support</h1>
            <div className="max-w-2xl">
              <p className="text-xl text-muted-foreground mb-6">
                Comprehensive support and wellness resources for dementia and Alzheimer's caregivers. Your mental health and well-being matter.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Access stress management techniques, self-care strategies, support group connections, and professional counseling resources designed specifically for dementia caregivers.
              </p>
              <p className="text-sm text-muted-foreground">
                Interactive support tools, virtual support groups, and personalized wellness plans launching soon.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}