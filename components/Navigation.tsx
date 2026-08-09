'use client';

import { useState } from 'react';
import { Menu, X, Heart, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from './ShoppingCart';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Resources', href: '/resources' },
    { label: 'Caregiver Support', href: '/caregiver-support' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav className="relative z-50 bg-card border-b-2 border-foreground/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
            </div>
            <span className="font-display text-xl font-extrabold text-foreground tracking-tight">
              Dementia<span className="text-primary">Aide</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
                <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors relative group"
                onClick={() => {}}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className="hidden md:flex items-center gap-3"
          >
            <Button variant="ghost" className="text-sm" onClick={() => document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' })}>
              Free Resources
            </Button>
            <Button variant="outline" className="text-sm relative border-2 border-foreground/20" onClick={() => setIsOpen(true)}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
            <Button
              className="text-sm"
              onClick={() => window.location.href = '/shop'}
            >
              Shop Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden bg-card border-t-2 border-foreground/15"
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-sm text-foreground/70 hover:text-foreground transition-colors py-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.location.href = item.href;
                }}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 space-y-3 border-t-2 border-foreground/15">
              <Button variant="outline" className="w-full border-2 border-foreground/20">
                Sign In
              </Button>
              <Button className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
