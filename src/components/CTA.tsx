import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Zap, Shield, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { icon: Zap, text: 'Fast Delivery' },
  { icon: Shield, text: 'Secure & Reliable' },
  { icon: Clock, text: '24/7 Support' },
];

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        scrollTrigger: {
          trigger: '.cta-content',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1,
      });

      // Floating animation for decorative elements
      gsap.to('.cta-float', {
        y: -20,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen py-16 sm:py-20 lg:py-28 overflow-hidden"
      style={{ marginLeft: 'calc(-50vw + 50%)' }}
    >
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="cta-content relative rounded-3xl overflow-hidden">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          {/* Glowing orbs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Floating decorative elements */}
          <div className="absolute top-8 right-[10%] cta-float">
            <div className="w-16 h-16 rounded-2xl bg-background/50 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="absolute bottom-8 left-[10%] cta-float" style={{ animationDelay: '0.5s' }}>
            <div className="w-12 h-12 rounded-xl bg-background/50 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 sm:px-12 lg:px-20 py-16 sm:py-20 lg:py-24 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Start Your Project Today
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 max-w-4xl mx-auto">
              Ready to Transform Your <span className="text-gradient">Digital Vision</span> Into Reality?
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-10">
              Let's collaborate to create innovative solutions that drive your business forward. 
              Get in touch for a free consultation.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm sm:text-base">
                  <benefit.icon className="w-5 h-5 text-primary" />
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-primary text-base lg:text-lg">
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href="#projects" className="btn-outline text-base lg:text-lg">
                View Our Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
