import { motion } from 'motion/react';

const EASE_EXPO: [number, number, number, number] = [0.76, 0, 0.24, 1];
const GRID_BG = 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)';

interface HeroSectionProps {
  startAnimation?: boolean;
}

export function HeroSection({ startAnimation = true }: HeroSectionProps) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{ backgroundImage: GRID_BG, backgroundSize: '100px 100px' }} />
      </div>

      <div className="relative z-10 text-center px-8">
        <div className="overflow-hidden mb-4">
          <motion.h1 initial={{ y: "100%" }} animate={startAnimation ? { y: 0 } : { y: "100%" }} transition={{ duration: 1, ease: EASE_EXPO, delay: 0.2 }} className="inline-block text-[clamp(4rem,12vw,14rem)] font-black tracking-tighter leading-[0.9]" data-hero-line="1">LEAD DEVELOPER</motion.h1>
        </div>

        <div className="overflow-hidden mb-8">
          <motion.h1 initial={{ y: "100%" }} animate={startAnimation ? { y: 0 } : { y: "100%" }} transition={{ duration: 1, ease: EASE_EXPO, delay: 0.3 }} className="inline-block text-[clamp(4rem,12vw,14rem)] font-black tracking-tighter leading-[0.9]" data-hero-line="2">& UI DESIGNER</motion.h1>
        </div>

        <div className="overflow-hidden mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.8, delay: 0.6 }} className="mono text-[#a0a0a0] tracking-widest" data-hero-subtitle>BRIDGING DESIGN & PERFORMANCE</motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={startAnimation ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-12">
          {[{ value: '3+', label: 'YEARS EXPERIENCE' }, { value: '20+', label: 'PROJECTS' }, { value: 'STACK', label: 'VUE.JS / REACT / FIGMA' }].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{value}</div>
              <div className="mono text-[10px] text-[#606060] tracking-wider">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={startAnimation ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.8, delay: 1 }} className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3">
          <div className="mono text-xs text-[#a0a0a0]">SCROLL</div>
          <div className="w-px h-16 bg-linear-to-b from-white to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
