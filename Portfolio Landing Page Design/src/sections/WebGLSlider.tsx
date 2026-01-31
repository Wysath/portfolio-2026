import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

const SLIDES = [
  { id: 1, title: 'IMMERSIVE', subtitle: 'INTERACTIVE EXPERIENCE', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', description: 'Pushing the boundaries of web performance with WebGL and custom shaders.' },
  { id: 2, title: 'DIGITAL', subtitle: 'CREATIVE CRAFTSMANSHIP', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop', description: 'Crafting pixel-perfect interfaces that delight and engage users.' },
  { id: 3, title: 'CREATIVE', subtitle: 'WEBGL EXPERIMENTS', image: 'https://images.unsplash.com/photo-1614851099511-773084f6911d?q=80&w=2670&auto=format&fit=crop', description: 'Exploring new dimensions of digital interaction through code.' },
  { id: 4, title: 'DESIGN', subtitle: 'UI/UX INNOVATION', image: 'https://images.unsplash.com/photo-1614850523018-8f26a5eb8c80?q=80&w=2670&auto=format&fit=crop', description: 'Building intuitive systems that solve complex problems with elegance.' },
];

const NOISE_BG = 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")';

export function WebGLSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);

  useEffect(() => {
    slideRefs.current.forEach((slide, index) => {
      if (slide) gsap.set(slide, { xPercent: index === currentIndex ? 0 : 100, opacity: index === currentIndex ? 1 : 0, scale: index === currentIndex ? 1 : 1.1 });
    });
  }, []);

  useEffect(() => {
    if (progressRef.current) gsap.to(progressRef.current, { width: `${((currentIndex + 1) / SLIDES.length) * 100}%`, duration: 0.5, ease: "power2.out" });
  }, [currentIndex]);

  const animateSlideChange = useCallback((newIndex: number, direction: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const currentSlide = slideRefs.current[currentIndex];
    const nextSlide = slideRefs.current[newIndex];
    
    const tl = gsap.timeline({ onComplete: () => { setCurrentIndex(newIndex); setIsAnimating(false); } });

    if (currentSlide) tl.to(currentSlide, { xPercent: direction > 0 ? -30 : 30, opacity: 0, scale: 1.1, duration: 0.8, ease: "power3.inOut" }, 0);

    if (nextSlide) {
      gsap.set(nextSlide, { xPercent: direction > 0 ? 100 : -100, opacity: 0, scale: 1.2 });
      tl.to(nextSlide, { xPercent: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.inOut" }, 0.1);
    }

    if (titleRef.current) tl.fromTo(titleRef.current, { y: 100, opacity: 0, rotateX: -45 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: "power3.out" }, 0.3);
    if (subtitleRef.current) tl.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.4);
    if (descriptionRef.current) tl.fromTo(descriptionRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.5);
    if (imageRef.current) tl.fromTo(imageRef.current, { scale: 1.3, filter: 'blur(20px) brightness(0.5)' }, { scale: 1, filter: 'blur(0px) brightness(1)', duration: 1.2, ease: "power2.out" }, 0.1);
  }, [currentIndex, isAnimating]);

  const paginate = useCallback((direction: number) => {
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = SLIDES.length - 1;
    if (newIndex >= SLIDES.length) newIndex = 0;
    animateSlideChange(newIndex, direction);
  }, [currentIndex, animateSlideChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    dragStart.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStart.current === null) return;
    const endX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStart.current - endX;
    if (Math.abs(diff) > 100) paginate(diff > 0 ? 1 : -1);
    dragStart.current = null;
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-[#0a0a0a] overflow-hidden" data-webgl-slider onMouseDown={handleDragStart} onMouseUp={handleDragEnd} onTouchStart={handleDragStart} onTouchEnd={handleDragEnd}>
      <div className="absolute inset-0">
        {SLIDES.map((slide, index) => (
          <div key={slide.id} ref={(el) => { slideRefs.current[index] = el; }} className="absolute inset-0 w-full h-full will-change-transform" style={{ opacity: index === 0 ? 1 : 0 }}>
            <div ref={index === currentIndex ? imageRef : undefined} className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: `url(${slide.image})`, transformOrigin: 'center center' }} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: NOISE_BG }} />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-12 z-10">
        <div className="max-w-screen-xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8" style={{ perspective: '1000px' }}>
            <div className="overflow-hidden mb-4">
              <div ref={subtitleRef} className="flex items-center gap-4">
                <div className="w-12 h-[px] bg-white/50" />
                <span className="mono text-sm text-white/80 tracking-[0.3em] uppercase">{SLIDES[currentIndex].subtitle}</span>
              </div>
            </div>
            <div className="overflow-hidden" style={{ perspective: '1000px' }}>
              <h1 ref={titleRef} className="text-[clamp(4rem,10vw,12rem)] font-black text-white tracking-tighter leading-[0.9] will-change-transform" style={{ transformStyle: 'preserve-3d' }}>{SLIDES[currentIndex].title}</h1>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end h-full pt-12 lg:pt-32">
            <div ref={descriptionRef} className="space-y-8">
              <p className="text-lg text-white/80 leading-relaxed max-w-md">{SLIDES[currentIndex].description}</p>
              <a href="#" className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black text-white transition-all duration-300 group" data-cursor-hover>
                <span className="mono text-sm tracking-wider">VIEW PROJECT</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 flex gap-4 z-20">
        <button className="w-14 h-14 border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 rounded-full disabled:opacity-30 disabled:cursor-not-allowed" onClick={() => paginate(-1)} disabled={isAnimating} data-cursor-hover><ChevronLeft className="w-5 h-5" /></button>
        <button className="w-14 h-14 border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 rounded-full disabled:opacity-30 disabled:cursor-not-allowed" onClick={() => paginate(1)} disabled={isAnimating} data-cursor-hover><ChevronRight className="w-5 h-5" /></button>
      </div>

      <div className="absolute bottom-12 left-12 z-20">
        <div className="flex items-center gap-4">
          <div className="mono text-xs text-white">{String(currentIndex + 1).padStart(2, '0')}</div>
          <div className="w-32 h-[1px] bg-white/20 overflow-hidden"><div ref={progressRef} className="h-full bg-white" style={{ width: `${((currentIndex + 1) / SLIDES.length) * 100}%` }} /></div>
          <div className="mono text-xs text-white/50">{String(SLIDES.length).padStart(2, '0')}</div>
        </div>
      </div>

      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-3">
        {SLIDES.map((_, index) => (
          <button key={index} onClick={() => !isAnimating && index !== currentIndex && animateSlideChange(index, index > currentIndex ? 1 : -1)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/60'}`} disabled={isAnimating} data-cursor-hover />
        ))}
      </div>
    </section>
  );
}
