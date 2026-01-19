import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Shield, HeadphonesIcon, Zap, Users, Trophy, Workflow, BadgeCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: '98% of our projects are delivered on or before the deadline.',
    stat: '98%',
    color: 'blue',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Enterprise-grade security built into every solution we create.',
    stat: 'A+',
    color: 'emerald',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Round-the-clock technical support for all our clients.',
    stat: '24/7',
    color: 'purple',
  },
  {
    icon: Zap,
    title: 'Fast Performance',
    description: 'Optimized code ensuring lightning-fast load times.',
    stat: '<1s',
    color: 'amber',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Certified developers with 8+ years average experience.',
    stat: '8+',
    color: 'rose',
  },
  {
    icon: Trophy,
    title: 'Award Winning',
    description: 'Recognized for excellence in software development.',
    stat: '15+',
    color: 'cyan',
  },
  {
    icon: Workflow,
    title: 'Agile Process',
    description: 'Iterative development with continuous client feedback.',
    stat: '2wk',
    color: 'orange',
  },
  {
    icon: BadgeCheck,
    title: 'Quality Assured',
    description: 'Rigorous testing and code review on every project.',
    stat: '100%',
    color: 'green',
  },
];

const colorMap: Record<string, string> = {
  blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/20 text-blue-400',
  emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-400',
  purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/20 text-purple-400',
  amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-400',
  rose: 'from-rose-500/20 to-rose-500/5 border-rose-500/20 text-rose-400',
  cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20 text-cyan-400',
  orange: 'from-orange-500/20 to-orange-500/5 border-orange-500/20 text-orange-400',
  green: 'from-green-500/20 to-green-500/5 border-green-500/20 text-green-400',
};

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.why-header', 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.why-header',
            start: 'top 85%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      gsap.fromTo('.why-card', 
        { y: 40, opacity: 0, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: '.why-grid',
            start: 'top 85%',
            once: true,
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen py-16 sm:py-20 lg:py-28 overflow-hidden"
      style={{ marginLeft: 'calc(-50vw + 50%)' }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-glow pointer-events-none opacity-20" />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="why-header text-center mb-12 sm:mb-16">
          <span className="text-primary font-medium mb-3 sm:mb-4 block text-sm sm:text-base">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            The <span className="text-gradient">Insightexus</span> Advantage
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            We combine technical excellence with business acumen to deliver solutions that drive real results.
          </p>
        </div>

        <div className="why-grid grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`why-card group relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br ${colorMap[reason.color]} border backdrop-blur-sm hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden`}
            >
              {/* Stat badge */}
              <div className="absolute top-4 right-4 text-2xl sm:text-3xl font-bold opacity-20 group-hover:opacity-40 transition-opacity">
                {reason.stat}
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-background/50 border border-current/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <reason.icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold mb-2 text-foreground">{reason.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-current/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
