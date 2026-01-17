import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Code2, Sparkles } from 'lucide-react';
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power4.out'
        }
      });
      tl.from('.hero-badge', {
        y: 30,
        opacity: 0,
        duration: 0.8
      }).from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1
      }, '-=0.4').from('.hero-subtitle', {
        y: 40,
        opacity: 0,
        duration: 0.8
      }, '-=0.6').from('.hero-buttons', {
        y: 30,
        opacity: 0,
        duration: 0.8
      }, '-=0.4').from('.hero-visual', {
        scale: 0.8,
        opacity: 0,
        duration: 1.2
      }, '-=0.6').from('.floating-element', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
      }, '-=0.8');

      // Floating animation for decorative elements
      gsap.to('.float-1', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      gsap.to('.float-2', {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5
      });
      gsap.to('.float-3', {
        y: -25,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);
  return <section ref={heroRef} className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden pt-24">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-glow animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-glow animate-pulse-glow pointer-events-none" style={{
      animationDelay: '1.5s'
    }} />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Crafting Digital Excellence</span>
          </div>

          <h1 ref={titleRef} className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            We Build{' '}
            <span className="text-gradient">Software</span>
            <br />
            That Drives Growth
          </h1>

          <p className="hero-subtitle text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Transform your vision into powerful digital solutions. We specialize in
            creating innovative software that scales with your business.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="btn-primary group">
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#projects" className="btn-outline">
              View Our Work
            </a>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 floating-element float-1">
          <div className="w-16 h-16 rounded-2xl bg-gradient-card border border-border flex items-center justify-center shadow-card">
            <Code2 className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="absolute top-40 right-16 floating-element float-2">
          <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-primary" />
          </div>
        </div>

        <div className="absolute bottom-32 left-20 floating-element float-3">
          <div className="w-20 h-20 rounded-2xl bg-gradient-card border border-border flex items-center justify-center shadow-card">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Visual element */}
        <div className="hero-visual mt-16 relative mx-auto max-w-3xl">
          <div className="relative rounded-2xl overflow-hidden shadow-glow">
            
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;