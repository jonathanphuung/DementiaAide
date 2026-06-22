'use client';

import { useMemo, useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ResourceCategory,
  getResourceCountByCategory,
  getResourceUrl,
  resourceCategories,
  resourceCategoryMeta,
  resources,
} from '@/lib/resources';

const allCategoryLabel = 'All';

export function ResourceLibrary() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | typeof allCategoryLabel>(allCategoryLabel);

  const filteredResources = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesCategory = selectedCategory === allCategoryLabel || resource.category === selectedCategory;

      if (!matchesCategory) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchableText = [
        resource.title,
        resource.summary,
        resource.category,
        ...resource.tags,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [query, selectedCategory]);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <Badge className="mb-4 border-rose-100 bg-rose-50 px-3 py-1 text-rose-700 hover:bg-rose-50">
              Ana's Resource Library
            </Badge>
            <h2 className="text-3xl font-bold tracking-normal text-gray-950 md:text-4xl">
              Find the guide that fits this moment
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
              Caregiving changes hour by hour. These guides are grouped around the real situations families run into most often.
            </p>
          </div>

          <label className="relative block">
            <span className="sr-only">Search resources</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search wandering, eating, guilt..."
              className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-12 pr-4 text-sm text-gray-950 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>
        </div>

        <div className="mb-10 flex gap-2 overflow-x-auto pb-2">
          <Button
            type="button"
            variant={selectedCategory === allCategoryLabel ? 'default' : 'outline'}
            className={`shrink-0 rounded-lg ${selectedCategory === allCategoryLabel ? 'bg-gray-950 text-white hover:bg-gray-800' : 'bg-white'}`}
            onClick={() => setSelectedCategory(allCategoryLabel)}
          >
            All
            <span className="ml-2 text-xs opacity-70">{resources.length}</span>
          </Button>

          {resourceCategories.map((category) => {
            const meta = resourceCategoryMeta[category];
            const Icon = meta.icon;

            return (
              <Button
                key={category}
                type="button"
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={`shrink-0 rounded-lg ${
                  selectedCategory === category
                    ? 'bg-gray-950 text-white hover:bg-gray-800'
                    : 'bg-white text-gray-700'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {category}
                <span className="ml-2 text-xs opacity-70">{getResourceCountByCategory(category)}</span>
              </Button>
            );
          })}
        </div>

        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            {filteredResources.length} {filteredResources.length === 1 ? 'guide' : 'guides'}
          </p>
          {query || selectedCategory !== allCategoryLabel ? (
            <Button
              type="button"
              variant="ghost"
              className="h-9 rounded-lg px-3 text-sm text-gray-600"
              onClick={() => {
                setQuery('');
                setSelectedCategory(allCategoryLabel);
              }}
            >
              Clear
            </Button>
          ) : null}
        </div>

        {filteredResources.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredResources.map((resource) => {
              const meta = resourceCategoryMeta[resource.category];
              const Icon = meta.icon;

              return (
                <article
                  key={resource.slug}
                  className="flex min-h-[260px] flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className={`inline-flex rounded-lg border p-2 ${meta.accent}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="rounded-md text-xs text-gray-600">
                      {resource.category}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold leading-6 text-gray-950">{resource.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">{resource.summary}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={getResourceUrl(resource)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
                  >
                    Read Ana's guide
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-6 py-12 text-center">
            <p className="text-base font-medium text-gray-950">No matching guides yet.</p>
            <p className="mt-2 text-sm text-gray-600">Try another care topic or clear the filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
