'use client';

import { useState } from 'react';
import { Check, Shield, Sparkles, Heart, Zap, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from './ShoppingCart';

const productFeatures = [
  'Easy-access back zipper for dignified changing',
  'Tamper-resistant design for safety',
  'Soft, breathable, medical-grade fabric',
  'Machine washable and durable',
  'Available in multiple sizes and colors',
  'Comfortable for all-day wear',
];

const benefits = [
  {
    icon: Heart,
    title: 'Maintains Dignity',
    description: 'Respectful design that preserves independence and comfort',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Prevents unauthorized removal while staying comfortable',
  },
  {
    icon: Sparkles,
    title: 'Easy Care',
    description: 'Quick changes and simple washing for busy caregivers',
  },
  {
    icon: Zap,
    title: 'Time-Saving',
    description: 'Reduces changing time by up to 50%',
  },
];

export function ProductShowcase() {
  const sizes = ['S', 'M', 'L', 'XL', '2XL'];
  const [selectedSize, setSelectedSize] = useState('M');
  const { addToCart, setIsOpen } = useCart();
  const shopifyVariantMap: Record<string, string | undefined> = {
    S: process.env.NEXT_PUBLIC_SHOPIFY_BEAR_HUG_VARIANT_S,
    M: process.env.NEXT_PUBLIC_SHOPIFY_BEAR_HUG_VARIANT_M,
    L: process.env.NEXT_PUBLIC_SHOPIFY_BEAR_HUG_VARIANT_L,
    XL: process.env.NEXT_PUBLIC_SHOPIFY_BEAR_HUG_VARIANT_XL,
    '2XL': process.env.NEXT_PUBLIC_SHOPIFY_BEAR_HUG_VARIANT_2XL,
  };

  const handleAddToCart = () => {
    const variantId = `bear-hug-jumpsuit-${selectedSize.toLowerCase()}`;
    addToCart({
      id: variantId,
      productId: 'bear-hug-jumpsuit',
      variantId,
      title: 'The Bear Hug Care Jumpsuit',
      variant: `Size ${selectedSize}`,
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2xvdGhpbmclMjBqdW1wc3VpdHxlbnwxfHx8fDE3NjAxMjkwNDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      sku: `BEAR-HUG-${selectedSize}`,
      shopifyVariantId: shopifyVariantMap[selectedSize],
    });
    setIsOpen(true);
  };

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-display text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            Anti-Strip <span className="text-primary">Back-zip Jumpsuit</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Designed specifically for dementia care — making daily routines easier, safer, and more dignified for everyone involved.
          </p>
        </div>

        <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative rounded-lg border-2 border-foreground/15 bg-card p-6 shadow-sm">
              <div className="relative aspect-square overflow-hidden rounded-md bg-teal-tint">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2xvdGhpbmclMjBqdW1wc3VpdHxlbnwxfHx8fDE3NjAxMjkwNDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Anti-Strip Back-zip Jumpsuit"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div className="absolute right-8 top-8 flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-sm">
                <Star className="h-4 w-4 fill-primary-foreground" />
                <span className="font-display text-xs font-bold uppercase tracking-wide">Best Seller</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square cursor-pointer overflow-hidden rounded-md border-2 border-foreground/15 transition-colors hover:border-primary"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21mb3J0YWJsZSUyMGNsb3RoaW5nJTIwZmFicmljfGVufDF8fHx8MTc2MDEyOTA0NHww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt={`Product view ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-4xl font-extrabold text-foreground">$69.99</span>
              <span className="text-xl text-muted-foreground line-through">$110.95</span>
              <Badge className="border-sage-border bg-sage-tint text-sage">Save 37%</Badge>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? 'fill-primary text-primary' : i === 4 ? 'fill-primary/50 text-primary' : 'fill-muted text-muted'}`} />
                ))}
              </div>
              <span className="text-muted-foreground">4.5 (18 reviews)</span>
            </div>

            <div className="space-y-3">
              {productFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-sage-tint">
                    <Check className="h-3 w-3 text-sage" />
                  </div>
                  <span className="text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <label className="font-display text-xs font-bold uppercase tracking-wide text-foreground">Select Size</label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-md border-2 px-5 py-2.5 font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-primary bg-teal-tint text-primary'
                        : 'border-foreground/15 text-foreground hover:border-primary hover:bg-teal-tint'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                Add Size {selectedSize} to Cart
              </Button>
              <Button size="lg" variant="outline" className="flex-1 border-2 border-foreground/20">
                Learn More
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>30-day returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-sage" />
                <span>Free shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-crimson" />
                <span>Lifetime warranty</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="rounded-lg border-2 border-foreground/15 bg-card p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-teal-tint">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-foreground">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
