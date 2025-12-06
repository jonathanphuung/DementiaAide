import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Test the complete flow from query to rendered products
  const testQueries = [
    'refuses to eat',
    'memory problems', 
    'wandering at night',
    'medication reminder'
  ];

  const results = [];

  for (const query of testQueries) {
    try {
      // Call our own Amazon API
      const response = await fetch(`${request.nextUrl.origin}/api/amazon/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query,
          maxResults: 2
        })
      });
      
      const data = await response.json();
      
      results.push({
        query,
        status: response.ok ? 'success' : 'error',
        productCount: data.products?.length || 0,
        firstProduct: data.products?.[0] ? {
          title: data.products[0].title,
          price: data.products[0].price,
          image: data.products[0].image,
          imageLength: data.products[0].image?.length || 0,
          imageStartsWith: data.products[0].image?.substring(0, 50)
        } : null
      });
      
    } catch (error) {
      results.push({
        query,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  return NextResponse.json({
    message: 'Amazon Product Image Test Results',
    timestamp: new Date().toISOString(),
    results
  });
}