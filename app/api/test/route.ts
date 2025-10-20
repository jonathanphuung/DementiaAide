import { NextResponse } from 'next/server';
import { testHuggingFace } from '@/lib/ai';

export async function GET() {
  try {
    const result = await testHuggingFace();
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Test API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}