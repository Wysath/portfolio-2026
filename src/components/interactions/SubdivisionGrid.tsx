import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { InteractionCard } from './InteractionCard';

export function SubdivisionGrid() {
  const [gridState, setGridState] = useState({ count: 1, cols: 1, rows: 1 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setGridState((prev) => {
      let newCount = prev.count * 2;
      if (newCount > 64) newCount = 1;

      const sqrt = Math.sqrt(newCount);
      let cols, rows;

      if (Number.isInteger(sqrt)) {
        cols = sqrt;
        rows = sqrt;
      } else {
        cols = Math.ceil(sqrt);
        rows = Math.ceil(newCount / cols);
      }

      return { count: newCount, cols, rows };
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(".grid-cell", {
            scale: 0,
            duration: 0.4,
            stagger: {
              amount: 0.2,
              grid: [gridState.rows, gridState.cols],
              from: "center"
            },
            ease: "back.out(1.5)"
          });
    }, containerRef);

    return () => ctx.revert();
  }, [gridState]); 

  return (
    <InteractionCard 
      title="Subdivision" 
      onClick={handleClick}
      footerText="Click to split"
    >
      <div 
        ref={containerRef}
        className="w-35 h-35 bg-muted/30 rounded-lg p-2 grid gap-1 place-items-center"
        style={{
            gridTemplateColumns: `repeat(${gridState.cols}, 1fr)`,
            gridTemplateRows: `repeat(${gridState.rows}, 1fr)`,
        }}
      >
        {Array.from({ length: gridState.count }).map((_, i) => (
          <div 
            key={`${gridState.count}-${i}`} 
            className="grid-cell w-full aspect-square bg-[#333] dark:bg-white rounded-full max-w-full max-h-full"
          />
        ))}
      </div>
    </InteractionCard>
  );
}
