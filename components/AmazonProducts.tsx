'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Star, ShoppingCart, Zap, Loader2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { type AmazonProduct } from '@/lib/amazon';

interface AmazonProductCardProps {
  product: AmazonProduct;
  index: number;
}

export function AmazonProductCard({ product, index }: AmazonProductCardProps) {
  const handleProductClick = () => {
    // Create search-based URL that always works
    const searchTerms = product.title.split(' ').slice(0, 4).join(' '); // Use first 4 words
    const searchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(searchTerms)}&tag=${process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || 'dementiaaide-20'}&ref=sr_pg_1`;
    
    // Track affiliate click for analytics (optional)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'affiliate',
        event_label: product.asin,
        value: parseFloat(product.price.replace(/[^0-9.]/g, '') || '0')
      });
    }
    
    // Open Amazon search in new tab - this will always work
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-sm transition-all duration-300 border border-gray-200 group cursor-pointer"
            onClick={handleProductClick}>
        <CardContent className="p-0 h-full flex flex-col">
          {/* Product Header */}
          <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-t-lg border-b border-orange-200">
            <div className="flex items-center justify-center h-16">
              <ShoppingCart className="w-12 h-12 text-orange-600" />
            </div>
            

            
            {/* External link indicator */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-black/20 backdrop-blur-sm rounded-full p-1">
                <ExternalLink className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              {/* Title */}
              <h3 className="font-semibold text-base leading-snug line-clamp-3 group-hover:text-blue-600 transition-colors min-h-[4rem]">
                {product.title}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">
                  {product.rating} ({product.reviewCount?.toLocaleString()})
                </span>
              </div>
            </div>

            {/* Price and CTA */}
            <div className="space-y-3 mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-900">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>

              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm py-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleProductClick();
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                View on Amazon
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface AmazonProductsProps {
  products: AmazonProduct[];
  loading?: boolean;
  query?: string;
}

export function AmazonProducts({ products, loading, query }: AmazonProductsProps) {
  console.log('🛍️  AmazonProducts component received:', {
    productCount: products.length,
    query,
    loading,
    firstProduct: products[0] ? {
      asin: products[0].asin,
      title: products[0].title,
      price: products[0].price
    } : null
  });

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Recommended Products</h2>
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Amazon
          </Badge>
        </div>
        
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-orange-600">
            <Loader2 
              className="w-6 h-6 animate-spin" 
              style={{ 
                animation: 'spin 1s linear infinite',
                transformOrigin: 'center'
              }}
            />
            <span className="text-lg font-medium">Finding helpful products...</span>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Recommended Products</h2>
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Amazon
          </Badge>
        </div>
        
        <div className="text-center py-8 text-muted-foreground bg-gray-50 rounded-lg">
          <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>No products found for this search.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Recommended Products</h2>
          <p className="text-sm text-gray-600">
            Carefully selected products to help with dementia care
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Amazon
          </Badge>
          <Badge variant="outline" className="text-xs">
            Affiliate Partner
          </Badge>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <AmazonProductCard
            key={product.asin}
            product={product}
            index={index}
          />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <p>
          * As an Amazon Associate, DementiaAide earns from qualifying purchases. 
          Prices and availability subject to change. Product recommendations are based on relevance to dementia care needs.
        </p>
      </div>
    </section>
  );
}