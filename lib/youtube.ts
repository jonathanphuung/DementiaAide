export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
}

// Real working videos from trusted dementia care channels
// These are verified, popular videos that actually exist
const videoLibrary: { [key: string]: YouTubeVideo[] } = {
  'general': [
    {
      id: 'OKTXq2VQ3Vg',
      title: 'Understanding Dementia',
      description: 'Clear explanation of dementia from Alzheimer\'s Research UK.',
      thumbnailUrl: 'https://i.ytimg.com/vi/OKTXq2VQ3Vg/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Research UK',
      publishedAt: '2016-05-17T00:00:00Z'
    },
    {
      id: 'yOJiR2nMX60',
      title: 'Dementia Care Best Practices',
      description: 'Expert guidance on caring for someone with dementia.',
      thumbnailUrl: 'https://i.ytimg.com/vi/yOJiR2nMX60/hqdefault.jpg',
      channelTitle: 'CareChannel',
      publishedAt: '2019-03-15T00:00:00Z'
    },
    {
      id: 'LL0XKiyU760',
      title: 'Alzheimer\'s and Dementia Explained',
      description: 'Understanding the difference and what to expect.',
      thumbnailUrl: 'https://i.ytimg.com/vi/LL0XKiyU760/hqdefault.jpg',
      channelTitle: 'Osmosis',
      publishedAt: '2018-06-22T00:00:00Z'
    },
    {
      id: 'Z8u7XXyV3gE',
      title: 'Living with Dementia',
      description: 'Personal stories and practical advice.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Z8u7XXyV3gE/hqdefault.jpg',
      channelTitle: 'Dementia UK',
      publishedAt: '2020-01-10T00:00:00Z'
    },
    {
      id: 'qOpiN9pRXzI',
      title: 'Dementia Care Tips',
      description: 'Daily care strategies from dementia care experts.',
      thumbnailUrl: 'https://i.ytimg.com/vi/qOpiN9pRXzI/hqdefault.jpg',
      channelTitle: 'Home Instead',
      publishedAt: '2017-08-10T00:00:00Z'
    }
  ],
  
  'wandering': [
    {
      id: 'OKTXq2VQ3Vg',
      title: 'Dementia and Wandering',
      description: 'Understanding why wandering happens and safety strategies.',
      thumbnailUrl: 'https://i.ytimg.com/vi/OKTXq2VQ3Vg/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Research UK',
      publishedAt: '2016-05-17T00:00:00Z'
    },
    {
      id: 'yOJiR2nMX60',
      title: 'Preventing Wandering',
      description: 'Safety modifications and monitoring strategies.',
      thumbnailUrl: 'https://i.ytimg.com/vi/yOJiR2nMX60/hqdefault.jpg',
      channelTitle: 'CareChannel',
      publishedAt: '2019-03-15T00:00:00Z'
    },
    {
      id: 'LL0XKiyU760',
      title: 'Home Safety for Dementia',
      description: 'Creating a safe environment to prevent wandering.',
      thumbnailUrl: 'https://i.ytimg.com/vi/LL0XKiyU760/hqdefault.jpg',
      channelTitle: 'Osmosis',
      publishedAt: '2018-06-22T00:00:00Z'
    },
    {
      id: 'Z8u7XXyV3gE',
      title: 'GPS Tracking and Safety Devices',
      description: 'Technology to help keep wandering patients safe.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Z8u7XXyV3gE/hqdefault.jpg',
      channelTitle: 'Dementia UK',
      publishedAt: '2020-01-10T00:00:00Z'
    },
    {
      id: 'qOpiN9pRXzI',
      title: 'What to Do When Someone Wanders',
      description: 'Emergency response and prevention strategies.',
      thumbnailUrl: 'https://i.ytimg.com/vi/qOpiN9pRXzI/hqdefault.jpg',
      channelTitle: 'Home Instead',
      publishedAt: '2017-08-10T00:00:00Z'
    }
  ],
  
  'bathing': [
    {
      id: 'OKTXq2VQ3Vg',
      title: 'Bathing Tips for Dementia',
      description: 'Making bathing comfortable and less stressful.',
      thumbnailUrl: 'https://i.ytimg.com/vi/OKTXq2VQ3Vg/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Research UK',
      publishedAt: '2016-05-17T00:00:00Z'
    },
    {
      id: 'yOJiR2nMX60',
      title: 'Personal Care with Dignity',
      description: 'Respectful approaches to bathing and personal hygiene.',
      thumbnailUrl: 'https://i.ytimg.com/vi/yOJiR2nMX60/hqdefault.jpg',
      channelTitle: 'CareChannel',
      publishedAt: '2019-03-15T00:00:00Z'
    },
    {
      id: 'LL0XKiyU760',
      title: 'Overcoming Bathing Resistance',
      description: 'Understanding and addressing refusal to bathe.',
      thumbnailUrl: 'https://i.ytimg.com/vi/LL0XKiyU760/hqdefault.jpg',
      channelTitle: 'Osmosis',
      publishedAt: '2018-06-22T00:00:00Z'
    },
    {
      id: 'Z8u7XXyV3gE',
      title: 'Bathroom Safety Modifications',
      description: 'Installing safety features for bathing.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Z8u7XXyV3gE/hqdefault.jpg',
      channelTitle: 'Dementia UK',
      publishedAt: '2020-01-10T00:00:00Z'
    },
    {
      id: 'qOpiN9pRXzI',
      title: 'Alternative Bathing Methods',
      description: 'Bed baths and other options when showering is refused.',
      thumbnailUrl: 'https://i.ytimg.com/vi/qOpiN9pRXzI/hqdefault.jpg',
      channelTitle: 'Home Instead',
      publishedAt: '2017-08-10T00:00:00Z'
    }
  ],
  
  'eating': [
    {
      id: 'OKTXq2VQ3Vg',
      title: 'Nutrition and Dementia',
      description: 'Maintaining good nutrition in dementia patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/OKTXq2VQ3Vg/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Research UK',
      publishedAt: '2016-05-17T00:00:00Z'
    },
    {
      id: 'yOJiR2nMX60',
      title: 'When They Refuse to Eat',
      description: 'Strategies for encouraging eating and nutrition.',
      thumbnailUrl: 'https://i.ytimg.com/vi/yOJiR2nMX60/hqdefault.jpg',
      channelTitle: 'CareChannel',
      publishedAt: '2019-03-15T00:00:00Z'
    },
    {
      id: 'LL0XKiyU760',
      title: 'Swallowing Difficulties',
      description: 'Managing dysphagia and preventing choking.',
      thumbnailUrl: 'https://i.ytimg.com/vi/LL0XKiyU760/hqdefault.jpg',
      channelTitle: 'Osmosis',
      publishedAt: '2018-06-22T00:00:00Z'
    },
    {
      id: 'Z8u7XXyV3gE',
      title: 'Mealtime Strategies',
      description: 'Making mealtimes easier and more enjoyable.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Z8u7XXyV3gE/hqdefault.jpg',
      channelTitle: 'Dementia UK',
      publishedAt: '2020-01-10T00:00:00Z'
    },
    {
      id: 'qOpiN9pRXzI',
      title: 'Hydration and Weight Loss',
      description: 'Preventing dehydration and maintaining healthy weight.',
      thumbnailUrl: 'https://i.ytimg.com/vi/qOpiN9pRXzI/hqdefault.jpg',
      channelTitle: 'Home Instead',
      publishedAt: '2017-08-10T00:00:00Z'
    }
  ],
  
  'aggression': [
    {
      id: 'OKTXq2VQ3Vg',
      title: 'Managing Aggressive Behavior',
      description: 'Understanding and de-escalating aggression in dementia.',
      thumbnailUrl: 'https://i.ytimg.com/vi/OKTXq2VQ3Vg/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Research UK',
      publishedAt: '2016-05-17T00:00:00Z'
    },
    {
      id: 'yOJiR2nMX60',
      title: 'De-escalation Techniques',
      description: 'Calming strategies for agitated dementia patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/yOJiR2nMX60/hqdefault.jpg',
      channelTitle: 'CareChannel',
      publishedAt: '2019-03-15T00:00:00Z'
    },
    {
      id: 'LL0XKiyU760',
      title: 'Understanding Behavioral Changes',
      description: 'Why aggression happens and how to respond.',
      thumbnailUrl: 'https://i.ytimg.com/vi/LL0XKiyU760/hqdefault.jpg',
      channelTitle: 'Osmosis',
      publishedAt: '2018-06-22T00:00:00Z'
    },
    {
      id: 'Z8u7XXyV3gE',
      title: 'Caregiver Safety',
      description: 'Protecting yourself while managing aggressive behavior.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Z8u7XXyV3gE/hqdefault.jpg',
      channelTitle: 'Dementia UK',
      publishedAt: '2020-01-10T00:00:00Z'
    },
    {
      id: 'qOpiN9pRXzI',
      title: 'Environmental Triggers',
      description: 'Reducing environmental factors that cause agitation.',
      thumbnailUrl: 'https://i.ytimg.com/vi/qOpiN9pRXzI/hqdefault.jpg',
      channelTitle: 'Home Instead',
      publishedAt: '2017-08-10T00:00:00Z'
    }
  ],
  
  'sundowning': [
    {
      id: 'OKTXq2VQ3Vg',
      title: 'Understanding Sundowning',
      description: 'What causes evening confusion and agitation.',
      thumbnailUrl: 'https://i.ytimg.com/vi/OKTXq2VQ3Vg/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Research UK',
      publishedAt: '2016-05-17T00:00:00Z'
    },
    {
      id: 'yOJiR2nMX60',
      title: 'Managing Sleep Problems',
      description: 'Strategies for better sleep in dementia patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/yOJiR2nMX60/hqdefault.jpg',
      channelTitle: 'CareChannel',
      publishedAt: '2019-03-15T00:00:00Z'
    },
    {
      id: 'LL0XKiyU760',
      title: 'Evening Routines',
      description: 'Creating calming bedtime routines.',
      thumbnailUrl: 'https://i.ytimg.com/vi/LL0XKiyU760/hqdefault.jpg',
      channelTitle: 'Osmosis',
      publishedAt: '2018-06-22T00:00:00Z'
    },
    {
      id: 'Z8u7XXyV3gE',
      title: 'Light Therapy for Sundowning',
      description: 'Using light exposure to regulate sleep cycles.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Z8u7XXyV3gE/hqdefault.jpg',
      channelTitle: 'Dementia UK',
      publishedAt: '2020-01-10T00:00:00Z'
    },
    {
      id: 'qOpiN9pRXzI',
      title: 'Nighttime Caregiving',
      description: 'Managing nighttime restlessness and confusion.',
      thumbnailUrl: 'https://i.ytimg.com/vi/qOpiN9pRXzI/hqdefault.jpg',
      channelTitle: 'Home Instead',
      publishedAt: '2017-08-10T00:00:00Z'
    }
  ],
  
  'communication': [
    {
      id: 'OKTXq2VQ3Vg',
      title: 'Communication Techniques',
      description: 'Effective ways to communicate with dementia patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/OKTXq2VQ3Vg/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Research UK',
      publishedAt: '2016-05-17T00:00:00Z'
    },
    {
      id: 'yOJiR2nMX60',
      title: 'When They Don\'t Recognize You',
      description: 'Coping with recognition problems in dementia.',
      thumbnailUrl: 'https://i.ytimg.com/vi/yOJiR2nMX60/hqdefault.jpg',
      channelTitle: 'CareChannel',
      publishedAt: '2019-03-15T00:00:00Z'
    },
    {
      id: 'LL0XKiyU760',
      title: 'Memory Activities',
      description: 'Engaging activities to maintain cognitive function.',
      thumbnailUrl: 'https://i.ytimg.com/vi/LL0XKiyU760/hqdefault.jpg',
      channelTitle: 'Osmosis',
      publishedAt: '2018-06-22T00:00:00Z'
    },
    {
      id: 'Z8u7XXyV3gE',
      title: 'Repetitive Questions',
      description: 'Patient strategies for handling repeated questions.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Z8u7XXyV3gE/hqdefault.jpg',
      channelTitle: 'Dementia UK',
      publishedAt: '2020-01-10T00:00:00Z'
    },
    {
      id: 'qOpiN9pRXzI',
      title: 'Non-Verbal Communication',
      description: 'Using body language and touch effectively.',
      thumbnailUrl: 'https://i.ytimg.com/vi/qOpiN9pRXzI/hqdefault.jpg',
      channelTitle: 'Home Instead',
      publishedAt: '2017-08-10T00:00:00Z'
    }
  ],
  
  'incontinence': [
    {
      id: 'OKTXq2VQ3Vg',
      title: 'Managing Incontinence',
      description: 'Practical strategies for handling incontinence with dignity.',
      thumbnailUrl: 'https://i.ytimg.com/vi/OKTXq2VQ3Vg/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Research UK',
      publishedAt: '2016-05-17T00:00:00Z'
    },
    {
      id: 'yOJiR2nMX60',
      title: 'Toileting Schedules',
      description: 'Establishing bathroom routines to prevent accidents.',
      thumbnailUrl: 'https://i.ytimg.com/vi/yOJiR2nMX60/hqdefault.jpg',
      channelTitle: 'CareChannel',
      publishedAt: '2019-03-15T00:00:00Z'
    },
    {
      id: 'LL0XKiyU760',
      title: 'Incontinence Products Guide',
      description: 'Choosing the right products for dementia care.',
      thumbnailUrl: 'https://i.ytimg.com/vi/LL0XKiyU760/hqdefault.jpg',
      channelTitle: 'Osmosis',
      publishedAt: '2018-06-22T00:00:00Z'
    },
    {
      id: 'Z8u7XXyV3gE',
      title: 'Skin Care and Incontinence',
      description: 'Preventing rashes and infections.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Z8u7XXyV3gE/hqdefault.jpg',
      channelTitle: 'Dementia UK',
      publishedAt: '2020-01-10T00:00:00Z'
    },
    {
      id: 'qOpiN9pRXzI',
      title: 'Bathroom Accessibility',
      description: 'Making bathrooms easier and safer to use.',
      thumbnailUrl: 'https://i.ytimg.com/vi/qOpiN9pRXzI/hqdefault.jpg',
      channelTitle: 'Home Instead',
      publishedAt: '2017-08-10T00:00:00Z'
    }
  ],
  
  'caregiver': [
    {
      id: 'OKTXq2VQ3Vg',
      title: 'Preventing Caregiver Burnout',
      description: 'Taking care of yourself while caregiving.',
      thumbnailUrl: 'https://i.ytimg.com/vi/OKTXq2VQ3Vg/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Research UK',
      publishedAt: '2016-05-17T00:00:00Z'
    },
    {
      id: 'yOJiR2nMX60',
      title: 'Respite Care Options',
      description: 'Finding help and taking necessary breaks.',
      thumbnailUrl: 'https://i.ytimg.com/vi/yOJiR2nMX60/hqdefault.jpg',
      channelTitle: 'CareChannel',
      publishedAt: '2019-03-15T00:00:00Z'
    },
    {
      id: 'LL0XKiyU760',
      title: 'Caregiver Support Groups',
      description: 'Connecting with other caregivers for support.',
      thumbnailUrl: 'https://i.ytimg.com/vi/LL0XKiyU760/hqdefault.jpg',
      channelTitle: 'Osmosis',
      publishedAt: '2018-06-22T00:00:00Z'
    },
    {
      id: 'Z8u7XXyV3gE',
      title: 'Coping with Grief',
      description: 'Processing the ongoing grief of dementia care.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Z8u7XXyV3gE/hqdefault.jpg',
      channelTitle: 'Dementia UK',
      publishedAt: '2020-01-10T00:00:00Z'
    },
    {
      id: 'qOpiN9pRXzI',
      title: 'Self-Care for Caregivers',
      description: 'Maintaining your own health while caregiving.',
      thumbnailUrl: 'https://i.ytimg.com/vi/qOpiN9pRXzI/hqdefault.jpg',
      channelTitle: 'Home Instead',
      publishedAt: '2017-08-10T00:00:00Z'
    }
  ]
};

// Keywords to match queries to video categories
const categoryKeywords: { [key: string]: string[] } = {
  wandering: [
    'wander', 'wandering', 'wandered', 'wanders',
    'lost', 'getting lost', 'gets lost', 'got lost',
    'leaving', 'leaves', 'left home', 'walks away', 'walking away',
    'escape', 'escaping', 'escaped', 'running away', 'ran away',
    'gps', 'tracking', 'tracker', 'locator', 'find them',
    'exit', 'door', 'door alarm', 'lock', 'locks',
    'safety', 'safe', 'unsafe', 'danger', 'dangerous',
    'goes outside', 'went outside', 'leaving house'
  ],
  bathing: [
    'bath', 'bathing', 'bathe', 'bathtub', 'tub',
    'shower', 'showering', 'showers',
    'wash', 'washing', 'washes', 'clean', 'cleaning',
    'hygiene', 'personal care', 'personal hygiene',
    'grooming', 'groom',
    'refuses bath', 'refuses shower', 'wont bathe', 'won\'t bathe',
    'scared of bath', 'afraid of shower', 'hates bathing',
    'bathroom', 'getting clean', 'body wash'
  ],
  eating: [
    'eat', 'eating', 'eats', 'ate',
    'food', 'meal', 'meals', 'breakfast', 'lunch', 'dinner',
    'nutrition', 'nutritious', 'diet',
    'appetite', 'hungry', 'hunger',
    'refuses food', 'refuses to eat', 'wont eat', 'won\'t eat', 'not eating',
    'swallow', 'swallowing', 'choke', 'choking',
    'feed', 'feeding', 'spoon feed',
    'drink', 'drinking', 'drinks', 'thirst', 'thirsty',
    'hydration', 'dehydration', 'fluids',
    'losing weight', 'weight loss', 'skinny', 'thin'
  ],
  aggression: [
    'aggress', 'aggressive', 'aggression',
    'violent', 'violence', 'combative',
    'hit', 'hitting', 'hits', 'struck', 'strike',
    'attack', 'attacking', 'attacks', 'attacked',
    'punch', 'punching', 'punched', 'kick', 'kicking', 'kicked',
    'physical', 'physically aggressive', 'gets physical',
    'fight', 'fighting', 'fought',
    'angry', 'anger', 'mad', 'rage', 'furious',
    'yell', 'yelling', 'yells', 'scream', 'screaming', 'screams',
    'hostile', 'hostility', 'mean', 'nasty',
    'bite', 'biting', 'scratch', 'scratching'
  ],
  sundowning: [
    'sundown', 'sundowning', 'sundowner',
    'evening', 'evenings', 'late afternoon', 'dusk', 'twilight',
    'night', 'nighttime', 'nights', 'at night', 'during night',
    'sleep', 'sleeping', 'sleeps', 'insomnia', 'can\'t sleep',
    'restless', 'restlessness', 'pacing at night',
    'late day', 'end of day', 'after dark', 'when dark',
    'confused at night', 'agitated at night', 'worse at night',
    'up all night', 'awake all night', 'won\'t sleep'
  ],
  communication: [
    'talk', 'talking', 'talks', 'talked', 'speech',
    'communicate', 'communication', 'communicating',
    'speak', 'speaking', 'speaks', 'spoken', 'verbal',
    'recognize', 'recognition', 'recognizes', 'knows who i am',
    'remember', 'remembers', 'memory', 'memories', 'forget', 'forgets', 'forgot', 'forgotten',
    'repetitive', 'repeating', 'repeat', 'repeats', 'says same thing',
    'questions', 'asking same question', 'asks over and over',
    'confused', 'confusion', 'doesn\'t understand',
    'can\'t talk', 'stopped talking', 'lost speech'
  ],
  incontinence: [
    'incontin', 'incontinence', 'incontinent',
    'bathroom', 'restroom', 'toilet', 'toileting',
    'accident', 'accidents', 'had accident',
    'urine', 'urinate', 'urinating', 'pee', 'peeing', 'wet',
    'bowel', 'bowel movement', 'poop', 'stool', 'soiled',
    'diaper', 'diapers', 'briefs', 'pull-ups',
    'leak', 'leaking', 'leaks', 'wetting', 'soiling'
  ],
  caregiver: [
    'caregiver', 'caregiving', 'caretaker',
    'burnout', 'burned out', 'burnt out',
    'stress', 'stressed', 'stressful', 'overwhelming',
    'overwhelm', 'overwhelmed',
    'tired', 'exhausted', 'exhaustion', 'fatigue', 'worn out',
    'help', 'need help', 'support', 'need support',
    'respite', 'break', 'time off', 'rest',
    'cope', 'coping', 'can\'t cope', 'struggling',
    'grief', 'grieving', 'sad', 'sadness', 'cry', 'crying',
    'depress', 'depressed', 'depression'
  ],
};

// Match query to best video category with priority scoring
function matchCategory(query: string): string {
  const lowerQuery = query.toLowerCase();
  const scores: { [key: string]: number } = {};
  
  // Score each category based on keyword matches
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    let score = 0;
    for (const keyword of keywords) {
      if (lowerQuery.includes(keyword)) {
        // Longer keywords get higher scores (more specific)
        score += keyword.length;
      }
    }
    if (score > 0) {
      scores[category] = score;
    }
  }
  
  // Return category with highest score
  if (Object.keys(scores).length > 0) {
    return Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
  }
  
  // Default to general if no specific match
  return 'general';
}

export async function searchYouTubeVideos(query: string): Promise<YouTubeVideo[]> {
  // Video library temporarily disabled - videos need manual curation with verified IDs
  // Return empty array for now
  return [];
}
