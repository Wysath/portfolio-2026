import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { SubdivisionGrid } from '../components/interactions/SubdivisionGrid';
import { MorphologyGrid } from '../components/interactions/MorphologyGrid';
import { ElevationGrid } from '../components/interactions/ElevationGrid';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STACK = [
  { title: "Front-End", items: ["Vue.js", "React", "Node.js", "TypeScript"] },
  { title: "Animation & 3D", items: ["GSAP", "Three.js", "WebGL", "Canvas"] },
  { title: "Design", items: ["Figma", "Blender", "UI/UX", "Prototyping"] },
  { title: "Tools", items: ["WordPress", "ACF", "Git", "Vercel"] }
];

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLHeadingElement>(null);
  const missionRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      [titleLine1Ref, titleLine2Ref].forEach((ref, i) => {
        if (ref.current) {
          gsap.fromTo(ref.current, { y: "100%", opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: i * 0.1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 85%", toggleActions: "play none none none" } });
        }
      });

      if (missionRef.current) gsap.fromTo(missionRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out", scrollTrigger: { trigger: missionRef.current, start: "top 80%", toggleActions: "play none none none" } });

      if (bioRef.current) {
        const paragraphs = bioRef.current.querySelectorAll('p');
        gsap.fromTo(paragraphs, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out", scrollTrigger: { trigger: bioRef.current, start: "top 80%", toggleActions: "play none none none" } });
      }

      if (stackRef.current) {
        const categories = stackRef.current.querySelectorAll('.group');
        gsap.fromTo(categories, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: stackRef.current, start: "top 75%", toggleActions: "play none none none" } });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-black text-white pt-32 pb-20" data-scroll-section>
      <div className="px-8 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 max-w-screen-2xl mx-auto">
          <div className="lg:col-span-7">
            <div className="flex flex-col items-start text-left mb-20">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-0.5 bg-white" />
                <div className="mono text-sm text-[#707070] tracking-[0.3em] uppercase">Profile</div>
              </div>
              
              <div className="space-y-2 mb-8">
                <div className="text-xl text-[#a0a0a0]">2026 Portfolio</div>
                <div className="text-xl text-white">Creative Developer & UI Designer</div>
              </div>

              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full inline-flex backdrop-blur-sm">
                <div className="mono text-xs tracking-widest text-green-400 uppercase flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Available for work
                </div>
              </div>
            </div>

            <div className="mb-24">
              <div className="overflow-hidden">
                <h1 ref={titleLine1Ref} className="text-[clamp(4rem,11vw,10rem)] font-black tracking-tighter leading-[0.9] will-change-transform">LOUNA</h1>
              </div>
              <div className="overflow-hidden">
                <h1 ref={titleLine2Ref} className="text-[clamp(4rem,11vw,10rem)] font-black tracking-tighter leading-[0.9] text-[#505050] will-change-transform">PETITFILS</h1>
              </div>
            </div>

            <section className="mb-24">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-8 h-px bg-[#303030]" />
                <div className="mono text-sm text-[#707070] tracking-[0.3em] uppercase">Mission</div>
              </div>
              <p ref={missionRef} className="text-3xl md:text-4xl leading-tight max-w-3xl font-medium will-change-transform">
                I craft immersive digital experiences by bridging the gap between <span className="text-[#707070]">technical performance</span> and <span className="text-[#707070]">creative design</span>.
              </p>
            </section>

            <section className="mb-24 max-w-2xl">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-8 h-px bg-[#303030]" />
                <div className="mono text-sm text-[#707070] tracking-[0.3em] uppercase">About Me</div>
              </div>
              <div ref={bioRef} className="space-y-8 text-lg text-[#a0a0a0] leading-relaxed">
                <p>Currently a M1 Lead Developer Front-End student at ECV Bordeaux, I specialize in building modern web applications while keeping a strong focus on UI/UX design.</p>
                <p>My hybrid profile allows me to understand both the constraints of development and the requirements of design, ensuring a seamless workflow and a high-quality final product.</p>
              </div>
            </section>

            <section className="border-t border-[#1a1a1a] pt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[{ label: 'Education', title: 'M1 Lead Dev Front-End', sub: 'ECV Bordeaux' }, { label: 'Location', title: 'Bordeaux, France', sub: 'Remote Friendly' }].map(({ label, title, sub }) => (
                  <div key={label} className="group p-8 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-white/20 transition-colors duration-300">
                    <div className="mono text-xs tracking-widest text-[#606060] uppercase mb-4">{label}</div>
                    <div className="text-xl text-white mb-2">{title}</div>
                    <div className="text-[#808080]">{sub}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-5 lg:pt-40">
            <div className="sticky top-12">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-8 h-px bg-[#303030]" />
                <div className="mono text-sm text-[#707070] tracking-[0.3em] uppercase">Technical Stack</div>
              </div>

              <div ref={stackRef} className="space-y-12">
                {STACK.map((category, index) => (
                  <div key={index} className="group">
                    <div className="flex flex-wrap gap-3 mb-6 pb-6 border-b border-[#1a1a1a]">
                      {category.items.map((item, i) => (
                        <span key={i} className="px-4 py-2 bg-[#0a0a0a] border border-[#1a1a1a] text-[#a0a0a0] text-sm hover:text-white hover:border-white/20 transition-all duration-300 cursor-default">{item}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 mono text-xs tracking-widest text-[#505050] uppercase group-hover:text-white transition-colors duration-300">
                      <ArrowRight size={14} />
                      {category.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-20 border-t border-[#1a1a1a]">
          <div className="flex flex-col items-center mb-12 text-center">
            <div className="mono text-sm text-[#707070] tracking-[0.3em] uppercase mb-4">Playground</div>
            <h3 className="text-2xl text-white font-medium">Interactive Elements</h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <SubdivisionGrid />
            <MorphologyGrid />
            <ElevationGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
