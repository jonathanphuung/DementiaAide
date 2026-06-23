import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, BookOpen, CalendarCheck, HeartHandshake, Home, Search, Shield, Stethoscope } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ResourceLibrary } from '@/components/ResourceLibrary';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { featuredResources, getResourceUrl, resources, type Resource } from '@/lib/resources';
import { getSiteUrl } from '@/lib/site-url';

const siteUrl = getSiteUrl();

const guidedPaths = [
  {
    title: 'Newly Diagnosed',
    description: 'Start with plain-language basics, what changes after diagnosis, and how to plan the next steps.',
    icon: Stethoscope,
    slugs: ['what-is-dementia', 'what-to-expect-after-a-dementia-diagnosis', 'top-signs-of-dementia'],
  },
  {
    title: 'Safety Concerns',
    description: 'Guides for wandering, falls, driving, kitchen risk, sudden changes, and emergency planning.',
    icon: Shield,
    slugs: ['dementia-wandering', 'falls-in-dementia', 'dementia-and-driving'],
  },
  {
    title: 'Daily Care',
    description: 'Practical support for bathing, toileting, dressing, eating, medication, sleep, and routines.',
    icon: Home,
    slugs: ['dementia-and-refusing-to-bathe', 'dementia-bathroom-help-caregiver-guide', 'medication-management-in-dementia'],
  },
  {
    title: 'Behavior Changes',
    description: 'Help for anger, anxiety, repetition, hallucinations, accusations, withdrawal, and distress.',
    icon: HeartHandshake,
    slugs: ['anger-in-dementia', 'dementia-and-anxiety', 'false-accusations'],
  },
  {
    title: 'Caregiver Burnout',
    description: 'Support for exhaustion, guilt, family conflict, asking for help, and finding respite.',
    icon: CalendarCheck,
    slugs: ['caregiver-burnout', 'feeling-overwhelmed-as-a-dementia-caregiver', 'respite-care'],
  },
];

function getPathResources(slugs: string[]) {
  return slugs
    .map((slug) => resources.find((resource) => resource.slug === slug))
    .filter((resource): resource is Resource => Boolean(resource));
}

export const metadata: Metadata = {
  title: 'Dementia Care Resources - Ana Garcia Guides for Caregivers',
  description:
    'Browse Ana Garcia\'s practical dementia care guides for caregiver support, daily care, safety, behavior changes, diagnosis, care planning, and connection.',
  keywords: [
    'dementia resources',
    'Ana Garcia dementia',
    'dementia caregiver guides',
    'Alzheimer caregiver support',
    'dementia care tips',
    'wandering dementia guide',
    'dementia eating guide',
    'caregiver burnout',
    'dementia safety',
    'dementia behavior help',
  ],
  openGraph: {
    title: 'Dementia Care Resources - Ana Garcia Guides for Caregivers',
    description:
      'A practical resource library for dementia caregivers, organized around the real care moments families face.',
    url: `${siteUrl}/resources`,
  },
  alternates: {
    canonical: `${siteUrl}/resources`,
  },
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <section className="relative overflow-hidden bg-[#f7fbff] pt-32">
          <div className="absolute inset-x-0 bottom-0 h-24 bg-white" />
          <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-10 px-4 pb-16 sm:px-6 md:flex-row md:justify-between lg:gap-16 lg:px-8">
            <div className="max-w-3xl md:flex-1">
              <Badge className="mb-5 border-blue-100 bg-white px-3 py-1 text-blue-700 shadow-sm hover:bg-white">
                DementiaAide Resources
              </Badge>
              <h1 className="text-4xl font-bold leading-tight tracking-normal text-gray-950 md:text-6xl">
                Practical help for the moments dementia care gets heavy
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                Ana's guides are organized around real caregiver questions: what changed, what matters now, and what might help today.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-lg bg-blue-700 px-6 hover:bg-blue-800">
                  <a href="#resource-library">
                    Browse guides
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-lg border-blue-200 bg-white px-6 text-blue-800">
                  <a href="https://www.dementiaaide.com/blogs/tips-for-dementia" target="_blank" rel="noreferrer">
                    View original blog
                  </a>
                </Button>
              </div>
            </div>

            <div
              className="mx-auto overflow-hidden rounded-lg border border-blue-100 bg-white shadow-xl md:ml-auto md:mr-0 md:shrink-0"
              style={{ width: '400px', maxWidth: '100%' }}
            >
              <div className="bg-blue-50">
                <Image
                  src="/ana-headshot.png"
                  alt="Ana Garcia"
                  width={344}
                  height={510}
                  priority
                  unoptimized
                  className="object-cover"
                  style={{ width: '100%', height: '440px', objectPosition: 'center top' }}
                  sizes="(min-width: 1024px) 400px, min(100vw, 400px)"
              />
              </div>
              <div className="p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-lg bg-rose-50 p-3 text-rose-700">
                    <HeartHandshake className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">A note from the heart of the site</p>
                    <h2 className="text-xl font-semibold text-gray-950">Ana has been there</h2>
                  </div>
                </div>
                <p className="text-sm leading-6 text-gray-600">
                  The resource library is built around Ana's writing and lived caregiving perspective, then grouped so families can find help without sorting through a wall of links.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <Badge className="mb-4 border-emerald-100 bg-emerald-50 px-3 py-1 text-emerald-700 hover:bg-emerald-50">
                  Start With These
                </Badge>
                <h2 className="text-3xl font-bold tracking-normal text-gray-950">Common caregiver moments</h2>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {featuredResources.slice(0, 6).map((resource) => (
                <a
                  key={resource.slug}
                  href={getResourceUrl(resource)}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
                      {resource.category === 'Safety & Crisis' ? (
                        <Shield className="h-5 w-5" />
                      ) : resource.category === 'Connection' ? (
                        <Search className="h-5 w-5" />
                      ) : (
                        <BookOpen className="h-5 w-5" />
                      )}
                    </div>
                    <Badge variant="outline" className="rounded-md text-xs text-gray-600">
                      {resource.category}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold leading-6 text-gray-950 group-hover:text-blue-800">
                    {resource.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{resource.summary}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7fbff] py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-3xl">
              <Badge className="mb-4 border-blue-100 bg-white px-3 py-1 text-blue-700 shadow-sm hover:bg-white">
                Guided Paths
              </Badge>
              <h2 className="text-3xl font-bold tracking-normal text-gray-950">Find the right starting point</h2>
              <p className="mt-3 text-base leading-7 text-gray-600">
                These paths group Ana&apos;s writing around common care moments so families do not have to know the perfect search term.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-5">
              {guidedPaths.map((path) => {
                const Icon = path.icon;
                const pathResources = getPathResources(path.slugs);

                return (
                  <div key={path.title} className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-950">{path.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{path.description}</p>
                    <div className="mt-5 space-y-2">
                      {pathResources.map((resource) => (
                        <a
                          key={resource.slug}
                          href={getResourceUrl(resource)}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-start justify-between gap-3 rounded-md border border-gray-100 p-3 text-sm transition hover:border-blue-200 hover:bg-blue-50"
                        >
                          <span className="font-medium leading-5 text-gray-800 group-hover:text-blue-800">
                            {resource.title}
                          </span>
                          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div id="resource-library">
          <ResourceLibrary />
        </div>
      </main>
      <Footer />
    </div>
  );
}
