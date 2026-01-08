export interface AICareResponse {
  explanation: string;
  tips: string[];
  searchSuggestions: string[];
  relatedTopics: string[];
  category: 'Behavior' | 'Safety' | 'Daily Care' | 'Communication' | 'Activities' | 'Health' | 'General';
}

// Keyword-based category detection
function detectCategory(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  // Behavior keywords
  if (lowerQuery.match(/aggress|angry|agitat|yell|hit|violent|stubborn|resist|refus|wander|pacing|repetitive|confusion|sundown/)) {
    return 'behavior';
  }
  
  // Safety keywords
  if (lowerQuery.match(/safe|danger|fall|wander|lock|alarm|emergency|accident|risk|secure|protect|night|lost/)) {
    return 'safety';
  }
  
  // Daily Care keywords
  if (lowerQuery.match(/bath|dress|toilet|eat|food|meal|cloth|shower|hygiene|grooming|incontinence/)) {
    return 'daily';
  }
  
  // Communication keywords
  if (lowerQuery.match(/talk|speak|communicate|understand|conversation|language|words|express|respond/)) {
    return 'communication';
  }
  
  // Activities keywords
  if (lowerQuery.match(/activit|game|music|exercise|hobby|engage|entertain|bored|stimulat|occupy/)) {
    return 'activities';
  }
  
  // Health keywords
  if (lowerQuery.match(/health|doctor|medicin|symptom|pain|sick|ill|hospital|treatment|diagnosis/)) {
    return 'health';
  }
  
  return 'general';
}

export async function analyzeCareQuery(query: string): Promise<AICareResponse> {
  try {
    // Detect category from keywords
    const detectedCategory = detectCategory(query);
    
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

    const baseResponse = categoryMap[detectedCategory] || categoryMap.general;

    // Create search suggestions based on detected category and query
    const searchSuggestions = [
      `${query}`,
      `${baseResponse.category?.toLowerCase()} strategies in dementia care`,
      `managing dementia ${detectedCategory}`,
      'evidence-based dementia care approaches',
      'professional dementia care resources'
    ].filter(Boolean);

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
    const category = detectCategory(content);
    
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
    const category = detectCategory(query);
    
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