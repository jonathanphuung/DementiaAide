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
}

export const products: Product[] = [
  {
    id: 'digital-clock',
    name: 'Memory Care Digital Day Clock',
    description: 'Large, clear digital clock with day/date display - perfect for those with memory difficulties',
    price: 49.99,
    originalPrice: 59.99,
    image: '/products/digital-clock.jpg',
    category: 'Accessories',
    onSale: true,
    inStock: true,
    rating: 4.8,
    reviews: 156
  },
  {
    id: 'adaptive-clothing',
    name: 'Adaptive Clothing Set',
    description: 'Easy-to-wear clothing with magnetic closures and anti-slip features',
    price: 79.99,
    image: '/products/adaptive-clothing.jpg',
    category: 'Adaptive Wear',
    inStock: true,
    rating: 4.5,
    reviews: 89,
    colors: ['Navy', 'Black', 'Gray']
  },
  {
    id: 'awareness-pin',
    name: 'Awareness Ribbon Pin',
    description: 'Purple ribbon pin for Alzheimer\'s and dementia awareness',
    price: 12.99,
    image: '/products/awareness-pin.jpg',
    category: 'Awareness',
    inStock: true,
    rating: 4.9,
    reviews: 67
  }
];
