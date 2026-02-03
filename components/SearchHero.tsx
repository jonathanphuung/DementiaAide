'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function SearchHero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-white px-4">

      <div className="max-w-4xl w-full space-y-8 relative">
        {/* Hero Text */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Your AI-Powered Guide to{' '}
            <span className="text-blue-600 font-bold">
              Dementia Care
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Get instant AI advice, curated educational videos, and personalized product recommendations for Alzheimer's and dementia caregiving challenges.
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="relative max-w-2xl mx-auto"
        >
          <Input
            type="text"
            placeholder="What do you need help with? (e.g., 'loved one wants to drive')"
            className="w-full px-6 py-8 text-lg rounded-2xl shadow-lg pr-16"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700"
            size="icon"
          >
            <Search className="w-6 h-6" />
          </Button>
        </form>

        {/* Example Searches */}
        <div
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'wandering at night',
              'refusing to eat',
              'aggressive behavior',
              'memory exercises',
              'bathroom safety'
            ].map((term) => (
              <Button
                key={term}
                variant="outline"
                className="rounded-full text-sm"
                onClick={() => {
                  setSearchQuery(term);
                  router.push(`/search?q=${encodeURIComponent(term)}`);
                }}
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}