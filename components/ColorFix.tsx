'use client';

import { useEffect, useState } from 'react';

export default function ColorFix() {
  const [isChrome, setIsChrome] = useState(false);

  useEffect(() => {
    // Detect Chrome
    const chromeDetected = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    setIsChrome(chromeDetected);

      if (chromeDetected) {
        console.log('Chrome detected - applying aggressive color fixes');
        console.log('Current text colors before fix:');
        
        // Log current state of some key elements
        const sampleElements = document.querySelectorAll('h1, h2, p');
        sampleElements.forEach((el, i) => {
          if (i < 3) { // Only log first 3 to avoid spam
            const computedStyle = window.getComputedStyle(el);
            console.log(`Element ${i}:`, el.tagName, 'color:', computedStyle.color, 'text:', el.textContent?.substring(0, 30));
          }
        });      // Create and inject Chrome-specific stylesheet
      const chromeStyleId = 'chrome-color-fix';
      let chromeStyle = document.getElementById(chromeStyleId) as HTMLStyleElement;
      
      if (!chromeStyle) {
        chromeStyle = document.createElement('style');
        chromeStyle.id = chromeStyleId;
        document.head.appendChild(chromeStyle);
      }

      chromeStyle.textContent = `
        /* Chrome-specific color enforcement */
        * {
          color: rgb(15, 23, 42) !important;
        }
        
        body {
          background-color: rgb(249, 250, 251) !important;
          color: rgb(15, 23, 42) !important;
        }
        
        h1, h2, h3, h4, h5, h6, p, span, div, a, button, label, li, td, th {
          color: rgb(15, 23, 42) !important;
        }
        
        .text-muted-foreground {
          color: rgb(100, 116, 139) !important;
        }
        
        .text-blue-600 {
          color: rgb(37, 99, 235) !important;
        }
        
        .text-white {
          color: rgb(255, 255, 255) !important;
        }
        
        /* Keep gradient text transparent */
        .text-transparent, .bg-clip-text {
          color: transparent !important;
        }
        
        /* Force Chrome to repaint */
        body * {
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }
      `;

      // Force immediate style application
      const forceColorUpdate = () => {
        // Set inline styles on all elements
        const allElements = document.querySelectorAll('*');
        allElements.forEach((el) => {
          if (el instanceof HTMLElement) {
            // Skip elements that should be transparent (gradients)
            const hasTransparentClass = el.classList.contains('text-transparent') || 
                                      el.classList.contains('bg-clip-text');
            
            if (!hasTransparentClass) {
              // Apply color based on element's intended styling
              if (el.classList.contains('text-muted-foreground')) {
                el.style.setProperty('color', 'rgb(100, 116, 139)', 'important');
              } else if (el.classList.contains('text-blue-600')) {
                el.style.setProperty('color', 'rgb(37, 99, 235)', 'important');
              } else if (el.classList.contains('text-white')) {
                el.style.setProperty('color', 'rgb(255, 255, 255)', 'important');
              } else {
                el.style.setProperty('color', 'rgb(15, 23, 42)', 'important');
              }
            }
          }
        });
      };

      // Apply fixes immediately and on intervals
      forceColorUpdate();
      console.log('Applied immediate color fix');
      
      setTimeout(() => {
        forceColorUpdate();
        console.log('Applied 50ms color fix');
      }, 50);
      
      setTimeout(() => {
        forceColorUpdate();
        console.log('Applied 200ms color fix');
      }, 200);
      
      setTimeout(() => {
        forceColorUpdate();
        console.log('Applied 500ms color fix');
      }, 500);
      
      setTimeout(() => {
        forceColorUpdate();
        console.log('Applied 1000ms color fix - checking final state:');
        
        // Final state check
        const finalCheck = document.querySelectorAll('h1, h2, p');
        finalCheck.forEach((el, i) => {
          if (i < 3) {
            const computedStyle = window.getComputedStyle(el);
            console.log(`Final Element ${i}:`, el.tagName, 'color:', computedStyle.color);
          }
        });
      }, 1000);

      // Monitor for DOM changes and reapply
      const observer = new MutationObserver(() => {
        setTimeout(forceColorUpdate, 10);
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
      });

      // Cleanup
      return () => {
        observer.disconnect();
      };
    } else {
      console.log('Safari/other browser detected - using light fixes');
      
      // Light fixes for non-Chrome browsers
      const lightFix = () => {
        document.documentElement.style.setProperty('--foreground', '222.2 84% 4.9%');
        document.documentElement.style.setProperty('--background', '0 0% 98%');
        document.documentElement.style.setProperty('--muted-foreground', '215.4 16.3% 46.9%');
      };

      lightFix();
      const timer = setTimeout(lightFix, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}