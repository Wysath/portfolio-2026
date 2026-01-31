import { useState, FormEvent, useEffect, useRef } from 'react';
import { ArrowRight, Send, CheckCircle2, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = ['GitHub', 'LinkedIn', 'Dribbble', 'Instagram'];

export function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      [titleLine1Ref, titleLine2Ref].forEach((ref, i) => {
        if (ref.current) {
          gsap.fromTo(ref.current, { y: "100%", opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: i * 0.1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 85%", toggleActions: "play none none none" } });
        }
      });

      if (formRef.current) {
        const formGroups = formRef.current.querySelectorAll('.group');
        gsap.fromTo(formGroups, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: formRef.current, start: "top 80%", toggleActions: "play none none none" } });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setFormState('success');
    setTimeout(() => { setFormState('idle'); (e.target as HTMLFormElement).reset(); }, 3000);
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-black text-white pt-32 pb-20" data-scroll-section>
      <div className="px-8 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 max-w-screen-2xl mx-auto">
          <div className="lg:col-span-5">
            <div className="flex flex-col items-start text-left mb-20">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-0.5 bg-white" />
                <div className="mono text-sm text-[#707070] tracking-[0.3em] uppercase">Contact</div>
              </div>
              
              <div className="space-y-2 mb-8">
                <div className="text-xl text-[#a0a0a0]">Get in touch</div>
                <div className="text-xl text-white">Let's build something together</div>
              </div>
            </div>

            <div className="mb-24">
              <div className="overflow-hidden">
                <h1 ref={titleLine1Ref} className="text-[clamp(4rem,11vw,10rem)] font-black tracking-tighter leading-[0.9] will-change-transform">LET'S</h1>
              </div>
              <div className="overflow-hidden">
                <h1 ref={titleLine2Ref} className="text-[clamp(4rem,11vw,10rem)] font-black tracking-tighter leading-[0.9] text-[#505050] will-change-transform">TALK</h1>
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <div className="mono text-xs tracking-widest text-[#606060] uppercase mb-4">Contact Details</div>
                <a href="mailto:louna.petitfils@gmail.com" className="block text-2xl text-white hover:text-[#a0a0a0] transition-colors mb-2" data-cursor-hover>louna.petitfils@gmail.com</a>
                <div className="text-[#808080]">Bordeaux, France</div>
              </div>

              <div>
                <div className="mono text-xs tracking-widest text-[#606060] uppercase mb-4">Socials</div>
                <div className="flex flex-wrap gap-6">
                  {SOCIALS.map((social) => (
                    <a key={social} href="#" className="text-lg text-white hover:text-[#a0a0a0] transition-colors flex items-center gap-2 group" data-cursor-hover>
                      {social}
                      <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-40">
            <form ref={formRef} className="space-y-12" onSubmit={handleSubmit}>
              {[
                { id: 'name', type: 'text', label: "What's your name?", required: true },
                { id: 'email', type: 'email', label: "What's your email?", required: true },
                { id: 'service', type: 'text', label: "What services are you looking for?", required: false },
              ].map(({ id, type, label, required }) => (
                <div key={id} className="group relative">
                  <input type={type} id={id} className="w-full bg-transparent border-b border-[#303030] py-4 text-xl text-white focus:outline-none focus:border-white transition-colors peer" placeholder=" " required={required} disabled={formState !== 'idle'} />
                  <label htmlFor={id} className="absolute left-0 top-4 text-[#707070] text-xl transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-[#a0a0a0] peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#a0a0a0]">{label}</label>
                </div>
              ))}

              <div className="group relative">
                <textarea id="message" rows={4} className="w-full bg-transparent border-b border-[#303030] py-4 text-xl text-white focus:outline-none focus:border-white transition-colors peer resize-none" placeholder=" " required disabled={formState !== 'idle'} />
                <label htmlFor="message" className="absolute left-0 top-4 text-[#707070] text-xl transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-[#a0a0a0] peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#a0a0a0]">Your message...</label>
              </div>

              <div className="pt-8">
                <button type="submit" disabled={formState !== 'idle'} className="group flex items-center gap-4 text-white text-xl hover:text-[#a0a0a0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-cursor-hover>
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                    {formState === 'submitting' ? <Loader2 size={24} className="animate-spin" /> : formState === 'success' ? <CheckCircle2 size={24} className="text-green-500" /> : <Send size={24} className="-ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </div>
                  <span className="mono tracking-widest uppercase text-sm">{formState === 'submitting' ? 'Sending...' : formState === 'success' ? 'Message Sent' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}