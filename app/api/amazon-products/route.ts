import { NextResponse } from 'next/server';
import { amazonApi } from '@/lib/amazon';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const category = searchParams.get('category') || undefined;
  const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
  const maxResults = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 10;

  if (!query) {
    return NextResponse.json(
      { error: 'Search query is required' },
      { status: 400 }
    );
  }

  try {
    const products = await amazonApi.searchProducts(query, {
      category,
      maxResults,
      minPrice,
      maxPrice,
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error searching Amazon products:', error);
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    );
  }
}