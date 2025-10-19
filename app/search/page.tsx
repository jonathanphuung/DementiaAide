import { SearchResults } from '@/components/SearchResults';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchResults />
      </main>
      <Footer />
    </div>
  );
}