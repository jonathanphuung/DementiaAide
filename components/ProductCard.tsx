'use client';

import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product } from '@/lib/products';
import { useState } from 'react';
import { useCart } from './ShoppingCart';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes?.[0] ?? null);
  const [selectedColor, setSelectedColor] = useState<string | null>(product.colors?.[0] ?? null);
  const { addToCart, setIsOpen } = useCart();
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const sizeRequired = Boolean(product.sizes && product.sizes.length > 0);
  const canAddToCart = product.inStock && (!sizeRequired || Boolean(selectedSize));
  const variantKey = [selectedSize, selectedColor].filter(Boolean).join('|');
  const shopifyVariantId =
    (variantKey && product.shopifyVariantIds?.[variantKey]) ||
    (selectedSize && product.shopifyVariantIds?.[selectedSize]) ||
    product.shopifyVariantIds?.default;

  const handleAddToCart = () => {
    if (!canAddToCart) return;

    const variantParts = [selectedSize, selectedColor].filter(Boolean);
    const variantLabel = variantParts.length > 0 ? variantParts.join(' / ') : 'Default';
    const variantId = `${product.id}-${variantParts.length > 0 ? variantParts.join('-').toLowerCase() : 'default'}`;

    addToCart({
      id: variantId,
      productId: product.id,
      variantId,
      title: product.name,
      variant: variantLabel,
      price: product.price,
      image: product.image,
      sku: `${product.id.toUpperCase()}-${variantParts.join('-').toUpperCase() || 'DEFAULT'}`,
      shopifyVariantId,
    });
    setIsOpen(true);
  };

  return (
    <div className="group h-full">
      <Card className="h-full overflow-hidden border-2 border-foreground/15 transition-colors hover:border-primary">
        <div className="relative aspect-square overflow-hidden bg-secondary/40">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.onSale && (
              <Badge className="border-0 bg-primary text-primary-foreground shadow-sm">Sale</Badge>
            )}
            {!product.inStock && (
              <Badge className="border-0 bg-foreground/70 text-background shadow-sm">Out of Stock</Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="border-0 bg-sage text-white shadow-sm">-{discountPercentage}%</Badge>
            )}
          </div>

          <div className="absolute right-3 top-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition-colors ${
                isLiked ? 'bg-primary' : 'bg-card/90'
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-primary-foreground text-primary-foreground' : 'text-foreground/70'}`} />
            </button>
          </div>

          <div className="absolute bottom-3 left-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
            <Button className="w-full shadow-sm" onClick={() => onViewDetails?.(product)}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Quick View
            </Button>
          </div>
        </div>

        <div className="space-y-3 p-4">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>

          <h3
            className="min-h-[3rem] cursor-pointer text-base text-foreground line-clamp-2 transition-colors group-hover:text-primary"
            onClick={() => onViewDetails?.(product)}
          >
            {product.name}
          </h3>

          {product.rating && (
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating!) ? 'fill-primary text-primary' : 'text-muted-foreground/40'}`}
                  />
                ))}
              </div>
              {product.reviews && (
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              )}
            </div>
          )}

          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Colors:</span>
              <div className="flex gap-1">
                {product.colors.slice(0, 4).map((color, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`h-5 w-5 rounded-full border-2 transition-transform ${
                      selectedColor === color ? 'scale-110 border-primary' : 'border-foreground/20'
                    }`}
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

          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">Size:</span>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-md border-2 px-2 py-1 text-xs transition-colors ${
                    selectedSize === size
                      ? 'border-primary bg-teal-tint text-primary'
                      : 'border-foreground/15 hover:border-primary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          <Button className="w-full" disabled={!canAddToCart} onClick={handleAddToCart}>
            {!product.inStock ? 'Out of Stock' : sizeRequired && !selectedSize ? 'Select Size' : 'Add to Cart'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
