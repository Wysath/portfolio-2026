import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import './ArchitectureGrid.css';

export function ArchitectureGrid() {
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
    <div className="canva-card" onClick={handleClick}>
      <div className="card-header">
        <h3>Architecture</h3>
      </div>

      <div 
        className="grid-interaction"
        ref={containerRef}
        style={{
            '--cols': gridState.cols,
            '--rows': gridState.rows
        } as React.CSSProperties}
      >
        {Array.from({ length: gridState.count }).map((_, i) => (
          <div key={`${gridState.count}-${i}`} className="grid-cell"></div>
        ))}
      </div>

      <div className="card-footer">
        <span>Click to split</span>
      </div>
    </div>
  );
}
