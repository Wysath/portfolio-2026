import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { InteractionCard } from './InteractionCard';

export function ElevationGrid() {
  const [seed, setSeed] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cols = 7;

  const handleClick = () => {
    setSeed(prev => prev + 1);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".elevation-bar").forEach((bar) => {
        const targetHeight = gsap.utils.random(15, 100);
        
        gsap.to(bar, {
          height: `${targetHeight}%`,
          duration: 0.6,
          ease: "power2.inOut",
          delay: gsap.utils.random(0, 0.1) 
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [seed]);

  return (
    <InteractionCard 
      title="Elevation" 
      onClick={handleClick}
      footerText="Click to randomize"
    >
      <div 
        ref={containerRef}
        className="w-35 h-35 bg-muted/30 rounded-lg p-3 flex items-end justify-between gap-2"
      >
        {Array.from({ length: cols }).map((_, i) => (
          <div 
            key={i} 
            className="elevation-bar w-full bg-[#333] dark:bg-white rounded-t-sm rounded-b-[2px]"
            style={{ height: '50%' }}
          />
        ))}
      </div>
    </InteractionCard>
  );
}
