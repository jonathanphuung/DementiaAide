'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Share2, Bookmark, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useSearchParams } from 'next/navigation';
import { VideoCard } from './VideoCard';
import { type YouTubeVideo, searchYouTubeVideos } from '@/lib/youtube';
import { type AICareResponse } from '@/lib/ai';



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
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<AICareResponse | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!searchQuery) return;
      
      setLoading(true);
      setAiLoading(true);
      
      try {
        // Fetch videos and AI analysis in parallel
        const [videoResults, aiAnalysis] = await Promise.all([
          searchYouTubeVideos(searchQuery),
          fetch('/api/ai/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: searchQuery })
          }).then(res => res.json())
        ]);

        setVideos(videoResults);
        setAiResponse(aiAnalysis);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
        setAiLoading(false);
      }
    }

    fetchData();
  }, [searchQuery]);

  return (
    <div className="min-h-screen">
      {/* Search Section */}
      <div className="pt-32 pb-16 bg-gradient-to-b from-blue-50/50">
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

      {/* Results Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
          {/* AI Response Section */}
          <section className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold">Understanding the Situation</h2>
                <Badge variant="outline" className="bg-blue-50">
                  {aiResponse?.category || 'General'}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bookmark className="w-5 h-5" />
                </Button>
              </div>
            </div>
            {aiLoading ? (
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
              </div>
            ) : aiResponse ? (
              <div className="space-y-6">
                {/* Main Explanation */}
                <div className="prose max-w-none">
                  <p className="text-gray-700">{aiResponse.explanation}</p>
                </div>

                {/* Tips */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    Helpful Tips
                  </h3>
                  <ul className="space-y-2">
                    {aiResponse.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 font-medium">•</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related Topics */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Related Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {aiResponse.relatedTopics.map((topic, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-blue-100 transition-colors"
                        onClick={() => setSearchQuery(topic)}
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                Enter a question above to get AI-powered assistance
              </div>
            )}
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

          {/* Products section removed */}

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