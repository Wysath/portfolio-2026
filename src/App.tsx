import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Navigation } from './components/Navigation';
import { Footer } from './sections/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

gsap.registerPlugin(ScrollTrigger);

const EASE_EXPO = [0.76, 0, 0.24, 1] as const;

const pageTransitionVariants = {
  initial: { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', opacity: 0 },
  animate: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    opacity: 1,
    transition: { clipPath: { duration: 0.8, ease: EASE_EXPO }, opacity: { duration: 0.4 } },
  },
  exit: {
    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
    opacity: 0,
    transition: { clipPath: { duration: 0.6, ease: EASE_EXPO }, opacity: { duration: 0.3, delay: 0.3 } },
  },
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageTransitionVariants} initial="initial" animate="animate" exit="exit" className="will-change-[clip-path]">
      {children}
    </motion.div>
  );
}

function AnimatedRoutes({ isPreloaderActive }: { isPreloaderActive: boolean }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home isPreloaderActive={isPreloaderActive} /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : '';
  }, [isLoading]);

  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <Navigation />
      <main className="relative">
        <AnimatedRoutes isPreloaderActive={isLoading} />
        <Footer />
      </main>
    </Router>
  );
}
