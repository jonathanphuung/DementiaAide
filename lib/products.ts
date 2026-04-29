export interface Product {
  id: string;
  handle?: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'Clothing' | 'Accessories' | 'Adaptive Wear' | 'Awareness';
  onSale?: boolean;
  inStock: boolean;
  rating?: number;
  reviews?: number;
  colors?: string[];
  sizes?: string[];
  shopifyVariantIds?: Record<string, string>;
}

export const products: Product[] = [
  {
    id: 'anti-strip-jumpsuit',
    handle: 'anti-strip-back-zip-jumpsuit',
    name: 'Anti-Strip Back-zip Jumpsuit',
    description: 'Adaptive Alzheimer\'s and Dementia Clothing - Designed specifically for dementia care with back-zip access for dignified changing and tamper-resistant design for safety',
    price: 69.99,
    originalPrice: 110.95,
    image: '/products/jumpsuit.svg',
    category: 'Adaptive Wear',
    onSale: true,
    inStock: true,
    rating: 4.5,
    reviews: 18,
    colors: ['Navy Blue', 'Royal Plum', 'Burgundy Red'],
    sizes: ['X-Small', 'Small', 'Medium', 'Large'],
    shopifyVariantIds: {
      'X-Small|Navy Blue': 'gid://shopify/ProductVariant/39758918025285',
      'Small|Navy Blue': 'gid://shopify/ProductVariant/12990104043589',
      'Medium|Navy Blue': 'gid://shopify/ProductVariant/12990161715269',
      'Large|Navy Blue': 'gid://shopify/ProductVariant/12990161780805',
      'Small|Royal Plum': 'gid://shopify/ProductVariant/53937293623571',
      'Medium|Royal Plum': 'gid://shopify/ProductVariant/53937293132051',
      'Large|Royal Plum': 'gid://shopify/ProductVariant/53937286086931',
      'Small|Burgundy Red': 'gid://shopify/ProductVariant/12990161682501',
      'Medium|Burgundy Red': 'gid://shopify/ProductVariant/12990161748037',
      'Large|Burgundy Red': 'gid://shopify/ProductVariant/12990161813573',
    },
  },
  {
    id: 'baseball-hat-find-cure',
    name: 'Alzheimer\'s Awareness Baseball Hat "Find a Cure"',
    description: 'Dementia Awareness Apparel - Show your support with this comfortable baseball cap featuring "FIND A CURE" embroidery',
    price: 29.99,
    originalPrice: 38.99,
    image: '/products/baseball-hat.svg',
    category: 'Awareness',
    onSale: true,
    inStock: true,
    rating: 4.8,
    reviews: 45
  },
  {
    id: 'bucket-hat-find-cure',
    name: 'Alzheimer\'s Awareness Bucket Hat "Find a Cure"',
    description: 'Women\'s Alzheimer\'s Awareness Clothing Purple - Stylish bucket hat with "FIND A CURE #alz" message to raise awareness',
    price: 29.50,
    originalPrice: 35.99,
    image: '/products/bucket-hat.svg',
    category: 'Awareness',
    onSale: true,
    inStock: true,
    rating: 4.7,
    reviews: 32
  }
];
