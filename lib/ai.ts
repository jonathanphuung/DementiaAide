import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY || 'hf_dummy');
// Note: You can get a free API key from https://huggingface.co/settings/tokens

export interface AICareResponse {
  explanation: string;
  tips: string[];
  searchSuggestions: string[];
  relatedTopics: string[];
  category: 'Behavior' | 'Safety' | 'Daily Care' | 'Communication' | 'Activities' | 'Health' | 'General';
}

export async function analyzeCareQuery(query: string): Promise<AICareResponse> {
  try {
    // Using emotion analysis to determine the context and tone
    const emotionResult = await hf.textClassification({
      model: 'j-hartmann/emotion-english-distilroberta-base',
      inputs: query
    });

    // Map emotions to appropriate responses
    const emotionMap: { [key: string]: Partial<AICareResponse> } = {
      joy: {
        category: 'Activities',
        explanation: 'It\'s wonderful that you\'re seeking positive activities for dementia care. Engaging in enjoyable activities can significantly improve quality of life for both the person with dementia and their caregivers. Activities that bring joy not only help maintain cognitive function but also strengthen emotional bonds and create meaningful moments together.',
        tips: [
          'Continue engaging in enjoyable activities that connect with past interests and hobbies',
          'Maintain a consistent routine but be flexible when needed',
          'Celebrate small victories and positive moments throughout the day',
          'Use music, art, or gentle exercise to promote engagement',
          'Create a memory book or photo album to reminisce together',
          'Schedule activities during the person\'s best time of day',
          'Break activities into simple, manageable steps',
          'Focus on the process rather than the outcome of activities'
        ]
      },
      sadness: {
        category: 'Communication',
        explanation: 'It\'s completely normal and valid to feel emotional when dealing with dementia care challenges. The journey of caring for someone with dementia can be emotionally demanding, and it\'s important to acknowledge these feelings while also finding healthy ways to cope and communicate. Remember that seeking support is a sign of strength, not weakness.',
        tips: [
          'Take time for self-care and emotional well-being',
          'Seek support from family, friends, or support groups',
          'Practice patience and understanding with yourself and your loved one',
          'Use clear, simple language when communicating',
          'Pay attention to non-verbal cues and body language',
          'Join a caregiver support group to share experiences',
          'Consider professional counseling or therapy',
          'Keep a journal to process your emotions',
          'Take regular breaks to prevent emotional exhaustion',
          'Maintain connections with your support network'
        ]
      },
      anger: {
        category: 'Behavior',
        explanation: 'Challenging behaviors are common in dementia care, and it\'s natural to feel frustrated at times. Understanding that these behaviors are part of the condition, not intentional actions, can help in developing effective management strategies. The key is to focus on the underlying needs or triggers while maintaining a calm, supportive environment.',
        tips: [
          'Try to identify specific triggers for difficult behaviors',
          'Stay calm and patient, even in challenging moments',
          'Consider environmental factors like noise, lighting, or time of day',
          'Keep a behavior log to track patterns and triggers',
          'Use redirection instead of confrontation',
          'Ensure basic needs are met (hunger, thirst, comfort)',
          'Maintain a consistent daily routine',
          'Create a calming environment',
          'Use positive reinforcement for good behaviors',
          'Consult with healthcare providers about behavior management strategies'
        ]
      },
      fear: {
        category: 'Safety',
        explanation: 'Your concern for safety is crucial in providing good dementia care. Creating a secure environment while maintaining dignity and independence requires careful balance. Safety planning is an ongoing process that should adapt as needs change, and it\'s important to stay proactive rather than reactive in addressing safety concerns.',
        tips: [
          'Create a safe, clearly organized environment',
          'Establish regular check-ins and monitoring systems',
          'Have emergency contacts and plans readily available',
          'Install safety devices like grab bars and night lights',
          'Remove or secure potentially dangerous items',
          'Use door alarms or monitoring systems if wandering is a concern',
          'Keep important medications secure and organized',
          'Create a detailed emergency plan',
          'Regular safety assessments of the living space',
          'Consider medical alert systems or GPS devices'
        ]
      },
      surprise: {
        category: 'Daily Care',
        explanation: 'Unexpected situations are common in dementia care, and being prepared while maintaining flexibility is key. Each day may bring new challenges, but viewing these as opportunities to learn and adapt can help build resilience. Having structured routines while being ready to adjust them helps maintain a balance between consistency and adaptability.',
        tips: [
          'Maintain flexible routines that can adapt to changing needs',
          'Have backup plans ready for common situations',
          'Document new developments and successful strategies',
          'Keep a daily log of activities and observations',
          'Prepare for different scenarios in advance',
          'Build a network of backup caregivers',
          'Keep essential supplies well-stocked',
          'Learn to recognize early signs of changes in condition',
          'Stay connected with healthcare providers',
          'Practice stress-management techniques for unexpected situations'
        ]
      },
      neutral: {
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

    const emotion = emotionResult[0].label.toLowerCase();
    const baseResponse = emotionMap[emotion] || emotionMap.neutral;

    // Get emotion confidence scores
    const emotionScores = emotionResult.reduce((acc, item) => {
      acc[item.label.toLowerCase()] = item.score;
      return acc;
    }, {} as Record<string, number>);

    // Get secondary emotion for more nuanced responses
    const secondaryEmotion = emotionResult[1]?.label.toLowerCase();

    // Combine primary and secondary emotion responses
    const secondaryResponse = emotionMap[secondaryEmotion] || emotionMap.neutral;

    // Create detailed search suggestions based on emotion context
    const searchSuggestions = [
      `${baseResponse.category?.toLowerCase()} strategies in dementia care`,
      `managing ${emotion} in dementia care`,
      `${secondaryEmotion} coping techniques dementia`,
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
      searchSuggestions: searchSuggestions.slice(0, 5), // Take top 5 suggestions
      relatedTopics: relatedTopics.slice(0, 6), // Take top 6 related topics
      category: baseResponse.category as any || 'General'
    };
  } catch (error) {
    console.error('Error analyzing care query:', error);
    return {
      explanation: "I apologize, but I'm having trouble processing your query at the moment. Please try again.",
      tips: ["Consider rephrasing your question", "Try breaking down complex questions into simpler ones"],
      searchSuggestions: ["dementia care basics"],
      relatedTopics: ["dementia care", "caregiver support", "dementia symptoms"],
      category: "General"
    };
  }
}

export async function categorizeContent(content: string): Promise<string[]> {
  try {
    // Using free emotion detection model
    const result = await hf.textClassification({
      model: 'j-hartmann/emotion-english-distilroberta-base',
      inputs: content
    });

    // Map emotions to dementia care categories
    const emotionToCategory: { [key: string]: string } = {
      joy: 'Activities',
      sadness: 'Communication',
      anger: 'Behavior',
      fear: 'Safety',
      surprise: 'Daily Care',
      disgust: 'Health',
      neutral: 'General'
    };

    // Get the category based on the detected emotion
    const category = emotionToCategory[result[0].label.toLowerCase()] || 'General';
    return [category, 'Dementia Care'];
  } catch (error) {
    console.error('Error categorizing content:', error);
    return ['Dementia Care'];
  }
}

export async function enhanceSearchQuery(query: string): Promise<string> {
  try {
    // Using emotion detection to enhance the query with relevant terms
    const result = await hf.textClassification({
      model: 'j-hartmann/emotion-english-distilroberta-base',
      inputs: query
    });

    const emotion = result[0].label.toLowerCase();
    const emotionToKeywords: { [key: string]: string[] } = {
      joy: ['positive', 'activities', 'engagement'],
      sadness: ['support', 'coping', 'care'],
      anger: ['managing', 'behavior', 'strategies'],
      fear: ['safety', 'prevention', 'security'],
      surprise: ['adapting', 'changes', 'flexibility'],
      disgust: ['hygiene', 'health', 'care'],
      neutral: ['general', 'basic', 'guide']
    };

    const keywords = emotionToKeywords[emotion] || emotionToKeywords.neutral;
    const enhancedQuery = `${query} ${keywords.join(' ')} dementia care`;

    return enhancedQuery;
  } catch (error) {
    console.error('Error enhancing search query:', error);
    return query;
  }
}

// Temporary test function - remove after testing
export async function testHuggingFace() {
  try {
    console.log('Testing Hugging Face API...');
    // Using a completely free model
    const result = await hf.textClassification({
      model: 'j-hartmann/emotion-english-distilroberta-base',
      inputs: 'Hello, how are you?'
    });
    console.log('Success!', result);
    return result;
  } catch (error) {
    console.error('Hugging Face API Test Error:', error);
    throw error;
  }
}