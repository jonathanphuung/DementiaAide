export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  imageUrl: string;
  productUrl: string;
  retailer: string;
  rating?: number;
  reviews?: number;
}

// This is a placeholder function. You'll need to replace this with actual API calls
// to Amazon Product Advertising API, Target API, etc.
export async function searchProducts(query: string): Promise<Product[]> {
  // Simulated delay to mimic API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Sample data - replace with actual API integration
  return [
    {
      id: 'amz1',
      title: 'Digital Calendar Day Clock',
      description: 'Large, Clear, Premium Quality - Perfect for Memory Loss, Impaired Vision, Elderly, Dementia',
      price: '39.99',
      currency: 'USD',
      imageUrl: 'https://via.placeholder.com/200x200',
      productUrl: 'https://amazon.com/example',
      retailer: 'Amazon',
      rating: 4.5,
      reviews: 1250
    },
    {
      id: 'tgt1',
      title: 'Memory Foam Comfort Mat',
      description: 'Anti-Fatigue Floor Mat - Reduces Stress on Feet, Knees and Joints',
      price: '29.99',
      currency: 'USD',
      imageUrl: 'https://via.placeholder.com/200x200',
      productUrl: 'https://target.com/example',
      retailer: 'Target',
      rating: 4.2,
      reviews: 850
    }
  ].filter(product => 
    product.title.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );
}