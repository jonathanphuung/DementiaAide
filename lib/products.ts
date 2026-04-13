export interface Product {
  id: string;
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
    colors: ['Navy Blue'],
    sizes: ['S', 'M', 'L', 'XL', '2XL']
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
