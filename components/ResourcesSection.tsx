'use client';

import { motion } from 'framer-motion';
import { BookOpen, Video, FileText, Users, Download, ArrowRight, Heart, Brain, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

const resourceCategories = [
  {
    icon: BookOpen,
    title: 'Care Guides',
    description: 'Comprehensive guides for daily dementia care',
    count: '50+ Articles',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Step-by-step visual demonstrations',
    count: '30+ Videos',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: FileText,
    title: 'Printable Tools',
    description: 'Checklists, charts, and care planners',
    count: '25+ Downloads',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Connect with other caregivers',
    count: '10K+ Members',
    gradient: 'from-orange-500 to-red-500',
  },
];

const featuredResources = [
  {
    title: 'Understanding Dementia Behaviors',
    category: 'Care Guide',
    image: 'https://images.unsplash.com/photo-1609181635065-2672c9bef9ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZ2l2ZXIlMjByZWFkaW5nJTIwcmVzb3VyY2VzfGVufDF8fHx8MTc2MDEyOTA0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: '8 min read',
  },
  {
    title: 'Self-Care for Caregivers',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWxmJTIwY2FyZSUyMHJlbGF4YXRpb258ZW58MXx8fHwxNzYwMTI5MDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    readTime: '6 min read',
  },
  {
    title: 'Daily Routine Management',
    category: 'Practical Tips',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    readTime: '10 min read',
  },
];

export function ResourcesSection() {
  return (
    <section id="resources" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-4">
              Free Resources
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl text-foreground mb-4"
          >
            Expert{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Caregiver Resources
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Access comprehensive guides, tools, and support to help you provide the best care while taking care of yourself.
          </motion.p>
        </div>

        {/* Resource Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {resourceCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="h-full p-6 cursor-pointer group hover:shadow-2xl transition-all border-2 border-transparent hover:border-purple-200">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} p-0.5 mb-4`}>
                  <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                    <category.icon className={`w-6 h-6 bg-gradient-to-br ${category.gradient} bg-clip-text text-transparent`} />
                  </div>
                </div>
                <h3 className="text-lg text-foreground mb-2 group-hover:text-purple-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                <div className="text-sm text-purple-600">{category.count}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl text-foreground mb-8">Featured Resources</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all">
                  <div className="aspect-video overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                    <ImageWithFallback
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                        {resource.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{resource.readTime}</span>
                    </div>
                    <h4 className="text-lg text-foreground mb-3 group-hover:text-purple-600 transition-colors">
                      {resource.title}
                    </h4>
                    <div className="flex items-center gap-2 text-purple-600">
                      <span className="text-sm">Read more</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Caregiver Self-Care Section */}
        <motion.div
          id="caregiver-support"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 mt-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full">
                <Heart className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-purple-700">Caregiver Wellness</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl text-foreground">
                Taking care of yourself is{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  just as important
                </span>
              </h3>

              <p className="text-lg text-muted-foreground">
                Caregiving can be physically and emotionally demanding. We provide resources specifically designed to help you manage stress, prevent burnout, and maintain your own health and wellbeing.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Brain, text: 'Mental health support and coping strategies' },
                  { icon: Heart, text: 'Physical wellness and self-care routines' },
                  { icon: Shield, text: 'Stress management techniques' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-foreground/80 pt-2">{item.text}</p>
                  </div>
                ))}
              </div>

              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-6 rounded-xl">
                <Download className="mr-2 w-5 h-5" />
                Download Self-Care Guide
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWxmJTIwY2FyZSUyMHJlbGF4YXRpb258ZW58MXx8fHwxNzYwMTI5MDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Self-care for caregivers"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
