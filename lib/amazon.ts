export interface AmazonProduct {
  asin: string;
  title: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  reviewCount: number;
  url: string;
  prime?: boolean;
  discount?: string;
}

// Cache structure for Amazon products
const amazonCache: { [key: string]: { products: AmazonProduct[]; timestamp: number } } = {};
const AMAZON_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const MAX_AMAZON_RESULTS = 6;

// Predefined product mappings for common dementia care queries
const productMappings: { [key: string]: string[] } = {
  'memory': ['memory foam pillow', 'memory games', 'memory care clock', 'cognitive training'],
  'safety': ['bed rails', 'door alarms', 'wandering prevention', 'medication reminder'],
  'daily care': ['adaptive clothing', 'easy grip utensils', 'shower chair', 'non-slip mats'],
  'communication': ['picture communication board', 'voice amplifier', 'simple phone'],
  'activities': ['puzzle games', 'adult coloring books', 'sensory fidget toys', 'music therapy'],
  'behavior': ['calming music', 'weighted blanket', 'anxiety relief', 'stress ball'],
  'nutrition': ['easy open containers', 'plate guards', 'weighted utensils', 'liquid thickener'],
  'mobility': ['walker', 'grab bars', 'transfer belt', 'wheelchair cushion'],
  'sleep': ['sleep positioning pillow', 'night light', 'bed alarm', 'compression socks'],
  'hygiene': ['shower bench', 'long handle sponge', 'electric toothbrush', 'no-rinse shampoo']
};

// Fallback products for when API is unavailable or fails
const fallbackProducts: { [key: string]: AmazonProduct[] } = {
  general: [
    {
      asin: 'DEMCARE001',
      title: 'Digital Day Clock Large Display',
      price: '$89.99',
      originalPrice: '$109.99',
      image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: 4.3,
      reviewCount: 4847,
      url: '',
      prime: true,
      discount: '18%'
    },
    {
      asin: 'DEMCARE002',
      title: 'Weighted Blanket Adult Heavy',
      price: '$49.95',
      image: 'https://images.unsplash.com/photo-1586227740560-8cf2732c1531?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rating: 4.2,
      reviewCount: 3456,
      url: '',
      prime: true
    },
    {
      asin: 'DEMCARE003',
      title: 'Weekly Pill Organizer Large',
      price: '$12.99',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rating: 4.5,
      reviewCount: 2145,
      url: '',
      prime: true
    },
    {
      asin: 'DEMCARE004',
      title: 'Door Window Alarm Safety',
      price: '$15.99',
      originalPrice: '$19.99',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rating: 4.1,
      reviewCount: 2341,
      url: '',
      prime: true,
      discount: '20%'
    },
    {
      asin: 'DEMCARE005',
      title: 'Memory Foam Seat Cushion',
      price: '$24.99',
      image: 'https://images.unsplash.com/photo-1586227740560-8cf2732c1531?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rating: 4.3,
      reviewCount: 1567,
      url: '',
      prime: true
    },
    {
      asin: 'DEMCARE006',
      title: 'Fidget Toys Stress Relief',
      price: '$19.99',
      originalPrice: '$24.99',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rating: 4.4,
      reviewCount: 8932,
      url: '',
      prime: true,
      discount: '20%'
    }
  ]
};

/**
 * Searches Amazon for products relevant to dementia care based on query
 */
export async function searchAmazonProducts(query: string): Promise<AmazonProduct[]> {
  const cacheKey = query.toLowerCase().trim();
  
  if (amazonCache[cacheKey]) {
    const cached = amazonCache[cacheKey];
    if (Date.now() - cached.timestamp < AMAZON_CACHE_DURATION) {
      return cached.products;
    }
  }

  try {
    const products = await fetchFromAmazonSPP(query);
    
    amazonCache[cacheKey] = {
      products,
      timestamp: Date.now()
    };
    return products;
  } catch (error) {
    console.error('Amazon product search failed, using fallback products:', error);
    return getFallbackProducts(query);
  }
}

/**
 * Get relevant fallback products based on query keywords
 */
function getFallbackProducts(query: string): AmazonProduct[] {
  const queryLower = query.toLowerCase();
  let relevantProducts: AmazonProduct[] = [];
  
  // Check for keyword matches
  for (const [category, keywords] of Object.entries(productMappings)) {
    if (keywords.some(keyword => queryLower.includes(keyword)) || queryLower.includes(category)) {
      // Return category-specific products if we had them
      // For now, return general products
      relevantProducts = fallbackProducts.general;
      break;
    }
  }
  
  // If no specific match found, return general products
  if (relevantProducts.length === 0) {
    relevantProducts = fallbackProducts.general;
  }
  
  // Randomize and limit results
  const shuffled = relevantProducts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, MAX_AMAZON_RESULTS);
}

/**
 * Fetch products from Amazon SPP (Seller Partner Program) API (when available)
 */
async function fetchFromAmazonSPP(query: string): Promise<AmazonProduct[]> {
  try {
    const apiUrl = '/api/amazon/search';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        query,
        category: 'HealthPersonalCare',
        maxResults: 6
      })
    });
    
    if (!response.ok) {
      throw new Error(`SPP API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.products && data.products.length > 0) {
      return data.products;
    }

    if (data.fallback) {
      return getFallbackProducts(query);
    }
    
    return getFallbackProducts(query);
    
  } catch (error) {
    throw error;
  }
  
  /* Future SPP implementation would look like this:
  
  const response = await fetch('/api/amazon/spp-search', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.AMAZON_SPP_ACCESS_TOKEN}`
    },
    body: JSON.stringify({ 
      query,
      marketplace: 'ATVPDKIKX0DER', // US marketplace
      categoryId: 'HealthPersonalCare',
      maxResults: MAX_AMAZON_RESULTS
    })
  });
  
  if (!response.ok) {
    throw new Error('Amazon SPP API request failed');
  }
  
  const data = await response.json();
  return data.products || [];
  */
}

/**
 * Generate Amazon URL with proper affiliate tracking
 */
export function generateProductUrl(asin: string, tag: string = 'dementiaaide-20'): string {
  // Generate proper Amazon affiliate URL with tracking parameters
  return `https://www.amazon.com/dp/${asin}?tag=${tag}&linkCode=as2&camp=1789&creative=9325&creativeASIN=${asin}`;
}

/**
 * Format price string consistently
 */
export function formatPrice(price: string | number): string {
  if (typeof price === 'number') {
    return `$${price.toFixed(2)}`;
  }
  return price.replace(/^\$/, '$');
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(originalPrice: string, currentPrice: string): string {
  const original = parseFloat(originalPrice.replace(/[^0-9.]/g, ''));
  const current = parseFloat(currentPrice.replace(/[^0-9.]/g, ''));
  
  if (original <= current) return '';
  
  const discount = Math.round(((original - current) / original) * 100);
  return `${discount}%`;
}
