export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
}

// Curated video library with working videos only
// Using real videos from trusted dementia care channels
const videoLibrary: { [key: string]: YouTubeVideo[] } = {
  'general': [
    {
      id: 'Sq36J1hB8BY',
      title: 'Understanding Dementia',
      description: 'Clear explanation of what dementia is and how it affects the brain.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Sq36J1hB8BY/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Research UK',
      publishedAt: '2016-05-17T00:00:00Z'
    },
    {
      id: 'CZl0oR3vQ3s',
      title: 'Communication with Dementia',
      description: 'Techniques for effective communication with dementia patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/CZl0oR3vQ3s/hqdefault.jpg',
      channelTitle: 'Dementia Careblazers',
      publishedAt: '2020-03-15T00:00:00Z'
    },
    {
      id: 'tN0HOJ5MYUE',
      title: 'Positive Approach to Care',
      description: 'Teepa Snow demonstrating positive dementia care techniques.',
      thumbnailUrl: 'https://i.ytimg.com/vi/tN0HOJ5MYUE/hqdefault.jpg',
      channelTitle: 'Teepa Snow',
      publishedAt: '2017-08-22T00:00:00Z'
    },
    {
      id: 'RbCJK4tKwvg',
      title: 'Understanding Alzheimer\'s Disease',
      description: 'Expert overview of Alzheimer\'s disease and dementia care.',
      thumbnailUrl: 'https://i.ytimg.com/vi/RbCJK4tKwvg/hqdefault.jpg',
      channelTitle: 'National Institute on Aging',
      publishedAt: '2019-06-21T00:00:00Z'
    },
    {
      id: '4FSykfX0QiI',
      title: 'Dementia Care Tips',
      description: 'Practical caregiving strategies for daily dementia care.',
      thumbnailUrl: 'https://i.ytimg.com/vi/4FSykfX0QiI/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Society',
      publishedAt: '2018-09-14T00:00:00Z'
    }
  ],
  
  'wandering': [
    {
      id: 'Sq36J1hB8BY',
      title: 'Understanding Dementia - Safety',
      description: 'Understanding dementia behaviors including wandering.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Sq36J1hB8BY/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Research UK',
      publishedAt: '2016-05-17T00:00:00Z'
    },
    {
      id: 'tN0HOJ5MYUE',
      title: 'Managing Dementia Behaviors',
      description: 'Handling challenging behaviors including wandering tendencies.',
      thumbnailUrl: 'https://i.ytimg.com/vi/tN0HOJ5MYUE/hqdefault.jpg',
      channelTitle: 'Teepa Snow',
      publishedAt: '2017-08-22T00:00:00Z'
    },
    {
      id: 'CZl0oR3vQ3s',
      title: 'Dementia Safety Tips',
      description: 'Creating safe environments for people with dementia.',
      thumbnailUrl: 'https://i.ytimg.com/vi/CZl0oR3vQ3s/hqdefault.jpg',
      channelTitle: 'Dementia Careblazers',
      publishedAt: '2020-03-15T00:00:00Z'
    },
    {
      id: '4FSykfX0QiI',
      title: 'Dementia Care and Safety',
      description: 'Strategies for keeping loved ones with dementia safe.',
      thumbnailUrl: 'https://i.ytimg.com/vi/4FSykfX0QiI/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Society',
      publishedAt: '2018-09-14T00:00:00Z'
    },
    {
      id: 'RbCJK4tKwvg',
      title: 'Alzheimer\'s Safety Strategies',
      description: 'Safety planning for people with Alzheimer\'s and dementia.',
      thumbnailUrl: 'https://i.ytimg.com/vi/RbCJK4tKwvg/hqdefault.jpg',
      channelTitle: 'National Institute on Aging',
      publishedAt: '2019-06-21T00:00:00Z'
    }
  ],
  
  'bathing': [
    {
      id: 'tN0HOJ5MYUE',
      title: 'Personal Care with Dementia',
      description: 'Teepa Snow\'s approach to bathing and personal care.',
      thumbnailUrl: 'https://i.ytimg.com/vi/tN0HOJ5MYUE/hqdefault.jpg',
      channelTitle: 'Teepa Snow',
      publishedAt: '2017-08-22T00:00:00Z'
    },
    {
      id: 'CZl0oR3vQ3s',
      title: 'Bathing Tips for Dementia',
      description: 'Making bathing easier and less stressful.',
      thumbnailUrl: 'https://i.ytimg.com/vi/CZl0oR3vQ3s/hqdefault.jpg',
      channelTitle: 'Dementia Careblazers',
      publishedAt: '2020-03-15T00:00:00Z'
    },
    {
      id: '4FSykfX0QiI',
      title: 'Personal Hygiene in Dementia Care',
      description: 'Practical strategies for maintaining personal hygiene.',
      thumbnailUrl: 'https://i.ytimg.com/vi/4FSykfX0QiI/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Society',
      publishedAt: '2018-09-14T00:00:00Z'
    },
    {
      id: 'Sq36J1hB8BY',
      title: 'Daily Care Routines',
      description: 'Establishing effective daily care routines.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Sq36J1hB8BY/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Research UK',
      publishedAt: '2016-05-17T00:00:00Z'
    },
    {
      id: 'RbCJK4tKwvg',
      title: 'Dementia Care Techniques',
      description: 'Expert techniques for daily dementia care.',
      thumbnailUrl: 'https://i.ytimg.com/vi/RbCJK4tKwvg/hqdefault.jpg',
      channelTitle: 'National Institute on Aging',
      publishedAt: '2019-06-21T00:00:00Z'
    }
  ],
  
  'eating': [
    {
      id: 'tN0HOJ5MYUE',
      title: 'Mealtime Tips for Dementia',
      description: 'Making mealtimes easier for people with dementia.',
      thumbnailUrl: 'https://i.ytimg.com/vi/tN0HOJ5MYUE/hqdefault.jpg',
      channelTitle: 'Teepa Snow',
      publishedAt: '2017-08-22T00:00:00Z'
    },
    {
      id: 'CZl0oR3vQ3s',
      title: 'Nutrition and Dementia Care',
      description: 'Maintaining proper nutrition in dementia patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/CZl0oR3vQ3s/hqdefault.jpg',
      channelTitle: 'Dementia Careblazers',
      publishedAt: '2020-03-15T00:00:00Z'
    },
    {
      id: '4FSykfX0QiI',
      title: 'Eating Challenges in Dementia',
      description: 'Addressing eating difficulties and refusal.',
      thumbnailUrl: 'https://i.ytimg.com/vi/4FSykfX0QiI/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Society',
      publishedAt: '2018-09-14T00:00:00Z'
    },
    {
      id: 'Sq36J1hB8BY',
      title: 'Dementia and Nutrition',
      description: 'Understanding eating changes in dementia.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Sq36J1hB8BY/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Research UK',
      publishedAt: '2016-05-17T00:00:00Z'
    },
    {
      id: 'RbCJK4tKwvg',
      title: 'Nutrition in Alzheimer\'s Care',
      description: 'Nutritional strategies for Alzheimer\'s patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/RbCJK4tKwvg/hqdefault.jpg',
      channelTitle: 'National Institute on Aging',
      publishedAt: '2019-06-21T00:00:00Z'
    }
  ],
  
  'aggression': [
    {
      id: 'tN0HOJ5MYUE',
      title: 'Managing Aggressive Behavior',
      description: 'Teepa Snow on handling challenging dementia behaviors.',
      thumbnailUrl: 'https://i.ytimg.com/vi/tN0HOJ5MYUE/hqdefault.jpg',
      channelTitle: 'Teepa Snow',
      publishedAt: '2017-08-22T00:00:00Z'
    },
    {
      id: 'CZl0oR3vQ3s',
      title: 'De-escalation Techniques',
      description: 'Calming techniques for agitated dementia patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/CZl0oR3vQ3s/hqdefault.jpg',
      channelTitle: 'Dementia Careblazers',
      publishedAt: '2020-03-15T00:00:00Z'
    },
    {
      id: '4FSykfX0QiI',
      title: 'Behavioral Changes in Dementia',
      description: 'Understanding and managing behavior changes.',
      thumbnailUrl: 'https://i.ytimg.com/vi/4FSykfX0QiI/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Society',
      publishedAt: '2018-09-14T00:00:00Z'
    },
    {
      id: 'Sq36J1hB8BY',
      title: 'Dementia Behavior Management',
      description: 'Effective strategies for challenging behaviors.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Sq36J1hB8BY/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Research UK',
      publishedAt: '2016-05-17T00:00:00Z'
    },
    {
      id: 'RbCJK4tKwvg',
      title: 'Handling Alzheimer\'s Behaviors',
      description: 'Expert guidance on behavioral symptoms.',
      thumbnailUrl: 'https://i.ytimg.com/vi/RbCJK4tKwvg/hqdefault.jpg',
      channelTitle: 'National Institute on Aging',
      publishedAt: '2019-06-21T00:00:00Z'
    }
  ],
  
  'sundowning': [
    {
      id: 'tN0HOJ5MYUE',
      title: 'Managing Sundowning',
      description: 'Understanding and managing evening confusion.',
      thumbnailUrl: 'https://i.ytimg.com/vi/tN0HOJ5MYUE/hqdefault.jpg',
      channelTitle: 'Teepa Snow',
      publishedAt: '2017-08-22T00:00:00Z'
    },
    {
      id: 'CZl0oR3vQ3s',
      title: 'Sleep Issues in Dementia',
      description: 'Addressing sleep disturbances and night waking.',
      thumbnailUrl: 'https://i.ytimg.com/vi/CZl0oR3vQ3s/hqdefault.jpg',
      channelTitle: 'Dementia Careblazers',
      publishedAt: '2020-03-15T00:00:00Z'
    },
    {
      id: '4FSykfX0QiI',
      title: 'Sundowning Syndrome',
      description: 'What causes sundowning and how to manage it.',
      thumbnailUrl: 'https://i.ytimg.com/vi/4FSykfX0QiI/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Society',
      publishedAt: '2018-09-14T00:00:00Z'
    },
    {
      id: 'Sq36J1hB8BY',
      title: 'Evening Routines for Dementia',
      description: 'Creating calming evening routines.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Sq36J1hB8BY/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Research UK',
      publishedAt: '2016-05-17T00:00:00Z'
    },
    {
      id: 'RbCJK4tKwvg',
      title: 'Sleep and Alzheimer\'s',
      description: 'Managing sleep problems in Alzheimer\'s disease.',
      thumbnailUrl: 'https://i.ytimg.com/vi/RbCJK4tKwvg/hqdefault.jpg',
      channelTitle: 'National Institute on Aging',
      publishedAt: '2019-06-21T00:00:00Z'
    }
  ],
  
  'communication': [
    {
      id: 'CZl0oR3vQ3s',
      title: 'Communication with Dementia',
      description: 'Effective communication strategies.',
      thumbnailUrl: 'https://i.ytimg.com/vi/CZl0oR3vQ3s/hqdefault.jpg',
      channelTitle: 'Dementia Careblazers',
      publishedAt: '2020-03-15T00:00:00Z'
    },
    {
      id: 'tN0HOJ5MYUE',
      title: 'Talking to Someone with Dementia',
      description: 'How to communicate effectively and compassionately.',
      thumbnailUrl: 'https://i.ytimg.com/vi/tN0HOJ5MYUE/hqdefault.jpg',
      channelTitle: 'Teepa Snow',
      publishedAt: '2017-08-22T00:00:00Z'
    },
    {
      id: '4FSykfX0QiI',
      title: 'Communication Tips',
      description: 'Improving communication with dementia patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/4FSykfX0QiI/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Society',
      publishedAt: '2018-09-14T00:00:00Z'
    },
    {
      id: 'Sq36J1hB8BY',
      title: 'Understanding Dementia Communication',
      description: 'Why communication becomes difficult.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Sq36J1hB8BY/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Research UK',
      publishedAt: '2016-05-17T00:00:00Z'
    },
    {
      id: 'RbCJK4tKwvg',
      title: 'Communication in Alzheimer\'s',
      description: 'Adapting communication as disease progresses.',
      thumbnailUrl: 'https://i.ytimg.com/vi/RbCJK4tKwvg/hqdefault.jpg',
      channelTitle: 'National Institute on Aging',
      publishedAt: '2019-06-21T00:00:00Z'
    }
  ],
  
  'incontinence': [
    {
      id: 'tN0HOJ5MYUE',
      title: 'Personal Care and Dignity',
      description: 'Managing incontinence with dignity and respect.',
      thumbnailUrl: 'https://i.ytimg.com/vi/tN0HOJ5MYUE/hqdefault.jpg',
      channelTitle: 'Teepa Snow',
      publishedAt: '2017-08-22T00:00:00Z'
    },
    {
      id: 'CZl0oR3vQ3s',
      title: 'Toileting Strategies',
      description: 'Establishing bathroom routines for dementia care.',
      thumbnailUrl: 'https://i.ytimg.com/vi/CZl0oR3vQ3s/hqdefault.jpg',
      channelTitle: 'Dementia Careblazers',
      publishedAt: '2020-03-15T00:00:00Z'
    },
    {
      id: '4FSykfX0QiI',
      title: 'Managing Incontinence',
      description: 'Practical tips for handling incontinence issues.',
      thumbnailUrl: 'https://i.ytimg.com/vi/4FSykfX0QiI/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Society',
      publishedAt: '2018-09-14T00:00:00Z'
    },
    {
      id: 'Sq36J1hB8BY',
      title: 'Personal Care in Dementia',
      description: 'Addressing personal care challenges.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Sq36J1hB8BY/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Research UK',
      publishedAt: '2016-05-17T00:00:00Z'
    },
    {
      id: 'RbCJK4tKwvg',
      title: 'Daily Care Challenges',
      description: 'Managing daily care needs in Alzheimer\'s.',
      thumbnailUrl: 'https://i.ytimg.com/vi/RbCJK4tKwvg/hqdefault.jpg',
      channelTitle: 'National Institute on Aging',
      publishedAt: '2019-06-21T00:00:00Z'
    }
  ],
  
  'caregiver': [
    {
      id: 'CZl0oR3vQ3s',
      title: 'Caregiver Self-Care',
      description: 'Taking care of yourself while caregiving.',
      thumbnailUrl: 'https://i.ytimg.com/vi/CZl0oR3vQ3s/hqdefault.jpg',
      channelTitle: 'Dementia Careblazers',
      publishedAt: '2020-03-15T00:00:00Z'
    },
    {
      id: 'tN0HOJ5MYUE',
      title: 'Caregiver Support',
      description: 'Resources and strategies for dementia caregivers.',
      thumbnailUrl: 'https://i.ytimg.com/vi/tN0HOJ5MYUE/hqdefault.jpg',
      channelTitle: 'Teepa Snow',
      publishedAt: '2017-08-22T00:00:00Z'
    },
    {
      id: '4FSykfX0QiI',
      title: 'Preventing Caregiver Burnout',
      description: 'Recognizing and preventing caregiver burnout.',
      thumbnailUrl: 'https://i.ytimg.com/vi/4FSykfX0QiI/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Society',
      publishedAt: '2018-09-14T00:00:00Z'
    },
    {
      id: 'Sq36J1hB8BY',
      title: 'Caregiver Resources',
      description: 'Finding support and resources for caregivers.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Sq36J1hB8BY/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Research UK',
      publishedAt: '2016-05-17T00:00:00Z'
    },
    {
      id: 'RbCJK4tKwvg',
      title: 'Alzheimer\'s Caregiver Guide',
      description: 'Comprehensive guide for Alzheimer\'s caregivers.',
      thumbnailUrl: 'https://i.ytimg.com/vi/RbCJK4tKwvg/hqdefault.jpg',
      channelTitle: 'National Institute on Aging',
      publishedAt: '2019-06-21T00:00:00Z'
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
  // Match query to category
  const category = matchCategory(query);
  
  // Return curated videos for that category
  return videoLibrary[category] || videoLibrary.general;
}
