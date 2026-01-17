import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Zap, Globe, Layers } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Stagger text lines
      tl.from('.hero-line', {
        y: 120,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
      })
      .from('.hero-subtitle', {
        y: 40,
        opacity: 0,
        duration: 0.8,
      }, '-=0.6')
      .from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      }, '-=0.4')
      .from('.hero-stat', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
      }, '-=0.3')
      .from('.hero-badge', {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      }, '-=0.4');

      // Floating orbs animation
      gsap.to(orb1Ref.current, {
        y: -40,
        x: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(orb2Ref.current, {
        y: 30,
        x: -30,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });

      gsap.to(orb3Ref.current, {
        y: -20,
        x: -15,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });

      // Mouse parallax effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (clientX - centerX) / 50;
        const moveY = (clientY - centerY) / 50;

        gsap.to('.parallax-slow', {
          x: moveX * 0.5,
          y: moveY * 0.5,
          duration: 1,
          ease: 'power2.out',
        });

        gsap.to('.parallax-fast', {
          x: moveX * 1.5,
          y: moveY * 1.5,
          duration: 1,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-background flex items-center overflow-hidden pt-20"
    >
      {/* Animated gradient orbs */}
      <div
        ref={orb1Ref}
        className="parallax-slow absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(192 50% 50% / 0.4) 0%, transparent 70%)' }}
      />
      <div
        ref={orb2Ref}
        className="parallax-fast absolute bottom-20 left-[5%] w-[400px] h-[400px] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(200 60% 40% / 0.4) 0%, transparent 70%)' }}
      />
      <div
        ref={orb3Ref}
        className="parallax-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(180 40% 45% / 0.3) 0%, transparent 70%)' }}
      />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-custom relative z-10 px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div ref={textRef} className="space-y-8">
            {/* Title */}
            <div className="overflow-hidden">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tight">
                <span className="hero-line block">We craft</span>
                <span className="hero-line block text-gradient">digital</span>
                <span className="hero-line block">experiences</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="hero-subtitle text-lg sm:text-xl text-muted-foreground max-w-md leading-relaxed">
              Transforming bold ideas into powerful software solutions that scale with your ambition and drive measurable growth.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#contact" className="hero-cta btn-primary group">
                Start your project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#projects" className="hero-cta btn-outline">
                Explore work
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="hero-stat">
                <div className="text-3xl sm:text-4xl font-bold text-gradient">50+</div>
                <div className="text-sm text-muted-foreground mt-1">Projects delivered</div>
              </div>
              <div className="hero-stat">
                <div className="text-3xl sm:text-4xl font-bold text-gradient">98%</div>
                <div className="text-sm text-muted-foreground mt-1">Client satisfaction</div>
              </div>
              <div className="hero-stat">
                <div className="text-3xl sm:text-4xl font-bold text-gradient">5+</div>
                <div className="text-sm text-muted-foreground mt-1">Years experience</div>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Central card */}
            <div className="relative w-full max-w-md aspect-square">
              {/* Rotating border */}
              <div 
                className="absolute inset-0 rounded-3xl p-[2px] animate-spin"
                style={{ 
                  background: 'conic-gradient(from 0deg, hsl(192 35% 52%), transparent, hsl(192 35% 52%))',
                  animationDuration: '8s',
                }}
              >
                <div className="w-full h-full rounded-3xl bg-background" />
              </div>

              {/* Inner content */}
              <div className="absolute inset-2 rounded-2xl bg-gradient-card border border-border flex items-center justify-center overflow-hidden">
                {/* Code lines decoration */}
                <div className="absolute inset-0 p-8 opacity-30">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="h-3 rounded-full mb-3"
                      style={{
                        width: `${Math.random() * 60 + 20}%`,
                        background: i % 3 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                        opacity: 0.5 + Math.random() * 0.5,
                      }}
                    />
                  ))}
                </div>

                {/* Center logo mark */}
                <div className="relative z-10 w-32 h-32 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center shadow-glow">
                  <div className="text-5xl font-bold text-gradient">IX</div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="hero-badge absolute top-10 left-0 lg:-left-4 glass rounded-2xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm">Fast Delivery</div>
                <div className="text-xs text-muted-foreground">2x faster sprints</div>
              </div>
            </div>

            <div className="hero-badge absolute top-1/3 right-0 lg:-right-8 glass rounded-2xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm">Global Reach</div>
                <div className="text-xs text-muted-foreground">Clients worldwide</div>
              </div>
            </div>

            <div className="hero-badge absolute bottom-10 left-4 lg:left-0 glass rounded-2xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Layers className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm">Full Stack</div>
                <div className="text-xs text-muted-foreground">End-to-end solutions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
