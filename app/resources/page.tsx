import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Construction } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <Construction className="w-16 h-16 text-blue-600 mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-4">Resources Page</h1>
            <p className="text-xl text-muted-foreground">
              This page is currently under construction. Check back soon for helpful resources!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}