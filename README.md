# DementiaAide 🧠💜

A comprehensive digital platform designed to support dementia caregivers through AI-powered assistance, educational resources, and specialized products.

## 🚀 Project Overview

**DementiaAide** is a Next.js-based web application that serves as a central hub for dementia care support. The platform combines modern web technologies with AI-powered insights to provide caregivers with personalized guidance, educational resources, and access to specialized products designed for dementia care.

## ✨ Key Features Implemented

### 🤖 AI-Powered Care Assistant
- **Keyword-Based Analysis**: Intelligent keyword matching to understand caregiver queries
- **Scenario Detection**: Identifies 13+ specific care scenarios for targeted advice
- **Personalized Responses**: Provides tailored advice based on detected situations
- **Care Categories**: Organizes responses into specific areas (Behavior, Safety, Daily Care, Communication, Activities, Health)
- **Contextual Tips**: Delivers actionable, evidence-based care tips and strategies
- **Smart Search Suggestions**: Generates relevant search terms based on query analysis
- **Product Recommendations**: Integrates relevant Amazon product suggestions based on search context
- **No External API Required**: Works completely offline with built-in knowledge base

### 🔍 Intelligent Search System
- **Natural Language Processing**: Processes caregiver questions in natural language
- **Multi-Modal Results**: Combines AI analysis with educational video content
- **YouTube Integration**: Curated dementia care video content with fallback options
- **Caching System**: 24-hour cache for improved performance and reduced API calls

### 🛍️ Specialized Product Catalog
- **Adaptive Products**: Memory care digital clocks, adaptive clothing, awareness items
- **Product Categories**: Clothing, Accessories, Adaptive Wear, Awareness products
- **E-commerce Features**: Pricing, reviews, ratings, inventory management
- **Product Search & Filter**: Advanced product discovery capabilities
- **Amazon Integration**: Real-time product recommendations with affiliate partnerships
- **Smart Product Matching**: Context-aware recommendations based on specific care needs
- **Clean Icon-Based Design**: Professional product cards without image loading issues
- **Relevant Product Categories**: 
  - Eating difficulties → Weighted utensils, non-slip plates, easy grip cups
  - Memory problems → Digital clocks, picture phones, memory aids
  - Safety concerns → Door alarms, motion sensors, wandering prevention
  - Medication management → Pill organizers, automatic dispensers

### 🎨 Modern User Interface
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Component Library**: Built with Radix UI components for accessibility
- **Animation System**: Smooth animations using Framer Motion
- **Loading States**: Comprehensive loading indicators with spinning wheels for all async operations
- **User Feedback**: Clear status messages during AI analysis, video search, and product loading
- **Dark/Light Theme**: Theme switching capability with next-themes
- **Gradient Aesthetics**: Modern gradient designs with blue/purple color schemes

### 📱 Progressive Web App Features
- **Navigation System**: Fixed navigation with scroll effects and mobile menu
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Performance Optimized**: Code splitting and lazy loading implementation
- **Accessibility**: WCAG-compliant components and keyboard navigation

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React icon library

### AI & Data Integration
- **AI System**: Built-in keyword-based scenario detection
- **Knowledge Base**: Comprehensive care advice for 13+ common scenarios
- **Content Management**: Static product data with TypeScript interfaces
- **Video Content**: YouTube API integration with multi-key rotation system
- **API Key Management**: Automatic rotation across 5 YouTube API keys for high availability
- **Quota Management**: Smart key rotation with error tracking and auto-recovery
- **E-commerce Integration**: Amazon SPP (Seller Partner Program) with affiliate tracking
- **Product Matching**: Intelligent product recommendations based on search context
- **Caching System**: 24-hour cache for improved performance and reduced API calls

### Development Tools
- **Build Tool**: Next.js built-in bundling
- **Linting**: ESLint with Next.js configuration
- **Styling**: PostCSS with Tailwind CSS
- **Type Checking**: TypeScript strict mode
- **Package Manager**: npm

## 📁 Project Structure

```
dementiaAide/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API routes
│   │   ├── ai/analyze/          # AI analysis endpoint
│   │   ├── amazon/search/       # Amazon SPP product search endpoint
│   │   ├── test/                # Test endpoints
│   │   └── youtube/test/        # YouTube integration tests
│   ├── about/                   # About page (under construction)
│   ├── caregiver-support/       # Support resources (under construction)
│   ├── resources/               # Educational resources (under construction)
│   ├── search/                  # Search results page
│   ├── shop/                    # Product catalog and shopping
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Homepage
├── components/                   # Reusable UI components
│   ├── ui/                      # shadcn/ui component library
│   ├── figma/                   # Design system components
│   ├── Navigation.tsx           # Main navigation component
│   ├── SearchHero.tsx           # Homepage hero with search
│   ├── SearchResults.tsx        # Search results display
│   ├── AmazonProducts.tsx       # Amazon product recommendations
│   ├── ProductCatalog.tsx       # Product listing component
│   └── [other components]       # Various UI components
├── lib/                         # Utility libraries
│   ├── ai.ts                    # AI analysis logic
│   ├── amazon.ts                # Amazon product integration
│   ├── products.ts              # Product data management
│   ├── youtube.ts               # YouTube integration
│   └── utils.ts                 # Shared utilities
├── types/                       # TypeScript type definitions
│   └── env.d.ts                 # Environment variable types
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── next.config.js               # Next.js configuration
```

## 🚧 Current Development Status

### ✅ Completed Features
- [x] AI-powered query analysis with emotion detection
- [x] Responsive homepage with search functionality
- [x] Product catalog with filtering and search
- [x] YouTube video integration for educational content
- [x] Multi-API key rotation system for YouTube (5 keys, ~500 searches/day)
- [x] Amazon product recommendations with affiliate integration
- [x] Context-aware product matching (eating, memory, safety, medication categories)
- [x] Clean icon-based product design without image loading issues
- [x] Comprehensive loading indicators with spinning animations
- [x] Modern UI/UX with animations and responsive design
- [x] API endpoints for AI analysis and testing
- [x] YouTube API key testing and monitoring endpoints
- [x] TypeScript implementation throughout
- [x] Component library setup with Radix UI

### 🔄 In Progress
- [ ] **Resources Page**: Educational articles and guides
- [ ] **Caregiver Support Page**: Support groups and professional resources
- [ ] **About Page**: Mission, team, and company information
- [ ] **User Authentication**: Login/signup system
- [ ] **Personalized Dashboard**: User-specific content and saved searches
- [ ] **Advanced Analytics**: Usage tracking and insights

### 📋 Planned Features
- [ ] **Community Forum**: Peer support and discussion platform
- [ ] **Professional Directory**: Verified healthcare provider listings
- [ ] **Care Planning Tools**: Personalized care plan creation
- [ ] **Emergency Resources**: Crisis support and hotlines
- [ ] **Mobile App**: Native mobile application
- [ ] **Multilingual Support**: International accessibility
- [ ] **Telehealth Integration**: Virtual care appointments
- [ ] **Medication Reminders**: Smart notification system

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ and npm
- Git for version control
- Code editor (VS Code recommended)

### Environment Variables
Create a `.env.local` file with:
```env
# YouTube API (comma-separated for multiple keys)
NEXT_PUBLIC_YOUTUBE_API_KEYS=key1,key2,key3,key4,key5

# Amazon SPP Integration (optional)
AMAZON_SPP_ACCESS_KEY=your_spp_access_key
AMAZON_SPP_SECRET_KEY=your_spp_secret_key
AMAZON_SPP_REFRESH_TOKEN=your_refresh_token
AMAZON_SPP_CLIENT_ID=your_client_id
AMAZON_ASSOCIATE_TAG=your_associate_tag
AMAZON_MARKETPLACE_ID=ATVPDKIKX0DER
NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=your_associate_tag
```

### Installation & Running
```bash
# Clone the repository
git clone https://github.com/jonathanphuung/DementiaAide.git
cd dementiaAide

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## 🎯 Target Audience

### Primary Users
- **Family Caregivers**: Individuals caring for loved ones with dementia
- **Professional Caregivers**: Healthcare workers and care facility staff
- **Healthcare Providers**: Doctors, nurses, and specialists in dementia care

### Use Cases
- **Daily Care Questions**: Getting immediate advice on care challenges
- **Educational Resources**: Learning about dementia progression and management
- **Product Discovery**: Finding specialized products for dementia care
- **Emotional Support**: Accessing resources during difficult caregiving moments

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Current Priorities
1. **Content Development**: Help create educational resources and articles
2. **UI/UX Improvements**: Enhance accessibility and user experience
3. **AI Training**: Improve response quality and accuracy
4. **Testing**: Add comprehensive test coverage
5. **Documentation**: Expand user guides and developer docs

### Development Guidelines
- Follow TypeScript strict mode requirements
- Use the established component patterns
- Maintain responsive design principles
- Ensure accessibility compliance
- Write clear commit messages

## 📊 Project Metrics

- **Components**: 27+ reusable UI components
- **Pages**: 6 main application pages
- **API Routes**: 4+ backend endpoints
- **Integrations**: 2 external APIs (YouTube, Amazon)
- **Dependencies**: 40+ carefully selected packages
- **TypeScript Coverage**: 100% of application code

## 🔮 Future Roadmap

### Phase 1 (Current - Next 3 months)
- Complete core page development (Resources, Support, About)
- Implement user authentication system
- Add comprehensive testing suite
- Enhance AI response quality

### Phase 2 (3-6 months)
- Launch community forum features
- Integrate professional directory
- Add care planning tools
- Implement analytics dashboard

### Phase 3 (6-12 months)
- Develop mobile application
- Add telehealth capabilities
- Expand internationally
- Launch enterprise features

## 📞 Support & Contact

- **Repository**: [GitHub - DementiaAide](https://github.com/jonathanphuung/DementiaAide)
- **Issues**: Report bugs and request features through GitHub Issues
- **Discussions**: Join community discussions on GitHub Discussions

---

*Last Updated: December 6, 2025*

**Note**: This README will be continuously updated as development progresses. Check the git history for the latest changes and feature additions.