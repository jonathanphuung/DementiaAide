'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  BookOpen,
  ExternalLink,
  Loader2,
  Printer,
  Search,
  ShieldCheck,
  Share2,
} from 'lucide-react';
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

  const stepTips = aiResponse ? aiResponse.tips.slice(0, 3) : [];
  const moreTips = aiResponse ? aiResponse.tips.slice(3) : [];
  const contentsIndex = aiResponse
    ? [
        stepTips.length > 0 ? `${stepTips.length} step${stepTips.length === 1 ? '' : 's'}` : null,
        moreTips.length > 0 ? `${moreTips.length} more tip${moreTips.length === 1 ? '' : 's'}` : null,
        aiResponse.matchedResources.length > 0
          ? `${aiResponse.matchedResources.length} guide${aiResponse.matchedResources.length === 1 ? '' : 's'}`
          : null,
        aiResponse.trustedSources?.length > 0
          ? `${aiResponse.trustedSources.length} source${aiResponse.trustedSources.length === 1 ? '' : 's'}`
          : null,
      ].filter(Boolean)
    : [];

  return (
    <section className="bg-background">
      <div className="relative flex min-h-[62vh] items-center justify-center px-4 py-6 sm:py-16">
        <div className="relative w-full max-w-4xl space-y-8">
          <div className="rounded-lg border-2 border-foreground/15 bg-card p-4 shadow-sm sm:p-10">
            <div className="space-y-2 text-center sm:space-y-4">
              <h1 className="font-display text-3xl font-extrabold leading-tight text-foreground md:text-5xl">
                Dementia care help, <span className="text-primary">right when you need it</span>
              </h1>
              <p className="mx-auto max-w-2xl text-sm leading-6 text-muted-foreground sm:text-lg sm:leading-7">
                Ask a real caregiving question and get plain-language next steps, Ana Garcia&apos;s related guides, and trusted care references.
              </p>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                runSearch(draftQuery);
              }}
              className="relative mx-auto mt-4 flex max-w-2xl items-stretch gap-3 sm:mt-8"
            >
              <label htmlFor="care-question" className="sr-only">
                What do you need help with?
              </label>
              <input
                id="care-question"
                type="text"
                placeholder="What do you need help with? (e.g., 'loved one wants to drive')"
                className="min-w-0 flex-1 select-text rounded-md border-2 border-foreground/25 bg-input-background px-5 py-4 text-base text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-ring/30 sm:py-5 sm:text-lg"
                value={draftQuery}
                autoComplete="off"
                onChange={(e) => setDraftQuery(e.target.value)}
              />
              <Button
                type="submit"
                className="h-auto w-16 shrink-0 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 sm:w-20"
                disabled={isSearchRunning}
                aria-label="Search"
              >
                {isSearchRunning ? (
                  <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
                ) : (
                  <Search className="h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </form>

            {!activeQuery && (
              <div className="mt-4 space-y-4 sm:mt-8 sm:space-y-6">
                <div>
                  <p className="mb-2 text-center font-display text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground sm:mb-3">
                    Popular searches
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {popularSearches.map((term, index) => (
                      <button
                        key={term}
                        type="button"
                        disabled={isSearchRunning}
                        onClick={() => runSearch(term)}
                        className="flex items-center gap-2 rounded-md border-2 border-foreground/15 bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-teal-tint disabled:opacity-50"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-primary font-display text-[10px] font-bold tabular-nums text-primary-foreground">
                          {index + 1}
                        </span>
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mx-auto max-w-3xl rounded-md border-2 border-foreground/15 bg-secondary/40 p-3 sm:p-4">
                  <p className="mb-2 text-center font-display text-xs font-bold uppercase tracking-[0.15em] text-foreground sm:mb-3">
                    Or start with a care path
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {caregiverPaths.map((path, index) => (
                      <button
                        key={path}
                        type="button"
                        disabled={isSearchRunning}
                        onClick={() => runSearch(path)}
                        className="flex items-center gap-2 rounded-md border-2 border-foreground/15 bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-teal-tint disabled:opacity-50"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-primary font-display text-[10px] font-bold tabular-nums text-primary-foreground">
                          {index + 1}
                        </span>
                        {path}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {activeQuery && (
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {loading && aiLoading && amazonLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                className="py-12 text-center"
              >
                <div className="mb-4 flex items-center justify-center gap-3 text-primary">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="font-display text-lg font-bold">Searching for helpful information&hellip;</span>
                </div>
                <p className="text-muted-foreground">We&apos;re gathering care guidance, videos, and product recommendations for you</p>
              </motion.div>
            )}

            <motion.div
              key={activeQuery}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="space-y-12"
            >
              <section className="overflow-hidden rounded-lg border-2 border-foreground/15 bg-card shadow-sm">
                <div className="flex flex-col gap-4 border-b-2 border-foreground/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-xl font-extrabold text-foreground sm:text-2xl">Care Guidance</h2>
                    <Badge variant="outline" className="border-primary/30 bg-teal-tint font-display text-xs font-bold uppercase tracking-wide text-primary">
                      {aiResponse?.category || 'General'}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-2 border-foreground/20"
                      onClick={() => void shareAssistantSummary()}
                      disabled={!aiResponse}
                      aria-label="Share assistant summary"
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-2 border-foreground/20"
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
                    <div className="flex items-center gap-3 text-primary">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span className="text-lg font-medium">Finding practical next steps&hellip;</span>
                    </div>
                  </div>
                ) : aiResponse ? (
                  <div className="space-y-8 p-5 sm:p-8">
                    {contentsIndex.length > 0 && (
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md bg-secondary/50 px-4 py-3 font-display text-xs font-bold uppercase tracking-wide tabular-nums text-foreground">
                        <span className="text-muted-foreground">In this answer:</span>
                        {contentsIndex.map((item, index) => (
                          <span key={item} className="flex items-center gap-2">
                            {index > 0 && <span aria-hidden="true" className="text-muted-foreground">&middot;</span>}
                            {item}
                          </span>
                        ))}
                      </div>
                    )}

                    {aiResponse.urgentNotice && (
                      <div className="overflow-hidden rounded-md border-2 border-crimson-border bg-crimson-tint">
                        <div className="flex items-center gap-2 bg-crimson px-5 py-2">
                          <AlertTriangle className="h-4 w-4 text-white" aria-hidden="true" />
                          <span className="font-display text-xs font-extrabold uppercase tracking-[0.15em] text-white">Urgent</span>
                        </div>
                        <div className="p-5">
                          <h3 className="mb-2 font-display text-lg font-bold text-crimson">
                            {aiResponse.urgentNotice.title}
                          </h3>
                          <p className="mb-3 text-sm leading-6 text-foreground">
                            {aiResponse.urgentNotice.message}
                          </p>
                          <ul className="space-y-2">
                            {aiResponse.urgentNotice.actions.map((action, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                                <span className="mt-0.5 font-bold text-crimson">&bull;</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    <p className="text-base leading-7 text-foreground">{aiResponse.explanation}</p>

                    {stepTips.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="font-display text-base font-extrabold uppercase tracking-wide text-foreground">What to Try First</h3>
                        <div className="grid gap-3 md:grid-cols-3">
                          {stepTips.map((tip, index) => (
                            <div key={tip} className="rounded-md border-2 border-teal-border bg-teal-tint p-4">
                              <p className="mb-2 flex items-center gap-2 font-display text-xs font-extrabold uppercase tracking-wide tabular-nums text-primary">
                                <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary text-[10px] tabular-nums text-primary-foreground">
                                  {index + 1}
                                </span>
                                Step {index + 1}
                              </p>
                              <p className="text-sm leading-6 text-foreground">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {moreTips.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="font-display text-base font-extrabold uppercase tracking-wide text-foreground">Helpful Tips</h3>
                        <ul className="space-y-2">
                          {moreTips.map((tip) => (
                            <li key={tip} className="flex items-start gap-2">
                              <span className="mt-0.5 font-bold text-primary">&bull;</span>
                              <span className="text-foreground">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {aiResponse.matchedResources.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="flex items-center gap-2 font-display text-base font-extrabold uppercase tracking-wide text-foreground">
                          <BookOpen className="h-4 w-4 text-primary" aria-hidden="true" />
                          Ana Garcia&apos;s Related Guides
                        </h3>
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
                              <span className="inline-block rounded-sm bg-teal-border/40 px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wide text-primary">
                                {resource.category}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {aiResponse.trustedSources?.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="flex items-center gap-2 font-display text-base font-extrabold uppercase tracking-wide text-foreground">
                          <ShieldCheck className="h-4 w-4 text-sage" aria-hidden="true" />
                          Trusted Care References
                        </h3>
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
                              <span className="inline-block rounded-sm bg-sage-border/40 px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wide text-sage">
                                {source.publisher}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {aiResponse.relatedTopics.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="font-display text-base font-extrabold uppercase tracking-wide text-foreground">Related Topics</h3>
                        <div className="flex flex-wrap gap-2">
                          {aiResponse.relatedTopics.map((topic, index) => (
                            <Badge key={index} variant="secondary" className="text-xs font-medium">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="rounded-md border border-foreground/10 bg-muted p-3 text-xs leading-5 text-muted-foreground">
                      {aiResponse.disclaimer}
                    </p>
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    Enter a question above to get practical guidance.
                  </div>
                )}
              </section>

              {(loading || videos.length > 0) && (
                <section>
                  <h2 className="mb-6 font-display text-2xl font-extrabold text-foreground">Videos For You</h2>
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="flex items-center gap-3 text-primary">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span className="text-lg font-medium">Finding helpful videos&hellip;</span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
                      {videos.map((video) => <VideoCard key={video.id} video={video} />)}
                    </div>
                  )}
                </section>
              )}

              <section className="rounded-lg border-2 border-foreground/15 bg-secondary/30 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-display text-xl font-extrabold text-foreground">Helpful Tools</h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Product suggestions are optional and secondary to the care guidance above.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full rounded-md border-2 border-foreground/20 bg-card sm:w-auto"
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
