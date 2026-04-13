'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-blue-50">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
                Resources & Products for Dementia Care
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight">
              Let us lighten the{' '}
              <span className="text-blue-600 font-bold">
                caregiving load
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              Discover our specialized full-body jumpsuit for easier care, plus expert resources
              to support both caregivers and those living with dementia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all group"
                onClick={() => window.location.href = '/shop'}
              >
                Shop Products
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 px-8 py-6 rounded-xl hover:bg-white/50 group"
                onClick={() => document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Browse Resources
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              {[
                { value: '10K+', label: 'Families Helped' },
                { value: '98%', label: 'Satisfaction Rate' },
                { value: '24/7', label: 'Support Available' },
              ].map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-3xl text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image Grid */}
          <div className="relative overflow-visible">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1758686254056-6cd980b9aaee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwY2FyZSUyMGhhcHB5fGVufDF8fHx8MTc2MDAwMTU4NXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Care"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl mt-8">
                <img
                  src="https://images.unsplash.com/photo-1526225294770-079fcbe68745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZ2l2ZXIlMjBzdXBwb3J0fGVufDF8fHx8MTc2MDEyNDE1OXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Support"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl -mt-4">
                <img
                  src="https://images.unsplash.com/photo-1758691461516-7e716e0ca135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBoZWFsdGhjYXJlJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDEyNzA1NXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Professional Care"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                </div>

              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative h-64 rounded-2xl overflow-hidden shadow-2xl mt-4"
              >
                <img
                  src="https://images.unsplash.com/photo-1738915745736-0e1eb4e300c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGVsZGVybHklMjBwZXJzb258ZW58MXx8fHwxNzYwMDIwMDkxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Happy Care"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </motion.div>
            </div>

            {/* Floating badge - positioned at bottom-left of image grid */}
            <div className="absolute bottom-4 -left-2 bg-white rounded-2xl shadow-lg p-4 z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl text-white">✓</span>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Trusted by</div>
                  <div className="text-foreground">10,000+ Families</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
