'use client';

import { motion } from 'framer-motion';
import { Check, Shield, Sparkles, Heart, Zap, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

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
  return (
    <section className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 border-blue-200">
              Our Flagship Product
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl text-foreground mb-4"
          >
            The Bear Hug{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Care Jumpsuit
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Designed specifically for dementia care - making daily routines easier, safer, and more dignified for everyone involved.
          </motion.p>
        </div>

        {/* Product Display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-8">
              <div className="aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2xvdGhpbmclMjBqdW1wc3VpdHxlbnwxfHx8fDE3NjAxMjkwNDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Bear Hug Care Jumpsuit"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating badge */}
              <div className="absolute top-12 right-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-white" />
                  <span className="text-sm">Best Seller</span>
                </div>
              </div>
            </div>

            {/* Small product images */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21mb3J0YWJsZSUyMGNsb3RoaW5nJTIwZmFicmljfGVufDF8fHx8MTc2MDEyOTA0NHww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt={`Product view ${i}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-5xl text-foreground">$89.99</span>
              <span className="text-2xl text-muted-foreground line-through">$129.99</span>
              <Badge className="bg-green-100 text-green-700 border-green-200">Save 31%</Badge>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-muted-foreground">(2,847 reviews)</span>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {productFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-foreground/80">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Size selector */}
            <div className="space-y-3">
              <label className="text-foreground">Select Size</label>
              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
                  <button
                    key={size}
                    className="px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-6 rounded-xl shadow-lg"
              >
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 border-2 px-8 py-6 rounded-xl"
              >
                Learn More
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span>30-day returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>Free shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-600" />
                <span>Lifetime warranty</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
