'use client';

import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Users, Clock, Book, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Quality Products',
    description: 'Specially designed jumpsuit that makes caregiving easier while maintaining dignity.',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    hoverTint: 'bg-pink-600',
  },
  {
    icon: ShieldCheck,
    title: 'Safety & Comfort',
    description: 'Medical-grade materials that prioritize both safety and all-day comfort.',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    hoverTint: 'bg-blue-600',
  },
  {
    icon: Book,
    title: 'Expert Resources',
    description: 'Free educational content covering all aspects of dementia care.',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    hoverTint: 'bg-green-600',
  },
  {
    icon: Users,
    title: 'Caregiver Community',
    description: 'Connect with thousands of caregivers sharing similar experiences.',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    hoverTint: 'bg-purple-600',
  },
  {
    icon: Sparkles,
    title: 'Self-Care Support',
    description: 'Resources dedicated to helping caregivers manage stress and prevent burnout.',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    hoverTint: 'bg-violet-600',
  },
  {
    icon: Clock,
    title: 'Always Available',
    description: '24/7 access to resources, guides, and community support whenever you need it.',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    hoverTint: 'bg-orange-600',
  },
];

export function Features() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gray-50/50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-4">
              Why Choose Us
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl text-foreground mb-4"
          >
            Everything you need for{' '}
            <span className="text-blue-600">
              quality care
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Comprehensive solutions designed to support caregivers and improve quality of life
            for those living with dementia.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative h-full bg-white rounded-2xl p-8 shadow-lg shadow-black/5 border border-gray-100 hover:shadow-2xl hover:shadow-black/10 transition-all duration-300">
                {/* Icon */}
                <div className="mb-6">
                  <div
                    className={`w-14 h-14 rounded-xl ${feature.iconBg} flex items-center justify-center shadow-lg`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl text-foreground mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect */}
                <div className={`absolute inset-0 rounded-2xl ${feature.hoverTint} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
