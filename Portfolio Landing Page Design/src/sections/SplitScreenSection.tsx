import { useState, useEffect, useRef } from 'react';
import { experiences } from '../data/experiences';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GRID_PATTERN = 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)';

export function SplitScreenSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const experienceItemsRef = useRef<HTMLDivElement[]>([]);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      [titleLine1Ref, titleLine2Ref].forEach((ref, i) => {
        if (ref.current) {
          gsap.fromTo(ref.current, { y: "100%", opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: i * 0.1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 85%", toggleActions: "play none none none" } });
        }
      });

      statsRef.current?.querySelectorAll('.stat-number').forEach((stat) => {
        const endValue = parseInt(stat.textContent || '0');
        gsap.fromTo(stat, { textContent: 0 }, { textContent: endValue, duration: 2, ease: "power2.out", snap: { textContent: 1 }, scrollTrigger: { trigger: stat, start: "top 80%", toggleActions: "play none none none" } });
      });

      experienceItemsRef.current.forEach((item) => {
        if (!item) return;
        gsap.fromTo(item, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none none" } });
      });

      const gridPattern = leftColumnRef.current?.querySelector('.grid-pattern');
      if (gridPattern) gsap.to(gridPattern, { y: 100, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true } });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0a0a0a]" data-split-screen>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div ref={leftColumnRef} className="relative h-screen top-0 overflow-hidden border-r border-[#2a2a2a]" data-sticky-image>
          <div className="absolute inset-0 bg-[#0f0f0f]">
            <div className="grid-pattern absolute inset-0 opacity-[0.02] will-change-transform">
              <div className="h-full w-full" style={{ backgroundImage: GRID_PATTERN, backgroundSize: '80px 80px' }} />
            </div>

            <div className="absolute inset-0 flex flex-col items-start justify-center p-20">
              <div className="mb-16">
                <div className="mono text-sm text-[#707070] tracking-[0.3em] uppercase">Professional Journey</div>
                <div className="w-24 h-[px] bg-[#2a2a2a] mt-4" />
              </div>

              <div className="text-left space-y-4 mb-16">
                <div className="overflow-hidden">
                  <h2 ref={titleLine1Ref} className="text-white leading-[0.85] text-[clamp(3rem,8vw,8rem)] font-black tracking-tighter will-change-transform">WORK</h2>
                </div>
                <div className="overflow-hidden">
                  <h2 ref={titleLine2Ref} className="text-white leading-[0.85] text-[clamp(3rem,8vw,8rem)] font-black tracking-tighter will-change-transform">EXPERIENCE</h2>
                </div>
              </div>
                
              <div className="flex items-center justify-start gap-6">
                <div className="w-16 h-[px] bg-[#303030]" />
                <div className="mono text-[11px] text-[#606060] tracking-wider">5+ YEARS</div>
                <div className="w-16 h-[px] bg-[#303030]" />
              </div>

              <div ref={statsRef} className="absolute bottom-32 left-20 grid grid-cols-3 gap-12">
                {[{ value: 50, label: 'PROJECTS' }, { value: 15, label: 'CLIENTS' }, { value: 4, label: 'COMPANIES' }].map(({ value, label }) => (
                  <div key={label} className="text-left">
                    <div className="stat-number text-3xl text-white mb-2">{value}</div>
                    <div className="mono text-[10px] text-[#505050] tracking-wider">{label}</div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-12 left-20 flex flex-col items-start gap-4">
                <div className="mono text-[10px] text-[#505050] tracking-wider">SCROLL TO EXPLORE</div>
                <div className="w-[px] h-8 bg-[#2a2a2a]" />
              </div>
            </div>

            <div className="absolute top-12 left-12"><div className="mono text-[10px] text-[#505050] tracking-wider uppercase">Career Path</div></div>
            <div className="absolute bottom-12 right-12"><div className="mono text-[10px] text-[#505050] tracking-wider">2022 — 2026</div></div>
            <div className="absolute top-0 left-20 w-[px] h-24 bg-linear-to-b from-[#2a2a2a] to-transparent" />
          </div>
        </div>

        <div className="relative min-h-screen bg-[#0a0a0a] p-12 lg:p-20">
          <div className="py-24 px-4 lg:px-12">
            <div className="mb-12">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-8 h-[px] bg-[#2a2a2a]" />
                <div className="mono text-sm text-[#606060] tracking-[0.3em] uppercase">Career Path</div>
              </div>
              <p className="text-[#505050] leading-[1.6] text-sm italic">Click on any position to expand details.</p>
            </div>

            <div className="border-t border-[#1a1a1a]/40">
              {experiences.map((experience, index) => {
                const isExpanded = expandedIndex === index;
                return (
                  <div key={index} ref={(el) => { if (el) experienceItemsRef.current[index] = el; }} className="relative border-b border-[#1a1a1a]/40" data-scroll-text style={{ padding: '45px' }}>
                    <button onClick={() => setExpandedIndex(isExpanded ? null : index)} className="w-full py-16 flex items-start md:items-center justify-between gap-12 group cursor-pointer hover:bg-[#0d0d0d]/50 transition-colors text-left" data-cursor-hover>
                      <div className="mono text-base text-[#505050] tracking-wide whitespace-nowrap w-32 shrink-0 pt-2 md:pt-0">{experience.year}</div>
                      <div className="flex-1">
                        <h3 className="text-3xl md:text-4xl text-white leading-[1.1] mb-3 group-hover:text-[#e0e0e0] transition-colors">{experience.role}</h3>
                        <div className="text-base text-[#606060] tracking-wider uppercase">{experience.company} · {experience.location}</div>
                      </div>
                      <div className={`text-xl text-[#404040] group-hover:text-[#808080] transition-all duration-300 pt-2 md:pt-0 ${isExpanded ? 'rotate-45' : 'rotate-0'}`}>+</div>
                    </button>

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-200 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="pb-16 pt-2 pl-0 md:pl-44 pr-0 md:pr-16">
                        <div className="mb-8"><p className="text-[#808080] leading-[1.6] text-lg">{experience.description}</p></div>
                        <div className="flex flex-wrap gap-2">
                          {experience.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="mono text-[9px] text-[#505050] border border-[#1a1a1a]/60 px-3 py-1 tracking-wider hover:border-[#2a2a2a] hover:text-[#707070] transition-all duration-300">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-24 pt-12 flex justify-end">
              <button className="group flex items-center gap-2 text-[#707070] hover:text-white transition-colors duration-300" data-cursor-hover>
                <span className="mono text-[11px] tracking-[0.15em] uppercase">Download Full Resume</span>
                <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}