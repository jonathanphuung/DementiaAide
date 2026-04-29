import { NextRequest, NextResponse } from 'next/server';
import { createCart, getCart } from '@/lib/shopify/cart';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get('cartId');

    if (!cartId) {
      return NextResponse.json({ cart: null }, { status: 200 });
    }

    const cart = await getCart(cartId);
    return NextResponse.json({ cart }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch cart.' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const cart = await createCart();
    return NextResponse.json({ cart }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to create cart.' }, { status: 500 });
  }
}

