import { NextRequest, NextResponse } from 'next/server';
import { addLines, removeLines, updateLines } from '@/lib/shopify/cart';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const action = body?.action as string | undefined;

    if (action === 'add') {
      const cartId = body?.cartId as string | undefined;
      const merchandiseId = body?.merchandiseId as string | undefined;
      const quantity = Number(body?.quantity ?? 1);

      if (!cartId || !merchandiseId || !Number.isFinite(quantity) || quantity <= 0) {
        return NextResponse.json({ error: 'Invalid add request.' }, { status: 400 });
      }

      const cart = await addLines(cartId, [{ merchandiseId, quantity }]);
      return NextResponse.json({ cart }, { status: 200 });
    }

    if (action === 'update') {
      const cartId = body?.cartId as string | undefined;
      const lineId = body?.lineId as string | undefined;
      const quantity = Number(body?.quantity ?? 0);

      if (!cartId || !lineId || !Number.isFinite(quantity) || quantity < 0) {
        return NextResponse.json({ error: 'Invalid update request.' }, { status: 400 });
      }

      const cart = await updateLines(cartId, [{ id: lineId, quantity }]);
      return NextResponse.json({ cart }, { status: 200 });
    }

    if (action === 'remove') {
      const cartId = body?.cartId as string | undefined;
      const lineIds = body?.lineIds as string[] | undefined;

      if (!cartId || !Array.isArray(lineIds) || lineIds.length === 0) {
        return NextResponse.json({ error: 'Invalid remove request.' }, { status: 400 });
      }

      const cart = await removeLines(cartId, lineIds);
      return NextResponse.json({ cart }, { status: 200 });
    }

    return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Cart line mutation failed.' }, { status: 500 });
  }
}

