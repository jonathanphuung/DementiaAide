import fs from 'node:fs';
import path from 'node:path';

function loadDotEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const contents = fs.readFileSync(filePath, 'utf8');
  for (const rawLine of contents.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

function normalizeStoreDomain(storeDomainRaw) {
  return storeDomainRaw.replace('https://', '').replace('http://', '').replace(/\/$/, '');
}

async function storefrontFetch({ endpoint, token, query, variables }) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const text = await res.text();
  let payload;
  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error(`Non-JSON response (status ${res.status}): ${text.slice(0, 200)}`);
  }

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${JSON.stringify(payload).slice(0, 400)}`);
  }

  if (payload?.errors?.length) {
    throw new Error(`GraphQL errors: ${payload.errors[0]?.message || JSON.stringify(payload.errors[0])}`);
  }

  return payload?.data;
}

async function main() {
  const cwd = process.cwd();
  loadDotEnvFile(path.join(cwd, '.env.local'));
  loadDotEnvFile(path.join(cwd, '.env'));

  const storeDomain = normalizeStoreDomain(requiredEnv('SHOPIFY_STORE_URL'));
  const token = requiredEnv('SHOPIFY_STOREFRONT_ACCESS_TOKEN');
  const preferred = process.env.SHOPIFY_STOREFRONT_API_VERSION;
  const versionsToTry = [
    preferred,
    '2026-04',
    '2026-01',
    '2025-10',
    '2025-07',
  ].filter(Boolean);

  let lastError = null;
  let data = null;
  let apiVersion = null;

  for (const v of versionsToTry) {
    try {
      apiVersion = v;
      const endpoint = `https://${storeDomain}/api/${v}/graphql.json`;
      data = await storefrontFetch({
        endpoint,
        token,
        query: `
          query healthCheck {
            shop {
              name
              primaryDomain { url }
            }
          }
        `,
      });
      lastError = null;
      break;
    } catch (err) {
      lastError = err;
    }
  }

  if (!data || !apiVersion) {
    throw lastError || new Error('Unable to query Shopify Storefront API.');
  }

  const shop = data?.shop;
  if (!shop?.name) {
    throw new Error('Shop query succeeded but returned no shop name (unexpected).');
  }

  console.log('✅ Shopify Storefront API credentials OK');
  console.log(`- shop: ${shop.name}`);
  console.log(`- domain: ${storeDomain}`);
  if (shop?.primaryDomain?.url) console.log(`- primaryDomain: ${shop.primaryDomain.url}`);
  console.log(`- apiVersion: ${apiVersion}`);
}

main().catch((err) => {
  console.error('❌ Shopify Storefront API check failed');
  console.error(err?.message || err);
  process.exit(1);
});
