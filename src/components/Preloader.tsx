import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const WORDS = ["HELLO", "BONJOUR", "HOLA", "GUTEN TAG", "CIAO", "OLÁ", "नमस्ते", "你好", "WELCOME"];

const IMAGES_TO_PRELOAD = [
  '/src/img/fisa.png',
  '/src/img/gstarcad.jpg',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1614851099511-773084f6911d?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1614850523018-8f26a5eb8c80?q=80&w=2670&auto=format&fit=crop',
];

export function Preloader({ onComplete }: PreloaderProps) {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [assetProgress, setAssetProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const overlayTopRef = useRef<HTMLDivElement>(null);
  const overlayBottomRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const wordProgress = (index / (WORDS.length - 1)) * 100;
  const combinedProgress = Math.min(
    (assetProgress * 0.4) + (wordProgress * 0.6),
    index === WORDS.length - 1 && assetsLoaded ? 100 : 99
  );

  useEffect(() => {
    let loadedCount = 0;
    const total = IMAGES_TO_PRELOAD.length;

    const preloadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = img.onerror = () => {
          loadedCount++;
          setAssetProgress((loadedCount / total) * 100);
          resolve();
        };
      });

    Promise.all(IMAGES_TO_PRELOAD.map(preloadImage)).then(() => setAssetsLoaded(true));
  }, []);

  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, { width: `${combinedProgress}%`, duration: 0.3, ease: "power2.out" });
    }
  }, [combinedProgress]);

  useEffect(() => {
    const chars = charsRef.current.filter(Boolean);
    if (!chars.length) return;

    gsap.set(chars, { y: 80, opacity: 0, rotateX: -90, scale: 0.5 });
    gsap.to(chars, { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 0.4, stagger: 0.02, ease: "back.out(1.5)" });
  }, [index]);

  useEffect(() => {
    if (logoRef.current) {
      gsap.to(logoRef.current, { scale: 1.1, duration: 0.8, repeat: -1, yoyo: true, ease: "power1.inOut" });
    }
  }, []);

  useEffect(() => {
    if (index === WORDS.length - 1 && assetsLoaded) {
      const tl = gsap.timeline({
        delay: 0.6,
        onComplete: () => { setIsVisible(false); onComplete(); }
      });

      tl.to(charsRef.current.filter(Boolean), { y: -60, opacity: 0, rotateX: 45, stagger: 0.02, duration: 0.4, ease: "power3.in" });
      tl.to(logoRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.2");
      tl.to(overlayTopRef.current, { yPercent: -100, duration: 0.8, ease: "power3.inOut" }, "-=0.1");
      tl.to(overlayBottomRef.current, { yPercent: 100, duration: 0.8, ease: "power3.inOut" }, "<");
      return;
    }

    if (index === WORDS.length - 1 && !assetsLoaded) return;

    const timeout = setTimeout(() => {
      gsap.to(charsRef.current.filter(Boolean), {
        y: -50, opacity: 0, rotateX: 45, stagger: 0.01, duration: 0.2, ease: "power2.in",
        onComplete: () => setIndex(index + 1)
      });
    }, index === 0 ? 600 : 200);

    return () => clearTimeout(timeout);
  }, [index, assetsLoaded, onComplete]);

  useEffect(() => { charsRef.current = []; }, [WORDS[index]]);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-10000 overflow-hidden">
      <div ref={overlayTopRef} className="absolute top-0 left-0 right-0 h-1/2 bg-[#0a0a0a] z-10" />
      <div ref={overlayBottomRef} className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0a0a0a] z-10" />

      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div ref={logoRef} className="absolute left-8 top-8 md:left-12 md:top-12">
          <div className="w-3 h-3 bg-white rounded-full" />
        </div>

        <div style={{ perspective: '1000px' }}>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter flex overflow-hidden">
            {WORDS[index].split('').map((char, i) => (
              <span
                key={`${index}-${i}`}
                ref={(el) => { if (el) charsRef.current[i] = el; }}
                className="inline-block will-change-transform"
                style={{ transformStyle: 'preserve-3d', minWidth: char === ' ' ? '0.3em' : 'auto' }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        <div className="absolute right-8 bottom-8 md:right-12 md:bottom-12">
          <span className="mono text-xs text-white/20 tracking-widest">
            {String(index + 1).padStart(2, '0')} / {String(WORDS.length).padStart(2, '0')}
          </span>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 md:w-80">
          <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div ref={progressBarRef} className="h-full bg-white rounded-full" style={{ width: '0%' }} />
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="mono text-[10px] text-white/40 tracking-widest">
              {index === WORDS.length - 1 && assetsLoaded ? '● READY' : '○ LOADING'}
            </span>
            <span className="mono text-[10px] text-white/40 tracking-widest">{Math.round(combinedProgress)}%</span>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none z-30 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
      />
    </div>
  );
}