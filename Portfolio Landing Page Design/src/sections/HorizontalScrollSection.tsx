import { useEffect, useRef } from 'react';
import { projects } from '../data/projects';

export function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const handleScroll = () => {
      const sectionRect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const scrollEnd = sectionHeight - window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(1, -sectionRect.top / scrollEnd));
      const maxTranslate = track.scrollWidth - window.innerWidth;
      track.style.transform = `translateX(-${scrollProgress * maxTranslate}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0a0a0a]" style={{ height: '300vh' }} data-scroll-section data-horizontal-scroll>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-12 left-12 z-10 mix-blend-difference">
          <div className="mono text-xs">SELECTED WORK</div>
          <div className="mono text-xs text-[#a0a0a0] mt-1">04 PROJECTS</div>
        </div>

        <div className="h-full flex items-center">
          <div ref={trackRef} className="flex gap-8 px-24" data-horizontal-track style={{ willChange: 'transform' }}>
            {projects.map((project) => (
              <div key={project.id} className="shrink-0 w-[70vw] h-[75vh] bg-[#141414] relative group overflow-hidden" data-cursor-hover data-project-card>
                <div className="absolute inset-0 border border-[#2a2a2a] p-12 flex flex-col justify-between transition-colors duration-300 group-hover:border-white">
                  <div>
                    <div className="mono text-xs text-[#a0a0a0] mb-4">{project.id} — {project.category}</div>
                    <h2 className="mb-6">{project.title}</h2>
                  </div>

                  <div className="absolute inset-24 bg-[#0a0a0a] overflow-hidden">
                    {project.link ? (
                      <img src={project.link} alt={project.title} className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
                        <div className="mono text-[#a0a0a0] text-xs">IMAGE PLACEHOLDER</div>
                      </div>
                    )}
                  </div>

                  <div className="relative z-10">
                    <p className="mb-4 text-[#a0a0a0]">{project.description}</p>
                    <div className="flex justify-between items-end">
                      <div className="mono text-xs">{project.year}</div>
                      <div className="mono text-xs group-hover:translate-x-2 transition-transform">VIEW PROJECT →</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}