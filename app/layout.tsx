import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { AppProviders } from '@/components/AppProviders'
import { getSiteUrl } from '@/lib/site-url'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: {
    default: 'DementiaAide - Expert Dementia Care Resources & Product Recommendations',
    template: '%s | DementiaAide'
  },
  description: 'Comprehensive dementia care platform with AI-powered advice, curated YouTube videos, and intelligent product recommendations. Expert guidance for Alzheimer\'s caregivers, family members, and healthcare professionals.',
  keywords: [
    'dementia care', 'alzheimer support', 'caregiver resources', 'dementia products',
    'alzheimer care tips', 'dementia behavior management', 'caregiver advice',
    'dementia safety', 'alzheimer resources', 'memory care', 'dementia help',
    'caregiver support', 'alzheimer guidance', 'dementia education', 'senior care',
    'cognitive decline', 'dementia activities', 'alzheimer products', 'caregiving tips'
  ],
  authors: [{ name: 'DementiaAide Team' }],
  creator: 'DementiaAide',
  publisher: 'DementiaAide',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'DementiaAide',
    title: 'DementiaAide - Expert Dementia Care Resources & Support',
    description: 'AI-powered dementia care platform providing expert advice, educational videos, and personalized product recommendations for caregivers and families.',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'DementiaAide - Dementia Care Resources'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DementiaAide - Expert Dementia Care Resources',
    description: 'AI-powered platform for dementia caregivers with expert advice, videos, and product recommendations.',
    images: [`${siteUrl}/og-image.png`],
    creator: '@DementiaAide'
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': `${siteUrl}/en-US`,
    }
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
  category: 'Healthcare',
  classification: 'Healthcare Resources',
  referrer: 'origin-when-cross-origin'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for Healthcare Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "DementiaAide",
              "url": siteUrl,
              "logo": `${siteUrl}/logo.png`,
              "description": "Comprehensive dementia care platform with AI-powered advice and resources",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://twitter.com/DementiaAide",
                "https://facebook.com/DementiaAide"
              ],
              "areaServed": "Worldwide",
              "serviceType": "Healthcare Information Services"
            })
          }}
        />
        {/* Medical Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalWebPage",
              "name": "DementiaAide - Dementia Care Resources",
              "description": "Expert dementia care guidance, educational resources, and product recommendations",
              "url": siteUrl,
              "about": {
                "@type": "MedicalCondition",
                "name": "Dementia",
                "alternateName": "Alzheimer's Disease"
              },
              "audience": {
                "@type": "PeopleAudience",
                "suggestedMinAge": 18,
                "audienceType": "Caregivers and Healthcare Professionals"
              }
            })
          }}
        />
        {/* Analytics */}
        {process.env.GOOGLE_ANALYTICS_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
        <SpeedInsights />
      </body>
    </html>
  )
}