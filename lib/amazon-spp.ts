/**
 * Amazon SPP (Seller Partner Program) Integration
 * Production-ready implementation for DementiaAide
 */

import crypto from 'crypto';

interface SPPCredentials {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  marketplaceId: string;
}

interface SPPTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SPPSearchParams {
  keywords: string[];
  marketplaceIds: string[];
  includedData?: string[];
  pageSize?: number;
}

class AmazonSPPClient {
  private credentials: SPPCredentials;
  private baseUrl = 'https://sellingpartnerapi-na.amazon.com';
  private tokenCache: { token: string; expiresAt: number } | null = null;

  constructor(credentials: SPPCredentials) {
    this.credentials = credentials;
  }

  /**
   * Get access token using refresh token
   */
  private async getAccessToken(): Promise<string> {
    // Check cache first
    if (this.tokenCache && Date.now() < this.tokenCache.expiresAt) {
      return this.tokenCache.token;
    }

    const tokenUrl = 'https://api.amazon.com/auth/o2/token';
    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: this.credentials.refreshToken,
      client_id: this.credentials.clientId,
      client_secret: this.credentials.clientSecret
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.status}`);
    }

    const tokenData: SPPTokenResponse = await response.json();
    
    // Cache token with buffer time
    this.tokenCache = {
      token: tokenData.access_token,
      expiresAt: Date.now() + (tokenData.expires_in - 60) * 1000
    };

    return tokenData.access_token;
  }

  /**
   * Create AWS4 signature for SPP API requests
   */
  private createSignature(method: string, path: string, queryString: string, headers: Record<string, string>): string {
    const algorithm = 'AWS4-HMAC-SHA256';
    const service = 'execute-api';
    const region = 'us-east-1';
    
    const timestamp = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
    const date = timestamp.substr(0, 8);
    
    // Create canonical request
    const canonicalHeaders = Object.keys(headers)
      .sort()
      .map(key => `${key.toLowerCase()}:${headers[key]}\n`)
      .join('');
    
    const signedHeaders = Object.keys(headers)
      .sort()
      .map(key => key.toLowerCase())
      .join(';');

    const canonicalRequest = [
      method,
      path,
      queryString,
      canonicalHeaders,
      signedHeaders,
      crypto.createHash('sha256').update('').digest('hex') // Empty payload
    ].join('\n');

    // Create string to sign
    const scope = `${date}/${region}/${service}/aws4_request`;
    const stringToSign = [
      algorithm,
      timestamp,
      scope,
      crypto.createHash('sha256').update(canonicalRequest).digest('hex')
    ].join('\n');

    // Calculate signature
    const dateKey = crypto.createHmac('sha256', `AWS4${this.credentials.clientSecret}`).update(date).digest();
    const regionKey = crypto.createHmac('sha256', dateKey).update(region).digest();
    const serviceKey = crypto.createHmac('sha256', regionKey).update(service).digest();
    const signingKey = crypto.createHmac('sha256', serviceKey).update('aws4_request').digest();
    
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
    
    return `${algorithm} Credential=${this.credentials.clientId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  }

  /**
   * Search catalog items
   */
  async searchCatalogItems(params: SPPSearchParams): Promise<any> {
    const accessToken = await this.getAccessToken();
    
    const queryParams = new URLSearchParams({
      keywords: params.keywords.join(','),
      marketplaceIds: params.marketplaceIds.join(','),
      includedData: (params.includedData || ['summaries', 'images']).join(','),
      pageSize: String(params.pageSize || 10)
    });

    const path = '/catalog/2022-04-01/items';
    const queryString = queryParams.toString();
    
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'x-amz-access-token': accessToken,
      'Content-Type': 'application/json',
      'User-Agent': 'DementiaAide/1.0'
    };

    const url = `${this.baseUrl}${path}?${queryString}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`SPP API request failed: ${response.status} - ${errorText}`);
    }

    return response.json();
  }
}

/**
 * Initialize SPP client with environment credentials
 */
export function createSPPClient(): AmazonSPPClient | null {
  if (!process.env.AMAZON_SPP_CLIENT_ID || 
      !process.env.AMAZON_SPP_SECRET_KEY || 
      !process.env.AMAZON_SPP_REFRESH_TOKEN ||
      !process.env.AMAZON_MARKETPLACE_ID) {
    return null;
  }

  return new AmazonSPPClient({
    clientId: process.env.AMAZON_SPP_CLIENT_ID,
    clientSecret: process.env.AMAZON_SPP_SECRET_KEY,
    refreshToken: process.env.AMAZON_SPP_REFRESH_TOKEN,
    marketplaceId: process.env.AMAZON_MARKETPLACE_ID
  });
}

/**
 * Search products using SPP API
 */
export async function searchProductsSPP(query: string): Promise<any[]> {
  const client = createSPPClient();
  
  if (!client) {
    throw new Error('SPP credentials not configured');
  }

  const searchParams: SPPSearchParams = {
    keywords: [query],
    marketplaceIds: [process.env.AMAZON_MARKETPLACE_ID!],
    includedData: ['summaries', 'attributes', 'images', 'salesRanks'],
    pageSize: 10
  };

  try {
    const result = await client.searchCatalogItems(searchParams);
    return result.items || [];
  } catch (error) {
    console.error('SPP search failed:', error);
    throw error;
  }
}