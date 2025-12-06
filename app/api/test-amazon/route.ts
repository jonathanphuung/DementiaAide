/**
 * Test endpoint to debug Amazon product search
 * Visit: /api/test-amazon?q=memory to test
 */

import { NextRequest } from 'next/server';
import { searchAmazonProducts } from '@/lib/amazon';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || 'memory care';

  console.log('🧪 Testing Amazon search for:', query);
  
  try {
    const products = await searchAmazonProducts(query);
    
    return new Response(
      JSON.stringify({
        query,
        productCount: products.length,
        products: products.map(p => ({
          asin: p.asin,
          title: p.title,
          price: p.price
        })),
        timestamp: new Date().toISOString()
      }, null, 2),
      { 
        status: 200, 
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
        query,
        timestamp: new Date().toISOString()
      }, null, 2),
      { 
        status: 500, 
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}