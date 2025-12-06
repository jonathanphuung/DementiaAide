/**
 * Debug endpoint to check Amazon SPP configuration
 * Visit: /api/amazon/debug to see current config status
 */

import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const config = {
    hasClientId: !!process.env.AMAZON_SPP_CLIENT_ID,
    hasSecretKey: !!process.env.AMAZON_SPP_SECRET_KEY,
    hasRefreshToken: !!process.env.AMAZON_SPP_REFRESH_TOKEN,
    hasMarketplaceId: !!process.env.AMAZON_MARKETPLACE_ID,
    hasAssociateTag: !!process.env.AMAZON_ASSOCIATE_TAG,
    clientIdLength: process.env.AMAZON_SPP_CLIENT_ID?.length || 0,
    secretLength: process.env.AMAZON_SPP_SECRET_KEY?.length || 0,
    tokenLength: process.env.AMAZON_SPP_REFRESH_TOKEN?.length || 0,
    marketplaceId: process.env.AMAZON_MARKETPLACE_ID,
    associateTag: process.env.AMAZON_ASSOCIATE_TAG
  };

  return new Response(
    JSON.stringify({
      message: 'Amazon SPP Configuration Status',
      config,
      allConfigured: config.hasClientId && config.hasSecretKey && config.hasRefreshToken,
      timestamp: new Date().toISOString()
    }, null, 2),
    { 
      status: 200, 
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}