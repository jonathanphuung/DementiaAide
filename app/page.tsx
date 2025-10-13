import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { ProductShowcase } from '@/components/ProductShowcase';
import { ProductCatalog } from '@/components/ProductCatalog';
import { ResourcesSection } from '@/components/ResourcesSection';
import { Testimonials } from '@/components/Testimonials';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <ProductShowcase />
        <ProductCatalog />
        <ResourcesSection />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}