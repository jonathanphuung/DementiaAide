import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, HeartHandshake, Home, Sparkles, Users } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
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
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="bg-secondary/30 pt-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 pb-14 sm:px-6 lg:flex-row lg:justify-between lg:gap-16 lg:px-8">
            <div className="max-w-3xl lg:flex-1">
              <h1 className="font-display text-4xl font-extrabold leading-tight text-foreground md:text-6xl">
                A care resource built from Ana&apos;s family story
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                Dementia care can feel confusing, exhausting, and lonely. DementiaAide exists to make the journey a little clearer and a little more supported.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href="/resources">
                    Browse resources
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-foreground/20">
                  <a href="#ana-story">Read Ana&apos;s story</a>
                </Button>
              </div>
            </div>

            <div
              className="mx-auto overflow-hidden rounded-lg border-2 border-foreground/15 bg-card shadow-sm lg:mx-0 lg:shrink-0"
              style={{ width: '380px', maxWidth: '100%' }}
            >
              <div className="bg-teal-tint">
                <Image
                  src="/about-ana-dad.jpg"
                  alt="Ana with her father Jorge"
                  width={480}
                  height={480}
                  priority
                  unoptimized
                  className="object-cover"
                  style={{ width: '100%', height: '300px', objectPosition: 'center center' }}
                  sizes="(min-width: 1024px) 380px, min(100vw, 380px)"
                />
              </div>
              <div className="p-6">
                <p className="text-sm font-medium text-primary">From our family to yours</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The heart of DementiaAide is Ana&apos;s experience helping care for her dad and learning what families need when dementia changes daily life.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="ana-story" className="bg-background py-14">
          <div
            className="mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8"
            style={{ columnGap: '64px', rowGap: '40px' }}
          >
            <div
              className="w-full max-w-[340px] shrink-0 space-y-4 lg:max-w-none"
              style={{ width: '340px', maxWidth: '100%' }}
            >
              <div
                className="overflow-hidden rounded-lg border-2 border-foreground/15 bg-secondary/40 shadow-sm"
                style={{ width: '340px', maxWidth: '100%' }}
              >
                <Image
                  src="/about-jorge.jpg"
                  alt="Jorge Garcia smiling with a teddy bear"
                  width={360}
                  height={480}
                  unoptimized
                  className="object-cover"
                  style={{ width: '100%', height: '430px', objectPosition: 'center center' }}
                  sizes="(min-width: 1024px) 340px, min(100vw, 340px)"
                />
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                Jorge Garcia&apos;s diagnosis changed Ana&apos;s family life and became part of the reason DementiaAide exists today.
              </p>
            </div>

            <div className="flex max-w-3xl flex-1 flex-col justify-center lg:pl-4">
              <h2 className="font-display text-3xl font-extrabold text-foreground md:text-4xl">
                Ana&apos;s father was diagnosed with early-onset Frontotemporal Dementia
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground">
                <p>
                  In 2009, Ana&apos;s father, Jorge Garcia, was diagnosed with early-onset Frontotemporal Dementia at age 56. His symptoms had started years earlier, and the diagnosis arrived while his six children were still in their teens and twenties.
                </p>
                <p>
                  Over time, Ana&apos;s family learned that dementia care is more than the medical side. Families also have to navigate changed routines, safety questions, emotional grief, family roles, and a thousand practical choices that rarely come with simple instructions.
                </p>
                <p>
                  DementiaAide was created to share those lessons with other families. The goal is to offer support that feels honest, useful, and close to real life.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-2xl">
              <h2 className="font-display text-3xl font-extrabold text-foreground">Clearer support for harder days</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                DementiaAide brings together Ana&apos;s writing, practical resources, and carefully chosen tools so caregivers can find help without digging through scattered information.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {values.map((value) => {
                const Icon = value.icon;

                return (
                  <article key={value.title} className="rounded-lg border-2 border-foreground/15 bg-card p-6 shadow-sm">
                    <div className="mb-5 inline-flex rounded-md bg-teal-tint p-3 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{value.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-background py-14">
          <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_440px] lg:px-8">
            <div className="rounded-lg border-2 border-foreground/15 bg-card p-8 shadow-sm">
              <Sparkles className="mb-5 h-8 w-8 text-primary" />
              <h2 className="font-display text-3xl font-extrabold text-foreground">From our family to yours</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Whether you are just starting to notice changes or have been caring for someone for years, DementiaAide is here to help you feel more prepared, more confident, and less alone.
              </p>
            </div>

            <div
              className="mx-auto overflow-hidden rounded-lg border-2 border-foreground/15 bg-secondary/40 shadow-sm lg:mx-0"
              style={{ width: '440px', maxWidth: '100%' }}
            >
              <Image
                src="/about-family.jpg"
                alt="Ana's family gathered together"
                width={480}
                height={320}
                unoptimized
                className="object-contain"
                style={{ width: '100%', height: 'auto' }}
                sizes="(min-width: 1024px) 440px, min(100vw, 440px)"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
