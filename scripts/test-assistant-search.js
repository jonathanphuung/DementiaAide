const BASE_URL = process.env.ASSISTANT_TEST_URL || 'http://localhost:3001';

const cases = [
  {
    query: 'my mom keeps wandering at night',
    category: 'Safety',
    resource: /wandering|sleep/i,
    source: /wandering|home safety|agitation/i,
  },
  {
    query: 'dad refuses to shower and gets scared of water',
    category: 'Daily Care',
    resource: /bathing|bathroom/i,
    source: /bathing/i,
  },
  {
    query: 'my grandma keeps falling when she walks to the bathroom',
    category: 'Safety',
    resource: /falls|bathroom|wandering/i,
    source: /home safety|caregiving/i,
  },
  {
    query: 'he will not take his pills anymore',
    category: 'Health',
    resource: /medication/i,
    source: /caregiving|daily care/i,
  },
  {
    query: 'she suddenly got much more confused today could it be a UTI',
    category: 'Health',
    resource: /infection|blood tests|er visits/i,
    source: /caregiving|home safety/i,
  },
  {
    query: 'my husband keeps asking to go home even though we are home',
    category: 'Communication',
    resource: /communication|anxiety|repeating|connected/i,
    source: /communicating|behavior/i,
  },
  {
    query: 'mom follows me everywhere and panics when I leave the room',
    category: 'Behavior',
    resource: /anxiety|caregiver|overwhelmed|activities/i,
    source: /behavior|communicating|daily care/i,
  },
  {
    query: 'dad thinks someone stole his wallet',
    category: 'Behavior',
    resource: /accusations|scams|financial/i,
    source: /behavior|home safety|communicating/i,
  },
  {
    query: 'is the stove safe for someone with dementia',
    category: 'Safety',
    resource: /kitchen|safety/i,
    source: /home safety/i,
  },
  {
    query: 'I am exhausted and need a break from caregiving',
    category: 'General',
    resource: /burnout|respite|overwhelmed|asking for help/i,
    source: /caregiving|caregivers/i,
  },
  {
    query: 'my siblings fight with me and will not help with mom',
    category: 'General',
    resource: /family conflict|asking for help|guilt/i,
    source: /caregiving|caregivers/i,
  },
  {
    query: 'when should we think about hospice or a nursing home',
    category: 'General',
    resource: /hospice|care home|assisted living|hiring help/i,
    source: /caregiving|caregivers/i,
  },
  {
    query: 'she has sudden confusion and slurred speech',
    category: 'Health',
    resource: /infection|blood tests|er visits/i,
    source: /stroke|hospital|caregiving/i,
    urgent: /medical emergency|911|stroke/i,
  },
  {
    query: 'dad wandered away and we cannot find him',
    category: 'Safety',
    resource: /wandering/i,
    source: /wandering|home safety/i,
    urgent: /wandering emergency|911|missing/i,
  },
  {
    query: 'he attacked me and will not calm down',
    category: 'Behavior',
    resource: /anger|behavior|hallucinations/i,
    source: /agitation|behavior|caregiving/i,
    urgent: /safety risk|911|danger/i,
  },
  {
    query: 'mom took too many pills by accident',
    category: 'Health',
    resource: /medication/i,
    source: /hospital|caregiving|home safety/i,
    urgent: /poison|911|medication/i,
  },
  {
    query: 'dad left the stove on and there is smoke',
    category: 'Safety',
    resource: /kitchen|safety/i,
    source: /home safety|hospital/i,
    urgent: /home safety emergency|fire|smoke/i,
  },
  {
    query: 'grandma fell and hit her head',
    category: 'Safety',
    resource: /falls|bathroom|wandering/i,
    source: /hospital|home safety/i,
    urgent: /fall|injury|911/i,
  },
];

function assertMatch(pattern, values) {
  return values.some((value) => pattern.test(value));
}

async function analyze(query) {
  const response = await fetch(`${BASE_URL}/api/ai/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }

  return response.json();
}

async function main() {
  const failures = [];

  for (const testCase of cases) {
    try {
      const result = await analyze(testCase.query);
      const resourceText = (result.matchedResources || [])
        .map((resource) => `${resource.title} ${resource.summary} ${resource.category}`)
        .join(' ');
      const sourceText = (result.trustedSources || [])
        .map((source) => `${source.title} ${source.publisher} ${source.summary}`)
        .join(' ');

      const checks = [
        {
          name: 'category',
          pass: result.category === testCase.category,
          details: `expected ${testCase.category}, got ${result.category}`,
        },
        {
          name: 'tips',
          pass: Array.isArray(result.tips) && result.tips.length >= 5,
          details: `expected at least 5 tips, got ${result.tips?.length || 0}`,
        },
        {
          name: 'Ana resources',
          pass: Array.isArray(result.matchedResources) && result.matchedResources.length > 0 && testCase.resource.test(resourceText),
          details: `unexpected resources: ${(result.matchedResources || []).map((resource) => resource.title).join(', ')}`,
        },
        {
          name: 'trusted sources',
          pass: Array.isArray(result.trustedSources) && result.trustedSources.length > 0 && testCase.source.test(sourceText),
          details: `unexpected sources: ${(result.trustedSources || []).map((source) => source.title).join(', ')}`,
        },
        {
          name: 'disclaimer',
          pass: typeof result.disclaimer === 'string' && result.disclaimer.length > 40,
          details: 'missing standard disclaimer',
        },
      ];

      if (testCase.urgent) {
        const urgentText = [
          result.urgentNotice?.title,
          result.urgentNotice?.message,
          ...(result.urgentNotice?.actions || []),
        ]
          .filter(Boolean)
          .join(' ');
        checks.push({
          name: 'urgent notice',
          pass: testCase.urgent.test(urgentText),
          details: `unexpected urgent notice: ${urgentText || 'none'}`,
        });
      }

      const failedChecks = checks.filter((check) => !check.pass);
      if (failedChecks.length > 0) {
        failures.push({ query: testCase.query, failedChecks });
        console.log(`FAIL ${testCase.query}`);
        for (const check of failedChecks) {
          console.log(`  - ${check.name}: ${check.details}`);
        }
      } else {
        console.log(`PASS ${testCase.query}`);
      }
    } catch (error) {
      failures.push({ query: testCase.query, failedChecks: [{ name: 'request', details: error.message }] });
      console.log(`FAIL ${testCase.query}`);
      console.log(`  - request: ${error.message}`);
    }
  }

  console.log(`\n${cases.length - failures.length}/${cases.length} assistant cases passed`);

  if (failures.length > 0) {
    process.exit(1);
  }
}

main();
