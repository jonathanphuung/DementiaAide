import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Shield, MapPin, Clock, AlertTriangle } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dementia-aide.vercel.app'

export const metadata: Metadata = {
  title: 'Wandering Prevention in Dementia - Safety Strategies & GPS Solutions',
  description: 'Comprehensive guide to preventing wandering in dementia patients. Learn safety strategies, GPS tracking solutions, home modifications, and emergency response plans to keep your loved one safe.',
  keywords: [
    'dementia wandering prevention', 'alzheimer wandering safety', 'dementia GPS tracking',
    'wandering behavior management', 'dementia safety devices', 'alzheimer exit seeking',
    'dementia door alarms', 'wandering risk assessment', 'dementia home safety',
    'alzheimer tracking devices', 'dementia elopement prevention', 'wandering intervention'
  ],
  openGraph: {
    title: 'Wandering Prevention in Dementia - Complete Safety Guide',
    description: 'Expert strategies and solutions for preventing wandering in dementia patients. GPS devices, home modifications, and safety plans.',
    url: `${siteUrl}/topics/wandering-prevention`
  },
  alternates: {
    canonical: `${siteUrl}/topics/wandering-prevention`
  }
}

export default function WanderingPreventionPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article>
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-sm text-blue-600 font-medium">Safety Topic</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Wandering Prevention in Dementia: Complete Safety Guide
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive strategies to prevent wandering and keep your loved one with dementia safe at home and in the community.
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-semibold text-amber-800">Important Safety Notice</h3>
              </div>
              <p className="text-amber-700">
                Wandering affects up to 60% of people with dementia. Having a safety plan and prevention strategies in place is crucial for protecting your loved one.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-blue-600" />
                Understanding Wandering Behavior
              </h2>
              <p>
                Wandering is a common behavior in dementia that can occur at any stage of the disease. It may be triggered by:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Confusion about time or place</li>
                <li>Searching for familiar people or places from the past</li>
                <li>Restlessness or boredom</li>
                <li>Physical discomfort or medication side effects</li>
                <li>Sundowning (increased confusion in late afternoon/evening)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-green-600" />
                Prevention Strategies
              </h2>
              
              <h3 className="text-xl font-semibold mb-3">Home Modifications</h3>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Door alarms:</strong> Install sensors that alert you when doors are opened</li>
                <li><strong>Locks and latches:</strong> Use childproof locks or slide bolt locks placed high or low on doors</li>
                <li><strong>Camouflage exits:</strong> Use curtains or decorative panels to hide doors</li>
                <li><strong>Remove triggers:</strong> Hide car keys, coats, and shoes that might prompt leaving</li>
                <li><strong>Create safe spaces:</strong> Designate secure areas where wandering can occur safely</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Daily Routine Strategies</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Maintain consistent daily routines</li>
                <li>Provide regular physical activity and mental stimulation</li>
                <li>Address basic needs (hunger, thirst, bathroom) regularly</li>
                <li>Monitor for triggers and patterns in wandering behavior</li>
                <li>Use calming activities during high-risk times</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Technology Solutions</h2>
              
              <h3 className="text-xl font-semibold mb-3">GPS Tracking Devices</h3>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Wearable GPS watches:</strong> Discrete and comfortable for daily wear</li>
                <li><strong>GPS shoe inserts:</strong> Hidden tracking that's hard to remove</li>
                <li><strong>Clothing tags:</strong> Sewn-in devices for those who remove accessories</li>
                <li><strong>Smart jewelry:</strong> Attractive options that don't look medical</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Home Monitoring Systems</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Motion sensors for doorways and hallways</li>
                <li>Bed and chair sensors to detect nighttime movement</li>
                <li>Smart doorbells with video monitoring</li>
                <li>Floor pressure mats near exits</li>
              </ul>
            </section>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Emergency Preparedness</h3>
              <ul className="text-blue-700 space-y-2">
                <li>• Register with local police and Alzheimer's Association Safe Return program</li>
                <li>• Keep recent photos and have emergency contact information readily available</li>
                <li>• Teach neighbors and local businesses about your loved one's condition</li>
                <li>• Practice search and response procedures with family members</li>
                <li>• Consider medical alert bracelets with contact information</li>
              </ul>
            </div>

            <section>
              <h2 className="text-2xl font-bold mb-4">Get Professional Help</h2>
              <p className="mb-4">
                If wandering becomes frequent or dangerous, consult with healthcare professionals who specialize in dementia care. They can help assess triggers, recommend modifications, and adjust care plans.
              </p>
              <p className="text-sm text-muted-foreground">
                Remember: Every person with dementia is unique. What works for one individual may not work for another. Be patient and willing to try different approaches.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}