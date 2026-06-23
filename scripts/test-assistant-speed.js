const { performance } = require('node:perf_hooks');

const BASE_URL = process.env.ASSISTANT_TEST_URL || 'http://localhost:3001';
const RUNS_PER_QUERY = Number(process.env.ASSISTANT_SPEED_RUNS || 5);

const queries = [
  'my mom keeps wandering at night',
  'dad refuses to shower and gets scared of water',
  'my grandma keeps falling when she walks to the bathroom',
  'he will not take his pills anymore',
  'she suddenly got much more confused today could it be a UTI',
  'my husband keeps asking to go home even though we are home',
  'mom follows me everywhere and panics when I leave the room',
  'dad thinks someone stole his wallet',
  'is the stove safe for someone with dementia',
  'I am exhausted and need a break from caregiving',
  'my siblings fight with me and will not help with mom',
  'when should we think about hospice or a nursing home',
];

const endpoints = [
  {
    name: 'AI analyze',
    url: '/api/ai/analyze',
    body: (query) => ({ query }),
    budgetMs: 250,
  },
  {
    name: 'Product search',
    url: '/api/amazon/search',
    body: (query) => ({ query, category: 'HealthPersonalCare', maxResults: 6 }),
    budgetMs: 500,
  },
];

function percentile(values, p) {
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, Math.min(sorted.length - 1, index))];
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

async function postJson(url, body) {
  const startedAt = performance.now();
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const elapsedMs = performance.now() - startedAt;

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }

  await response.json();
  return elapsedMs;
}

async function measureEndpoint(endpoint) {
  const timings = [];

  for (const query of queries) {
    for (let run = 0; run < RUNS_PER_QUERY; run += 1) {
      timings.push(await postJson(endpoint.url, endpoint.body(query)));
    }
  }

  const stats = {
    count: timings.length,
    min: Math.min(...timings),
    avg: average(timings),
    p50: percentile(timings, 50),
    p95: percentile(timings, 95),
    max: Math.max(...timings),
  };

  const pass = stats.p95 <= endpoint.budgetMs;

  console.log(`${pass ? 'PASS' : 'FAIL'} ${endpoint.name}`);
  console.log(`  count: ${stats.count}`);
  console.log(`  min: ${stats.min.toFixed(1)}ms`);
  console.log(`  avg: ${stats.avg.toFixed(1)}ms`);
  console.log(`  p50: ${stats.p50.toFixed(1)}ms`);
  console.log(`  p95: ${stats.p95.toFixed(1)}ms`);
  console.log(`  max: ${stats.max.toFixed(1)}ms`);
  console.log(`  budget p95: ${endpoint.budgetMs}ms`);

  return { endpoint, stats, pass };
}

async function main() {
  const results = [];

  for (const endpoint of endpoints) {
    results.push(await measureEndpoint(endpoint));
  }

  const slow = results.filter((result) => !result.pass);
  if (slow.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
