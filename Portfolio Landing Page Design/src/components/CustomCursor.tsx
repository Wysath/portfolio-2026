import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const TRAIL_COUNT = 5;

export function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const cursorTrailRefs = useRef<HTMLDivElement[]>([]);
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'text' | 'hidden'>('default');
  const [cursorText, setCursorText] = useState('VIEW');

  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const outlinePos = useRef({ x: 0, y: 0 });
  const trailPositions = useRef<{ x: number; y: number }[]>([]);
  const velocity = useRef({ x: 0, y: 0 });
  const prevMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;
    const cursorTextEl = cursorTextRef.current;

    if (!cursorDot || !cursorOutline || !cursorTextEl) return;

    trailPositions.current = Array(TRAIL_COUNT).fill(null).map(() => ({ x: 0, y: 0 }));
    document.body.style.cursor = 'none';

    const updateMousePosition = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const checkElementState = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;

      const cursorHoverEl = target.closest('[data-cursor-hover]');
      const cursorTextEl = target.closest('[data-cursor-text]');
      const cursorHideEl = target.closest('[data-cursor-hide]');
      const isLink = target.closest('a');
      const isButton = target.closest('button');
      const isInput = target.closest('input, textarea');

      if (cursorHideEl) { setCursorState('hidden'); return; }
      if (cursorTextEl) {
        setCursorState('text');
        setCursorText(cursorTextEl.getAttribute('data-cursor-text') || 'VIEW');
        return;
      }
      if (cursorHoverEl || isLink || isButton) {
        setCursorState('hover');
        const text = cursorHoverEl?.getAttribute('data-cursor-text');
        setCursorText(text || 'VIEW');
        return;
      }
      if (isInput) { setCursorState('text'); setCursorText(''); return; }
      setCursorState('default');
    };

    const animateCursor = () => {
      velocity.current.x = mousePos.current.x - prevMousePos.current.x;
      velocity.current.y = mousePos.current.y - prevMousePos.current.y;
      prevMousePos.current = { ...mousePos.current };

      const dotLerp = 0.25, outlineLerp = 0.12, trailLerp = 0.08;

      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * dotLerp;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * dotLerp;
      outlinePos.current.x += (mousePos.current.x - outlinePos.current.x) * outlineLerp;
      outlinePos.current.y += (mousePos.current.y - outlinePos.current.y) * outlineLerp;

      const skewX = Math.max(-15, Math.min(15, velocity.current.x * 0.5));
      const skewY = Math.max(-15, Math.min(15, velocity.current.y * 0.5));
      const rotation = Math.max(-20, Math.min(20, velocity.current.x * 0.3));

      gsap.set(cursorDot, { x: dotPos.current.x, y: dotPos.current.y, xPercent: -50, yPercent: -50, skewX: skewX * 0.5, rotation: rotation * 0.3 });
      gsap.set(cursorOutline, { x: outlinePos.current.x, y: outlinePos.current.y, xPercent: -50, yPercent: -50, skewX, skewY: skewY * 0.3 });
      gsap.set(cursorTextEl, { x: outlinePos.current.x, y: outlinePos.current.y, xPercent: -50, yPercent: -50 });

      cursorTrailRefs.current.forEach((trail, i) => {
        if (!trail) return;
        const targetPos = i === 0 ? dotPos.current : trailPositions.current[i - 1];
        const lerpFactor = trailLerp * (1 - i * 0.15);
        trailPositions.current[i].x += (targetPos.x - trailPositions.current[i].x) * lerpFactor;
        trailPositions.current[i].y += (targetPos.y - trailPositions.current[i].y) * lerpFactor;
        gsap.set(trail, { x: trailPositions.current[i].x, y: trailPositions.current[i].y, xPercent: -50, yPercent: -50, opacity: 0.4 - i * 0.08, scale: 1 - i * 0.15 });
      });
    };

    gsap.ticker.add(animateCursor);
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', checkElementState);

    const handleMouseLeave = () => setCursorState('hidden');
    const handleMouseEnter = () => setCursorState('default');
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', checkElementState);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      gsap.ticker.remove(animateCursor);
    };
  }, []);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;
    const cursorTextEl = cursorTextRef.current;
    if (!cursorDot || !cursorOutline || !cursorTextEl) return;

    const hideTrails = () => cursorTrailRefs.current.forEach(t => t && gsap.to(t, { opacity: 0, duration: 0.2 }));

    switch (cursorState) {
      case 'hover':
        gsap.to(cursorDot, { scale: 0, duration: 0.3, ease: "power3.out" });
        gsap.to(cursorOutline, { scale: 2.5, borderWidth: 1, opacity: 0.3, duration: 0.4, ease: "power3.out" });
        gsap.to(cursorTextEl, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
        hideTrails();
        break;
      case 'text':
        gsap.to(cursorDot, { scale: 0, duration: 0.2, ease: "power2.out" });
        gsap.to(cursorOutline, { scale: cursorText ? 2 : 0.5, opacity: cursorText ? 0.2 : 0.5, duration: 0.3, ease: "power2.out" });
        gsap.to(cursorTextEl, { scale: cursorText ? 1 : 0, opacity: cursorText ? 1 : 0, duration: 0.25, ease: "power2.out" });
        break;
      case 'hidden':
        gsap.to(cursorDot, { scale: 0, opacity: 0, duration: 0.2 });
        gsap.to(cursorOutline, { scale: 0, opacity: 0, duration: 0.2 });
        gsap.to(cursorTextEl, { scale: 0, opacity: 0, duration: 0.2 });
        hideTrails();
        break;
      default:
        gsap.to(cursorDot, { scale: 1, opacity: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" });
        gsap.to(cursorOutline, { scale: 1, borderWidth: 1, opacity: 0.5, duration: 0.4, ease: "power2.out" });
        gsap.to(cursorTextEl, { scale: 0, opacity: 0, duration: 0.2, ease: "power2.in" });
        cursorTrailRefs.current.forEach((t, i) => t && gsap.to(t, { opacity: 0.4 - i * 0.08, duration: 0.3, delay: i * 0.02 }));
    }
  }, [cursorState, cursorText]);

  return (
    <>
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) cursorTrailRefs.current[i] = el; }}
          className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-9996 mix-blend-difference will-change-transform"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', opacity: 0 }}
        />
      ))}
      <div ref={cursorDotRef} className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-9999 mix-blend-difference will-change-transform bg-white" />
      <div ref={cursorOutlineRef} className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-9998 mix-blend-difference will-change-transform border border-white/50 opacity-50" />
      <div ref={cursorTextRef} className="fixed top-0 left-0 pointer-events-none z-9997 will-change-transform" style={{ transform: 'scale(0)', opacity: 0 }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center bg-white">
          <span className="mono text-black text-[10px] tracking-widest font-bold uppercase">{cursorText}</span>
        </div>
      </div>
    </>
  );
}