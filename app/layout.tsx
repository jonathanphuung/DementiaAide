import type { Metadata } from 'next'
import { Archivo, Public_Sans } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { AppProviders } from '@/components/AppProviders'
import { getSiteUrl } from '@/lib/site-url'

const archivo = Archivo({ subsets: ['latin'], variable: '--font-display' })
const publicSans = Public_Sans({ subsets: ['latin'], variable: '--font-body' })

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
      <body className={`${archivo.variable} ${publicSans.variable} font-sans`}>
        {/*
          THESIS: The search and its answer read like a trusted library card
          catalog — a calm, orderly reference system, not a chatbot or
          SaaS landing page.
          OWN-WORLD: Ivory card-stock ground, neutral charcoal ink, one
          committed deep-teal stamp-ink accent carrying the CTA/brand. Sage
          is law for safe/tip states, crimson is law for urgent/caution
          states — never decorative. Archivo for display/labels, Public
          Sans for body. Small crisp radii; visible keyline borders frame
          every card like an index card.
          STORY: A stressed caregiver types one real situation, sees an
          instant contents index (steps/guides/sources) before scrolling,
          then a numbered instruction set with a bold ribbon for anything
          urgent — filed and findable, the way a catalog card is.
          FIRST VIEWPORT: Ivory ground, large charcoal headline, one
          card-framed search field with a big teal submit square beneath
          it, numbered compartment chips for popular searches/care paths.
          One authored entrance motion (quart ease-out) reveals results —
          restrained, not scattered.
          FORM: Library-catalog precision — grounded candidate 3, seed key
          8dd335dc, re-roll round 1 (user rejected the round-0 medication-
          label/amber-brown direction as too brown, and its navy footer as
          reading literally blue).
          FINISH: unreviewed and undocumented is unfinished; this build ends
          with the finish review, the verdict, and DESIGN.md
        */}
        <AppProviders>{children}</AppProviders>
        <SpeedInsights />
      </body>
    </html>
  )
}