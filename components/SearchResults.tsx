'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Share2, Bookmark, Lightbulb, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useRouter, useSearchParams } from 'next/navigation';
import { VideoCard } from './VideoCard';
import { AmazonProducts } from './AmazonProducts';
import { type YouTubeVideo, searchYouTubeVideos } from '@/lib/youtube';
import { type AICareResponse } from '@/lib/ai';
import { type AmazonProduct, searchAmazonProducts } from '@/lib/amazon';
export function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const [draftQuery, setDraftQuery] = useState(urlQuery);
  const [activeQuery, setActiveQuery] = useState(urlQuery);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [amazonProducts, setAmazonProducts] = useState<AmazonProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [amazonLoading, setAmazonLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<AICareResponse | null>(null);
  const [hasCompletedSearch, setHasCompletedSearch] = useState(false);
  const searchRequestId = useRef(0);
  const hasLoadedInitialUrlQuery = useRef(false);
  const isSearchRunning = loading || amazonLoading || aiLoading;

  useEffect(() => {
    const trimmedUrlQuery = urlQuery.trim();

    if (!trimmedUrlQuery || hasLoadedInitialUrlQuery.current) return;

    hasLoadedInitialUrlQuery.current = true;
    setDraftQuery(trimmedUrlQuery);
    setActiveQuery(trimmedUrlQuery);
  }, [urlQuery]);

  useEffect(() => {
    async function fetchData() {
      const query = activeQuery.trim();

      if (!query) {
        setVideos([]);
        setAmazonProducts([]);
        setAiResponse(null);
        setLoading(false);
        setAmazonLoading(false);
        setAiLoading(false);
        return;
      }

      const requestId = searchRequestId.current + 1;
      searchRequestId.current = requestId;
      
      setLoading(true);
      setAiLoading(true);
      setAmazonLoading(true);
      setHasCompletedSearch(false);
      setVideos([]);
      setAmazonProducts([]);
      setAiResponse(null);
      
      try {
        // Fetch videos, Amazon products, and AI analysis in parallel
        const [videoResults, amazonResults, aiAnalysis] = await Promise.all([
          searchYouTubeVideos(query),
          searchAmazonProducts(query),
          fetch('/api/ai/analyze', {
            method: 'POST',
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
          }).then(res => res.json())
        ]);

        if (searchRequestId.current !== requestId) return;

        setVideos(videoResults);
        setAmazonProducts(amazonResults);
        setAiResponse(aiAnalysis);
      } catch (error) {
        if (searchRequestId.current !== requestId) return;
        console.error('Error fetching data:', error);
      } finally {
        if (searchRequestId.current !== requestId) return;
        setLoading(false);
        setAmazonLoading(false);
        setAiLoading(false);
        setHasCompletedSearch(true);
        router.replace('/search', { scroll: false });
      }
    }

    fetchData();
  }, [activeQuery, router]);

  const submitSearch = (query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery || isSearchRunning) return;

    setDraftQuery(trimmedQuery);
    setActiveQuery(trimmedQuery);
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  const resetSearch = () => {
    searchRequestId.current += 1;
    setDraftQuery('');
    setActiveQuery('');
    setVideos([]);
    setAmazonProducts([]);
    setAiResponse(null);
    setLoading(false);
    setAmazonLoading(false);
    setAiLoading(false);
    setHasCompletedSearch(false);
    router.replace('/search', { scroll: false });
  };

  return (
    <div className="min-h-screen">
      {/* Search Section */}
      <div className="pt-32 pb-16 bg-blue-50/50">
        <div className="max-w-2xl mx-auto px-4 w-full">
          <form
            className="relative"
            onSubmit={(event) => {
              event.preventDefault();
              submitSearch(draftQuery);
            }}
          >
            <Input
              type="text"
              placeholder="What do you need help with?"
              className="w-full px-6 py-6 text-lg rounded-2xl shadow-lg pr-12 bg-white"
              value={draftQuery}
              disabled={isSearchRunning}
              onChange={(e) => setDraftQuery(e.target.value)}
            />
            <Button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700"
              size="icon"
              disabled={isSearchRunning}
            >
              {isSearchRunning ? (
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              ) : (
                <Search className="w-5 h-5 text-white" />
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Results Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {activeQuery && loading && aiLoading && amazonLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="flex items-center justify-center gap-3 text-blue-600 mb-4">
                <Loader2 
                  className="w-8 h-8 animate-spin" 
                  style={{ 
                    animation: 'spin 1s linear infinite',
                    transformOrigin: 'center'
                  }}
                />
                <span className="text-xl font-semibold">Searching for helpful information...</span>
              </div>
              <p className="text-gray-600">We're gathering AI insights, videos, and product recommendations for you</p>
            </motion.div>
          )}
          
          {activeQuery && (
            <motion.div
              key={activeQuery}
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
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3 text-blue-600">
                  <Loader2 
                    className="w-6 h-6 animate-spin" 
                    style={{ 
                      animation: 'spin 1s linear infinite',
                      transformOrigin: 'center'
                    }}
                  />
                  <span className="text-lg font-medium">AI is analyzing your question...</span>
                </div>
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
                        onClick={() => submitSearch(topic)}
                        aria-disabled={isSearchRunning}
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
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3 text-blue-600">
                  <Loader2 
                    className="w-6 h-6 animate-spin" 
                    style={{ 
                      animation: 'spin 1s linear infinite',
                      transformOrigin: 'center'
                    }}
                  />
                  <span className="text-lg font-medium">Finding helpful videos...</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {videos.length > 0 ? (
                  videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    No videos found for this topic.
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Amazon Products Section */}
          <AmazonProducts 
            key={activeQuery}
            products={amazonProducts}
            loading={amazonLoading}
            query={activeQuery}
          />

          {/* Related Topics Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Other Related Topics</h2>
            <div className="flex flex-wrap gap-3">
              {/* Topic pills will be dynamically populated */}
            </div>
          </section>

          {hasCompletedSearch && !isSearchRunning && (
            <div className="flex justify-center pb-12">
              <Button
                type="button"
                className="rounded-lg bg-blue-700 px-6 hover:bg-blue-800"
                onClick={resetSearch}
              >
                Let&apos;s do another search
              </Button>
            </div>
          )}
        </motion.div>
      )}
        </div>
      </div>
    </div>
  );
}
