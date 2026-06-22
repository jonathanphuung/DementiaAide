import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, HeartHandshake, Home, Sparkles, Users } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getSiteUrl } from '@/lib/site-url';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'About DementiaAide - Ana Garcia and the Family Story Behind the Site',
  description:
    'Learn the family story behind DementiaAide, created from Ana Garcia\'s lived experience caring for her father Jorge through early-onset Frontotemporal Dementia.',
  keywords: [
    'about DementiaAide',
    'Ana Garcia DementiaAide',
    'Jorge Garcia dementia',
    'frontotemporal dementia family story',
    'dementia caregiver support',
    'dementia care resources',
    'family dementia care',
  ],
  openGraph: {
    title: 'About DementiaAide - From Our Family to Yours',
    description:
      'DementiaAide is rooted in real caregiving experience and built to help families feel clearer, more supported, and less alone.',
    url: `${siteUrl}/about`,
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

const values = [
  {
    title: 'Real Caregiving Experience',
    description: 'The guidance here is shaped by years of family caregiving, not abstract advice from a distance.',
    icon: HeartHandshake,
  },
  {
    title: 'Practical Help',
    description: 'We focus on the everyday moments families actually face: bathing, eating, wandering, stress, and hard decisions.',
    icon: Home,
  },
  {
    title: 'Less Isolation',
    description: 'Dementia care can feel lonely. This site is meant to feel like a steady hand from someone who understands.',
    icon: Users,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <section className="bg-[#f8fbff] pt-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
            <div className="max-w-3xl">
              <Badge className="mb-5 border-rose-100 bg-white px-3 py-1 text-rose-700 shadow-sm hover:bg-white">
                About DementiaAide
              </Badge>
              <h1 className="text-4xl font-bold leading-tight tracking-normal text-gray-950 md:text-6xl">
                A care resource built from Ana's family story
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                Dementia care can feel confusing, exhausting, and lonely. DementiaAide exists to make the journey a little clearer and a little more supported.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-lg bg-blue-700 px-6 hover:bg-blue-800">
                  <a href="/resources">
                    Browse resources
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-lg border-blue-200 bg-white px-6 text-blue-800">
                  <a href="#ana-story">Read Ana's story</a>
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-blue-100 bg-white shadow-xl">
              <div className="bg-blue-50">
                <Image
                  src="/about-ana-dad.jpg"
                  alt="Ana with her father Jorge"
                  width={480}
                  height={480}
                  priority
                  unoptimized
                  className="h-auto w-full object-cover"
                  sizes="(min-width: 1024px) 340px, 100vw"
                />
              </div>
              <div className="p-6">
                <p className="text-sm font-medium text-blue-700">From our family to yours</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  The heart of DementiaAide is Ana's experience helping care for her dad and learning what families need when dementia changes daily life.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="ana-story" className="bg-white py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-8">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg bg-gray-100 shadow-sm">
                <Image
                  src="/about-jorge.jpg"
                  alt="Jorge Garcia smiling with a teddy bear"
                  width={360}
                  height={480}
                  unoptimized
                  className="h-auto w-full object-cover"
                  sizes="(min-width: 1024px) 300px, 100vw"
                />
              </div>
              <p className="text-sm leading-6 text-gray-500">
                Jorge Garcia's diagnosis changed Ana's family life and became part of the reason DementiaAide exists today.
              </p>
            </div>

            <div className="flex flex-col justify-center">
              <Badge className="mb-5 w-fit border-blue-100 bg-blue-50 px-3 py-1 text-blue-700 hover:bg-blue-50">
                The Story Behind DementiaAide
              </Badge>
              <h2 className="text-3xl font-bold tracking-normal text-gray-950 md:text-4xl">
                Ana's father was diagnosed with early-onset Frontotemporal Dementia
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-gray-600">
                <p>
                  In 2009, Ana's father, Jorge Garcia, was diagnosed with early-onset Frontotemporal Dementia at age 56. His symptoms had started years earlier, and the diagnosis arrived while his six children were still in their teens and twenties.
                </p>
                <p>
                  Over time, Ana's family learned that dementia care is more than the medical side. Families also have to navigate changed routines, safety questions, emotional grief, family roles, and a thousand practical choices that rarely come with simple instructions.
                </p>
                <p>
                  DementiaAide was created to share those lessons with other families. The goal is to offer support that feels honest, useful, and close to real life.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f8fbff] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-2xl">
              <Badge className="mb-4 border-emerald-100 bg-emerald-50 px-3 py-1 text-emerald-700 hover:bg-emerald-50">
                What We Are Building
              </Badge>
              <h2 className="text-3xl font-bold tracking-normal text-gray-950">Clearer support for harder days</h2>
              <p className="mt-3 text-base leading-7 text-gray-600">
                DementiaAide brings together Ana's writing, practical resources, and carefully chosen tools so caregivers can find help without digging through scattered information.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {values.map((value) => {
                const Icon = value.icon;

                return (
                  <article key={value.title} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-5 inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-950">{value.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{value.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8">
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
              <Sparkles className="mb-5 h-8 w-8 text-rose-600" />
              <h2 className="text-3xl font-bold tracking-normal text-gray-950">From our family to yours</h2>
              <p className="mt-4 text-base leading-8 text-gray-600">
                Whether you are just starting to notice changes or have been caring for someone for years, DementiaAide is here to help you feel more prepared, more confident, and less alone.
              </p>
            </div>

            <div className="overflow-hidden rounded-lg bg-gray-100 shadow-sm">
              <Image
                src="/about-family.jpg"
                alt="Ana's family gathered together"
                width={480}
                height={320}
                unoptimized
                className="h-auto w-full object-contain"
                sizes="(min-width: 1024px) 420px, 100vw"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
