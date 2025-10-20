import { NextResponse } from 'next/server';
import { searchYouTubeVideos } from '@/lib/youtube';

export async function GET() {
  try {
    const apiKeys = process.env.NEXT_PUBLIC_YOUTUBE_API_KEYS?.split(',').map(key => key.trim()) || [];
    
    // Test response for each key
    const keyTests = await Promise.all(apiKeys.map(async (key) => {
      try {
        const testResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=test&type=video&maxResults=1&key=${key}`
        );
        
        const testData = await testResponse.json();
        
        return {
          key: key.substring(0, 5) + '...',
          valid: testResponse.ok,
          error: testResponse.ok ? null : testData.error?.message
        };
      } catch (error) {
        return {
          key: key.substring(0, 5) + '...',
          valid: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }));

    // Check if any keys are valid
    const hasValidKey = keyTests.some(test => test.valid);

    if (!hasValidKey) {
      return NextResponse.json({ 
        success: false,
        error: 'No valid API keys found',
        apiKeysConfigured: apiKeys.length > 0,
        keyTests
      });
    }

    // If we have valid keys, try our search function
    const videos = await searchYouTubeVideos('dementia care basics');
    return NextResponse.json({ 
      success: true, 
      videos,
      apiKeysConfigured: apiKeys.length > 0,
      keyTests
    });
  } catch (error) {
    console.error('YouTube API Test Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      apiKeyConfigured: !!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    });
  }
}