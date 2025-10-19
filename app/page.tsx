import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SearchHero } from '@/components/SearchHero';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <SearchHero />
      </main>
      <Footer />
    </div>
  );
}