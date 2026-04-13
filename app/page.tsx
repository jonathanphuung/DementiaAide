import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SearchHero } from '@/components/SearchHero';
import { getSiteUrl } from '@/lib/site-url'

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: 'DementiaAide - AI-Powered Dementia Care Resources & Expert Guidance',
  description: 'Get instant AI-powered advice for dementia caregiving challenges. Access curated educational videos, expert tips, and personalized product recommendations for Alzheimer\'s and dementia care. Trusted by thousands of caregivers worldwide.',
  keywords: [
    'dementia care AI', 'alzheimer caregiver help', 'dementia advice online',
    'caregiver support platform', 'dementia behavior solutions', 'alzheimer care tips',
    'dementia product recommendations', 'caregiving guidance', 'memory care resources',
    'dementia safety advice', 'alzheimer support tools', 'caregiver education'
  ],
  openGraph: {
    title: 'DementiaAide - AI-Powered Dementia Care Resources',
    description: 'Instant AI advice, educational videos, and product recommendations for dementia caregivers. Get expert guidance for challenging caregiving situations.',
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og-home.png`,
        width: 1200,
        height: 630,
        alt: 'DementiaAide Homepage - AI Dementia Care Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DementiaAide - AI-Powered Dementia Care Resources',
    description: 'Get instant AI advice and expert resources for dementia caregiving challenges.',
    images: [`${siteUrl}/og-home.png`]
  },
  alternates: {
    canonical: siteUrl
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <SearchHero />
        {/* Structured Data for WebPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "DementiaAide - AI Dementia Care Platform",
              "description": "AI-powered platform providing instant advice, educational videos, and product recommendations for dementia caregivers",
              "url": siteUrl,
              "mainEntity": {
                "@type": "WebApplication",
                "name": "DementiaAide AI Assistant",
                "applicationCategory": "HealthApplication",
                "operatingSystem": "Web Browser",
                "description": "AI-powered dementia care assistant providing personalized guidance"
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": siteUrl
                  }
                ]
              }
            })
          }}
        />
      </main>
      <Footer />
    </div>
  );
}