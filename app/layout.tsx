import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
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
                // Chrome-specific fix
                if (navigator.userAgent.includes('Chrome')) {
                  // Force Chrome to recognize custom properties
                  document.documentElement.style.cssText += ';--background: 0 0% 98%;--foreground: 222.2 84% 4.9%;--muted-foreground: 215.4 16.3% 46.9%;--primary: 221.2 83.2% 53.3%;';
                  
                  // Add emergency fallback styles for Chrome
                  var style = document.createElement('style');
                  style.textContent = \`
                    * { color: hsl(222.2 84% 4.9%) !important; }
                    .text-foreground, h1, h2, h3, h4, h5, h6, p, span, div, a { color: hsl(222.2 84% 4.9%) !important; }
                    .text-muted-foreground { color: hsl(215.4 16.3% 46.9%) !important; }
                    .text-transparent, .bg-clip-text { color: transparent !important; }
                    body { background-color: hsl(0 0% 98%) !important; color: hsl(222.2 84% 4.9%) !important; }
                  \`;
                  document.head.appendChild(style);
                }
                
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