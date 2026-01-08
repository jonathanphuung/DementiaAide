export interface AICareResponse {
  explanation: string;
  tips: string[];
  searchSuggestions: string[];
  relatedTopics: string[];
  category: 'Behavior' | 'Safety' | 'Daily Care' | 'Communication' | 'Activities' | 'Health' | 'General';
}

// Enhanced keyword-based category and scenario detection
function detectCategoryAndScenario(query: string): { category: string; scenario: string } {
  const lowerQuery = query.toLowerCase();
  
  // Specific scenario detection for more targeted responses
  
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
  if (lowerQuery.match(/won'?t.*bath|refuse.*bath|refuse.*shower|afraid.*water|hate.*bath/)) {
    return { category: 'daily', scenario: 'bathing_resistance' };
  }
  if (lowerQuery.match(/incontin|accident|urinat|bowel|diaper|toilet/)) {
    return { category: 'daily', scenario: 'incontinence' };
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
  
  return { category: 'general', scenario: 'general' };
}

export async function analyzeCareQuery(query: string): Promise<AICareResponse> {
  try {
    // Detect category and specific scenario from keywords
    const { category: detectedCategory, scenario } = detectCategoryAndScenario(query);
    
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

    return {
      explanation: baseResponse.explanation || 'Understanding dementia care helps provide better support.',
      tips: baseResponse.tips || ['Learn about the condition', 'Establish routines', 'Seek support'],
      searchSuggestions: searchSuggestions.slice(0, 5),
      relatedTopics: relatedTopics.slice(0, 6),
      category: baseResponse.category as any || 'General'
    };
  } catch (error) {
    console.error('Error analyzing care query:', error);
    return {
      explanation: "I'm here to help with your dementia care questions. Please describe the situation you're facing, and I'll provide relevant advice and resources.",
      tips: ["Be specific about the situation", "Mention any recent changes", "Note the time of day when issues occur"],
      searchSuggestions: ["dementia care basics", "caregiver support"],
      relatedTopics: ["dementia care", "caregiver support", "dementia symptoms"],
      category: "General"
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