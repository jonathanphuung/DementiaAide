import { NextRequest } from 'next/server';
import { analyzeCareQuery } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const analysis = await analyzeCareQuery(query);

    return new Response(
      JSON.stringify(analysis),
      { 
        status: 200, 
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'private, max-age=3600' // Cache for 1 hour
        }
      }
    );
  } catch (error) {
    console.error('Error in AI analysis:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to analyze query' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}