import { HeroSection } from '../sections/HeroSection';
import { HorizontalScrollSection } from '../sections/HorizontalScrollSection';
import { SplitScreenSection } from '../sections/SplitScreenSection';
import { WebGLSlider } from '../sections/WebGLSlider';

interface HomeProps {
  isPreloaderActive?: boolean;
}

export function Home({ isPreloaderActive = false }: HomeProps) {
  return (
    <div>
      <HeroSection startAnimation={!isPreloaderActive} />
      <HorizontalScrollSection />
      <SplitScreenSection />
      <WebGLSlider />
    </div>
  );
}
