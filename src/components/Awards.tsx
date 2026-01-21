import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Trophy, Star, Medal, Shield, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const awards = [
  {
    icon: Trophy,
    title: 'Best Tech Agency 2024',
    org: 'Tech Excellence Awards',
    year: '2024',
    color: 'from-yellow-500/20 to-amber-500/20',
  },
  {
    icon: Award,
    title: 'Innovation Leader',
    org: 'Digital Transformation Summit',
    year: '2024',
    color: 'from-primary/20 to-cyan-500/20',
  },
  {
    icon: Star,
    title: 'Top 10 AI Companies',
    org: 'AI Business Review',
    year: '2023',
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: Medal,
    title: 'Excellence in UX Design',
    org: 'Design Awards Global',
    year: '2023',
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    icon: Shield,
    title: 'Security Champion',
    org: 'CyberSec Conference',
    year: '2023',
    color: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    icon: Crown,
    title: 'Client Choice Award',
    org: 'Business Excellence Forum',
    year: '2024',
    color: 'from-orange-500/20 to-red-500/20',
  },
];

const Awards = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.awards-header',
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.awards-header',
            start: 'top 85%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      gsap.fromTo('.award-card',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          scrollTrigger: {
            trigger: '.awards-grid',
            start: 'top 80%',
            once: true,
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.2)',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="awards-header text-center mb-16">
          <span className="text-primary font-medium mb-3 block text-sm">
            Recognition
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Awards & <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Our commitment to excellence has been recognized by industry leaders and organizations worldwide.
          </p>
        </div>

        <div className="awards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, index) => {
            const Icon = award.icon;
            return (
              <div
                key={index}
                className="award-card group relative p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-300"
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${award.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {award.year}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {award.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {award.org}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/5 rotate-45 group-hover:bg-primary/10 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Awards;
