import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Go', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Redis', category: 'Database' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Azure', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'GraphQL', category: 'API' },
  { name: 'TensorFlow', category: 'AI/ML' },
  { name: 'PyTorch', category: 'AI/ML' },
];

const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tech-header', 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.tech-header',
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

  // Create reversed array for second row
  const reversedTechnologies = [...technologies].reverse();

  return (
    <section
      ref={sectionRef}
      className="relative w-screen py-16 sm:py-20 lg:py-28 overflow-hidden"
      style={{ marginLeft: 'calc(-50vw + 50%)' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 mb-12">
        <div className="tech-header text-center">
          <span className="text-primary font-medium mb-3 sm:mb-4 block text-sm sm:text-base">
            Technology Stack
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Tools We <span className="text-gradient">Master</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            We leverage cutting-edge technologies to build robust, scalable solutions.
          </p>
        </div>
      </div>

      {/* CSS-based Marquee rows - smoother than GSAP for continuous animation */}
      <div className="space-y-6">
        {/* Row 1 - moves left */}
        <div className="relative overflow-hidden">
          <div className="marquee-row-left flex gap-6 whitespace-nowrap">
            {[...technologies, ...technologies, ...technologies].map((tech, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-card border border-border hover:border-primary/30 transition-colors shrink-0"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">{tech.name.slice(0, 2)}</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">{tech.name}</div>
                  <div className="text-xs text-muted-foreground">{tech.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - moves right */}
        <div className="relative overflow-hidden">
          <div className="marquee-row-right flex gap-6 whitespace-nowrap">
            {[...reversedTechnologies, ...reversedTechnologies, ...reversedTechnologies].map((tech, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-card border border-border hover:border-primary/30 transition-colors shrink-0"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">{tech.name.slice(0, 2)}</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">{tech.name}</div>
                  <div className="text-xs text-muted-foreground">{tech.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        
        @keyframes marquee-right {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        
        .marquee-row-left {
          animation: marquee-left 40s linear infinite;
        }
        
        .marquee-row-right {
          animation: marquee-right 45s linear infinite;
        }
        
        .marquee-row-left:hover,
        .marquee-row-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TechStack;
