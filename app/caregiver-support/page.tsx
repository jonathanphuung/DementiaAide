import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Construction } from 'lucide-react';
import { getSiteUrl } from '@/lib/site-url'

const siteUrl = getSiteUrl()

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
      <main className="flex-1 pb-16 pt-32">
        <div className="mx-auto flex h-full max-w-3xl items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full rounded-lg border-2 border-foreground/15 bg-card p-8 text-center shadow-sm sm:p-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-md bg-teal-tint text-primary">
              <Construction className="h-7 w-7" />
            </div>
            <h1 className="font-display text-3xl font-extrabold text-foreground md:text-4xl">Caregiver Support</h1>
            <div className="mt-6">
              <p className="mb-6 text-xl text-muted-foreground">
                Comprehensive support and wellness resources for dementia and Alzheimer&apos;s caregivers. Your mental health and well-being matter.
              </p>
              <p className="mb-4 text-lg text-muted-foreground">
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