'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product } from '@/lib/products';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-200">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.onSale && (
              <Badge className="bg-red-500 text-white border-0 shadow-lg">
                Sale
              </Badge>
            )}
            {!product.inStock && (
              <Badge className="bg-gray-500 text-white border-0 shadow-lg">
                Out of Stock
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="bg-green-500 text-white border-0 shadow-lg">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`w-10 h-10 rounded-full ${
                isLiked ? 'bg-red-500' : 'bg-white/90'
              } backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-all`}
            >
              <Heart
                className={`w-5 h-5 ${
                  isLiked ? 'fill-white text-white' : 'text-gray-700'
                }`}
              />
            </button>
          </div>

          {/* Quick Add to Cart - Shows on Hover */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl"
              onClick={() => onViewDetails?.(product)}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Quick View
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Category */}
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>

          {/* Product Name */}
          <h3
            className="text-base text-foreground line-clamp-2 min-h-[3rem] group-hover:text-blue-600 transition-colors cursor-pointer"
            onClick={() => onViewDetails?.(product)}
          >
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating!)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              {product.reviews && (
                <span className="text-xs text-muted-foreground">
                  ({product.reviews})
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Colors:</span>
              <div className="flex gap-1">
                {product.colors.slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="w-5 h-5 rounded-full border-2 border-gray-300"
                    style={{
                      backgroundColor:
                        color.toLowerCase() === 'white'
                          ? '#ffffff'
                          : color.toLowerCase() === 'black'
                          ? '#000000'
                          : color.toLowerCase() === 'navy'
                          ? '#001f3f'
                          : color.toLowerCase() === 'gray'
                          ? '#6c757d'
                          : color.toLowerCase() === 'purple'
                          ? '#6f42c1'
                          : color.toLowerCase() === 'pink'
                          ? '#e83e8c'
                          : '#ccc',
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            disabled={!product.inStock}
            onClick={() => onViewDetails?.(product)}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
