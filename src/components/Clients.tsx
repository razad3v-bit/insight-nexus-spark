import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: 'TechCorp', industry: 'Technology' },
  { name: 'FinanceHub', industry: 'Finance' },
  { name: 'HealthFirst', industry: 'Healthcare' },
  { name: 'EduSmart', industry: 'Education' },
  { name: 'RetailMax', industry: 'Retail' },
  { name: 'LogiFlow', industry: 'Logistics' },
  { name: 'MediaPro', industry: 'Media' },
  { name: 'CloudNine', industry: 'Cloud' },
  { name: 'DataWise', industry: 'Analytics' },
  { name: 'SecureNet', industry: 'Security' },
];

const Clients = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.clients-header',
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.clients-header',
            start: 'top 85%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen py-16 sm:py-20 overflow-hidden"
      style={{ marginLeft: 'calc(-50vw + 50%)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 mb-12">
        <div className="clients-header text-center">
          <span className="text-primary font-medium mb-3 block text-sm">
            Trusted Partners
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            We've partnered with forward-thinking companies across industries to deliver transformative solutions.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="clients-marquee flex gap-8 whitespace-nowrap">
          {[...clients, ...clients, ...clients].map((client, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-4 px-8 py-5 rounded-xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-300 hover:scale-105 shrink-0 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="text-primary font-bold text-lg">{client.name.slice(0, 2)}</span>
              </div>
              <div>
                <div className="font-semibold text-base">{client.name}</div>
                <div className="text-xs text-muted-foreground">{client.industry}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes clients-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        
        .clients-marquee {
          animation: clients-scroll 35s linear infinite;
        }
        
        .clients-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Clients;
