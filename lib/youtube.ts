export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
}

// Cache structure to store results
const cache: { [key: string]: { videos: YouTubeVideo[]; timestamp: number } } = {};
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const MAX_RESULTS = 5; // Number of videos to fetch

// Predefined videos for common queries
const fallbackVideos: { [key: string]: YouTubeVideo[] } = {
  'general': [
    {
      id: 'HUNbiS7uHpI',
      title: 'Understanding Dementia: A Guide for Caregivers',
      description: 'Learn about the basics of dementia care and how to support your loved ones.',
      thumbnailUrl: 'https://i.ytimg.com/vi/HUNbiS7uHpI/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Association',
      publishedAt: '2023-01-01T00:00:00Z'
    },
    {
      id: 'wNYptduVHxk',
      title: 'Daily Care Tips for People with Dementia',
      description: 'Practical tips and strategies for daily dementia care.',
      thumbnailUrl: 'https://i.ytimg.com/vi/wNYptduVHxk/hqdefault.jpg',
      channelTitle: 'Dementia Care Tips',
      publishedAt: '2023-02-01T00:00:00Z'
    },
    {
      id: 'DfQ6sFrN_KE',
      title: 'Communication Strategies in Dementia Care',
      description: 'How to effectively communicate with someone who has dementia.',
      thumbnailUrl: 'https://i.ytimg.com/vi/DfQ6sFrN_KE/hqdefault.jpg',
      channelTitle: 'Caregiver Support',
      publishedAt: '2023-03-01T00:00:00Z'
    },
    {
      id: 'BPfq8xvCfEk',
      title: 'Managing Behavioral Changes in Dementia',
      description: 'Expert guidance on handling challenging behaviors and maintaining quality of life.',
      thumbnailUrl: 'https://i.ytimg.com/vi/BPfq8xvCfEk/hqdefault.jpg',
      channelTitle: 'Dementia Care Education',
      publishedAt: '2023-04-01T00:00:00Z'
    },
    {
      id: 'YQk5tL6pzk4',
      title: 'Creating a Safe Home Environment for Dementia Patients',
      description: 'Home safety tips and modifications for people living with dementia.',
      thumbnailUrl: 'https://i.ytimg.com/vi/YQk5tL6pzk4/hqdefault.jpg',
      channelTitle: 'Caregiver Resources',
      publishedAt: '2023-05-01T00:00:00Z'
    }
  ]
};

// Track API key usage and errors
interface KeyStatus {
  key: string;
  quotaExceeded: boolean;
  lastUsed: number;
  errorCount: number;
  lastReset: number;
}

// Keep track of API key statuses
const keyStatusMap = new Map<string, KeyStatus>();
const MAX_ERROR_COUNT = 3; // Number of errors before considering a key as failed
const ERROR_RESET_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

function getApiKeys(): string[] {
  const keysStr = process.env.NEXT_PUBLIC_YOUTUBE_API_KEYS;
  if (!keysStr) {
    console.error('No YouTube API keys configured');
    return [];
  }
  return keysStr.split(',').map(key => key.trim()).filter(key => key.length > 0);
}

function initializeKeyStatuses() {
  const apiKeys = getApiKeys();
  
  // Initialize status for new keys
  apiKeys.forEach(key => {
    if (!keyStatusMap.has(key)) {
      keyStatusMap.set(key, {
        key,
        quotaExceeded: false,
        lastUsed: 0,
        errorCount: 0,
        lastReset: Date.now()
      });
    }
  });

  // Remove any old keys that are no longer in the API keys list
  for (const [key] of keyStatusMap) {
    if (!apiKeys.includes(key)) {
      keyStatusMap.delete(key);
    }
  }
}

function getNextAvailableKey(): string | null {
  // Reset error counts if enough time has passed
  const now = Date.now();
  for (const status of keyStatusMap.values()) {
    if (now - status.lastReset > ERROR_RESET_TIME) {
      status.errorCount = 0;
      status.quotaExceeded = false;
      status.lastReset = now;
    }
  }

  // Find the next available key
  let bestKey: KeyStatus | null = null;
  for (const status of keyStatusMap.values()) {
    if (!status.quotaExceeded && status.errorCount < MAX_ERROR_COUNT) {
      if (!bestKey || status.lastUsed < bestKey.lastUsed) {
        bestKey = status;
      }
    }
  }

  return bestKey?.key || null;
}

function markKeyAsUsed(key: string) {
  const status = keyStatusMap.get(key);
  if (status) {
    status.lastUsed = Date.now();
    keyStatusMap.set(key, status);
  }
}

function markKeyAsQuotaExceeded(key: string) {
  const status = keyStatusMap.get(key);
  if (status) {
    status.quotaExceeded = true;
    status.errorCount += 1;
    keyStatusMap.set(key, status);
  }
}

export async function searchYouTubeVideos(query: string): Promise<YouTubeVideo[]> {
  initializeKeyStatuses();
  
  const apiKey = getNextAvailableKey();
  if (!apiKey) {
    console.error('No available YouTube API keys');
    return fallbackVideos.general;
  }

  const searchQuery = `dementia ${query}`.toLowerCase();
  
  // Check cache first
  if (cache[searchQuery] && Date.now() - cache[searchQuery].timestamp < CACHE_DURATION) {
    return cache[searchQuery].videos;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        searchQuery
      )}&type=video&maxResults=${MAX_RESULTS}&key=${apiKey}`
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('YouTube API Error:', error);
      
      // If quota exceeded, mark the key and try again with next key
      if (error?.error?.errors?.[0]?.reason === 'quotaExceeded') {
        markKeyAsQuotaExceeded(apiKey);
        
        // Try again with the next available key
        const nextKey = getNextAvailableKey();
        if (nextKey && nextKey !== apiKey) {
          const retryResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
              searchQuery
            )}&type=video&maxResults=${MAX_RESULTS}&key=${nextKey}`
          );
          
          if (retryResponse.ok) {
            markKeyAsUsed(nextKey);
            const retryData = await retryResponse.json();
            return retryData.items.map((item: any) => ({
              id: item.id.videoId,
              title: item.snippet.title,
              description: item.snippet.description,
              thumbnailUrl: item.snippet.thumbnails.high.url,
              channelTitle: item.snippet.channelTitle,
              publishedAt: item.snippet.publishedAt,
            }));
          }
        }
        
        return fallbackVideos.general;
      }
      throw new Error('YouTube API request failed');
    }
    
    // Mark the key as successfully used
    markKeyAsUsed(apiKey);

    const data = await response.json();
    const videos = data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
    }));

    // Cache the results
    cache[searchQuery] = {
      videos,
      timestamp: Date.now()
    };

    return videos;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return fallbackVideos.general;
  }
}