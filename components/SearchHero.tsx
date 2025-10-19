'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl w-full space-y-8 relative">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Your Comprehensive Guide to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dementia Care
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Get instant access to expert advice, resources, and products to help with dementia care
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-700"
            size="icon"
          >
            <Search className="w-6 h-6" />
          </Button>
        </motion.form>

        {/* Example Searches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
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
        </motion.div>
      </div>
    </section>
  );
}