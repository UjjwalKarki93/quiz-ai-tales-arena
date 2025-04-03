
import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
}

export function AdBanner({ slot, format = 'auto', className = '', style = {} }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This effect will run only in the browser, not during SSR
    if (typeof window !== 'undefined' && adRef.current) {
      try {
        // Define the ad properties
        const adElement = document.createElement('ins');
        adElement.className = 'adsbygoogle';
        adElement.style.display = 'block';
        adElement.setAttribute('data-ad-client', 'ca-pub-XXXXXXXXXXXXXXXX'); // Replace with your actual AdSense publisher ID
        adElement.setAttribute('data-ad-slot', slot);
        adElement.setAttribute('data-ad-format', format);
        adElement.setAttribute('data-full-width-responsive', 'true');
        
        // Clear any existing content and append the ad
        if (adRef.current.children.length === 0) {
          adRef.current.appendChild(adElement);
          
          // Initialize the ad if adsense is loaded
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error('Error loading AdSense:', err);
      }
    }
    
    // Cleanup function
    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
    };
  }, [slot, format]);
  
  return (
    <div 
      ref={adRef} 
      className={`ad-container ${className}`}
      style={{ minHeight: '90px', ...style }}
      data-ad-slot={slot}
    >
      {/* AdSense ads will be inserted here by the useEffect hook */}
      {/* Fallback content or placeholder */}
      <div className="text-xs text-center text-muted-foreground py-2">
        Advertisement
      </div>
    </div>
  );
}
