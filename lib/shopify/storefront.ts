type ShopifyStorefrontError = {
  message: string;
  extensions?: unknown;
};

type ShopifyStorefrontResponse<T> = {
  data?: T;
  errors?: ShopifyStorefrontError[];
};

export function getShopifyStorefrontConfig() {
  const storeDomainRaw = process.env.SHOPIFY_STORE_URL;
  const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2025-10';

  if (!storeDomainRaw || !storefrontToken) {
    throw new Error(
      'Shopify Storefront API is not configured. Missing SHOPIFY_STORE_URL or SHOPIFY_STOREFRONT_ACCESS_TOKEN.'
    );
  }

  const storeDomain = storeDomainRaw
    .replace('https://', '')
    .replace('http://', '')
    .replace(/\/$/, '');

  return {
    endpoint: `https://${storeDomain}/api/${apiVersion}/graphql.json`,
    storefrontToken,
  };
}

export async function shopifyStorefrontFetch<T>({
  query,
  variables,
  cache,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
}): Promise<T> {
  const { endpoint, storefrontToken } = getShopifyStorefrontConfig();

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
    cache,
  });

  if (!res.ok) {
    throw new Error(`Shopify Storefront request failed with status ${res.status}.`);
  }

  const payload = (await res.json()) as ShopifyStorefrontResponse<T>;
  if (payload.errors?.length) {
    throw new Error(payload.errors[0]?.message || 'Shopify Storefront request failed.');
  }

  if (!payload.data) {
    throw new Error('Shopify Storefront response missing data.');
  }

  return payload.data;
}
