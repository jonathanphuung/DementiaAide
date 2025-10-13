'use client';

import { useEffect } from 'react';

export default function ColorFix() {
  useEffect(() => {
    const isChrome = navigator.userAgent.includes('Chrome');
    
    const fixColors = () => {
      document.documentElement.style.setProperty('--foreground', '222.2 84% 4.9%');
      document.documentElement.style.setProperty('--background', '0 0% 98%');
      document.documentElement.style.setProperty('--muted-foreground', '215.4 16.3% 46.9%');
      
      if (isChrome) {
        // Chrome-specific aggressive fix
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
          if (el instanceof HTMLElement) {
            const computedStyle = window.getComputedStyle(el);
            const currentColor = computedStyle.color;
            
            // If element has no color or transparent, force a color
            if (!currentColor || currentColor === 'rgba(0, 0, 0, 0)' || currentColor === 'transparent') {
              el.style.setProperty('color', 'hsl(222.2 84% 4.9%)', 'important');
            }
            
            // Force repaint in Chrome
            el.style.transform = 'translateZ(0)';
            setTimeout(() => {
              el.style.transform = '';
            }, 0);
          }
        });
        
        // Force Chrome to recalculate styles
        document.body.style.display = 'none';
        document.body.offsetHeight; // Trigger reflow
        document.body.style.display = '';
      } else {
        // Safari and other browsers - lighter approach
        const all = document.querySelectorAll('*');
        all.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.color = el.style.color;
          }
        });
      }
    };

    fixColors();
    
    const timer = setTimeout(fixColors, 100);
    const timer2 = setTimeout(fixColors, 500);
    const timer3 = setTimeout(fixColors, 1000);

    // Chrome-specific: Also fix on page visibility change
    if (isChrome) {
      const handleVisibilityChange = () => {
        if (!document.hidden) {
          setTimeout(fixColors, 50);
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
        clearTimeout(timer3);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return null;
}