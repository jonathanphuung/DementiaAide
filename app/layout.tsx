import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './chrome-fix.css'
import ColorFix from '@/components/ColorFix'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DementiaAide - Adaptive Clothing & Alzheimer\'s Awareness',
  description: 'Specialized clothing and accessories for individuals with dementia and Alzheimer\'s disease. Dignified, comfortable, and practical solutions for daily care.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
                
                if (isChrome) {
                  console.log('Chrome detected - injecting emergency color styles');
                  
                  // Multiple fallback strategies for Chrome
                  var emergencyStyle = document.createElement('style');
                  emergencyStyle.id = 'chrome-emergency-colors';
                  emergencyStyle.textContent = \`
                    /* Emergency Chrome color override */
                    *, *::before, *::after {
                      color: rgb(15, 23, 42) !important;
                      --tw-text-opacity: 1 !important;
                    }
                    
                    body {
                      background-color: rgb(249, 250, 251) !important;
                      color: rgb(15, 23, 42) !important;
                    }
                    
                    .text-muted-foreground, .text-muted-foreground * {
                      color: rgb(100, 116, 139) !important;
                    }
                    
                    .text-blue-600, .text-blue-600 * {
                      color: rgb(37, 99, 235) !important;
                    }
                    
                    .text-white, .text-white * {
                      color: rgb(255, 255, 255) !important;
                    }
                    
                    .text-transparent, .bg-clip-text {
                      color: transparent !important;
                    }
                    
                    /* Force immediate rendering */
                    body * {
                      -webkit-font-smoothing: antialiased;
                      text-rendering: optimizeLegibility;
                    }
                  \`;
                  
                  // Insert as first style in head to ensure it loads early
                  document.head.insertBefore(emergencyStyle, document.head.firstChild);
                  
                  // Also set CSS custom properties
                  document.documentElement.style.cssText += ';--background: 0 0% 98%;--foreground: 222.2 84% 4.9%;--muted-foreground: 215.4 16.3% 46.9%;--primary: 221.2 83.2% 53.3%;';
                } else {
                  console.log('Safari/other browser - using standard approach');
                }
                
                // Set CSS variables for all browsers
                document.documentElement.style.setProperty('--background', '0 0% 98%');
                document.documentElement.style.setProperty('--foreground', '222.2 84% 4.9%');
                document.documentElement.style.setProperty('--muted-foreground', '215.4 16.3% 46.9%');
                document.documentElement.style.setProperty('--primary', '221.2 83.2% 53.3%');
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className} style={{ backgroundColor: 'hsl(0 0% 98%)', color: 'hsl(222.2 84% 4.9%)' }}>
        <ColorFix />
        {children}
      </body>
    </html>
  )
}