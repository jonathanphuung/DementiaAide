'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Lightbulb, Loader2, Search, Share2 } from 'lucide-react';
import { AmazonProducts } from './AmazonProducts';
import { VideoCard } from './VideoCard';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { type AICareResponse } from '@/lib/ai';
import { type AmazonProduct, searchAmazonProducts } from '@/lib/amazon';
import { type YouTubeVideo, searchYouTubeVideos } from '@/lib/youtube';

const popularSearches = [
  'wandering at night',
  'refusing to eat',
  'aggressive behavior',
  'memory exercises',
  'bathroom safety',
];

export function SearchHero() {
  const [draftQuery, setDraftQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [amazonProducts, setAmazonProducts] = useState<AmazonProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [amazonLoading, setAmazonLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<AICareResponse | null>(null);
  const searchRequestId = useRef(0);

  const isSearchRunning = loading || amazonLoading || aiLoading;

  const runSearch = async (query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery || isSearchRunning) return;

    const requestId = searchRequestId.current + 1;
    searchRequestId.current = requestId;

    setDraftQuery(trimmedQuery);
    setActiveQuery(trimmedQuery);
    setLoading(true);
    setAmazonLoading(true);
    setAiLoading(true);
    setVideos([]);
    setAmazonProducts([]);
    setAiResponse(null);
    window.history.replaceState(null, '', '/');

    try {
      const [videoResults, amazonResults, aiAnalysis] = await Promise.all([
        searchYouTubeVideos(trimmedQuery),
        searchAmazonProducts(trimmedQuery),
        fetch('/api/ai/analyze', {
          method: 'POST',
          cache: 'no-store',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: trimmedQuery }),
        }).then((res) => res.json()),
      ]);

      if (searchRequestId.current !== requestId) return;

      setVideos(videoResults);
      setAmazonProducts(amazonResults);
      setAiResponse(aiAnalysis);
    } catch (error) {
      if (searchRequestId.current !== requestId) return;
      console.error('Error fetching assistant results:', error);
    } finally {
      if (searchRequestId.current !== requestId) return;
      setLoading(false);
      setAmazonLoading(false);
      setAiLoading(false);
      window.history.replaceState(null, '', '/');
    }
  };

  return (
    <section className="bg-white">
      <div className="relative flex min-h-[62vh] items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-4xl space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              Your AI-Powered Guide to <span className="font-bold text-blue-600">Dementia Care</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Get instant AI advice, curated educational videos, and personalized product recommendations for Alzheimer&apos;s and dementia caregiving challenges.
            </p>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              runSearch(draftQuery);
            }}
            className="relative mx-auto max-w-2xl"
          >
            <input
              type="text"
              placeholder="What do you need help with? (e.g., 'loved one wants to drive')"
              className="flex w-full min-w-0 select-text rounded-2xl border border-input bg-input-background px-6 py-6 pr-16 text-base shadow-lg outline-none transition-[color,box-shadow] placeholder:text-muted-foreground selection:bg-blue-600 selection:text-white focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              value={draftQuery}
              autoComplete="off"
              onChange={(e) => setDraftQuery(e.target.value)}
            />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700"
              size="icon"
              disabled={isSearchRunning}
            >
              {isSearchRunning ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Search className="h-6 w-6" />
              )}
            </Button>
          </form>

          {!activeQuery && (
            <div className="text-center">
              <p className="mb-4 text-sm text-muted-foreground">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {popularSearches.map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    className="rounded-full text-sm"
                    disabled={isSearchRunning}
                    onClick={() => runSearch(term)}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {activeQuery && (
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {loading && aiLoading && amazonLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 text-center"
              >
                <div className="mb-4 flex items-center justify-center gap-3 text-blue-600">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="text-xl font-semibold">Searching for helpful information...</span>
                </div>
                <p className="text-gray-600">We&apos;re gathering AI insights, videos, and product recommendations for you</p>
              </motion.div>
            )}

            <motion.div
              key={activeQuery}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <section className="rounded-2xl bg-white p-8 shadow-lg">
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-semibold">Understanding the Situation</h2>
                    <Badge variant="outline" className="bg-blue-50">
                      {aiResponse?.category || 'General'}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Bookmark className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {aiLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center gap-3 text-blue-600">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span className="text-lg font-medium">AI is analyzing your question...</span>
                    </div>
                  </div>
                ) : aiResponse ? (
                  <div className="space-y-6">
                    <div className="prose max-w-none">
                      <p className="text-gray-700">{aiResponse.explanation}</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="flex items-center gap-2 text-lg font-semibold">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        Helpful Tips
                      </h3>
                      <ul className="space-y-2">
                        {aiResponse.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="font-medium text-blue-600">•</span>
                            <span className="text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Related Topics</h3>
                      <div className="flex flex-wrap gap-2">
                        {aiResponse.relatedTopics.map((topic, index) => (
                          <Badge key={index} variant="secondary">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    Enter a question above to get AI-powered assistance.
                  </div>
                )}
              </section>

              <section>
                <h2 className="mb-6 text-2xl font-semibold">Videos For You</h2>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center gap-3 text-blue-600">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span className="text-lg font-medium">Finding helpful videos...</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
                    {videos.length > 0 ? (
                      videos.map((video) => <VideoCard key={video.id} video={video} />)
                    ) : (
                      <div className="col-span-full py-8 text-center text-muted-foreground">
                        No videos found for this topic.
                      </div>
                    )}
                  </div>
                )}
              </section>

              <AmazonProducts
                key={activeQuery}
                products={amazonProducts}
                loading={amazonLoading}
                query={activeQuery}
              />

            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}
