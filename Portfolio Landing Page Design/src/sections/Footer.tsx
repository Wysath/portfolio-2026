import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Wysath', external: true },
  { label: 'LinkedIn', href: '#', external: false },
];
const NAV_LINKS = ['Work', 'About', 'Services', 'Lab', 'Contact'];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      [titleLine1Ref, titleLine2Ref].forEach((ref, i) => {
        if (ref.current) {
          gsap.fromTo(ref.current, { y: "100%", opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: i * 0.1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 90%", toggleActions: "play none none none" } });
        }
      });

      if (linksRef.current) {
        const links = linksRef.current.querySelectorAll('a, li');
        gsap.fromTo(links, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out", scrollTrigger: { trigger: linksRef.current, start: "top 85%", toggleActions: "play none none none" } });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-[#0a0a0a] border-t border-[#1a1a1a] overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        <div className="px-12 lg:px-20 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-7">
              <div className="mb-12">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-0.5 bg-white" />
                  <div className="mono text-sm text-[#707070] tracking-[0.3em] uppercase">Let's Work Together</div>
                </div>
                <div className="overflow-hidden mb-4">
                  <h2 ref={titleLine1Ref} className="leading-[0.9] text-white text-[clamp(3rem,8vw,8rem)] font-black tracking-tighter will-change-transform">LET'S BUILD</h2>
                </div>
                <div className="overflow-hidden mb-12">
                  <h2 ref={titleLine2Ref} className="leading-[0.9] text-[#505050] text-[clamp(3rem,8vw,8rem)] font-black tracking-tighter will-change-transform">SOMETHING</h2>
                </div>
              </div>

              <div className="space-y-8 mb-12">
                <a href="mailto:louna.petitfils@gmail.com" className="block group" data-cursor-hover>
                  <div className="mono text-sm text-[#606060] mb-3 tracking-wider uppercase">Email</div>
                  <div className="text-3xl text-white group-hover:translate-x-2 transition-transform inline-block">louna.petitfils@gmail.com</div>
                </a>
                <div>
                  <div className="mono text-sm text-[#606060] mb-3 tracking-wider uppercase">Location</div>
                  <div className="text-3xl text-[#909090]">Bordeaux, France</div>
                </div>
              </div>

              <a href="mailto:louna.petitfils@gmail.com" className="inline-block mono text-sm border-2 border-white px-16 py-6 hover:bg-white hover:text-black transition-all duration-300 tracking-wider" data-cursor-hover>LET'S BUILD SOMETHING</a>
            </div>

            <div ref={linksRef} className="lg:col-span-5 grid grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-px bg-[#303030]" />
                  <div className="mono text-sm text-[#707070] tracking-[0.3em] uppercase">Connect</div>
                </div>
                <ul className="space-y-8">
                  {SOCIAL_LINKS.map(({ label, href, external }) => (
                    <li key={label}>
                      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-xl text-[#a0a0a0] hover:text-white hover:translate-x-1 inline-block transition-all duration-300" data-cursor-hover>{label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-12">
                  <div className="w-8 h-px bg-[#303030]" />
                  <div className="mono text-sm text-[#707070] tracking-[0.3em] uppercase">Follow</div>
                </div>
                <ul className="space-y-8">
                  <li><a href="#" className="text-xl text-[#a0a0a0] hover:text-white hover:translate-x-1 inline-block transition-all duration-300" data-cursor-hover>Dribbble</a></li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-8 h-px bg-[#303030]" />
                  <div className="mono text-sm text-[#707070] tracking-[0.3em] uppercase">Explore</div>
                </div>
                <ul className="space-y-6">
                  {NAV_LINKS.map((link) => (
                    <li key={link}><a href="#" className="text-xl text-[#a0a0a0] hover:text-white hover:translate-x-1 inline-block transition-all duration-300" data-cursor-hover>{link}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] px-12 lg:px-20 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="mono text-[11px] text-[#606060] tracking-wider">© {currentYear} Creative Developer. All Rights Reserved.</div>
            <div className="flex items-center gap-12">
              <a href="#" className="mono text-[11px] text-[#707070] hover:text-white transition-colors tracking-wider" data-cursor-hover>Privacy Policy</a>
              <a href="#" className="mono text-[11px] text-[#707070] hover:text-white transition-colors tracking-wider" data-cursor-hover>Terms of Use</a>
              <div className="mono text-[11px] text-[#505050] tracking-wider">Made with ♥</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}