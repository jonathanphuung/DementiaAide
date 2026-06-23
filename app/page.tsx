import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SearchHero } from '@/components/SearchHero';
import { getSiteUrl } from '@/lib/site-url'

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: 'DementiaAide - Practical Dementia Care Help for Caregivers',
  description: 'Get practical dementia care guidance for real caregiver questions, with Ana Garcia\'s related guides and trusted references for Alzheimer\'s and dementia support.',
  keywords: [
    'dementia care AI', 'alzheimer caregiver help', 'dementia advice online',
    'caregiver support platform', 'dementia behavior solutions', 'alzheimer care tips',
    'dementia product recommendations', 'caregiving guidance', 'memory care resources',
    'dementia safety advice', 'alzheimer support tools', 'caregiver education'
  ],
  openGraph: {
    title: 'DementiaAide - Practical Dementia Care Help',
    description: 'Practical dementia care guidance, Ana Garcia\'s related guides, and trusted references for real caregiving situations.',
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
    title: 'DementiaAide - Practical Dementia Care Help',
    description: 'Get practical guidance and trusted resources for dementia caregiving challenges.',
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
              "name": "DementiaAide - Practical Dementia Care Help",
              "description": "Practical dementia care guidance, Ana Garcia guides, and trusted references for caregivers",
              "url": siteUrl,
              "mainEntity": {
                "@type": "WebApplication",
                "name": "DementiaAide Care Assistant",
                "applicationCategory": "HealthApplication",
                "operatingSystem": "Web Browser",
                "description": "Dementia care assistant providing practical guidance and related resources"
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
