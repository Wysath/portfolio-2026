import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { InteractionCard } from './InteractionCard';

const SHAPES = [
  { borderRadius: '50%', rotate: 0, label: 'Circle' },
  { borderRadius: '8px', rotate: 0, label: 'Square' },
  { borderRadius: '2px', rotate: 45, scale: 0.7, label: 'Diamond' },
  { borderRadius: '12px', rotate: 90, label: 'Soft' },
];

export function MorphologyGrid() {
  const [shapeIndex, setShapeIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const items = Array.from({ length: 16 });

  const handleClick = () => {
    setShapeIndex((prev) => (prev + 1) % SHAPES.length);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const shape = SHAPES[shapeIndex];
      
      gsap.to(".morph-cell", {
         borderRadius: shape.borderRadius,
         rotation: shape.rotate,
         scale: shape.scale || 1,
         duration: 0.5,
         ease: "elastic.out(1, 0.6)",
         stagger: {
           amount: 0.1,
           grid: [4, 4],
           from: "start"
         }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [shapeIndex]);

  return (
    <InteractionCard 
      title="Morphology" 
      onClick={handleClick}
      footerText="Click to shape"
    >
      <div 
        ref={containerRef}
        className="w-35 h-35 bg-muted/30 rounded-lg p-2 grid grid-cols-4 grid-rows-4 gap-2 place-items-center"
      >
        {items.map((_, i) => (
          <div 
            key={i} 
            className="morph-cell w-full h-full bg-[#333] dark:bg-white"
            style={{ borderRadius: '50%' }}
          />
        ))}
      </div>
    </InteractionCard>
  );
}
