import { CheckoutPage } from '@/components/CheckoutPage';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';

// Force dynamic rendering since this page uses client-side cart state
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Secure Checkout - DementiaAide',
  description: 'Complete your order for dementia care products with secure payment options including Shop Pay, Amazon Pay, PayPal, and Google Pay.',
  robots: {
    index: false, // Don't index checkout pages
    follow: false
  }
};

export default function CheckoutPageRoute() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <CheckoutPage />
      </main>
      <Footer />
    </div>
  );
}