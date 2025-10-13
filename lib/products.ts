export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'Clothing' | 'Accessories' | 'Adaptive Wear' | 'Awareness';
  image: string;
  images?: string[];
  onSale?: boolean;
  featured?: boolean;
  inStock: boolean;
  sizes?: string[];
  colors?: string[];
  rating?: number;
  reviews?: number;
}

export const products: Product[] = [
  {
    id: 'bear-hug-jumpsuit',
    name: 'Anti-Strip Back-zip Jumpsuit - Adaptive Alzheimer\'s and Dementia Clothing',
    description: 'The Bear Hug Care Jumpsuit - Designed specifically for dementia care. Easy-access back zipper, tamper-resistant design, soft breathable medical-grade fabric. Making daily routines easier, safer, and more dignified.',
    price: 69.99,
    originalPrice: 110.95,
    category: 'Adaptive Wear',
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2xvdGhpbmclMjBqdW1wc3VpdHxlbnwxfHx8fDE3NjAxMjkwNDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    onSale: true,
    featured: true,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Navy', 'Gray', 'White'],
    rating: 4.8,
    reviews: 2847,
  },
  {
    id: 'baseball-hat-find-cure',
    name: 'Alzheimer\'s Awareness Clothing | Baseball Hat "Find a Cure" | Dementia Awareness Apparel',
    description: 'Show your support with this comfortable baseball hat featuring "Find a Cure" embroidery. Perfect for raising awareness and starting conversations about Alzheimer\'s and dementia.',
    price: 29.99,
    originalPrice: 38.99,
    category: 'Awareness',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNlYmFsbCUyMGNhcCUyMHdoaXRlfGVufDF8fHx8MTc2MDEyOTQ2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    onSale: true,
    featured: true,
    inStock: true,
    colors: ['White', 'Black', 'Navy'],
    rating: 4.6,
    reviews: 523,
  },
  {
    id: 'bucket-hat-find-cure',
    name: 'Alzheimer\'s Awareness Clothing | Bucket Hat "Find a Cure" | Women\'s Alzheimer\'s Awareness Clothing Purple',
    description: 'Stylish purple bucket hat with "Find a Cure" message. Comfortable, fashionable, and supports Alzheimer\'s awareness. Perfect for everyday wear.',
    price: 29.50,
    originalPrice: 35.99,
    category: 'Awareness',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWNrZXQlMjBoYXQlMjBwdXJwbGV8ZW58MXx8fHwxNzYwMTI5NDY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    onSale: true,
    featured: true,
    inStock: true,
    colors: ['Purple', 'White', 'Pink'],
    rating: 4.7,
    reviews: 412,
  },
  {
    id: 'adaptive-sweatshirt',
    name: 'Adaptive Open-Back Sweatshirt - Easy Dressing for Seniors',
    description: 'Comfortable sweatshirt with back opening for easy dressing. Perfect for individuals with limited mobility. Soft fleece material with velcro closures.',
    price: 54.99,
    originalPrice: 74.99,
    category: 'Adaptive Wear',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21mb3J0YWJsZSUyMHN3ZWF0c2hpcnQlMjBob29kaWV8ZW58MXx8fHwxNzYwMTI5NDY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    onSale: true,
    featured: false,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Gray', 'Navy', 'Black'],
    rating: 4.5,
    reviews: 189,
  },
  {
    id: 'awareness-tshirt',
    name: 'Alzheimer\'s Awareness T-Shirt - Support & Awareness',
    description: 'Comfortable cotton t-shirt featuring Alzheimer\'s awareness messaging. Available in multiple colors and sizes. Perfect for awareness events and daily wear.',
    price: 24.99,
    category: 'Awareness',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    onSale: false,
    featured: false,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Purple', 'White', 'Gray'],
    rating: 4.4,
    reviews: 756,
  },
  {
    id: 'non-slip-socks',
    name: 'Non-Slip Grip Socks for Seniors - Safety First',
    description: 'Hospital-grade non-slip socks with grip bottoms. Prevents falls and provides comfort. Machine washable and durable.',
    price: 19.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&q=80',
    onSale: false,
    featured: false,
    inStock: true,
    sizes: ['S/M', 'L/XL'],
    colors: ['White', 'Gray', 'Navy'],
    rating: 4.9,
    reviews: 1234,
  },
];