import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Stripe only if the secret key is available
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-01-28.clover',
    })
  : null;

type CheckoutItem = {
  title: string;
  price: number;
  quantity: number;
  images?: string[];
  description?: string;
  shopifyVariantId?: string;
};

async function createShopifyCheckoutUrl(items: CheckoutItem[]): Promise<string> {
  const storeDomainRaw = process.env.SHOPIFY_STORE_URL;
  const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!storeDomainRaw || !storefrontToken) {
    throw new Error('Shop Pay is not configured. Missing SHOPIFY_STORE_URL or SHOPIFY_STOREFRONT_ACCESS_TOKEN.');
  }
  const storeDomain = storeDomainRaw
    .replace('https://', '')
    .replace('http://', '')
    .replace(/\/$/, '');

  const invalidItems = items.filter((item) => !item.shopifyVariantId);
  if (invalidItems.length > 0) {
    throw new Error('Some cart items are not connected to Shopify variants yet. Please map product variants before using Shop Pay.');
  }

  const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2025-10';
  const endpoint = `https://${storeDomain}/api/${apiVersion}/graphql.json`;
  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: items.map((item) => ({
        quantity: item.quantity,
        merchandiseId: item.shopifyVariantId,
      })),
    },
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontToken,
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify checkout request failed with status ${response.status}.`);
  }

  const payload = await response.json();
  const userErrors = payload?.data?.cartCreate?.userErrors ?? [];
  if (userErrors.length > 0) {
    throw new Error(userErrors[0]?.message || 'Failed to create Shopify cart.');
  }

  const checkoutUrl = payload?.data?.cartCreate?.cart?.checkoutUrl;
  if (!checkoutUrl) {
    throw new Error('Shopify did not return a checkout URL.');
  }

  return checkoutUrl;
}

export async function POST(request: NextRequest) {
  try {
    const { items, shippingAddress, billingAddress, paymentMethod } = await request.json();
    const selectedPaymentMethod = paymentMethod || 'stripe';

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No checkout items provided' }, { status: 400 });
    }

    if (selectedPaymentMethod === 'shop_pay') {
      const checkoutUrl = await createShopifyCheckoutUrl(items);
      return NextResponse.json({ provider: 'shopify', url: checkoutUrl });
    }

    // Stripe fallback/default path
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Configure STRIPE_SECRET_KEY or choose Shop Pay.' },
        { status: 503 }
      );
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity), 0
    );

    // Create Stripe checkout session with multiple payment methods
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [
        'card',
      ],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            description: item.description,
            images: item.images || [],
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'], // Add countries as needed
      },
      metadata: {
        shippingAddress: JSON.stringify(shippingAddress),
        billingAddress: JSON.stringify(billingAddress),
      },
      // Shipping options
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 599, // $5.99 standard shipping
              currency: 'usd',
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1299, // $12.99 express shipping
              currency: 'usd',
            },
            display_name: 'Express Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 3,
              },
            },
          },
        },
      ],
    });

    return NextResponse.json({ provider: 'stripe', sessionId: session.id, url: session.url });

  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

// Note: Webhook handler moved to separate /api/webhooks/stripe route for proper routing

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  // TODO: Implement order creation in your database
  // 1. Create order record
  // 2. Update inventory
  // 3. Send confirmation email
  // 4. Trigger fulfillment process
  
  console.log('Processing successful payment:', {
    sessionId: session.id,
    customerEmail: session.customer_details?.email,
    totalAmount: session.amount_total,
    currency: session.currency,
  });
}
