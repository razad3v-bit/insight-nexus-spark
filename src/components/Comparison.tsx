import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features: { name: string; us: boolean | 'partial'; others: boolean | 'partial' }[] = [
  { name: 'Custom Development', us: true, others: 'partial' },
  { name: '24/7 Support', us: true, others: false },
  { name: 'Dedicated Team', us: true, others: 'partial' },
  { name: 'Agile Methodology', us: true, others: true },
  { name: 'Free Consultation', us: true, others: false },
  { name: 'Post-Launch Support', us: true, others: 'partial' },
  { name: 'Transparent Pricing', us: true, others: false },
  { name: 'Source Code Ownership', us: true, others: 'partial' },
  { name: 'Scalable Architecture', us: true, others: 'partial' },
  { name: 'Security Audits', us: true, others: false },
];

const Comparison = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.comparison-header',
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.comparison-header',
            start: 'top 85%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      gsap.fromTo('.comparison-table',
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.comparison-table',
            start: 'top 80%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      gsap.fromTo('.comparison-row',
        { x: -30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.comparison-table',
            start: 'top 75%',
            once: true,
          },
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderCheck = (value: boolean | 'partial') => {
    if (value === true) {
      return (
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="w-5 h-5 text-green-500" />
          </div>
        </div>
      );
    } else if (value === 'partial') {
      return (
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <span className="text-yellow-500 text-xs font-bold">~</span>
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
          <X className="w-5 h-5 text-red-500" />
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="comparison-header text-center mb-16">
          <span className="text-primary font-medium mb-3 block text-sm">
            Why Us?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            How We <span className="text-gradient">Compare</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            See why leading companies choose us over traditional agencies.
          </p>
        </div>

        <div className="comparison-table bg-gradient-card border border-border rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-4 sm:p-6 bg-muted/50 border-b border-border">
            <div className="font-semibold text-sm sm:text-base">Feature</div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-bold text-primary text-sm sm:text-base">Insightexus</span>
            </div>
            <div className="text-center text-sm sm:text-base font-semibold text-muted-foreground">Others</div>
          </div>

          {/* Rows */}
          {features.map((feature, index) => (
            <div
              key={index}
              className={`comparison-row grid grid-cols-3 gap-4 p-4 sm:p-5 ${
                index !== features.length - 1 ? 'border-b border-border' : ''
              } hover:bg-muted/30 transition-colors`}
            >
              <div className="flex items-center text-sm sm:text-base font-medium">
                {feature.name}
              </div>
              {renderCheck(feature.us)}
              {renderCheck(feature.others)}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground mb-4">
            Ready to experience the difference?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
