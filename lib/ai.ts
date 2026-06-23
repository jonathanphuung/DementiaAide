import { getResourceUrl, resources, type Resource } from './resources';

export interface AIResourceRecommendation {
  title: string;
  summary: string;
  category: string;
  url: string;
}

export interface AITrustedSource {
  title: string;
  publisher: string;
  summary: string;
  url: string;
}

export interface AICareResponse {
  explanation: string;
  tips: string[];
  searchSuggestions: string[];
  relatedTopics: string[];
  category: 'Behavior' | 'Safety' | 'Daily Care' | 'Communication' | 'Activities' | 'Health' | 'General';
  matchedResources: AIResourceRecommendation[];
  trustedSources: AITrustedSource[];
  urgentNotice?: {
    title: string;
    message: string;
    actions: string[];
  };
  disclaimer: string;
}

const trustedCareSources: Record<string, AITrustedSource> = {
  alzCaregiving: {
    title: 'Caregiving',
    publisher: "Alzheimer's Association",
    summary: 'Caregiving basics, planning, safety, communication, behavior, and daily care support.',
    url: 'https://www.alz.org/help-support/caregiving',
  },
  niaCaregiving: {
    title: "Alzheimer's Caregiving",
    publisher: 'National Institute on Aging',
    summary: 'Federal guidance on daily care, behavior changes, safety, caregiver health, and medical planning.',
    url: 'https://www.nia.nih.gov/health/alzheimers-caregiving',
  },
  alzheimersGovTips: {
    title: 'Tips for Caregivers and Families',
    publisher: 'Alzheimers.gov',
    summary: 'Practical caregiver tips for routines, appointments, home organization, and day-to-day support.',
    url: 'https://www.alzheimers.gov/life-with-dementia/tips-caregivers',
  },
  communication: {
    title: 'Communicating With Someone Who Has Alzheimer’s',
    publisher: 'National Institute on Aging',
    summary: 'How to speak, listen, give time, and reduce frustration as communication changes.',
    url: 'https://www.nia.nih.gov/health/alzheimers-changes-behavior-and-communication/communicating-someone-who-has-alzheimers',
  },
  behavior: {
    title: 'Managing Personality and Behavior Changes',
    publisher: 'National Institute on Aging',
    summary: 'Ways to respond to behavior changes by looking for triggers and unmet needs.',
    url: 'https://www.nia.nih.gov/health/alzheimers-changes-behavior-and-communication/alzheimers-caregiving-managing-personality-and',
  },
  agitation: {
    title: 'Coping With Agitation, Aggression, and Sundowning',
    publisher: 'National Institute on Aging',
    summary: 'Guidance for staying calm, reducing triggers, and responding to late-day agitation.',
    url: 'https://www.nia.nih.gov/health/alzheimers-changes-behavior-and-communication/coping-agitation-aggression-and-sundowning',
  },
  wandering: {
    title: 'Wandering',
    publisher: "Alzheimer's Association",
    summary: 'Risk signs and safety steps for wandering, getting lost, door safety, and alert planning.',
    url: 'https://www.alz.org/help-support/caregiving/stages-behaviors/wandering',
  },
  bathing: {
    title: 'Bathing',
    publisher: "Alzheimer's Association",
    summary: 'Practical bathing support that protects comfort, warmth, privacy, and dignity.',
    url: 'https://www.alz.org/help-support/caregiving/daily-care/bathing',
  },
  homeSafety: {
    title: 'Home Safety',
    publisher: "Alzheimer's Association",
    summary: 'Room-by-room safety ideas for judgment changes, falls, exits, kitchen risks, and emergencies.',
    url: 'https://www.alz.org/help-support/caregiving/safety/home-safety',
  },
  dailyPlan: {
    title: 'Daily Care Plan',
    publisher: "Alzheimer's Association",
    summary: 'How structured routines and pleasant activities can support mood, engagement, and predictability.',
    url: 'https://www.alz.org/help-support/caregiving/daily-care/daily-care-plan',
  },
  strokeSigns: {
    title: 'Signs and Symptoms of Stroke',
    publisher: 'CDC',
    summary: 'Stroke warning signs include sudden weakness, speech trouble, vision changes, severe headache, confusion, dizziness, or loss of balance. Call 911 right away.',
    url: 'https://www.cdc.gov/stroke/signs-symptoms/index.html',
  },
  hospital: {
    title: "Taking a Person With Alzheimer's Disease to the Hospital",
    publisher: 'National Institute on Aging',
    summary: 'How to prepare for urgent hospital care and reduce confusion during emergency visits.',
    url: 'https://www.nia.nih.gov/health/alzheimers-caregiving/taking-person-alzheimers-disease-hospital',
  },
};

const STANDARD_DISCLAIMER =
  'This assistant offers general dementia-care education and practical support. It is not a medical diagnosis, treatment plan, or substitute for professional care.';

function tokenize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 2);
}

function expandQueryTokens(tokens: string[]) {
  const synonyms: Record<string, string[]> = {
    shower: ['bath', 'bathing', 'bathe', 'hygiene', 'wash'],
    showers: ['bath', 'bathing', 'bathe', 'hygiene', 'wash'],
    bathe: ['bath', 'bathing', 'shower', 'hygiene', 'wash'],
    bathing: ['bath', 'bathe', 'shower', 'hygiene', 'wash'],
    wash: ['bath', 'bathing', 'shower', 'hygiene'],
    eat: ['eating', 'food', 'nutrition', 'meal', 'appetite'],
    eating: ['eat', 'food', 'nutrition', 'meal', 'appetite'],
    food: ['eat', 'eating', 'nutrition', 'meal', 'appetite'],
    restroom: ['bathroom', 'toilet', 'incontinence'],
    toilet: ['bathroom', 'incontinence', 'toileting'],
    lost: ['wandering', 'safety'],
    leave: ['wandering', 'exit', 'safety'],
    leaving: ['wandering', 'exit', 'safety'],
    fall: ['falls', 'falling', 'trip', 'balance', 'mobility', 'safety'],
    falls: ['fall', 'falling', 'trip', 'balance', 'mobility', 'safety'],
    falling: ['falls', 'fall', 'trip', 'balance', 'mobility', 'safety'],
    head: ['falls', 'injury', 'safety'],
    meds: ['medication', 'medicine', 'pills', 'routine', 'health'],
    pills: ['medication', 'medicine', 'meds', 'routine', 'health'],
    medicine: ['medication', 'meds', 'pills', 'routine', 'health'],
    uti: ['infection', 'sudden', 'confusion', 'delirium', 'medical'],
    infection: ['uti', 'sudden', 'confusion', 'delirium', 'medical'],
    sudden: ['infection', 'uti', 'delirium', 'medical'],
    home: ['house', 'familiar', 'reassurance', 'routine'],
    follow: ['shadowing', 'anxiety', 'reassurance', 'behavior'],
    follows: ['shadowing', 'anxiety', 'reassurance', 'behavior'],
    following: ['shadowing', 'anxiety', 'reassurance', 'behavior'],
    clingy: ['shadowing', 'anxiety', 'reassurance', 'behavior'],
    panic: ['anxiety', 'fear', 'reassurance', 'behavior'],
    panics: ['anxiety', 'fear', 'reassurance', 'behavior'],
    hide: ['rummaging', 'lost', 'accusations', 'paranoia'],
    hiding: ['rummaging', 'lost', 'accusations', 'paranoia'],
    rummage: ['rummaging', 'searching', 'behavior'],
    stove: ['kitchen', 'cooking', 'home', 'safety'],
    kitchen: ['stove', 'cooking', 'home', 'safety'],
    scam: ['scams', 'money', 'financial', 'protection'],
    scams: ['scam', 'money', 'financial', 'protection'],
    money: ['financial', 'scams', 'legal', 'protection'],
    hospice: ['comfort', 'late', 'stage', 'care', 'planning'],
    respite: ['breaks', 'support', 'caregiver', 'help'],
    facility: ['care', 'home', 'assisted', 'living', 'transition'],
    nursing: ['care', 'home', 'facility', 'transition'],
    angry: ['aggression', 'behavior', 'agitation'],
    scared: ['anxiety', 'fear', 'behavior'],
    confused: ['confusion', 'memory', 'communication'],
  };

  return Array.from(new Set(tokens.flatMap((token) => [token, ...(synonyms[token] || [])])));
}

function scoreResource(resource: Resource, queryTokens: string[], category: string, scenario: string) {
  const searchableText = [
    resource.title,
    resource.summary,
    resource.category,
    ...resource.tags,
  ].join(' ').toLowerCase();

  let score = 0;

  for (const token of queryTokens) {
    if (searchableText.includes(token)) score += 2;
  }

  if (resource.featured) score += 1;

  const categoryBoosts: Record<string, string[]> = {
    safety: ['Safety & Crisis'],
    daily: ['Daily Care'],
    behavior: ['Behavior & Emotions'],
    communication: ['Connection'],
    activities: ['Connection'],
    health: ['Start Here', 'Care Planning', 'Daily Care', 'Safety & Crisis'],
    planning: ['Care Planning', 'Caregiver Support'],
    support: ['Caregiver Support', 'Care Planning'],
    general: ['Start Here', 'Caregiver Support'],
  };

  if (categoryBoosts[category]?.includes(resource.category)) score += 4;

  const scenarioKeywords = scenario.replace(/_/g, ' ').split(' ');
  for (const keyword of scenarioKeywords) {
    if (keyword.length > 2 && searchableText.includes(keyword)) score += 3;
  }

  return score;
}

function findMatchedResources(query: string, category: string, scenario: string): AIResourceRecommendation[] {
  const queryTokens = expandQueryTokens(tokenize(query));

  const matches = resources
    .map((resource) => ({
      resource,
      score: scoreResource(resource, queryTokens, category, scenario),
    }))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  const fallback =
    matches.length > 0
      ? matches
      : resources
          .filter((resource) => resource.featured)
          .slice(0, 4)
          .map((resource) => ({ resource, score: 1 }));

  return fallback.map(({ resource }) => ({
    title: resource.title,
    summary: resource.summary,
    category: resource.category,
    url: getResourceUrl(resource),
  }));
}

function getTrustedSources(category: string, scenario: string): AITrustedSource[] {
  const sourceKeysByScenario: Record<string, string[]> = {
    wandering_night: ['wandering', 'homeSafety', 'agitation'],
    wandering: ['wandering', 'homeSafety', 'niaCaregiving'],
    bathing_resistance: ['bathing', 'dailyPlan', 'alzCaregiving'],
    incontinence: ['dailyPlan', 'niaCaregiving', 'alzCaregiving'],
    physical_aggression: ['agitation', 'behavior', 'niaCaregiving'],
    verbal_aggression: ['agitation', 'behavior', 'communication'],
    sundowning: ['agitation', 'dailyPlan', 'niaCaregiving'],
    sleep: ['agitation', 'dailyPlan', 'niaCaregiving'],
    repetitive: ['communication', 'behavior', 'dailyPlan'],
    delusions: ['behavior', 'communication', 'niaCaregiving'],
    driving: ['homeSafety', 'alzCaregiving', 'niaCaregiving'],
    recognition: ['communication', 'alzCaregiving', 'niaCaregiving'],
    depression: ['niaCaregiving', 'dailyPlan', 'alzCaregiving'],
    falls: ['homeSafety', 'niaCaregiving', 'alzCaregiving'],
    medication_refusal: ['niaCaregiving', 'dailyPlan', 'alzCaregiving'],
    sudden_confusion: ['niaCaregiving', 'homeSafety', 'alzCaregiving'],
    wants_to_go_home: ['communication', 'behavior', 'dailyPlan'],
    shadowing: ['behavior', 'communication', 'dailyPlan'],
    rummaging: ['behavior', 'homeSafety', 'communication'],
    financial_safety: ['homeSafety', 'alzCaregiving', 'niaCaregiving'],
    kitchen_safety: ['homeSafety', 'dailyPlan', 'niaCaregiving'],
    caregiver_burnout: ['alzCaregiving', 'niaCaregiving', 'alzheimersGovTips'],
    family_conflict: ['alzCaregiving', 'niaCaregiving', 'alzheimersGovTips'],
    care_transition: ['alzCaregiving', 'niaCaregiving', 'alzheimersGovTips'],
    stroke_warning: ['strokeSigns', 'hospital', 'niaCaregiving'],
    missing_person: ['wandering', 'homeSafety', 'alzCaregiving'],
    dangerous_aggression: ['agitation', 'behavior', 'alzCaregiving'],
    medication_emergency: ['hospital', 'niaCaregiving', 'homeSafety'],
    fire_or_gas: ['homeSafety', 'hospital', 'alzCaregiving'],
    head_injury: ['hospital', 'homeSafety', 'niaCaregiving'],
  };

  const sourceKeysByCategory: Record<string, string[]> = {
    safety: ['homeSafety', 'alzCaregiving', 'niaCaregiving'],
    daily: ['dailyPlan', 'alzheimersGovTips', 'alzCaregiving'],
    behavior: ['behavior', 'agitation', 'communication'],
    communication: ['communication', 'alzCaregiving', 'niaCaregiving'],
    activities: ['dailyPlan', 'alzheimersGovTips', 'alzCaregiving'],
    health: ['niaCaregiving', 'alzCaregiving', 'alzheimersGovTips'],
    planning: ['alzCaregiving', 'niaCaregiving', 'alzheimersGovTips'],
    support: ['alzCaregiving', 'niaCaregiving', 'alzheimersGovTips'],
    general: ['alzCaregiving', 'niaCaregiving', 'alzheimersGovTips'],
  };

  const keys = sourceKeysByScenario[scenario] || sourceKeysByCategory[category] || sourceKeysByCategory.general;
  return Array.from(new Set(keys)).map((key) => trustedCareSources[key]).filter(Boolean).slice(0, 3);
}

function detectUrgentNotice(query: string): AICareResponse['urgentNotice'] | undefined {
  const lowerQuery = query.toLowerCase();

  if (
    lowerQuery.match(
      /stroke|face droop|arm weakness|slurred speech|trouble speaking|sudden.*weak|weak.*one side|sudden.*vision|severe headache|sudden.*confus|sudden.*dizz|loss of balance/
    )
  ) {
    return {
      title: 'Possible Medical Emergency',
      message:
        'Some symptoms you mentioned can overlap with stroke or another urgent medical problem. The CDC recommends calling 911 right away for sudden confusion, trouble speaking, weakness on one side, vision changes, severe headache, dizziness, or loss of balance.',
      actions: [
        'Call 911 now if symptoms are sudden, severe, one-sided, or rapidly worsening.',
        'Note the time symptoms started and share it with emergency responders.',
        'Tell responders the person has dementia and describe what is different from baseline.',
      ],
    };
  }

  if (lowerQuery.match(/missing|cannot find|can't find|wandered away|lost outside|left the house|hasn'?t come back|gone for hours/)) {
    return {
      title: 'Wandering Emergency',
      message:
        'If a person with dementia is missing or may be outside unsupervised, treat it as urgent. Wandering can become dangerous quickly, especially with heat, cold, traffic, water, or nighttime conditions.',
      actions: [
        'Call 911 or local emergency services if you cannot locate them immediately.',
        'Share a recent photo, clothing description, medical needs, and likely destinations.',
        'Check nearby hazards first: roads, water, parked cars, yards, garages, and familiar routes.',
      ],
    };
  }

  if (lowerQuery.match(/hit me|attacked me|weapon|knife|gun|threaten|threatening|violent right now|won'?t calm down|unsafe right now/)) {
    return {
      title: 'Immediate Safety Risk',
      message:
        'If anyone is in immediate danger, prioritize distance and emergency help. NIA and Alzheimer’s Association guidance both emphasize safety first during severe aggression.',
      actions: [
        'Move yourself and others to a safe place if you can do so without escalating.',
        'Call 911 in an emergency and tell responders the person has dementia.',
        'Do not try to restrain, argue with, or corner the person.',
      ],
    };
  }

  if (lowerQuery.match(/overdose|took too many|double dose|wrong medication|poison|swallowed.*chemical|ate.*chemical/)) {
    return {
      title: 'Medication or Poisoning Concern',
      message:
        'Wrong doses, double doses, overdose, or possible poisoning can be urgent. Dementia can make it hard to know exactly what happened, so professional guidance matters.',
      actions: [
        'Call Poison Control at 1-800-222-1222 in the U.S. or call 911 if symptoms are serious.',
        'Keep the medication or product container nearby for responders.',
        'Do not wait for symptoms if the dose or substance could be dangerous.',
      ],
    };
  }

  if (lowerQuery.match(/fire|smoke|gas smell|left.*stove|burner.*on|carbon monoxide|co alarm/)) {
    return {
      title: 'Home Safety Emergency',
      message:
        'Fire, smoke, gas smell, carbon monoxide alarms, or stove hazards need immediate safety action before dementia-care strategies.',
      actions: [
        'Leave the area and call emergency services if there is smoke, fire, gas smell, or a carbon monoxide alarm.',
        'Do not re-enter the home until it is cleared by professionals.',
        'After the immediate danger is handled, consider disabling stove knobs or adding automatic shutoff tools.',
      ],
    };
  }

  if (lowerQuery.match(/hit.*head|head injury|fell.*head|unconscious|passed out|can'?t get up|broken bone|severe pain/)) {
    return {
      title: 'Fall or Injury Concern',
      message:
        'A fall with head injury, loss of consciousness, severe pain, possible broken bone, or inability to get up needs prompt medical attention.',
      actions: [
        'Call 911 if they hit their head, lost consciousness, have severe pain, or cannot get up safely.',
        'Do not move them if you suspect a serious injury unless they are in immediate danger.',
        'Tell responders what changed from their usual dementia baseline.',
      ],
    };
  }

  return undefined;
}

// Enhanced keyword-based category and scenario detection
function detectCategoryAndScenario(query: string): { category: string; scenario: string } {
  const lowerQuery = query.toLowerCase();
  
  // Specific scenario detection for more targeted responses
  if (lowerQuery.match(/burnout|exhaust|overwhelm|can'?t do this|tired|resent|need a break/)) {
    return { category: 'support', scenario: 'caregiver_burnout' };
  }
  if (lowerQuery.match(/follow.*me|following.*me|follows.*me|shadow|clingy|won'?t.*leave.*alone|always.*behind|panics.*leave|panic.*leave/)) {
    return { category: 'behavior', scenario: 'shadowing' };
  }
  if (lowerQuery.match(/rummag|hide|hiding|lost.*things|steal|stole|stolen|accus|searching|looking.*for/)) {
    return { category: 'behavior', scenario: 'rummaging' };
  }
  if (lowerQuery.match(/hit.*head|head injury|fell.*head|fall.*head|falls.*head|unconscious|passed out|can'?t get up|broken bone|severe pain/)) {
    return { category: 'safety', scenario: 'falls' };
  }
  if (lowerQuery.match(/overdose|took too many|double dose|wrong medication|poison|medication|medicine|meds|pill|refuse.*med|won'?t.*med|won'?t.*pill|forget.*med/)) {
    return { category: 'health', scenario: 'medication_refusal' };
  }
  
  // Wandering scenarios
  if (lowerQuery.match(/wander.*night|night.*wander|leave.*night|walk.*night|nocturnal/)) {
    return { category: 'safety', scenario: 'wandering_night' };
  }
  if (lowerQuery.match(/wander|walk away|leaving|getting lost|escape|door|exit/)) {
    return { category: 'safety', scenario: 'wandering' };
  }
  
  // Eating/nutrition scenarios
  if (lowerQuery.match(/won'?t eat|refuse.*eat|not eating|loss.*appetite|skip.*meal|won'?t.*food/)) {
    return { category: 'daily', scenario: 'refusing_food' };
  }
  if (lowerQuery.match(/chok|swallow|cough.*eat|aspiration/)) {
    return { category: 'health', scenario: 'swallowing' };
  }
  
  // Bathing/hygiene scenarios
  if (lowerQuery.match(/won'?t.*bath|will not.*bath|not.*bath|refuse.*bath|won'?t.*shower|will not.*shower|not.*shower|refuse.*shower|afraid.*water|hate.*bath|hate.*shower/)) {
    return { category: 'daily', scenario: 'bathing_resistance' };
  }
  if (lowerQuery.match(/incontin|accident|urinat|bowel|diaper|toilet/)) {
    return { category: 'daily', scenario: 'incontinence' };
  }
  if (lowerQuery.match(/dress|clothes|clothing|outfit|won'?t.*wear|refuse.*wear/)) {
    return { category: 'daily', scenario: 'dressing' };
  }
  
  // Aggression scenarios
  if (lowerQuery.match(/hit|punch|kick|violent|physical.*aggress|strike|attack/)) {
    return { category: 'behavior', scenario: 'physical_aggression' };
  }
  if (lowerQuery.match(/yell|scream|shout|curse|swear|verbal.*aggress|angry.*words/)) {
    return { category: 'behavior', scenario: 'verbal_aggression' };
  }
  
  // Sundowning
  if (lowerQuery.match(/sundown|evening.*worse|afternoon.*worse|late.*day|worse.*night/)) {
    return { category: 'behavior', scenario: 'sundowning' };
  }
  
  // Sleep issues
  if (lowerQuery.match(/sleep|insomnia|awake.*night|won'?t.*sleep|up all night|restless.*night/)) {
    return { category: 'health', scenario: 'sleep' };
  }
  
  // Repetitive behaviors
  if (lowerQuery.match(/repeat|same.*question|asking.*again|over and over|repetitive/)) {
    return { category: 'behavior', scenario: 'repetitive' };
  }
  
  // Delusions/hallucinations
  if (lowerQuery.match(/seeing.*things|hallucin|delusion|imagin|not real|false belief/)) {
    return { category: 'behavior', scenario: 'delusions' };
  }
  
  // Driving concerns
  if (lowerQuery.match(/driv|car|vehicle|license/)) {
    return { category: 'safety', scenario: 'driving' };
  }
  
  // Memory/recognition issues
  if (lowerQuery.match(/doesn'?t.*recogni|forget.*who|not.*know.*me|memory.*loss/)) {
    return { category: 'communication', scenario: 'recognition' };
  }
  
  // Depression/withdrawal
  if (lowerQuery.match(/depress|sad|withdraw|isolat|won'?t.*talk|uninterested/)) {
    return { category: 'health', scenario: 'depression' };
  }

  // Common safety, health, planning, and caregiver scenarios
  if (lowerQuery.match(/fall|falls|fell|falling|trip|balance|unsteady|mobility/)) {
    return { category: 'safety', scenario: 'falls' };
  }
  if (lowerQuery.match(/sudden.*confus|confus.*sudden|uti|infection|delirium|rapid.*decline|sudden.*worse/)) {
    return { category: 'health', scenario: 'sudden_confusion' };
  }
  if (lowerQuery.match(/go home|want.*home|take me home|not.*my house|where.*home/)) {
    return { category: 'communication', scenario: 'wants_to_go_home' };
  }
  if (lowerQuery.match(/scam|money|bank|credit card|financial|bills|phone call|fraud/)) {
    return { category: 'safety', scenario: 'financial_safety' };
  }
  if (lowerQuery.match(/stove|oven|burner|cook|cooking|kitchen|microwave|fire/)) {
    return { category: 'safety', scenario: 'kitchen_safety' };
  }
  if (lowerQuery.match(/family.*fight|sibling|brother|sister|family.*conflict|arguing.*family|won'?t help/)) {
    return { category: 'support', scenario: 'family_conflict' };
  }
  if (lowerQuery.match(/hospice|palliative|end of life|late stage|adult day|assisted living|nursing home|care home|facility|hire.*help|home care/)) {
    return { category: 'planning', scenario: 'care_transition' };
  }
  
  // General category detection (fallback)
  
  // Behavior keywords
  if (lowerQuery.match(/aggress|angry|agitat|stubborn|resist|refus|pacing|confusion|paranoid|accusat/)) {
    return { category: 'behavior', scenario: 'general' };
  }
  
  // Safety keywords
  if (lowerQuery.match(/safe|danger|fall|lock|alarm|emergency|accident|risk|secure|protect|lost/)) {
    return { category: 'safety', scenario: 'general' };
  }
  
  // Daily Care keywords
  if (lowerQuery.match(/bath|dress|cloth|shower|hygiene|grooming|personal care/)) {
    return { category: 'daily', scenario: 'general' };
  }
  
  // Communication keywords
  if (lowerQuery.match(/talk|speak|communicate|understand|conversation|language|words|express|respond/)) {
    return { category: 'communication', scenario: 'general' };
  }
  
  // Activities keywords
  if (lowerQuery.match(/activit|game|music|exercise|hobby|engage|entertain|bored|stimulat|occupy/)) {
    return { category: 'activities', scenario: 'general' };
  }
  
  // Health keywords
  if (lowerQuery.match(/health|doctor|medicin|symptom|pain|sick|ill|hospital|treatment|diagnosis/)) {
    return { category: 'health', scenario: 'general' };
  }

  if (lowerQuery.match(/care plan|help at home|respite|legal|power of attorney|placement|care option|future/)) {
    return { category: 'planning', scenario: 'general' };
  }
  
  return { category: 'general', scenario: 'general' };
}

export async function analyzeCareQuery(query: string): Promise<AICareResponse> {
  try {
    // Detect category and specific scenario from keywords
    const { category: detectedCategory, scenario } = detectCategoryAndScenario(query);
    const urgentNotice = detectUrgentNotice(query);
    
    // Scenario-specific responses for common situations
    const scenarioResponses: { [key: string]: Partial<AICareResponse> } = {
      wandering_night: {
        category: 'Safety',
        explanation: 'Nighttime wandering is one of the most concerning behaviors in dementia care. It often occurs due to confusion about time, disrupted sleep patterns, or unmet needs. The key is to create a safe environment while addressing the underlying causes of nighttime restlessness.',
        tips: [
          'Install door alarms or motion sensors to alert you when they get up',
          'Use nightlights throughout the home to reduce confusion',
          'Keep a consistent bedtime routine to regulate their sleep cycle',
          'Ensure they use the bathroom before bed to reduce nighttime trips',
          'Remove car keys and secure exit doors without making it obvious',
          'Consider a GPS tracking device or medical alert system',
          'Increase daytime physical activity to promote better sleep',
          'Limit caffeine and fluids in the evening hours',
          'Keep their bedroom comfortable and familiar',
          'Address any pain or discomfort that might wake them'
        ]
      },
      wandering: {
        category: 'Safety',
        explanation: 'Wandering is a common behavior in dementia, often stemming from confusion, boredom, searching for something familiar, or trying to fulfill a past routine. While it\'s important to ensure safety, try to understand what they\'re seeking and address those needs.',
        tips: [
          'Install door alarms, locks, or safety gates on exits',
          'Ensure they wear an ID bracelet with your contact information',
          'Consider a GPS tracking device for additional security',
          'Keep recent photos available for identification if needed',
          'Inform neighbors and local police about the situation',
          'Place STOP signs or dark mats at doors (may appear as barriers)',
          'Redirect their attention when you notice wandering behavior',
          'Create a safe walking path inside or outside your home',
          'Increase engaging activities to reduce restlessness',
          'Register with local safe return programs like MedicAlert'
        ]
      },
      refusing_food: {
        category: 'Daily Care',
        explanation: 'Refusing to eat can be caused by many factors: loss of appetite, difficulty swallowing, medication side effects, depression, or not recognizing food. It\'s crucial to identify the cause and make eating as easy and enjoyable as possible while monitoring their nutrition.',
        tips: [
          'Offer favorite foods and familiar dishes they\'ve always enjoyed',
          'Serve smaller, more frequent meals throughout the day',
          'Make food visually appealing with colorful, contrasting plates',
          'Eat meals together to model eating behavior',
          'Offer finger foods that are easy to eat independently',
          'Ensure dentures fit properly and mouth is healthy',
          'Try different temperatures - some prefer room temperature food',
          'Reduce distractions during mealtimes (turn off TV)',
          'Offer nutritious smoothies or shakes if they refuse solids',
          'Consult a doctor if weight loss continues'
        ]
      },
      bathing_resistance: {
        category: 'Daily Care',
        explanation: 'Resistance to bathing is very common and can stem from fear of water, feeling cold, loss of dignity, or not understanding what\'s happening. Approaching bathing with patience, maintaining their dignity, and making it comfortable can help reduce anxiety.',
        tips: [
          'Maintain a warm bathroom temperature before bathing',
          'Use a calm, reassuring voice and explain each step simply',
          'Preserve modesty by keeping them covered as much as possible',
          'Let them do as much as they can themselves',
          'Try sponge baths instead of full showers if preferred',
          'Play their favorite music to create a calming atmosphere',
          'Schedule baths when they\'re most cooperative',
          'Consider having a same-gender caregiver assist',
          'Use shower chairs and handheld showerheads for safety',
          'Make it routine - same time, same way each time'
        ]
      },
      incontinence: {
        category: 'Daily Care',
        explanation: 'Incontinence is a difficult but common issue in dementia care. It can be caused by not recognizing the need, difficulty finding the bathroom, or physical changes. A compassionate, matter-of-fact approach helps maintain dignity while managing the situation.',
        tips: [
          'Take them to the bathroom every 2-3 hours on a schedule',
          'Make the bathroom easy to find with signs or colored tape',
          'Use nightlights to help them find the bathroom at night',
          'Choose clothing that\'s easy to remove quickly',
          'Limit fluids 2-3 hours before bedtime',
          'Keep a portable commode near their bed if needed',
          'Use protective pads on furniture and bedding',
          'React calmly to accidents without showing frustration',
          'Maintain good skin care to prevent irritation',
          'Consult a doctor to rule out urinary tract infections'
        ]
      },
      physical_aggression: {
        category: 'Behavior',
        explanation: 'Physical aggression in dementia usually isn\'t intentional - it\'s often a response to fear, pain, frustration, or feeling threatened. The person may be reacting to something they don\'t understand or can\'t communicate. Your safety is paramount, but understanding triggers can prevent future incidents.',
        tips: [
          'Stay calm and avoid reacting with anger or fear',
          'Give them space and don\'t corner or restrain them',
          'Identify triggers by keeping a log of when aggression occurs',
          'Check for physical discomfort, pain, or illness',
          'Approach from the front where they can see you',
          'Use a calm, low voice and reassuring body language',
          'Redirect their attention to something pleasant',
          'Remove potential weapons or dangerous objects from reach',
          'Consider if personal care tasks are too intrusive',
          'Consult a doctor about medications or underlying conditions'
        ]
      },
      verbal_aggression: {
        category: 'Behavior',
        explanation: 'Verbal outbursts, cursing, or mean comments are symptoms of the disease affecting impulse control and emotional regulation. The person may not realize what they\'re saying or may be expressing frustration they can\'t otherwise communicate. Try not to take it personally.',
        tips: [
          'Remember it\'s the disease talking, not the person',
          'Stay calm and don\'t argue or take it personally',
          'Try to identify what triggered the outburst',
          'Use a gentle tone and validate their feelings',
          'Redirect their attention to something calming',
          'Give them space if they need time to calm down',
          'Avoid crowded or overstimulating environments',
          'Maintain a predictable routine to reduce stress',
          'Ensure their basic needs are met (not tired, hungry, etc.)',
          'Take breaks for your own emotional well-being'
        ]
      },
      sundowning: {
        category: 'Behavior',
        explanation: 'Sundowning refers to increased confusion, agitation, and restlessness in the late afternoon and evening. It may be caused by fatigue, disrupted circadian rhythms, reduced lighting, or the accumulation of daily stress. Creating a calm environment and addressing physical needs can help.',
        tips: [
          'Maintain a structured daily routine with regular meal and sleep times',
          'Increase lighting in the late afternoon before sunset',
          'Schedule demanding activities for morning hours',
          'Limit caffeine and sugar, especially after lunch',
          'Encourage physical activity and outdoor time during the day',
          'Reduce noise and activity levels in the evening',
          'Close curtains before dark to minimize shadows',
          'Avoid large meals, alcohol, or caffeine in the evening',
          'Play calming music or engage in quiet activities',
          'Consider a sleep schedule consultation with their doctor'
        ]
      },
      sleep: {
        category: 'Health',
        explanation: 'Sleep disturbances are common in dementia due to changes in the brain, medications, inactivity, or confusion about time. Poor sleep affects behavior and health for both the person with dementia and caregivers. Establishing good sleep hygiene and addressing underlying causes is essential.',
        tips: [
          'Keep a consistent sleep schedule every day',
          'Increase daytime physical and social activity',
          'Get exposure to natural sunlight during the day',
          'Limit daytime napping to 30 minutes or less',
          'Create a calming bedtime routine',
          'Keep the bedroom cool, dark, and comfortable',
          'Avoid caffeine, alcohol, and large meals before bed',
          'Ensure they use the bathroom before bed',
          'Treat any pain or discomfort that disrupts sleep',
          'Discuss sleep medications with their doctor if needed'
        ]
      },
      repetitive: {
        category: 'Behavior',
        explanation: 'Repetitive questions and behaviors can be frustrating but often provide comfort and security for someone with dementia. They may have forgotten they already asked, be anxious about something, or seeking reassurance. Patience and creative strategies can help.',
        tips: [
          'Answer calmly each time as if it\'s the first time',
          'Look for the emotion or need behind the question',
          'Provide reassurance and validation of their feelings',
          'Try writing down the answer for them to reference',
          'Use distraction or redirection to other activities',
          'Keep a visible calendar or clock to orient them',
          'Engage them in activities that provide purpose',
          'Take deep breaths and remember it\'s not intentional',
          'Consider if anxiety or boredom is the cause',
          'Take breaks when you need them for your own sanity'
        ]
      },
      delusions: {
        category: 'Behavior',
        explanation: 'Delusions and hallucinations can be frightening for both the person and caregiver. They\'re caused by changes in the brain and are very real to the person experiencing them. Rather than arguing about what\'s real, focus on the emotions they\'re feeling and providing comfort.',
        tips: [
          'Don\'t argue about whether what they\'re seeing is real',
          'Validate their feelings and provide reassurance',
          'Respond to the emotion, not the delusion',
          'Gently try to redirect their attention',
          'Check if medications might be contributing',
          'Ensure adequate lighting to reduce shadows and confusion',
          'Keep the environment calm and familiar',
          'Check for physical causes like infections or pain',
          'Distract with an activity or change of scenery',
          'Consult a doctor if delusions become severe or frightening'
        ]
      },
      driving: {
        category: 'Safety',
        explanation: 'Stopping driving is often one of the hardest transitions for someone with dementia and their family. It represents loss of independence and identity. However, safety must come first. Having the conversation early, involving doctors, and providing alternatives can help.',
        tips: [
          'Have their doctor assess driving ability and write a prescription not to drive',
          'Disable the car or remove it from sight',
          'Hide or remove car keys in a secure location',
          'Arrange alternative transportation options ahead of time',
          'Offer to drive them or arrange rides with family/friends',
          'Research senior transportation services in your area',
          'Acknowledge their loss and validate their feelings',
          'Emphasize safety concerns rather than their ability',
          'Redirect conversations about driving to other topics',
          'Consider selling the car to provide closure'
        ]
      },
      recognition: {
        category: 'Communication',
        explanation: 'Not being recognized by a loved one is heartbreaking. As dementia progresses, people may forget relationships or confuse identities. While painful, remember that emotional connections often remain even when memory fades. Focus on the feeling of the moment rather than facts.',
        tips: [
          'Don\'t quiz them or correct who you are',
          'Go along with their reality to avoid distress',
          'Focus on emotional connection rather than identity',
          'Use familiar songs, scents, or photos from the past',
          'Speak calmly and maintain eye contact',
          'Identify yourself simply: "It\'s me, Mary"',
          'Take comfort in moments of connection when they occur',
          'Remember they may feel your love even if they don\'t know your name',
          'Process your grief and seek support for yourself',
          'Cherish the relationship you have now, not what was'
        ]
      },
      depression: {
        category: 'Health',
        explanation: 'Depression is common in dementia and can worsen cognitive symptoms, behavior, and quality of life. It may manifest as withdrawal, tearfulness, loss of interest, or increased confusion. Recognizing and treating depression can significantly improve daily functioning.',
        tips: [
          'Watch for signs: sadness, loss of interest, appetite changes',
          'Encourage social interaction and meaningful activities',
          'Ensure they get sunlight and outdoor time daily',
          'Stay physically active with walks or gentle exercise',
          'Maintain social connections with friends and family',
          'Play music they love or engage in past hobbies',
          'Validate their feelings and provide reassurance',
          'Consult their doctor about depression screening',
          'Consider counseling or support groups',
          'Discuss antidepressant medications if appropriate'
        ]
      },
      falls: {
        category: 'Safety',
        explanation: 'Falls can become more likely as dementia affects judgment, depth perception, balance, sleep, medications, and the ability to notice hazards. Treat a fall or near-fall as useful information: something in the body, routine, or home setup may need to change.',
        tips: [
          'Remove loose rugs, cords, clutter, and low furniture from common walking paths',
          'Add bright lighting and nightlights from the bedroom to the bathroom',
          'Install grab bars near the toilet and shower, and use non-slip mats',
          'Ask a doctor or pharmacist to review medications that may cause dizziness',
          'Watch for new pain, weakness, infection, dehydration, or vision changes',
          'Encourage supportive shoes instead of slippers or socks on smooth floors',
          'Use a shower chair, raised toilet seat, or walker if recommended',
          'Keep frequently used items within easy reach to avoid climbing',
          'Track when falls happen to identify patterns like nighttime bathroom trips',
          'Seek urgent medical help after head injury, severe pain, or sudden weakness'
        ]
      },
      medication_refusal: {
        category: 'Health',
        explanation: 'Medication refusal can happen when the person does not understand the purpose, dislikes the taste, feels rushed, has swallowing trouble, or is overwhelmed by too many instructions. The safest approach is to simplify the routine while confirming changes with a clinician.',
        tips: [
          'Use a calm, matter-of-fact tone and avoid arguing about whether medicine is needed',
          'Offer one medicine at a time with a familiar drink or snack if allowed',
          'Ask the prescriber whether pills can be crushed, changed, or simplified',
          'Use a pill organizer or pharmacy blister packs to reduce mistakes',
          'Give medication at the same time and place each day when possible',
          'Watch for swallowing problems, nausea, constipation, or side effects',
          'Do not hide medication in food unless the doctor or pharmacist approves it',
          'Keep an updated medication list for appointments and emergencies',
          'Call the care team if important doses are repeatedly missed',
          'Use reminders or supervised administration if forgetting is the main issue'
        ]
      },
      sudden_confusion: {
        category: 'Health',
        explanation: 'A sudden increase in confusion, sleepiness, agitation, weakness, or decline is not always “just dementia.” Infections, dehydration, pain, medication changes, constipation, and other medical issues can cause rapid changes and may need prompt medical attention.',
        tips: [
          'Call their doctor promptly when confusion changes suddenly or sharply',
          'Watch for fever, pain, urinary symptoms, cough, dehydration, or constipation',
          'Review recent medication changes, missed doses, or accidental double doses',
          'Check whether they are eating, drinking, and sleeping differently',
          'Keep the environment calm, familiar, and well lit while you assess the change',
          'Write down when the change started and what symptoms you noticed',
          'Bring a medication list and baseline behavior notes to urgent visits',
          'Seek emergency help for chest pain, stroke signs, head injury, severe weakness, or trouble breathing',
          'Avoid assuming behavior changes are intentional or permanent',
          'After treatment, ask what prevention steps should be added at home'
        ]
      },
      wants_to_go_home: {
        category: 'Communication',
        explanation: 'When someone with dementia asks to “go home,” they may be asking for safety, comfort, familiarity, or a time in life that feels secure. Correcting the facts often increases distress. Respond to the feeling first, then redirect gently.',
        tips: [
          'Validate the emotion: “You want to feel safe and settled”',
          'Avoid arguing that they are already home if that makes them more upset',
          'Ask a simple question about home, such as what they miss most',
          'Offer a comforting object, familiar music, photos, or a favorite snack',
          'Try a short walk, car ride, or change of room if safe and realistic',
          'Use calm body language and a reassuring tone',
          'Check for triggers like fatigue, hunger, noise, pain, or sundowning',
          'Create a predictable evening routine if it happens late in the day',
          'Keep explanations short and repeat reassurance as needed',
          'Give yourself permission to use therapeutic redirection instead of factual correction'
        ]
      },
      shadowing: {
        category: 'Behavior',
        explanation: 'Following a caregiver closely, sometimes called shadowing, often comes from anxiety, fear of being alone, or not understanding where the caregiver went. The goal is to increase reassurance and structure while giving the caregiver small pockets of relief.',
        tips: [
          'Tell them where you are going in short, reassuring phrases',
          'Set them up with a familiar activity before stepping away',
          'Use music, folding towels, sorting objects, or photo albums for comfort',
          'Keep transitions predictable and avoid disappearing suddenly',
          'Try a written note or visual cue that says when you will return',
          'Check for pain, hunger, bathroom needs, or overstimulation',
          'Ask another trusted person to sit with them when you need a break',
          'Use adult day care or respite if the behavior is constant and exhausting',
          'Stay calm, because visible frustration can increase fear',
          'Celebrate short successful separations and build gradually'
        ]
      },
      rummaging: {
        category: 'Behavior',
        explanation: 'Rummaging, hiding items, or accusing others of stealing can come from memory loss, anxiety, boredom, or a need to feel in control. It helps to protect valuables quietly while giving the person safe ways to search, sort, and feel useful.',
        tips: [
          'Avoid arguing about whether something was stolen',
          'Validate the worry and offer to help look together',
          'Create a safe rummage drawer or box with familiar harmless items',
          'Keep duplicate essentials like glasses, keys, and wallets when possible',
          'Store valuables, bills, and medications in a secure place',
          'Use labels, trays, or consistent drop zones for important items',
          'Watch for patterns in where they hide things',
          'Offer sorting tasks like folding towels or organizing cards',
          'Reduce clutter so missing items are easier to find',
          'Take breaks if accusations are becoming emotionally overwhelming'
        ]
      },
      financial_safety: {
        category: 'Safety',
        explanation: 'Dementia can make scams, repeated purchases, missed bills, and financial confusion more likely. Financial protection works best when it is set up early and quietly, before there is a crisis or major loss.',
        tips: [
          'Monitor bank and credit card activity for unusual charges',
          'Set up alerts for large withdrawals, new payees, or repeated purchases',
          'Reduce access to checkbooks, credit cards, and sensitive documents if needed',
          'Use call blocking and screen unknown phone numbers',
          'Place the person on do-not-call lists and reduce junk mail',
          'Discuss power of attorney and trusted decision-makers early',
          'Keep bills on autopay when appropriate',
          'Document concerning incidents in case professional help is needed',
          'Talk to the bank about safeguards for vulnerable adults',
          'Report fraud quickly if money or personal information is exposed'
        ]
      },
      kitchen_safety: {
        category: 'Safety',
        explanation: 'Kitchen risks can increase when dementia affects attention, sequencing, smell, judgment, or the ability to remember that a burner is on. The goal is to preserve independence where safe while reducing fire, burn, and food-safety risks.',
        tips: [
          'Remove or cover stove knobs if burners are being left on',
          'Use appliances with automatic shutoff when possible',
          'Keep knives, matches, and cleaning products secured',
          'Label safe snacks and simple foods clearly',
          'Check the refrigerator for spoiled food regularly',
          'Supervise cooking if sequencing or judgment has changed',
          'Install working smoke and carbon monoxide alarms',
          'Use contrasting dishes and simple place settings to reduce confusion',
          'Prepare ready-to-eat meals if cooking is no longer safe',
          'Watch for burns, smoke marks, or unexplained kitchen messes as warning signs'
        ]
      },
      caregiver_burnout: {
        category: 'General',
        explanation: 'Caregiver burnout is a real care issue, not a personal failure. Exhaustion, resentment, poor sleep, irritability, and feeling trapped are signals that the care plan needs more support, not that you are doing something wrong.',
        tips: [
          'Name the specific tasks that are hardest instead of asking for general help',
          'Ask family or friends for concrete shifts, errands, meals, or appointment help',
          'Use respite care, adult day programs, or paid help before a crisis',
          'Tell the doctor if sleep deprivation or stress is becoming unsafe',
          'Keep a short list of people to call when you need backup',
          'Lower nonessential standards around chores and perfect routines',
          'Join a caregiver support group or talk with a counselor',
          'Schedule one protected break each week, even if it is brief',
          'Watch for depression, anxiety, or health changes in yourself',
          'Remember that sustainable care requires a supported caregiver'
        ]
      },
      family_conflict: {
        category: 'General',
        explanation: 'Family conflict often grows when roles, money, time, guilt, and medical decisions are unclear. Dementia care works better when tasks are concrete, decisions are documented, and conversations focus on needs instead of blame.',
        tips: [
          'Write down the current care tasks, appointments, costs, and gaps',
          'Ask relatives to choose specific jobs rather than vague support',
          'Use a shared calendar or care app for visibility',
          'Keep medical and legal documents organized in one place',
          'Hold short focused meetings with one decision at a time',
          'Use the doctor, social worker, or care manager as a neutral voice',
          'Document agreements about money, transportation, and respite',
          'Avoid debating old family patterns during urgent care decisions',
          'Consider elder mediation if conflict blocks necessary care',
          'Protect the primary caregiver from being the default for everything'
        ]
      },
      care_transition: {
        category: 'General',
        explanation: 'Considering hospice, adult day care, home care, assisted living, or a nursing home does not mean giving up. It usually means the needs have changed and the care plan has to become more realistic, safer, and better supported.',
        tips: [
          'List the needs that are no longer manageable at home',
          'Ask the doctor whether hospice, palliative care, therapy, or home health should be evaluated',
          'Tour care options before a crisis whenever possible',
          'Compare staffing, dementia training, safety setup, costs, and communication style',
          'Use adult day care or respite as a lower-pressure first step when appropriate',
          'Bring familiar objects, photos, and routines into any new setting',
          'Expect an adjustment period after transitions',
          'Keep legal, medication, diagnosis, and emergency documents ready',
          'Ask how behavior changes, falls, wandering, and hospital transfers are handled',
          'Choose the setting that best matches current needs, not the care plan you hoped would be enough'
        ]
      }
    };
    
    // Map categories to appropriate responses
    const categoryMap: { [key: string]: Partial<AICareResponse> } = {
      activities: {
        category: 'Activities',
        explanation: 'Engaging activities are crucial in dementia care as they help maintain cognitive function, reduce anxiety, and improve quality of life. The key is to choose activities that match the person\'s current abilities and past interests, making them both enjoyable and achievable.',
        tips: [
          'Choose activities based on past interests and current abilities',
          'Break activities into simple, manageable steps',
          'Focus on the process and enjoyment, not the outcome',
          'Use music from their youth to trigger positive memories',
          'Try art activities like coloring, painting, or crafts',
          'Engage in gentle exercises like walking or chair yoga',
          'Look through photo albums and share memories together',
          'Schedule activities during their most alert times of day',
          'Be patient and flexible if they lose interest',
          'Celebrate participation, not perfection'
        ]
      },
      communication: {
        category: 'Communication',
        explanation: 'Communication changes are a natural part of dementia progression. Adapting your communication style can significantly reduce frustration for both you and your loved one. The goal is to maintain connection and understanding while respecting their dignity and emotional needs.',
        tips: [
          'Speak slowly, clearly, and in simple sentences',
          'Make eye contact and use a calm, reassuring tone',
          'Give them time to process and respond',
          'Ask one question at a time, avoiding complex choices',
          'Use gestures and visual cues to support understanding',
          'Listen actively and validate their feelings',
          'Avoid arguing or correcting minor mistakes',
          'Pay attention to non-verbal communication and body language',
          'Minimize background noise and distractions',
          'Stay patient and don\'t take things personally'
        ]
      },
      behavior: {
        category: 'Behavior',
        explanation: 'Challenging behaviors in dementia are often a way of communicating unmet needs or discomfort. Rather than focusing on stopping the behavior, try to understand what might be causing it. With patience and observation, you can often identify triggers and find effective strategies.',
        tips: [
          'Stay calm and avoid reacting emotionally to difficult behaviors',
          'Look for patterns - keep a log of when behaviors occur',
          'Check for physical causes: pain, hunger, thirst, or bathroom needs',
          'Reduce environmental triggers like noise, clutter, or overstimulation',
          'Use distraction and redirection rather than confrontation',
          'Maintain a consistent daily routine for predictability',
          'Ensure adequate rest and avoid overtiredness',
          'Simplify tasks to reduce frustration',
          'Validate their feelings even if the concern seems irrational',
          'Consult with healthcare providers about persistent behaviors'
        ]
      },
      safety: {
        category: 'Safety',
        explanation: 'Creating a safe environment is essential in dementia care, but it\'s equally important to balance safety with maintaining independence and dignity. A thoughtful approach to safety planning can prevent accidents while allowing your loved one to maintain as much autonomy as possible.',
        tips: [
          'Remove tripping hazards like loose rugs and clutter',
          'Install grab bars in bathrooms and adequate lighting throughout',
          'Use door alarms or monitoring systems if wandering occurs',
          'Keep medications, chemicals, and sharp objects secured',
          'Label cabinets and rooms with pictures or words',
          'Consider a medical alert system or GPS tracker',
          'Keep emergency numbers visible and easily accessible',
          'Ensure smoke detectors and carbon monoxide alarms work',
          'Remove or disable stove knobs if cooking is unsafe',
          'Create a safe, enclosed outdoor space if possible'
        ]
      },
      daily: {
        category: 'Daily Care',
        explanation: 'Daily care routines provide structure and familiarity, which can be very comforting for someone with dementia. The key is to maintain consistency while being flexible and allowing them to participate as much as possible, preserving their dignity and sense of independence.',
        tips: [
          'Establish and stick to a consistent daily routine',
          'Allow plenty of time for each task - avoid rushing',
          'Let them do as much as they can independently',
          'Break tasks into simple, manageable steps',
          'Prepare clothes and items ahead of time',
          'Use visual cues and simple verbal instructions',
          'Make bathing more comfortable with warm room, music, and reassurance',
          'Choose clothing that\'s easy to put on and comfortable',
          'Keep the environment calm and minimize distractions',
          'Be patient and offer encouragement throughout'
        ]
      },
      health: {
        category: 'Health',
        explanation: 'Managing health needs in dementia care requires close attention and coordination with healthcare providers. Regular monitoring, medication management, and preventive care are essential, along with recognizing when changes need medical attention.',
        tips: [
          'Keep a detailed medication schedule and organize pills carefully',
          'Attend all medical appointments and take notes',
          'Monitor for changes in behavior, appetite, or physical condition',
          'Maintain a list of all medications and medical conditions',
          'Watch for signs of pain, discomfort, or illness',
          'Ensure regular dental, vision, and hearing check-ups',
          'Keep emergency contact information readily available',
          'Communicate any concerns to healthcare providers promptly',
          'Follow prescribed treatments consistently',
          'Maintain good nutrition and hydration'
        ]
      },
      planning: {
        category: 'General',
        explanation: 'Care planning helps families move from reacting to each crisis toward a clearer support system. This can include legal documents, home help, respite, adult day programs, care homes, hospice, transportation, and a realistic plan for what happens when needs increase.',
        tips: [
          'Write down current care needs, safety risks, and the tasks that are hardest to sustain',
          'Organize diagnosis records, medication lists, insurance information, and emergency contacts',
          'Discuss power of attorney, advance directives, and trusted decision-makers early',
          'Compare home care, adult day care, respite, assisted living, memory care, and hospice based on current needs',
          'Ask the doctor or a social worker which services the person may qualify for',
          'Create a backup plan for nights, falls, wandering, illness, and caregiver emergencies',
          'Review costs, transportation, staffing, and family responsibilities directly',
          'Revisit the plan regularly because dementia care needs change over time',
          'Use transitions to increase support, not as a judgment on the family',
          'Keep the person’s routines, preferences, and dignity central in every decision'
        ]
      },
      support: {
        category: 'General',
        explanation: 'Caregiver support is part of the care plan. When the caregiver is exhausted, isolated, or unsupported, the whole system becomes more fragile. The most useful support is concrete: named tasks, scheduled breaks, backup contacts, and help before crisis.',
        tips: [
          'Identify the exact jobs that need backup: meals, bathing, transportation, nights, paperwork, or appointments',
          'Ask for specific help instead of broad offers',
          'Schedule respite before exhaustion becomes unsafe',
          'Use support groups, counseling, adult day programs, or paid care when possible',
          'Track sleep, stress, and health changes in the caregiver too',
          'Set boundaries around what one person can realistically do',
          'Use a shared calendar so family members can see real care demands',
          'Talk with the doctor if caregiver stress is affecting safety or health',
          'Prepare an emergency backup contact list',
          'Treat rest as a care requirement, not a reward'
        ]
      },
      general: {
        category: 'General',
        explanation: 'Understanding dementia care is an ongoing journey that combines practical knowledge with compassionate support. While each person\'s experience with dementia is unique, having a strong foundation of care principles and resources helps provide consistent, quality care. Regular learning and adaptation to changing needs ensures the best possible support for both the person with dementia and their caregivers.',
        tips: [
          'Learn about the specific type of dementia and its progression',
          'Establish and maintain consistent daily routines',
          'Stay connected with healthcare providers and specialists',
          'Create a support network of family, friends, and professionals',
          'Keep organized records of medications and appointments',
          'Attend caregiver education programs and workshops',
          'Plan for future care needs and decisions',
          'Practice self-care and stress management',
          'Use available community resources and services',
          'Regular assessment of care needs and adjustments as necessary'
        ]
      }
    };

    // Check if we have a specific scenario response
    const specificResponse = scenarioResponses[scenario];
    const baseResponse = specificResponse || categoryMap[detectedCategory] || categoryMap.general;

    // Create search suggestions based on detected scenario and query
    const searchSuggestions = specificResponse 
      ? [
          query,
          `${scenario.replace(/_/g, ' ')} dementia care tips`,
          `managing ${scenario.replace(/_/g, ' ')} alzheimer's`,
          `${baseResponse.category?.toLowerCase()} strategies dementia`,
          'caregiver support resources'
        ]
      : [
          query,
          `${baseResponse.category?.toLowerCase()} strategies in dementia care`,
          `managing dementia ${detectedCategory}`,
          'evidence-based dementia care approaches',
          'professional dementia care resources'
        ];

    // Create comprehensive related topics
    const relatedTopics = [
      'Caregiver Support and Self-Care',
      'Daily Care Routines and Schedules',
      'Communication Strategies and Tips',
      'Safety Measures and Prevention',
      'Behavior Management Techniques',
      'Activities and Engagement',
      'Memory Care Strategies',
      'Legal and Financial Planning'
    ];
    const matchedResources = findMatchedResources(query, detectedCategory, scenario);
    const urgentScenario =
      urgentNotice?.title === 'Possible Medical Emergency'
        ? 'stroke_warning'
        : urgentNotice?.title === 'Wandering Emergency'
          ? 'missing_person'
          : urgentNotice?.title === 'Immediate Safety Risk'
            ? 'dangerous_aggression'
            : urgentNotice?.title === 'Medication or Poisoning Concern'
              ? 'medication_emergency'
              : urgentNotice?.title === 'Home Safety Emergency'
                ? 'fire_or_gas'
                : urgentNotice?.title === 'Fall or Injury Concern'
                  ? 'head_injury'
                  : scenario;
    const trustedSources = getTrustedSources(detectedCategory, urgentScenario);
    const resourceContext =
      matchedResources.length > 0
        ? ` Ana has related DementiaAide guides on ${matchedResources
            .slice(0, 2)
            .map((resource) => resource.title)
            .join(' and ')}, which can give more practical next steps.`
        : '';

    return {
      explanation: `${baseResponse.explanation || 'Understanding dementia care helps provide better support.'}${resourceContext}`,
      tips: baseResponse.tips || ['Learn about the condition', 'Establish routines', 'Seek support'],
      searchSuggestions: searchSuggestions.slice(0, 5),
      relatedTopics: relatedTopics.slice(0, 6),
      category: baseResponse.category as any || 'General',
      matchedResources,
      trustedSources,
      urgentNotice,
      disclaimer: STANDARD_DISCLAIMER
    };
  } catch (error) {
    console.error('Error analyzing care query:', error);
    return {
      explanation: "I'm here to help with your dementia care questions. Please describe the situation you're facing, and I'll provide relevant advice and resources.",
      tips: ["Be specific about the situation", "Mention any recent changes", "Note the time of day when issues occur"],
      searchSuggestions: ["dementia care basics", "caregiver support"],
      relatedTopics: ["dementia care", "caregiver support", "dementia symptoms"],
      category: "General",
      matchedResources: findMatchedResources(query, 'general', 'general'),
      trustedSources: getTrustedSources('general', 'general'),
      disclaimer: STANDARD_DISCLAIMER
    };
  }
}

export async function categorizeContent(content: string): Promise<string[]> {
  try {
    const { category } = detectCategoryAndScenario(content);
    
    const categoryNames: { [key: string]: string } = {
      behavior: 'Behavior',
      safety: 'Safety',
      daily: 'Daily Care',
      communication: 'Communication',
      activities: 'Activities',
      health: 'Health',
      planning: 'Care Planning',
      support: 'Caregiver Support',
      general: 'General'
    };

    return [categoryNames[category] || 'General', 'Dementia Care'];
  } catch (error) {
    console.error('Error categorizing content:', error);
    return ['Dementia Care'];
  }
}

export async function enhanceSearchQuery(query: string): Promise<string> {
  try {
    const { category, scenario } = detectCategoryAndScenario(query);
    
    const categoryKeywords: { [key: string]: string[] } = {
      activities: ['engagement', 'activities', 'stimulation'],
      communication: ['talking', 'understanding', 'connection'],
      behavior: ['managing', 'coping', 'strategies'],
      safety: ['prevention', 'security', 'protection'],
      daily: ['routine', 'care', 'assistance'],
      health: ['medical', 'treatment', 'wellness'],
      planning: ['planning', 'resources', 'future care'],
      support: ['caregiver', 'support', 'respite'],
      general: ['support', 'guide', 'help']
    };

    const keywords = categoryKeywords[category] || categoryKeywords.general;
    const enhancedQuery = `${query} ${keywords.join(' ')} dementia care`;

    return enhancedQuery;
  } catch (error) {
    console.error('Error enhancing search query:', error);
    return query;
  }
}
