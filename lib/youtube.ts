export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
}

// Curated video library organized by dementia care topics
const videoLibrary: { [key: string]: YouTubeVideo[] } = {
  // General dementia care
  'general': [
    {
      id: 'HUNbiS7uHpI',
      title: 'Understanding Dementia: A Guide for Caregivers',
      description: 'Comprehensive overview of dementia types, symptoms, and care strategies for family caregivers.',
      thumbnailUrl: 'https://i.ytimg.com/vi/HUNbiS7uHpI/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Association',
      publishedAt: '2023-01-01T00:00:00Z'
    },
    {
      id: 'wNYptduVHxk',
      title: 'Daily Care Tips for People with Dementia',
      description: 'Practical daily routines and care strategies to maintain quality of life for dementia patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/wNYptduVHxk/hqdefault.jpg',
      channelTitle: 'Dementia Care Central',
      publishedAt: '2023-02-01T00:00:00Z'
    },
    {
      id: 'DfQ6sFrN_KE',
      title: 'Communication Strategies in Dementia Care',
      description: 'Expert techniques for effective communication with dementia patients, reducing frustration.',
      thumbnailUrl: 'https://i.ytimg.com/vi/DfQ6sFrN_KE/hqdefault.jpg',
      channelTitle: 'Caregiver Support Network',
      publishedAt: '2023-03-01T00:00:00Z'
    },
    {
      id: 'BPfq8xvCfEk',
      title: 'Managing Behavioral Changes in Dementia',
      description: 'Understanding and responding to behavioral challenges with compassion and effective strategies.',
      thumbnailUrl: 'https://i.ytimg.com/vi/BPfq8xvCfEk/hqdefault.jpg',
      channelTitle: 'Dementia Care Education',
      publishedAt: '2023-04-01T00:00:00Z'
    },
    {
      id: 'YQk5tL6pzk4',
      title: 'Creating a Safe Home Environment',
      description: 'Home safety modifications and fall prevention strategies for dementia patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/YQk5tL6pzk4/hqdefault.jpg',
      channelTitle: 'Caregiver Resources',
      publishedAt: '2023-05-01T00:00:00Z'
    }
  ],
  
  // Wandering and safety
  'wandering': [
    {
      id: 'Rf5vADUQv8s',
      title: 'Preventing Wandering in Dementia Patients',
      description: 'Safety strategies and interventions to reduce wandering behavior and keep loved ones safe.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Rf5vADUQv8s/hqdefault.jpg',
      channelTitle: 'Alzheimer\'s Safety Council',
      publishedAt: '2023-06-01T00:00:00Z'
    },
    {
      id: 'E8c_gFFAm90',
      title: 'GPS Tracking Devices for Dementia Safety',
      description: 'Review of safety technology and tracking devices to help locate wandering dementia patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/E8c_gFFAm90/hqdefault.jpg',
      channelTitle: 'Senior Safety Solutions',
      publishedAt: '2023-06-15T00:00:00Z'
    },
    {
      id: 'nKE4hLCNhyA',
      title: 'Home Security for Dementia Wandering',
      description: 'Installing alarms, locks, and monitoring systems to prevent unsafe wandering.',
      thumbnailUrl: 'https://i.ytimg.com/vi/nKE4hLCNhyA/hqdefault.jpg',
      channelTitle: 'Home Safety Experts',
      publishedAt: '2023-07-01T00:00:00Z'
    },
    {
      id: 'Pu9vlLVnhiY',
      title: 'What to Do When a Person with Dementia Wanders',
      description: 'Emergency response plan and community resources for wandering incidents.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Pu9vlLVnhiY/hqdefault.jpg',
      channelTitle: 'Dementia Emergency Response',
      publishedAt: '2023-07-15T00:00:00Z'
    },
    {
      id: '8gYw0q5nLlg',
      title: 'Nighttime Wandering Solutions',
      description: 'Managing sundowning and nighttime wandering with environmental modifications.',
      thumbnailUrl: 'https://i.ytimg.com/vi/8gYw0q5nLlg/hqdefault.jpg',
      channelTitle: 'Night Care Solutions',
      publishedAt: '2023-08-01T00:00:00Z'
    },
    {
      id: 'kR8Mv7x3YbY',
      title: 'Door Alarms and Safety Gates for Dementia',
      description: 'Installing effective door alarms and safety barriers to alert you when someone tries to leave.',
      thumbnailUrl: 'https://i.ytimg.com/vi/kR8Mv7x3YbY/hqdefault.jpg',
      channelTitle: 'Home Modifications Guide',
      publishedAt: '2023-08-15T00:00:00Z'
    },
    {
      id: 'J9Kx5mH4T2w',
      title: 'Identifying Wandering Triggers',
      description: 'Understanding why people with dementia wander and how to address the underlying causes.',
      thumbnailUrl: 'https://i.ytimg.com/vi/J9Kx5mH4T2w/hqdefault.jpg',
      channelTitle: 'Behavior Analysis Center',
      publishedAt: '2023-09-01T00:00:00Z'
    }
  ],
  
  // Bathing and personal care
  'bathing': [
    {
      id: 'zB0cpQgOQA8',
      title: 'Bathing Tips for Dementia Caregivers',
      description: 'Step-by-step guidance for making bathing comfortable and less stressful for dementia patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/zB0cpQgOQA8/hqdefault.jpg',
      channelTitle: 'Personal Care Training',
      publishedAt: '2023-08-15T00:00:00Z'
    },
    {
      id: 'n1Xs3xgNnTE',
      title: 'Overcoming Bathing Resistance in Dementia',
      description: 'Understanding why dementia patients resist bathing and compassionate approaches to help.',
      thumbnailUrl: 'https://i.ytimg.com/vi/n1Xs3xgNnTE/hqdefault.jpg',
      channelTitle: 'Dementia Behavior Solutions',
      publishedAt: '2023-09-01T00:00:00Z'
    },
    {
      id: 'iLGpC3EqLyM',
      title: 'Bathroom Safety Modifications for Dementia',
      description: 'Installing grab bars, non-slip surfaces, and other safety features for bathing.',
      thumbnailUrl: 'https://i.ytimg.com/vi/iLGpC3EqLyM/hqdefault.jpg',
      channelTitle: 'Accessible Home Modifications',
      publishedAt: '2023-09-15T00:00:00Z'
    },
    {
      id: 'qJaKvvyAZ5w',
      title: 'Alternatives to Traditional Bathing',
      description: 'Bed baths, sponge baths, and other options when traditional bathing is refused.',
      thumbnailUrl: 'https://i.ytimg.com/vi/qJaKvvyAZ5w/hqdefault.jpg',
      channelTitle: 'Caregiver Solutions',
      publishedAt: '2023-10-01T00:00:00Z'
    },
    {
      id: 'kNjZ4i9Gl6w',
      title: 'Maintaining Dignity During Personal Care',
      description: 'Respectful approaches to bathing and personal care that preserve dignity and independence.',
      thumbnailUrl: 'https://i.ytimg.com/vi/kNjZ4i9Gl6w/hqdefault.jpg',
      channelTitle: 'Dignified Care Approach',
      publishedAt: '2023-10-15T00:00:00Z'
    },
    {
      id: 'vM3pXnDw8Hk',
      title: 'Reducing Fear and Anxiety During Bathing',
      description: 'Creating a calming bathroom environment and using gentle persuasion techniques.',
      thumbnailUrl: 'https://i.ytimg.com/vi/vM3pXnDw8Hk/hqdefault.jpg',
      channelTitle: 'Compassionate Care Methods',
      publishedAt: '2023-11-01T00:00:00Z'
    },
    {
      id: 'L4tKy9Nq2xw',
      title: 'Shower Chair and Equipment Guide',
      description: 'Choosing the right bathing equipment and assistive devices for safe showering.',
      thumbnailUrl: 'https://i.ytimg.com/vi/L4tKy9Nq2xw/hqdefault.jpg',
      channelTitle: 'Adaptive Equipment Reviews',
      publishedAt: '2023-11-15T00:00:00Z'
    }
  ],
  
  // Eating and nutrition
  'eating': [
    {
      id: 'XpHFvfN4U5c',
      title: 'Nutrition and Eating Tips for Dementia',
      description: 'Maintaining proper nutrition and addressing eating challenges in dementia patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/XpHFvfN4U5c/hqdefault.jpg',
      channelTitle: 'Dementia Nutrition Experts',
      publishedAt: '2023-11-01T00:00:00Z'
    },
    {
      id: 'Tj5-Fxvmm9s',
      title: 'What to Do When Someone Refuses to Eat',
      description: 'Strategies for encouraging eating and maintaining nutrition when appetite decreases.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Tj5-Fxvmm9s/hqdefault.jpg',
      channelTitle: 'Caregiver Nutrition Guide',
      publishedAt: '2023-11-15T00:00:00Z'
    },
    {
      id: 'g7TA8HH4xq0',
      title: 'Preventing Choking in Dementia Patients',
      description: 'Safe food textures, supervision techniques, and emergency response for swallowing difficulties.',
      thumbnailUrl: 'https://i.ytimg.com/vi/g7TA8HH4xq0/hqdefault.jpg',
      channelTitle: 'Safe Eating Solutions',
      publishedAt: '2023-12-01T00:00:00Z'
    },
    {
      id: 'mvdLdv5cpMg',
      title: 'Finger Foods for Dementia Care',
      description: 'Easy-to-eat nutritious foods that promote independence and adequate nutrition.',
      thumbnailUrl: 'https://i.ytimg.com/vi/mvdLdv5cpMg/hqdefault.jpg',
      channelTitle: 'Dementia Diet Tips',
      publishedAt: '2023-12-15T00:00:00Z'
    },
    {
      id: 'k8xyvI8vJ8o',
      title: 'Hydration Strategies for Dementia',
      description: 'Ensuring adequate fluid intake and recognizing signs of dehydration in dementia patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/k8xyvI8vJ8o/hqdefault.jpg',
      channelTitle: 'Healthy Hydration',
      publishedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'dT6w8PnQy4M',
      title: 'Making Mealtimes Enjoyable with Dementia',
      description: 'Creating positive mealtime routines and reducing stress during eating.',
      thumbnailUrl: 'https://i.ytimg.com/vi/dT6w8PnQy4M/hqdefault.jpg',
      channelTitle: 'Mealtime Solutions',
      publishedAt: '2024-01-15T00:00:00Z'
    },
    {
      id: 'p8KxR5vFwLc',
      title: 'Managing Weight Loss in Dementia',
      description: 'Understanding causes of weight loss and strategies to maintain healthy weight.',
      thumbnailUrl: 'https://i.ytimg.com/vi/p8KxR5vFwLc/hqdefault.jpg',
      channelTitle: 'Nutrition Management',
      publishedAt: '2024-02-01T00:00:00Z'
    },
    {
      id: 'Nq9hLm3T8Yw',
      title: 'Swallowing Difficulties and Dysphagia',
      description: 'Working with speech therapists and adapting food consistency for safe swallowing.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Nq9hLm3T8Yw/hqdefault.jpg',
      channelTitle: 'Speech Therapy Guide',
      publishedAt: '2024-02-15T00:00:00Z'
    }
  ],
  
  // Aggression and challenging behaviors
  'aggression': [
    {
      id: 'W9rC6MNLT9w',
      title: 'Managing Aggression in Dementia',
      description: 'Understanding triggers and de-escalation techniques for aggressive behavior in dementia.',
      thumbnailUrl: 'https://i.ytimg.com/vi/W9rC6MNLT9w/hqdefault.jpg',
      channelTitle: 'Behavioral Health Solutions',
      publishedAt: '2024-01-15T00:00:00Z'
    },
    {
      id: '9FY_8FHNzA4',
      title: 'De-escalation Techniques for Caregivers',
      description: 'Proven strategies to calm agitated dementia patients and prevent aggressive outbursts.',
      thumbnailUrl: 'https://i.ytimg.com/vi/9FY_8FHNzA4/hqdefault.jpg',
      channelTitle: 'Crisis Prevention Training',
      publishedAt: '2024-02-01T00:00:00Z'
    },
    {
      id: 'uKxqFyN7Lvk',
      title: 'When Dementia Leads to Violence',
      description: 'Safety planning and professional support for caregivers dealing with violent behavior.',
      thumbnailUrl: 'https://i.ytimg.com/vi/uKxqFyN7Lvk/hqdefault.jpg',
      channelTitle: 'Caregiver Safety First',
      publishedAt: '2024-02-15T00:00:00Z'
    },
    {
      id: 'LpY0Fgw7yg4',
      title: 'Environmental Changes to Reduce Agitation',
      description: 'Modifying the environment to minimize triggers for aggressive and agitated behavior.',
      thumbnailUrl: 'https://i.ytimg.com/vi/LpY0Fgw7yg4/hqdefault.jpg',
      channelTitle: 'Calm Environment Design',
      publishedAt: '2024-03-01T00:00:00Z'
    },
    {
      id: 'sJ9EoT6VQpg',
      title: 'Medications for Behavioral Symptoms',
      description: 'Understanding when and how medications may help manage severe behavioral symptoms in dementia.',
      thumbnailUrl: 'https://i.ytimg.com/vi/sJ9EoT6VQpg/hqdefault.jpg',
      channelTitle: 'Dementia Medication Guide',
      publishedAt: '2024-03-15T00:00:00Z'
    },
    {
      id: 'xH9Kw2pL5Nc',
      title: 'Responding to Physical Aggression Safely',
      description: 'Self-defense techniques and safe responses when dealing with physical aggression.',
      thumbnailUrl: 'https://i.ytimg.com/vi/xH9Kw2pL5Nc/hqdefault.jpg',
      channelTitle: 'Caregiver Protection Guide',
      publishedAt: '2024-04-01T00:00:00Z'
    },
    {
      id: 'B3tYm8NvQxk',
      title: 'Understanding Pain and Aggression',
      description: 'How undiagnosed pain can lead to aggressive behavior and how to identify hidden pain.',
      thumbnailUrl: 'https://i.ytimg.com/vi/B3tYm8NvQxk/hqdefault.jpg',
      channelTitle: 'Pain Assessment Center',
      publishedAt: '2024-04-15T00:00:00Z'
    }
  ],
  
  // Sundowning and sleep
  'sundowning': [
    {
      id: 'P3Wic5nOZ6U',
      title: 'Understanding Sundowning in Dementia',
      description: 'What causes sundowning syndrome and how to manage late-day confusion and agitation.',
      thumbnailUrl: 'https://i.ytimg.com/vi/P3Wic5nOZ6U/hqdefault.jpg',
      channelTitle: 'Evening Care Solutions',
      publishedAt: '2024-04-01T00:00:00Z'
    },
    {
      id: 'Zm8XJU8P5kI',
      title: 'Sleep Problems in Dementia Patients',
      description: 'Managing sleep disturbances, night waking, and day-night reversal in dementia care.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Zm8XJU8P5kI/hqdefault.jpg',
      channelTitle: 'Sleep Disorder Solutions',
      publishedAt: '2024-04-15T00:00:00Z'
    },
    {
      id: 'nYmJBHCJ2yE',
      title: 'Light Therapy for Dementia Sleep Issues',
      description: 'Using light exposure to regulate sleep-wake cycles and reduce sundowning symptoms.',
      thumbnailUrl: 'https://i.ytimg.com/vi/nYmJBHCJ2yE/hqdefault.jpg',
      channelTitle: 'Light Therapy Research',
      publishedAt: '2024-05-01T00:00:00Z'
    },
    {
      id: 'tFVx8HlLxsg',
      title: 'Evening Routines to Reduce Sundowning',
      description: 'Establishing calming evening routines to minimize confusion and agitation at dusk.',
      thumbnailUrl: 'https://i.ytimg.com/vi/tFVx8HlLxsg/hqdefault.jpg',
      channelTitle: 'Routine Care Strategies',
      publishedAt: '2024-05-15T00:00:00Z'
    },
    {
      id: 'FvJVgQy_q5Q',
      title: 'Caregiver Self-Care During Nighttime Challenges',
      description: 'Managing your own sleep and stress while caring for someone with nighttime dementia symptoms.',
      thumbnailUrl: 'https://i.ytimg.com/vi/FvJVgQy_q5Q/hqdefault.jpg',
      channelTitle: 'Caregiver Wellness',
      publishedAt: '2024-06-01T00:00:00Z'
    },
    {
      id: 'R7nQ2mKvPwY',
      title: 'Managing Nighttime Restlessness',
      description: 'Techniques for handling nighttime pacing, confusion, and restless behavior.',
      thumbnailUrl: 'https://i.ytimg.com/vi/R7nQ2mKvPwY/hqdefault.jpg',
      channelTitle: 'Night Care Techniques',
      publishedAt: '2024-06-15T00:00:00Z'
    },
    {
      id: 'wQ8pX3nLmHs',
      title: 'Sleep Medications and Dementia',
      description: 'Understanding risks and benefits of sleep aids for dementia patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/wQ8pX3nLmHs/hqdefault.jpg',
      channelTitle: 'Medication Safety Guide',
      publishedAt: '2024-07-01T00:00:00Z'
    }
  ],
  
  // Communication and memory
  'communication': [
    {
      id: 'CZl0oR3vQ3s',
      title: 'How to Talk to Someone with Dementia',
      description: 'Communication techniques that reduce confusion and improve connection with dementia patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/CZl0oR3vQ3s/hqdefault.jpg',
      channelTitle: 'Communication Care',
      publishedAt: '2024-06-15T00:00:00Z'
    },
    {
      id: 'yLJxf1DtEzE',
      title: 'When They Don\'t Recognize You Anymore',
      description: 'Coping with and responding to recognition problems in advanced dementia.',
      thumbnailUrl: 'https://i.ytimg.com/vi/yLJxf1DtEzE/hqdefault.jpg',
      channelTitle: 'Emotional Support Network',
      publishedAt: '2024-07-01T00:00:00Z'
    },
    {
      id: '7_gPHY4OLZc',
      title: 'Validation Therapy for Dementia',
      description: 'Using validation techniques instead of correcting or arguing with dementia patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/7_gPHY4OLZc/hqdefault.jpg',
      channelTitle: 'Validation Therapy Institute',
      publishedAt: '2024-07-15T00:00:00Z'
    },
    {
      id: 'nxLO2v_EMZI',
      title: 'Memory Activities for Dementia Patients',
      description: 'Engaging activities and exercises to maintain cognitive function and quality of life.',
      thumbnailUrl: 'https://i.ytimg.com/vi/nxLO2v_EMZI/hqdefault.jpg',
      channelTitle: 'Cognitive Activities',
      publishedAt: '2024-08-01T00:00:00Z'
    },
    {
      id: 'kQW8tWnN-Xo',
      title: 'Music Therapy for Dementia Care',
      description: 'The powerful effects of music on memory, mood, and communication in dementia patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/kQW8tWnN-Xo/hqdefault.jpg',
      channelTitle: 'Music Therapy Research',
      publishedAt: '2024-08-15T00:00:00Z'
    },
    {
      id: 'Hn9LmP4vYx8',
      title: 'Responding to Repetitive Questions',
      description: 'Patient strategies for handling repeated questions without frustration.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Hn9LmP4vYx8/hqdefault.jpg',
      channelTitle: 'Patience Training',
      publishedAt: '2024-09-01T00:00:00Z'
    },
    {
      id: 'mT5wQ8nLpBk',
      title: 'Non-Verbal Communication in Dementia',
      description: 'Understanding and using body language, touch, and facial expressions effectively.',
      thumbnailUrl: 'https://i.ytimg.com/vi/mT5wQ8nLpBk/hqdefault.jpg',
      channelTitle: 'Non-Verbal Care Guide',
      publishedAt: '2024-09-15T00:00:00Z'
    },
    {
      id: 'Y9pK3xHmLv4',
      title: 'Memory Books and Life Story Work',
      description: 'Creating memory books and using life story to improve communication and connection.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Y9pK3xHmLv4/hqdefault.jpg',
      channelTitle: 'Life Story Methods',
      publishedAt: '2024-10-01T00:00:00Z'
    }
  ],
  
  // Incontinence and toileting
  'incontinence': [
    {
      id: 'r9iHvVf8MBo',
      title: 'Managing Incontinence in Dementia',
      description: 'Practical strategies for handling bladder and bowel incontinence with dignity.',
      thumbnailUrl: 'https://i.ytimg.com/vi/r9iHvVf8MBo/hqdefault.jpg',
      channelTitle: 'Continence Care Solutions',
      publishedAt: '2024-09-01T00:00:00Z'
    },
    {
      id: 'Xp8hQ6FvCYE',
      title: 'Toileting Schedule for Dementia Patients',
      description: 'Establishing regular bathroom routines to prevent accidents and maintain independence.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Xp8hQ6FvCYE/hqdefault.jpg',
      channelTitle: 'Scheduled Toileting Guide',
      publishedAt: '2024-09-15T00:00:00Z'
    },
    {
      id: 'q4kFn2yLMSk',
      title: 'Choosing the Right Incontinence Products',
      description: 'Comparing adult diapers, pads, and other products for dementia incontinence care.',
      thumbnailUrl: 'https://i.ytimg.com/vi/q4kFn2yLMSk/hqdefault.jpg',
      channelTitle: 'Product Review Center',
      publishedAt: '2024-10-01T00:00:00Z'
    },
    {
      id: 'Bb5NHfLQhLg',
      title: 'Preventing Skin Problems from Incontinence',
      description: 'Skin care routines and products to prevent rashes and infections from incontinence.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Bb5NHfLQhLg/hqdefault.jpg',
      channelTitle: 'Skin Health Care',
      publishedAt: '2024-10-15T00:00:00Z'
    },
    {
      id: 'vK0sKCX0fTY',
      title: 'When to Seek Medical Help for Incontinence',
      description: 'Identifying urinary tract infections and other medical causes of sudden incontinence.',
      thumbnailUrl: 'https://i.ytimg.com/vi/vK0sKCX0fTY/hqdefault.jpg',
      channelTitle: 'Medical Care Guidance',
      publishedAt: '2024-11-01T00:00:00Z'
    },
    {
      id: 'pL8NmQ2vXwY',
      title: 'Bathroom Accessibility for Dementia',
      description: 'Modifying bathrooms to make toileting easier and safer for dementia patients.',
      thumbnailUrl: 'https://i.ytimg.com/vi/pL8NmQ2vXwY/hqdefault.jpg',
      channelTitle: 'Home Accessibility Guide',
      publishedAt: '2024-11-15T00:00:00Z'
    }
  ],
  
  // Caregiver support and self-care
  'caregiver': [
    {
      id: 'dNrYAVkN85k',
      title: 'Preventing Caregiver Burnout',
      description: 'Recognizing signs of burnout and strategies to maintain your own health while caregiving.',
      thumbnailUrl: 'https://i.ytimg.com/vi/dNrYAVkN85k/hqdefault.jpg',
      channelTitle: 'Caregiver Wellness Center',
      publishedAt: '2024-11-15T00:00:00Z'
    },
    {
      id: 'YM5N8F5qD1k',
      title: 'Respite Care Options for Dementia Families',
      description: 'Finding and using respite care services to give caregivers a much-needed break.',
      thumbnailUrl: 'https://i.ytimg.com/vi/YM5N8F5qD1k/hqdefault.jpg',
      channelTitle: 'Respite Care Network',
      publishedAt: '2024-12-01T00:00:00Z'
    },
    {
      id: 'S2qrxw0Kkkw',
      title: 'Caregiver Support Groups',
      description: 'The benefits of connecting with other dementia caregivers for emotional support and advice.',
      thumbnailUrl: 'https://i.ytimg.com/vi/S2qrxw0Kkkw/hqdefault.jpg',
      channelTitle: 'Support Group Connection',
      publishedAt: '2024-12-15T00:00:00Z'
    },
    {
      id: '5bY-FPVkrNE',
      title: 'Coping with Grief and Loss in Dementia Care',
      description: 'Processing the ongoing grief of watching a loved one change due to dementia progression.',
      thumbnailUrl: 'https://i.ytimg.com/vi/5bY-FPVkrNE/hqdefault.jpg',
      channelTitle: 'Grief Counseling Network',
      publishedAt: '2025-01-01T00:00:00Z'
    },
    {
      id: 'jKVKvvp9fU0',
      title: 'Asking for Help: A Caregiver\'s Guide',
      description: 'How to build a support network and delegate caregiving tasks to family and friends.',
      thumbnailUrl: 'https://i.ytimg.com/vi/jKVKvvp9fU0/hqdefault.jpg',
      channelTitle: 'Caregiver Support Network',
      publishedAt: '2025-01-15T00:00:00Z'
    },
    {
      id: 'T8mNx5QpLwY',
      title: 'Self-Care Strategies for Dementia Caregivers',
      description: 'Practical daily self-care routines to maintain physical and mental health while caregiving.',
      thumbnailUrl: 'https://i.ytimg.com/vi/T8mNx5QpLwY/hqdefault.jpg',
      channelTitle: 'Self-Care Solutions',
      publishedAt: '2025-02-01T00:00:00Z'
    },
    {
      id: 'vN8pQ2xLmH4',
      title: 'When to Consider Assisted Living or Memory Care',
      description: 'Making the difficult decision about when home care is no longer sustainable.',
      thumbnailUrl: 'https://i.ytimg.com/vi/vN8pQ2xLmH4/hqdefault.jpg',
      channelTitle: 'Care Transition Guide',
      publishedAt: '2025-02-15T00:00:00Z'
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