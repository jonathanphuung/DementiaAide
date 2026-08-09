'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Share2, Lightbulb, Loader2, ExternalLink } from 'lucide-react';
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
      <div className="pt-32 pb-16 bg-secondary/30">
        <div className="max-w-2xl mx-auto px-4 w-full">
          <form
            className="relative flex items-stretch gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              submitSearch(draftQuery);
            }}
          >
            <Input
              type="text"
              placeholder="What do you need help with?"
              className="w-full px-5 py-4 text-base rounded-md border-2 border-foreground/25 bg-input-background shadow-sm sm:py-5 sm:text-lg"
              value={draftQuery}
              disabled={isSearchRunning}
              onChange={(e) => setDraftQuery(e.target.value)}
            />
            <Button
              type="submit"
              className="h-auto w-16 shrink-0 rounded-md sm:w-20"
              disabled={isSearchRunning}
            >
              {isSearchRunning ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
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
              <div className="flex items-center justify-center gap-3 text-primary mb-4">
                <Loader2
                  className="w-8 h-8 animate-spin"
                  style={{
                    animation: 'spin 1s linear infinite',
                    transformOrigin: 'center'
                  }}
                />
                <span className="text-xl font-semibold">Searching for helpful information...</span>
              </div>
              <p className="text-muted-foreground">We&apos;re gathering AI insights, videos, and product recommendations for you</p>
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
          <section className="bg-card rounded-lg border-2 border-foreground/15 p-8 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-2xl font-extrabold text-foreground">Understanding the Situation</h2>
                <Badge variant="outline" className="bg-teal-tint text-primary">
                  {aiResponse?.category || 'General'}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
            {aiLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3 text-primary">
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
                {aiResponse.urgentNotice && (
                  <div className="rounded-md border-2 border-crimson-border bg-crimson-tint p-5">
                    <h3 className="mb-2 text-lg font-semibold text-crimson">
                      {aiResponse.urgentNotice.title}
                    </h3>
                    <p className="mb-3 text-sm leading-6 text-foreground">
                      {aiResponse.urgentNotice.message}
                    </p>
                    <ul className="space-y-2">
                      {aiResponse.urgentNotice.actions.map((action, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="font-semibold text-crimson">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Main Explanation */}
                <div className="prose max-w-none">
                  <p className="text-foreground">{aiResponse.explanation}</p>
                </div>

                {/* Tips */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    Helpful Tips
                  </h3>
                  <ul className="space-y-2">
                    {aiResponse.tips.slice(3).map((tip) => (
                      <li key={tip} className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        <span className="text-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {aiResponse.matchedResources.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">Ana&apos;s Related Guides</h3>
                    <div className="grid gap-3 md:grid-cols-2">
                      {aiResponse.matchedResources.map((resource) => (
                        <a
                          key={resource.url}
                          href={resource.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group rounded-md border-2 border-foreground/15 bg-card p-4 transition-colors hover:border-primary hover:bg-teal-tint"
                        >
                          <div className="mb-2 flex items-start justify-between gap-3">
                            <h4 className="text-sm font-semibold leading-5 text-foreground">
                              {resource.title}
                            </h4>
                            <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-primary" />
                          </div>
                          <p className="mb-2 text-sm leading-6 text-muted-foreground">{resource.summary}</p>
                          <span className="inline-block rounded-sm bg-teal-border/40 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary">
                            {resource.category}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {aiResponse.trustedSources?.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">Trusted Care References</h3>
                    <div className="grid gap-3 md:grid-cols-3">
                      {aiResponse.trustedSources.map((source) => (
                        <a
                          key={source.url}
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group rounded-md border-2 border-sage-border bg-sage-tint p-4 transition-colors hover:border-sage"
                        >
                          <div className="mb-2 flex items-start justify-between gap-3">
                            <h4 className="text-sm font-semibold leading-5 text-foreground">
                              {source.title}
                            </h4>
                            <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-sage" />
                          </div>
                          <p className="mb-2 text-sm leading-6 text-muted-foreground">{source.summary}</p>
                          <span className="inline-block rounded-sm bg-sage-border/40 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-sage">
                            {source.publisher}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Topics */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Related Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {aiResponse.relatedTopics.map((topic, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-teal-tint transition-colors"
                        onClick={() => submitSearch(topic)}
                        aria-disabled={isSearchRunning}
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="rounded-md bg-muted p-3 text-xs leading-5 text-muted-foreground">
                  {aiResponse.disclaimer}
                </p>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                Enter a question above to get AI-powered assistance
              </div>
            )}
          </section>

          {/* Videos Section */}
          <section>
            <h2 className="font-display text-2xl font-extrabold text-foreground mb-6">Videos For You</h2>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3 text-primary">
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

          {hasCompletedSearch && !isSearchRunning && (
            <div className="flex justify-center pb-12">
              <Button
                type="button"
                className="px-6"
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
