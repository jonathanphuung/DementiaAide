'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { products, Product } from '@/lib/products';
import { ProductCard } from './ProductCard';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'newest';
type CategoryFilter = 'all' | 'Clothing' | 'Accessories' | 'Adaptive Wear' | 'Awareness';

export function ProductCatalog() {
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [showOnSaleOnly, setShowOnSaleOnly] = useState(false);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    // Sale filter
    if (showOnSaleOnly) {
      filtered = filtered.filter((p) => p.onSale);
    }

    // Stock filter
    if (showInStockOnly) {
      filtered = filtered.filter((p) => p.inStock);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return filtered;
  }, [categoryFilter, showOnSaleOnly, showInStockOnly, sortBy]);

  const categories: CategoryFilter[] = ['all', 'Adaptive Wear', 'Awareness', 'Accessories', 'Clothing'];

  return (
    <section id="shop" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 border-blue-200">
              Our Products
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl text-foreground mb-4"
          >
            Shop{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dementia Care
            </span>{' '}
            Products
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Quality products designed to make caregiving easier and raise awareness for Alzheimer's and dementia.
          </motion.p>
        </div>

        {/* Filters and Sort Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Left Side - Filters */}
            <div className="flex flex-wrap items-center gap-4 flex-1">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">Filter:</span>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      categoryFilter === category
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Products' : category}
                  </button>
                ))}
              </div>

              {/* Availability Filters */}
              <div className="flex items-center gap-4 ml-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="on-sale"
                    checked={showOnSaleOnly}
                    onCheckedChange={(checked) => setShowOnSaleOnly(checked as boolean)}
                  />
                  <Label htmlFor="on-sale" className="text-sm cursor-pointer">
                    On Sale
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="in-stock"
                    checked={showInStockOnly}
                    onCheckedChange={(checked) => setShowInStockOnly(checked as boolean)}
                  />
                  <Label htmlFor="in-stock" className="text-sm cursor-pointer">
                    In Stock
                  </Label>
                </div>
              </div>
            </div>

            {/* Right Side - Sort */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">Sort by:</span>
              </div>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Alphabetically, A-Z</SelectItem>
                  <SelectItem value="name-desc">Alphabetically, Z-A</SelectItem>
                  <SelectItem value="price-asc">Price, Low to High</SelectItem>
                  <SelectItem value="price-desc">Price, High to Low</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">
                {filteredAndSortedProducts.length} products
              </span>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-xl text-muted-foreground mb-4">
              No products found matching your filters.
            </p>
            <Button
              onClick={() => {
                setCategoryFilter('all');
                setShowOnSaleOnly(false);
                setShowInStockOnly(false);
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Load More (for future pagination) */}
        {filteredAndSortedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Showing all {filteredAndSortedProducts.length} products
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
