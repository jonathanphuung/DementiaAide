'use client';

import { ShoppingCartProvider } from '@/components/ShoppingCart';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <ShoppingCartProvider>{children}</ShoppingCartProvider>;
}
