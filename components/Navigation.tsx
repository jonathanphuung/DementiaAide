'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { Button } from './ui/button';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Resources', href: '/resources' },
    { label: 'Caregiver Support', href: '/caregiver-support' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl text-foreground tracking-tight">
              Dementia<span className="text-blue-600">Aide</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
                <a
                key={item.label}
                href={item.href}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors relative group"
                onClick={() => {}}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
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
            <Button 
              className="text-sm bg-blue-600 hover:bg-blue-700"
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
          className="md:hidden bg-white border-t border-border"
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
            <div className="pt-4 space-y-3 border-t border-border">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
