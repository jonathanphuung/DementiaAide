import { Heart } from 'lucide-react';

export function Footer() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Resources', href: '/resources' },
    { label: 'Caregiver Support', href: '/caregiver-support' },
    { label: 'About', href: '/about' },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center text-center mb-12">
          {/* Logo and description */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
            </div>
            <span className="font-display text-xl font-extrabold text-background tracking-tight">
              DementiaAide
            </span>
          </div>
          <p className="text-background/80 mb-8 max-w-md">
            Empowering families with compassionate care solutions and expert resources for
            dementia caregiving.
          </p>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-background hover:text-background/80 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t-2 border-background/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/80 text-sm">
            © 2025 DementiaAide. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-background/80 hover:text-background transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-background/80 hover:text-background transition-colors text-sm">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
