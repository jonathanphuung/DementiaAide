'use client';

import { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import { products, Product } from '@/lib/products';
import { ProductCard } from './ProductCard';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Button } from './ui/button';

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'newest';
type CategoryFilter = 'all' | 'Clothing' | 'Accessories' | 'Adaptive Wear' | 'Awareness';

export function ProductCatalog() {
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [showOnSaleOnly, setShowOnSaleOnly] = useState(false);
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    if (showOnSaleOnly) {
      filtered = filtered.filter((p) => p.onSale);
    }

    if (showInStockOnly) {
      filtered = filtered.filter((p) => p.inStock);
    }

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

  const categories: CategoryFilter[] = ['all', 'Adaptive Wear', 'Awareness'];

  return (
    <section id="shop" className="bg-secondary/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            Shop <span className="text-primary">Dementia Care</span> Products
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Quality products designed to make caregiving easier and raise awareness for Alzheimer&apos;s and dementia.
          </p>
        </div>

        <div className="mb-8 rounded-lg border-2 border-foreground/15 bg-card p-6 shadow-sm">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Filter:</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`rounded-md border-2 px-4 py-2 text-sm font-medium transition-colors ${
                      categoryFilter === category
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-foreground/15 bg-card text-foreground hover:border-primary hover:bg-teal-tint'
                    }`}
                  >
                    {category === 'all' ? 'All Products' : category}
                  </button>
                ))}
              </div>

              <div className="ml-0 flex items-center gap-4 sm:ml-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="on-sale"
                    checked={showOnSaleOnly}
                    onCheckedChange={(checked) => setShowOnSaleOnly(checked as boolean)}
                  />
                  <Label htmlFor="on-sale" className="cursor-pointer text-sm">
                    On Sale
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="in-stock"
                    checked={showInStockOnly}
                    onCheckedChange={(checked) => setShowInStockOnly(checked as boolean)}
                  />
                  <Label htmlFor="in-stock" className="cursor-pointer text-sm">
                    In Stock
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-md border-2 border-foreground/15 bg-card px-4 py-2 text-sm text-foreground"
              >
                <option value="name-asc">Alphabetically, A-Z</option>
                <option value="name-desc">Alphabetically, Z-A</option>
                <option value="price-asc">Price, Low to High</option>
                <option value="price-desc">Price, High to Low</option>
              </select>
              <span className="text-sm text-muted-foreground">
                {filteredAndSortedProducts.length} products
              </span>
            </div>
          </div>
        </div>

        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="mb-4 text-xl text-muted-foreground">
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
          </div>
        )}

        {filteredAndSortedProducts.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Showing all {filteredAndSortedProducts.length} products
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
