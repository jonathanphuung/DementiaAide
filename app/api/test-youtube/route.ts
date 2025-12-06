import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Get all configured API keys
  const keysStr = process.env.NEXT_PUBLIC_YOUTUBE_API_KEYS;
  
  if (!keysStr) {
    return NextResponse.json({
      error: 'No YouTube API keys configured',
      message: 'Please set NEXT_PUBLIC_YOUTUBE_API_KEYS in your environment variables',
      example: 'NEXT_PUBLIC_YOUTUBE_API_KEYS=key1,key2,key3'
    }, { status: 400 });
  }

  const apiKeys = keysStr.split(',').map(key => key.trim()).filter(key => key.length > 0);
  
  // Test each key
  const keyTests = await Promise.all(
    apiKeys.map(async (key, index) => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=dementia%20care&type=video&maxResults=1&key=${key}`
        );
        
        const data = await response.json();
        
        if (response.ok) {
          return {
            keyIndex: index + 1,
            keyPrefix: key.substring(0, 8) + '...',
            status: 'working',
            quotaRemaining: response.headers.get('x-ratelimit-remaining') || 'unknown',
            message: 'API key is working properly'
          };
        } else {
          return {
            keyIndex: index + 1,
            keyPrefix: key.substring(0, 8) + '...',
            status: 'error',
            error: data.error?.message || 'Unknown error',
            reason: data.error?.errors?.[0]?.reason || 'unknown'
          };
        }
      } catch (error) {
        return {
          keyIndex: index + 1,
          keyPrefix: key.substring(0, 8) + '...',
          status: 'network_error',
          error: error instanceof Error ? error.message : 'Network error'
        };
      }
    })
  );

  const workingKeys = keyTests.filter(test => test.status === 'working').length;
  const totalKeys = apiKeys.length;

  return NextResponse.json({
    summary: {
      totalKeys,
      workingKeys,
      errorKeys: totalKeys - workingKeys,
      status: workingKeys > 0 ? 'healthy' : 'critical'
    },
    keyTests,
    tips: [
      'Each YouTube API key has a daily quota of 10,000 units',
      'A search request typically uses 100 units',
      'Quota resets at midnight Pacific Time',
      'You can get more keys from Google Cloud Console',
      'Keys should be comma-separated in NEXT_PUBLIC_YOUTUBE_API_KEYS'
    ]
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { testQuery = 'dementia care' } = body;
  
  // Test the YouTube search function with the current keys
  try {
    const { searchYouTubeVideos } = await import('@/lib/youtube');
    const results = await searchYouTubeVideos(testQuery);
    
    return NextResponse.json({
      success: true,
      query: testQuery,
      resultsCount: results.length,
      results: results.map(video => ({
        id: video.id,
        title: video.title,
        channel: video.channelTitle
      })),
      message: 'YouTube search test completed successfully'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'YouTube search test failed'
    }, { status: 500 });
  }
}