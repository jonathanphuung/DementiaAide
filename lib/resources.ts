import {
  Activity,
  BookOpen,
  Brain,
  HeartHandshake,
  Home,
  LifeBuoy,
  LucideIcon,
  Shield,
  Sparkles,
  Stethoscope,
} from 'lucide-react';

const BLOG_BASE_URL = 'https://www.dementiaaide.com/blogs/tips-for-dementia';

export type ResourceCategory =
  | 'Start Here'
  | 'Caregiver Support'
  | 'Daily Care'
  | 'Safety & Crisis'
  | 'Behavior & Emotions'
  | 'Care Planning'
  | 'Connection';

export interface Resource {
  title: string;
  slug: string;
  category: ResourceCategory;
  summary: string;
  tags: string[];
  featured?: boolean;
}

export const resourceCategoryMeta: Record<
  ResourceCategory,
  {
    description: string;
    icon: LucideIcon;
    accent: string;
  }
> = {
  'Start Here': {
    description: 'Plain-language guides for understanding dementia, diagnosis, and what changes over time.',
    icon: Brain,
    accent: 'text-foreground bg-secondary border-border',
  },
  'Caregiver Support': {
    description: 'Support for burnout, guilt, family strain, exhaustion, and asking for help.',
    icon: HeartHandshake,
    accent: 'text-rose-700 bg-rose-50 border-rose-100',
  },
  'Daily Care': {
    description: 'Practical help with eating, bathing, dressing, sleep, medication, toileting, and personal care.',
    icon: Home,
    accent: 'text-emerald-700 bg-emerald-50 border-emerald-100',
  },
  'Safety & Crisis': {
    description: 'Fast reference for wandering, falls, driving, ER visits, scams, kitchen safety, and sudden changes.',
    icon: Shield,
    accent: 'text-amber-700 bg-amber-50 border-amber-100',
  },
  'Behavior & Emotions': {
    description: 'Guidance for anger, anxiety, hallucinations, accusations, repetition, depression, and distress.',
    icon: LifeBuoy,
    accent: 'text-violet-700 bg-violet-50 border-violet-100',
  },
  'Care Planning': {
    description: 'Options for care at home, adult day care, nursing homes, hospice, legal planning, and transitions.',
    icon: Stethoscope,
    accent: 'text-cyan-700 bg-cyan-50 border-cyan-100',
  },
  Connection: {
    description: 'Activities, communication, social life, travel, and tools that help people stay connected.',
    icon: Sparkles,
    accent: 'text-indigo-700 bg-indigo-50 border-indigo-100',
  },
};

export const resources: Resource[] = [
  {
    title: 'What Is Dementia?',
    slug: 'what-is-dementia',
    category: 'Start Here',
    summary: 'A gentle starting point for understanding dementia and how it affects thinking, memory, behavior, and daily life.',
    tags: ['overview', 'basics', 'diagnosis'],
    featured: true,
  },
  {
    title: 'Top Signs of Dementia',
    slug: 'top-signs-of-dementia',
    category: 'Start Here',
    summary: 'Early warning signs families may notice when something feels different but the next step is unclear.',
    tags: ['symptoms', 'early signs', 'family concerns'],
  },
  {
    title: 'Symptoms of Dementia',
    slug: 'symptoms-of-dementia',
    category: 'Start Here',
    summary: 'A broader look at cognitive, emotional, physical, and behavioral symptoms that can appear across dementia types.',
    tags: ['symptoms', 'memory', 'behavior'],
  },
  {
    title: 'What Causes Dementia?',
    slug: 'what-causes-dementia',
    category: 'Start Here',
    summary: 'A plain-language explanation of common causes and risk factors behind different forms of dementia.',
    tags: ['causes', 'risk factors', 'education'],
  },
  {
    title: 'What to Expect After a Dementia Diagnosis',
    slug: 'what-to-expect-after-a-dementia-diagnosis',
    category: 'Start Here',
    summary: 'A grounding guide for the first stretch after diagnosis, including emotions, planning, and next steps.',
    tags: ['after diagnosis', 'planning', 'family'],
    featured: true,
  },
  {
    title: 'Brain Scans for Dementia',
    slug: 'brain-scans-for-dementia',
    category: 'Start Here',
    summary: 'What families may hear about imaging and how scans can fit into a dementia evaluation.',
    tags: ['diagnosis', 'brain scans', 'testing'],
  },
  {
    title: 'Blood Tests for Dementia',
    slug: 'blood-tests-for-dementia',
    category: 'Start Here',
    summary: 'A quick guide to bloodwork, reversible causes, and why doctors may order tests during evaluation.',
    tags: ['diagnosis', 'blood tests', 'medical'],
  },
  {
    title: 'Caregiver Burnout',
    slug: 'caregiver-burnout',
    category: 'Caregiver Support',
    summary: 'How burnout can build, what it can feel like, and small ways caregivers can begin getting relief.',
    tags: ['burnout', 'stress', 'self care'],
    featured: true,
  },
  {
    title: 'Caregiver Guilt',
    slug: 'caregiver-guilt',
    category: 'Caregiver Support',
    summary: 'Support for the painful guilt that can show up when every choice feels imperfect.',
    tags: ['guilt', 'emotional support', 'family'],
  },
  {
    title: 'Feeling Overwhelmed as a Dementia Caregiver',
    slug: 'feeling-overwhelmed-as-a-dementia-caregiver',
    category: 'Caregiver Support',
    summary: 'A compassionate guide for moments when the amount of responsibility feels impossible to carry alone.',
    tags: ['overwhelm', 'stress', 'support'],
  },
  {
    title: 'Sleep Deprivation',
    slug: 'sleep-deprivation',
    category: 'Caregiver Support',
    summary: 'How disrupted nights affect caregivers and what to consider when sleep is no longer sustainable.',
    tags: ['sleep', 'caregiver health', 'night care'],
  },
  {
    title: 'Relationship Stress',
    slug: 'relationship-stress',
    category: 'Caregiver Support',
    summary: 'Support for the way dementia care can change marriages, partnerships, and close family bonds.',
    tags: ['relationships', 'stress', 'family'],
  },
  {
    title: 'Family Conflict',
    slug: 'family-conflict',
    category: 'Caregiver Support',
    summary: 'A guide for disagreements between relatives when decisions, roles, and expectations collide.',
    tags: ['family conflict', 'planning', 'communication'],
  },
  {
    title: 'Respite Care',
    slug: 'respite-care',
    category: 'Caregiver Support',
    summary: 'What respite care can look like and why breaks are part of care, not a failure of care.',
    tags: ['respite', 'support', 'breaks'],
  },
  {
    title: 'Asking for Help',
    slug: 'asking-for-help',
    category: 'Caregiver Support',
    summary: 'A practical way to name what is needed and invite others into care before crisis hits.',
    tags: ['support network', 'help', 'care team'],
  },
  {
    title: 'Dementia Bathroom Help: Caregiver Guide',
    slug: 'dementia-bathroom-help-caregiver-guide',
    category: 'Daily Care',
    summary: 'Sensitive guidance for toileting, accidents, privacy, dignity, and bathroom routines.',
    tags: ['toileting', 'bathroom', 'incontinence'],
    featured: true,
  },
  {
    title: 'Dementia and Incontinence',
    slug: 'dementia-and-incontinence',
    category: 'Daily Care',
    summary: 'Help understanding incontinence changes and how to respond with less shame and more structure.',
    tags: ['incontinence', 'briefs', 'daily care'],
  },
  {
    title: 'Dementia and Not Eating',
    slug: 'dementia-and-not-eating',
    category: 'Daily Care',
    summary: 'Ideas for food refusal, appetite changes, mealtime stress, and when nutrition becomes concerning.',
    tags: ['eating', 'nutrition', 'food refusal'],
  },
  {
    title: 'Eating and Nutrition in Dementia',
    slug: 'eating-and-nutrition-in-dementia',
    category: 'Daily Care',
    summary: 'Strategies for meals, hydration, weight changes, and making food easier to accept.',
    tags: ['nutrition', 'mealtime', 'hydration'],
  },
  {
    title: 'Dementia and Refusing to Bathe',
    slug: 'dementia-and-refusing-to-bathe',
    category: 'Daily Care',
    summary: 'Ways to reduce fear, resistance, and conflict around bathing while protecting dignity.',
    tags: ['bathing', 'hygiene', 'resistance'],
  },
  {
    title: 'Dementia and Refusing to Dress',
    slug: 'dementia-and-refusing-to-dress',
    category: 'Daily Care',
    summary: 'Support for dressing struggles, clothing changes, sensory discomfort, and daily routines.',
    tags: ['dressing', 'personal care', 'routine'],
  },
  {
    title: 'Medication Management in Dementia',
    slug: 'medication-management-in-dementia',
    category: 'Daily Care',
    summary: 'A caregiver-focused guide for organizing, tracking, and noticing medication concerns.',
    tags: ['medication', 'health', 'routine'],
  },
  {
    title: 'Why Someone With Dementia Might Stop Sleeping at Night',
    slug: 'why-someone-with-dementia-might-stop-sleeping-at-night',
    category: 'Daily Care',
    summary: 'Possible reasons for nighttime wakefulness and how families can think through sleep changes.',
    tags: ['sleep', 'nighttime', 'sundowning'],
  },
  {
    title: 'Dementia Wandering',
    slug: 'dementia-wandering',
    category: 'Safety & Crisis',
    summary: 'A safety-focused guide to wandering, why it can happen, and what families can prepare.',
    tags: ['wandering', 'safety', 'prevention'],
    featured: true,
  },
  {
    title: 'Night Wandering',
    slug: 'night-wandering',
    category: 'Safety & Crisis',
    summary: 'Help for nighttime wandering, door safety, sleep disruption, and caregiver alertness.',
    tags: ['night wandering', 'sleep', 'safety'],
  },
  {
    title: 'Dementia and Driving',
    slug: 'dementia-and-driving',
    category: 'Safety & Crisis',
    summary: 'A guide for one of the hardest safety conversations: when driving becomes risky.',
    tags: ['driving', 'safety', 'independence'],
  },
  {
    title: 'Dementia and Kitchen Safety',
    slug: 'dementia-and-kitchen-safety',
    category: 'Safety & Crisis',
    summary: 'What to consider when stove use, cooking, appliances, or food safety become risky.',
    tags: ['kitchen', 'stove', 'home safety'],
  },
  {
    title: 'Dementia and Financial Scams',
    slug: 'dementia-and-financial-scams',
    category: 'Safety & Crisis',
    summary: 'How to recognize vulnerability to scams and build guardrails before harm happens.',
    tags: ['scams', 'money', 'protection'],
  },
  {
    title: 'Falls in Dementia',
    slug: 'falls-in-dementia',
    category: 'Safety & Crisis',
    summary: 'A quick safety guide for fall risks, home changes, and when to involve medical support.',
    tags: ['falls', 'mobility', 'safety'],
  },
  {
    title: 'Infections in Dementia',
    slug: 'infections-in-dementia',
    category: 'Safety & Crisis',
    summary: 'Why infections can look like sudden confusion or decline, and when to seek help.',
    tags: ['infection', 'sudden changes', 'medical'],
  },
  {
    title: 'Dementia and ER Visits',
    slug: 'dementia-and-er-visits',
    category: 'Safety & Crisis',
    summary: 'What families can expect during emergency care and how to make the visit less overwhelming.',
    tags: ['hospital', 'ER', 'crisis'],
  },
  {
    title: 'Anger in Dementia',
    slug: 'anger-in-dementia',
    category: 'Behavior & Emotions',
    summary: 'How to understand anger as communication and respond without escalating the moment.',
    tags: ['anger', 'behavior', 'de-escalation'],
  },
  {
    title: 'Dementia and Anxiety',
    slug: 'dementia-and-anxiety',
    category: 'Behavior & Emotions',
    summary: 'What anxiety can look like in dementia and how caregivers can offer steadier reassurance.',
    tags: ['anxiety', 'emotions', 'reassurance'],
    featured: true,
  },
  {
    title: 'Dementia Hallucinations',
    slug: 'dementia-hallucinations',
    category: 'Behavior & Emotions',
    summary: 'How to respond when someone is seeing or hearing things that feel real to them.',
    tags: ['hallucinations', 'behavior', 'Lewy body'],
  },
  {
    title: 'False Accusations',
    slug: 'false-accusations',
    category: 'Behavior & Emotions',
    summary: 'A guide for painful accusations, missing items, suspicion, and staying emotionally steady.',
    tags: ['accusations', 'paranoia', 'communication'],
  },
  {
    title: 'Dementia Repeating the Same Things Over and Over',
    slug: 'dementia-repeating-the-same-things-over-and-over',
    category: 'Behavior & Emotions',
    summary: 'Support for repetitive questions and stories that can be exhausting for caregivers.',
    tags: ['repetition', 'memory', 'communication'],
  },
  {
    title: 'When Depression Isn\'t Just Depression: Early Signs of Dementia',
    slug: 'depression',
    category: 'Behavior & Emotions',
    summary: 'A guide to the overlap between depression, apathy, and early dementia changes.',
    tags: ['depression', 'apathy', 'early signs'],
  },
  {
    title: 'A Guide to Caring for Dementia Patients at Home',
    slug: 'a-guide-to-caring-for-dementia-patients-at-home',
    category: 'Care Planning',
    summary: 'A practical overview of care at home, routines, safety, support, and realistic planning.',
    tags: ['home care', 'planning', 'support'],
  },
  {
    title: 'Hiring Help',
    slug: 'hiring-help',
    category: 'Care Planning',
    summary: 'What to think through when bringing paid help into the home or care routine.',
    tags: ['hiring help', 'home care', 'care team'],
  },
  {
    title: 'Moving to a Dementia Care Home',
    slug: 'moving-to-a-dementia-care-home',
    category: 'Care Planning',
    summary: 'Support for the emotional and practical transition into a care home setting.',
    tags: ['care home', 'transition', 'placement'],
  },
  {
    title: 'Legal Planning for Dementia',
    slug: 'legal-planning-for-dementia',
    category: 'Care Planning',
    summary: 'A planning guide for legal decisions families may need to address earlier rather than later.',
    tags: ['legal planning', 'finances', 'future care'],
  },
  {
    title: 'Care Arrangement: Adult Day Care Centers',
    slug: 'care-arrangement-adult-day-care-centers',
    category: 'Care Planning',
    summary: 'What adult day care can offer and how it may support both the person and caregiver.',
    tags: ['adult day care', 'respite', 'care options'],
  },
  {
    title: 'Care Arrangement: Assisted Living Facilities',
    slug: 'care-arrangement-assisted-living-facilities',
    category: 'Care Planning',
    summary: 'A guide to assisted living and where it may fit in the progression of care needs.',
    tags: ['assisted living', 'care options', 'housing'],
  },
  {
    title: 'Care Arrangement: Hospice Care',
    slug: 'care-arrangement-hospice-care',
    category: 'Care Planning',
    summary: 'What hospice can mean in dementia care and why it is often about comfort and support.',
    tags: ['hospice', 'comfort care', 'late stage'],
  },
  {
    title: 'Making Public Outings Easier With Dementia Communication Cards',
    slug: 'dementia-communication-cards-a-simple-tool-that-can-make-public-outings-easier',
    category: 'Connection',
    summary: 'A practical tool for public outings, travel, anxious moments, and explaining dementia to others.',
    tags: ['communication cards', 'public outings', 'travel'],
    featured: true,
  },
  {
    title: 'Traveling With Dementia',
    slug: 'traveling-with-dementia',
    category: 'Connection',
    summary: 'Lessons and preparation ideas for making travel calmer, safer, and more realistic.',
    tags: ['travel', 'public outings', 'planning'],
  },
  {
    title: 'Communication Problems',
    slug: 'communication-problems',
    category: 'Connection',
    summary: 'Ways to adapt communication when words, understanding, or responses begin changing.',
    tags: ['communication', 'language', 'connection'],
  },
  {
    title: 'They\'re Still in There: How to Stay Connected',
    slug: 'they-re-still-in-there-how-to-stay-connected',
    category: 'Connection',
    summary: 'A personal, encouraging guide for connection even as dementia changes the relationship.',
    tags: ['connection', 'family', 'relationship'],
  },
  {
    title: 'Best Activities for Dementia by Stage and Type',
    slug: 'best-activities-for-dementia-by-stage-and-type',
    category: 'Connection',
    summary: 'Activity ideas that can be matched to abilities, stage, interests, and energy.',
    tags: ['activities', 'engagement', 'stages'],
  },
  {
    title: 'Dementia Therapies',
    slug: 'dementia-therapies',
    category: 'Connection',
    summary: 'An overview of therapies and supportive approaches families may hear about.',
    tags: ['therapies', 'activities', 'support'],
  },
  {
    title: 'Dementia and Social Life: How to Stay Connected',
    slug: 'dementia-and-social-life-how-to-stay-connected',
    category: 'Connection',
    summary: 'How to protect social connection while adapting to safety, energy, and communication changes.',
    tags: ['social life', 'connection', 'community'],
  },
];

export const resourceCategories = Object.keys(resourceCategoryMeta) as ResourceCategory[];

export const featuredResources = resources.filter((resource) => resource.featured);

export function getResourceUrl(resource: Resource) {
  return `${BLOG_BASE_URL}/${resource.slug}`;
}

export function getResourceCountByCategory(category: ResourceCategory) {
  return resources.filter((resource) => resource.category === category).length;
}

export const resourceStats = [
  {
    label: 'Ana-written guides',
    value: resources.length,
    icon: BookOpen,
  },
  {
    label: 'Care topics',
    value: resourceCategories.length,
    icon: Activity,
  },
  {
    label: 'No API required',
    value: 'Static',
    icon: Shield,
  },
];
