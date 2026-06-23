'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Lightbulb, Loader2, Printer, Search, Share2 } from 'lucide-react';
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

const caregiverPaths = [
  'New diagnosis',
  'Safety concerns',
  'Daily care',
  'Behavior changes',
  'Caregiver burnout',
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
  const [showHelpfulTools, setShowHelpfulTools] = useState(false);
  const searchRequestId = useRef(0);

  const isSearchRunning = loading || amazonLoading || aiLoading;

  const buildAssistantSummary = () => {
    if (!aiResponse) return '';

    const urgentSection = aiResponse.urgentNotice
      ? [
          `${aiResponse.urgentNotice.title}`,
          aiResponse.urgentNotice.message,
          ...aiResponse.urgentNotice.actions.map((action) => `- ${action}`),
          '',
        ].join('\n')
      : '';

    const tips = aiResponse.tips.map((tip) => `- ${tip}`).join('\n');
    const guides = aiResponse.matchedResources
      .map((resource) => `- ${resource.title}: ${resource.url}`)
      .join('\n');
    const sources = aiResponse.trustedSources
      .map((source) => `- ${source.publisher}: ${source.title} ${source.url}`)
      .join('\n');

    return [
      `DementiaAide search: ${activeQuery}`,
      '',
      urgentSection,
      `Understanding the situation: ${aiResponse.explanation}`,
      '',
      'Helpful tips:',
      tips,
      '',
      guides ? `Ana's related guides:\n${guides}` : '',
      sources ? `Trusted care references:\n${sources}` : '',
      '',
      aiResponse.disclaimer,
    ]
      .filter(Boolean)
      .join('\n');
  };

  const shareAssistantSummary = async () => {
    const summary = buildAssistantSummary();
    if (!summary || typeof navigator === 'undefined') return;

    if (navigator.share) {
      await navigator.share({
        title: `DementiaAide: ${activeQuery}`,
        text: summary,
      });
      return;
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(summary);
    }
  };

  const printAssistantSummary = () => {
    const summary = buildAssistantSummary();
    if (!summary || typeof window === 'undefined') return;

    const printWindow = window.open('', '_blank', 'noopener,noreferrer');
    if (!printWindow) {
      window.print();
      return;
    }

    const escapedSummary = summary
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>DementiaAide Search</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.5; margin: 32px; color: #111827; }
            h1 { font-size: 22px; margin-bottom: 16px; }
            pre { white-space: pre-wrap; font-family: inherit; }
          </style>
        </head>
        <body>
          <h1>DementiaAide Search Summary</h1>
          <pre>${escapedSummary}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

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
    setShowHelpfulTools(false);
    window.history.replaceState(null, '', '/');

    const finishIfCurrent = () => {
      if (searchRequestId.current === requestId) {
        window.history.replaceState(null, '', '/');
      }
    };

    searchYouTubeVideos(trimmedQuery)
      .then((videoResults) => {
        if (searchRequestId.current === requestId) {
          setVideos(videoResults);
        }
      })
      .catch((error) => {
        if (searchRequestId.current === requestId) {
          console.error('Error fetching video results:', error);
        }
      })
      .finally(() => {
        if (searchRequestId.current === requestId) {
          setLoading(false);
          finishIfCurrent();
        }
      });

    searchAmazonProducts(trimmedQuery)
      .then((amazonResults) => {
        if (searchRequestId.current === requestId) {
          setAmazonProducts(amazonResults);
        }
      })
      .catch((error) => {
        if (searchRequestId.current === requestId) {
          console.error('Error fetching product results:', error);
        }
      })
      .finally(() => {
        if (searchRequestId.current === requestId) {
          setAmazonLoading(false);
          finishIfCurrent();
        }
      });

    fetch('/api/ai/analyze', {
      method: 'POST',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: trimmedQuery }),
    })
      .then((res) => res.json())
      .then((aiAnalysis) => {
        if (searchRequestId.current === requestId) {
          setAiResponse(aiAnalysis);
        }
      })
      .catch((error) => {
        if (searchRequestId.current === requestId) {
          console.error('Error fetching assistant analysis:', error);
        }
      })
      .finally(() => {
        if (searchRequestId.current === requestId) {
          setAiLoading(false);
          finishIfCurrent();
        }
      });
  };

  return (
    <section className="bg-white">
      <div className="relative flex min-h-[62vh] items-center justify-center px-4 py-10 sm:py-12">
        <div className="relative w-full max-w-4xl space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Practical dementia care help, <span className="font-bold text-blue-600">right when you need it</span>
            </h1>
            <p className="mx-auto max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              Ask a real caregiving question and get plain-language next steps, Ana&apos;s related guides, and trusted care references.
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
              className="flex w-full min-w-0 select-text rounded-2xl border border-input bg-input-background px-5 py-5 pr-16 text-base shadow-lg outline-none transition-[color,box-shadow] placeholder:text-muted-foreground selection:bg-blue-600 selection:text-white focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:px-6 sm:py-6"
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
            <div className="space-y-6 text-center">
              <div>
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

              <div className="mx-auto max-w-3xl rounded-lg border border-blue-100 bg-blue-50/50 p-4">
                <p className="mb-3 text-sm font-medium text-blue-950">Or start with a care path</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {caregiverPaths.map((path) => (
                    <Button
                      key={path}
                      variant="outline"
                      className="rounded-full border-blue-200 bg-white text-sm text-blue-900 hover:bg-blue-50"
                      disabled={isSearchRunning}
                      onClick={() => runSearch(path)}
                    >
                      {path}
                    </Button>
                  ))}
                </div>
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
              <section className="rounded-2xl bg-white p-5 shadow-lg sm:p-8">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold sm:text-2xl">Care Guidance</h2>
                    <Badge variant="outline" className="bg-blue-50">
                      {aiResponse?.category || 'General'}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => void shareAssistantSummary()}
                      disabled={!aiResponse}
                      aria-label="Share assistant summary"
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={printAssistantSummary}
                      disabled={!aiResponse}
                      aria-label="Print assistant summary"
                    >
                      <Printer className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {aiLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center gap-3 text-blue-600">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span className="text-lg font-medium">Finding practical next steps...</span>
                    </div>
                  </div>
                ) : aiResponse ? (
                  <div className="space-y-6">
                    {aiResponse.urgentNotice && (
                      <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                        <h3 className="mb-2 text-lg font-semibold text-red-900">
                          {aiResponse.urgentNotice.title}
                        </h3>
                        <p className="mb-3 text-sm leading-6 text-red-900">
                          {aiResponse.urgentNotice.message}
                        </p>
                        <ul className="space-y-2">
                          {aiResponse.urgentNotice.actions.map((action, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-red-900">
                              <span className="font-semibold">•</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="prose max-w-none">
                      <p className="text-gray-700">{aiResponse.explanation}</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">What to Try First</h3>
                      <div className="grid gap-3 md:grid-cols-3">
                        {aiResponse.tips.slice(0, 3).map((tip, index) => (
                          <div key={tip} className="rounded-lg border border-blue-100 bg-blue-50/60 p-4">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-normal text-blue-700">
                              Step {index + 1}
                            </p>
                            <p className="text-sm leading-6 text-gray-800">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="flex items-center gap-2 text-lg font-semibold">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        Helpful Tips
                      </h3>
                      <ul className="space-y-2">
                        {aiResponse.tips.slice(3).map((tip) => (
                          <li key={tip} className="flex items-start gap-2">
                            <span className="font-medium text-blue-600">•</span>
                            <span className="text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {aiResponse.matchedResources.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Ana&apos;s Related Guides</h3>
                        <div className="grid gap-3 md:grid-cols-2">
                          {aiResponse.matchedResources.map((resource) => (
                            <a
                              key={resource.url}
                              href={resource.url}
                              target="_blank"
                              rel="noreferrer"
                              className="group rounded-lg border border-blue-100 bg-blue-50/60 p-4 transition hover:border-blue-200 hover:bg-blue-50"
                            >
                              <div className="mb-2 flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-xs font-medium text-blue-700">{resource.category}</p>
                                  <h4 className="text-sm font-semibold leading-5 text-gray-950 group-hover:text-blue-800">
                                    {resource.title}
                                  </h4>
                                </div>
                                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
                              </div>
                              <p className="text-sm leading-6 text-gray-600">{resource.summary}</p>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {aiResponse.trustedSources?.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Trusted Care References</h3>
                        <div className="grid gap-3 md:grid-cols-3">
                          {aiResponse.trustedSources.map((source) => (
                            <a
                              key={source.url}
                              href={source.url}
                              target="_blank"
                              rel="noreferrer"
                              className="group rounded-lg border border-gray-200 bg-gray-50 p-4 transition hover:border-blue-200 hover:bg-blue-50/60"
                            >
                              <div className="mb-2 flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-xs font-medium text-gray-500">{source.publisher}</p>
                                  <h4 className="text-sm font-semibold leading-5 text-gray-950 group-hover:text-blue-800">
                                    {source.title}
                                  </h4>
                                </div>
                                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
                              </div>
                              <p className="text-sm leading-6 text-gray-600">{source.summary}</p>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

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

                    <p className="rounded-lg bg-gray-50 p-3 text-xs leading-5 text-gray-500">
                      {aiResponse.disclaimer}
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    Enter a question above to get AI-powered assistance.
                  </div>
                )}
              </section>

              {(loading || videos.length > 0) && (
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
                      {videos.map((video) => <VideoCard key={video.id} video={video} />)}
                    </div>
                  )}
                </section>
              )}

              <section className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-950">Helpful Tools</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Product suggestions are optional and secondary to the care guidance above.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full rounded-lg bg-white sm:w-auto"
                    onClick={() => setShowHelpfulTools((current) => !current)}
                  >
                    {showHelpfulTools ? 'Hide tools' : 'Show tools'}
                  </Button>
                </div>

                {showHelpfulTools && (
                  <div className="mt-6">
                    <AmazonProducts
                      key={activeQuery}
                      products={amazonProducts}
                      loading={amazonLoading}
                      query={activeQuery}
                    />
                  </div>
                )}
              </section>

            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}
