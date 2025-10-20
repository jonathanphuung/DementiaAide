import { ProductShowcase } from '@/components/ProductShowcase';
import { ProductCatalog } from '@/components/ProductCatalog';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1">
        <ProductShowcase />
        <ProductCatalog />
      </main>
      <Footer />
    </div>
  );
}