'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Share2, Bookmark } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { useSearchParams } from 'next/navigation';
import { VideoCard } from './VideoCard';
import { type YouTubeVideo, searchYouTubeVideos } from '@/lib/youtube';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  link: string;
}

interface RelatedTopic {
  id: string;
  title: string;
}

export function SearchResults() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVideos() {
      if (!searchQuery) return;
      
      setLoading(true);
      try {
        const results = await searchYouTubeVideos(searchQuery);
        setVideos(results);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [searchQuery]);

  return (
    <div className="min-h-screen pt-24">
      {/* Search Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="h-24 flex items-center">
          <div className="max-w-2xl mx-auto px-4 w-full">
            <div className="relative">
              <Input
                type="text"
                placeholder="What do you need help with?"
                className="w-full px-6 py-6 text-lg rounded-2xl shadow-lg pr-12 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-700"
                size="icon"
              >
                <Search className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 mt-16">
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
          {/* Information Section */}
          <section className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-semibold">Understanding the Situation</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bookmark className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="prose max-w-none">
              {/* Content will be dynamically populated */}
            </div>
          </section>

          {/* Videos Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Videos For You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {loading ? (
                // Loading skeleton
                [...Array(5)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-gray-200" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </Card>
                ))
              ) : videos.length > 0 ? (
                videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No videos found for this topic.
                </div>
              )}
            </div>
          </section>

          {/* Assistive Technology Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Assistive Technology</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Product cards will be dynamically populated */}
            </div>
          </section>

          {/* Related Topics Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Other Related Topics</h2>
            <div className="flex flex-wrap gap-3">
              {/* Topic pills will be dynamically populated */}
            </div>
          </section>
        </motion.div>
      )}
        </div>
      </div>
    </div>
  );
}