import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Utensils, Heart, Clock, AlertCircle } from 'lucide-react';
import { getSiteUrl } from '@/lib/site-url'

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: 'Eating Difficulties in Dementia - Nutrition Strategies & Feeding Solutions',
  description: 'Expert guide to managing eating problems in dementia and Alzheimer\'s. Learn feeding techniques, adaptive utensils, nutrition strategies, and solutions for food refusal and swallowing difficulties.',
  keywords: [
    'dementia eating problems', 'alzheimer nutrition difficulties', 'dementia food refusal',
    'swallowing problems dementia', 'dementia feeding techniques', 'alzheimer meal strategies',
    'adaptive eating utensils', 'dementia weight loss', 'nutrition supplements dementia',
    'dementia dining strategies', 'alzheimer feeding assistance', 'dementia meal planning'
  ],
  openGraph: {
    title: 'Eating Difficulties in Dementia - Complete Nutrition Guide',
    description: 'Professional strategies for managing eating challenges in dementia patients. Feeding techniques, adaptive tools, and nutrition solutions.',
    url: `${siteUrl}/topics/eating-difficulties`
  },
  alternates: {
    canonical: `${siteUrl}/topics/eating-difficulties`
  }
}

export default function EatingDifficultiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article>
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Utensils className="w-8 h-8 text-primary" />
              <span className="text-sm text-primary font-medium">Nutrition Topic</span>
            </div>
            <h1 className="font-display text-4xl font-extrabold text-foreground mb-4">
              Managing Eating Difficulties in Dementia: Complete Nutrition Guide
            </h1>
            <p className="text-xl text-muted-foreground">
              Professional strategies and practical solutions for addressing eating challenges and maintaining proper nutrition in dementia care.
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="bg-crimson-tint border-2 border-crimson-border rounded-lg p-6 mb-8">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-crimson" />
                <h3 className="text-lg font-semibold text-crimson">Nutrition Alert</h3>
              </div>
              <p className="text-foreground">
                Eating difficulties affect 80% of people with advanced dementia. Early intervention and proper strategies are essential to prevent malnutrition and maintain quality of life.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 font-display text-foreground">
                <Heart className="w-6 h-6 text-primary" />
                Common Eating Challenges
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Behavioral Issues</h3>
                  <ul className="list-disc pl-6">
                    <li>Refusing to eat or drink</li>
                    <li>Not recognizing food</li>
                    <li>Forgetting how to use utensils</li>
                    <li>Eating non-food items</li>
                    <li>Becoming distracted during meals</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Physical Problems</h3>
                  <ul className="list-disc pl-6">
                    <li>Difficulty swallowing (dysphagia)</li>
                    <li>Dental problems or ill-fitting dentures</li>
                    <li>Loss of appetite</li>
                    <li>Medication side effects</li>
                    <li>Changes in taste and smell</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 font-display text-foreground">
                <Clock className="w-6 h-6 text-primary" />
                Mealtime Strategies
              </h2>
              
              <h3 className="text-xl font-semibold mb-3">Creating the Right Environment</h3>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Minimize distractions:</strong> Turn off TV, reduce noise, clear unnecessary items from table</li>
                <li><strong>Good lighting:</strong> Ensure adequate lighting so food is clearly visible</li>
                <li><strong>Comfortable seating:</strong> Use supportive chairs at appropriate table height</li>
                <li><strong>Familiar setting:</strong> Maintain consistent dining location and routine</li>
                <li><strong>Pleasant atmosphere:</strong> Play soft, familiar music; use favorite dishes</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Food Presentation Techniques</h3>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Contrast colors:</strong> Use plates that contrast with food color for better visibility</li>
                <li><strong>Simple presentation:</strong> Serve one food item at a time to reduce confusion</li>
                <li><strong>Finger foods:</strong> Cut food into easy-to-handle pieces when utensils become difficult</li>
                <li><strong>Familiar favorites:</strong> Serve well-known, preferred foods</li>
                <li><strong>Temperature awareness:</strong> Ensure food is appropriately warm or cool</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">Adaptive Equipment & Techniques</h2>
              
              <h3 className="text-xl font-semibold mb-3">Helpful Utensils and Dishes</h3>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Weighted utensils:</strong> Provide better grip control and reduce tremors</li>
                <li><strong>Built-up handles:</strong> Easier to grasp for those with arthritis or weakness</li>
                <li><strong>Scoop plates:</strong> High edges help push food onto utensils</li>
                <li><strong>Non-slip mats:</strong> Keep plates stable during eating</li>
                <li><strong>Two-handled cups:</strong> Provide better grip and control for drinking</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Feeding Assistance Techniques</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Sit at eye level and maintain gentle eye contact</li>
                <li>Offer small bites and allow time to chew and swallow</li>
                <li>Gently touch the person's hand or guide their hand to food</li>
                <li>Use verbal cues: "Open your mouth," "Chew," "Swallow"</li>
                <li>Be patient and avoid rushing the eating process</li>
              </ul>
            </section>

            <div className="bg-sage-tint border-2 border-sage-border rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-sage mb-3">Nutrition Tips for Success</h3>
              <div className="text-foreground space-y-2">
                <p>• <strong>High-calorie options:</strong> Add healthy fats, protein powders, or nutritional supplements</p>
                <p>• <strong>Frequent small meals:</strong> Offer 6-8 small portions throughout the day</p>
                <p>• <strong>Hydration focus:</strong> Offer fluids regularly; try flavored water, smoothies, or soups</p>
                <p>• <strong>Texture modifications:</strong> Puree or chop foods for swallowing difficulties</p>
                <p>• <strong>Social eating:</strong> Share meals together when possible to encourage eating</p>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">When to Seek Professional Help</h2>
              <p className="mb-4">
                Consult healthcare professionals if you notice:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Significant weight loss (5% in one month or 10% in six months)</li>
                <li>Frequent choking or coughing during meals</li>
                <li>Complete food refusal lasting more than 24 hours</li>
                <li>Signs of dehydration (dry mouth, decreased urination, confusion)</li>
                <li>Recurrent respiratory infections (may indicate aspiration)</li>
              </ul>
              
              <p className="mb-4">
                A speech-language pathologist can evaluate swallowing difficulties, while a registered dietitian can help develop nutrition plans tailored to individual needs.
              </p>
            </section>

            <div className="bg-teal-tint border-2 border-teal-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">Remember</h3>
              <p className="text-foreground">
                Eating difficulties in dementia are progressive and challenging, but with patience, creativity, and the right strategies, you can help maintain nutrition and make mealtimes more pleasant for everyone involved.
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}