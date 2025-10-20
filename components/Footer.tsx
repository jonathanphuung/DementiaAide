import { Heart, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Resources', href: '/resources' },
    { label: 'Caregiver Support', href: '/caregiver-support' },
    { label: 'About', href: '/about' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center text-center mb-12">
          {/* Logo and description */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gray-800 backdrop-blur-lg rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl text-white tracking-tight">
              Dementia<span className="text-white">Aide</span>
            </span>
          </div>
          <p className="text-white mb-8 max-w-md">
            Empowering families with compassionate care solutions and expert resources for
            dementia caregiving.
          </p>
          
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-white hover:text-white/80 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Social Media */}
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white text-sm">
            © 2025 DementiaAide. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white hover:text-white/80 transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-white hover:text-white/80 transition-colors text-sm">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
