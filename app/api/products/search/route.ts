import { NextResponse } from 'next/server';

// This is a mock database of products. In a real application, this would come from your database
const products = [
  {
    id: '1',
    name: 'Adaptive Clothing Set',
    description: 'Easy-to-wear clothing designed for people with dementia, featuring magnetic closures and simple designs.',
    price: 79.99,
    category: 'Clothing',
    image: '/products/adaptive-clothing.jpg',
    tags: ['clothing', 'adaptive', 'easy-wear', 'comfortable'],
    features: [
      'Magnetic closures instead of buttons',
      'Soft, non-irritating fabric',
      'Easy to put on and take off',
      'Machine washable'
    ]
  },
  {
    id: '2',
    name: 'Memory Picture Phone',
    description: 'Phone with large picture buttons for easy dialing, perfect for people with memory difficulties.',
    price: 89.99,
    category: 'Communication',
    image: '/products/memory-phone.jpg',
    tags: ['phone', 'communication', 'memory aid', 'easy-use'],
    features: [
      'Large picture buttons',
      'Pre-programmable numbers',
      'Clear sound quality',
      'Emergency button'
    ]
  },
  {
    id: '3',
    name: 'Digital Calendar Clock',
    description: 'Large display clock showing time, date, and day of the week clearly to help maintain daily orientation.',
    price: 49.99,
    category: 'Memory Aids',
    image: '/products/calendar-clock.jpg',
    tags: ['clock', 'calendar', 'memory aid', 'orientation'],
    features: [
      'Large, clear display',
      'Shows date and time',
      'Automatic day/night mode',
      'Battery backup'
    ]
  },
  {
    id: '4',
    name: 'Safe Haven GPS Tracker',
    description: 'Discreet GPS tracker with SOS button and geofencing capabilities for peace of mind.',
    price: 129.99,
    category: 'Safety',
    image: '/products/gps-tracker.jpg',
    tags: ['safety', 'gps', 'tracking', 'emergency'],
    features: [
      'Real-time GPS tracking',
      'SOS button',
      'Geofencing alerts',
      'Long battery life'
    ]
  },
  {
    id: '5',
    name: 'Memory Foam Chair Pad',
    description: 'Comfortable chair pad with pressure-relieving memory foam and anti-slip bottom.',
    price: 39.99,
    category: 'Comfort',
    image: '/products/chair-pad.jpg',
    tags: ['comfort', 'seating', 'pressure relief', 'support'],
    features: [
      'Memory foam filling',
      'Anti-slip bottom',
      'Washable cover',
      'Ergonomic design'
    ]
  },
  {
    id: '6',
    name: 'Reminder Medication System',
    description: 'Automated medication dispenser with alarms and notifications for medication management.',
    price: 199.99,
    category: 'Health',
    image: '/products/med-reminder.jpg',
    tags: ['medication', 'health', 'reminder', 'management'],
    features: [
      'Automated dispensing',
      'Programmable alarms',
      'Mobile notifications',
      'Lockable system'
    ]
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const category = searchParams.get('category')?.toLowerCase();
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || Infinity;

  let filteredProducts = products;

  // Apply search query filter
  if (query) {
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Apply category filter
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase() === category
    );
  }

  // Apply price range filter
  filteredProducts = filteredProducts.filter(product => 
    product.price >= minPrice && product.price <= maxPrice
  );

  return NextResponse.json({
    products: filteredProducts,
    total: filteredProducts.length
  });
}