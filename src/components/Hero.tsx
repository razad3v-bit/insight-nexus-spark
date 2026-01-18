import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Zap, Globe, Layers, Code2, Cpu, Database, Terminal } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('.hero-line', {
        y: 120,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
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
      .from('.orbit-ring', {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.5)',
      }, '-=0.6')
      .from('.orbit-icon', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      }, '-=0.4')
      .from('.hero-badge', {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      }, '-=0.3');

      // Floating orbs
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

      // Mouse parallax
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (clientX - centerX) / 40;
        const moveY = (clientY - centerY) / 40;

        gsap.to('.parallax-slow', {
          x: moveX * 0.5,
          y: moveY * 0.5,
          duration: 1,
          ease: 'power2.out',
        });

        gsap.to('.parallax-fast', {
          x: moveX * 1.2,
          y: moveY * 1.2,
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
      className="relative w-screen min-h-screen bg-background flex items-center overflow-hidden"
      style={{ marginLeft: 'calc(-50vw + 50%)' }}
    >
      {/* Animated gradient orbs */}
      <div
        ref={orb1Ref}
        className="parallax-slow absolute top-10 right-[5%] w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(192 60% 50% / 0.5) 0%, transparent 60%)' }}
      />
      <div
        ref={orb2Ref}
        className="parallax-fast absolute bottom-10 left-[10%] w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(280 50% 50% / 0.4) 0%, transparent 60%)' }}
      />

      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="overflow-hidden">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight">
                <span className="hero-line block text-foreground">Building</span>
                <span className="hero-line block text-gradient">tomorrow's</span>
                <span className="hero-line block text-foreground">software</span>
              </h1>
            </div>

            <p className="hero-subtitle text-base sm:text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed">
              We engineer cutting-edge digital products that transform businesses and create lasting impact in the digital landscape.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <a href="#contact" className="hero-cta btn-primary group text-center">
                Let's build together
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#projects" className="hero-cta btn-outline text-center">
                View portfolio
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-border">
              <div className="hero-stat">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient">50+</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">Projects shipped</div>
              </div>
              <div className="hero-stat">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient">98%</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">Happy clients</div>
              </div>
              <div className="hero-stat">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient">24/7</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">Support</div>
              </div>
            </div>
          </div>

          {/* Right visual - Orbiting tech stack */}
          <div className="relative h-[350px] sm:h-[450px] lg:h-[550px] xl:h-[600px] flex items-center justify-center parallax-slow">
            {/* Outer orbit ring */}
            <div 
              className="orbit-ring absolute w-[280px] sm:w-[360px] lg:w-[420px] xl:w-[480px] h-[280px] sm:h-[360px] lg:h-[420px] xl:h-[480px] rounded-full border border-primary/20"
              style={{ animation: 'spin 25s linear infinite' }}
            >
              <div className="orbit-icon absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-8 sm:h-10 rounded-xl bg-card border border-border flex items-center justify-center shadow-lg">
                <Code2 className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
              </div>
              <div className="orbit-icon absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-8 sm:h-10 rounded-xl bg-card border border-border flex items-center justify-center shadow-lg">
                <Database className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
              </div>
              <div className="orbit-icon absolute top-1/2 -left-4 sm:-left-5 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 rounded-xl bg-card border border-border flex items-center justify-center shadow-lg">
                <Cpu className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
              </div>
              <div className="orbit-icon absolute top-1/2 -right-4 sm:-right-5 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 rounded-xl bg-card border border-border flex items-center justify-center shadow-lg">
                <Terminal className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
              </div>
            </div>

            {/* Middle orbit ring */}
            <div 
              className="orbit-ring absolute w-[200px] sm:w-[260px] lg:w-[300px] xl:w-[340px] h-[200px] sm:h-[260px] lg:h-[300px] xl:h-[340px] rounded-full border border-primary/30"
              style={{ animation: 'spin 18s linear infinite reverse' }}
            >
              <div className="orbit-icon absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-6 sm:h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary" />
              </div>
              <div className="orbit-icon absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-6 sm:h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary" />
              </div>
            </div>

            {/* Inner orbit ring */}
            <div 
              className="orbit-ring absolute w-[120px] sm:w-[160px] lg:w-[180px] xl:w-[200px] h-[120px] sm:h-[160px] lg:h-[180px] xl:h-[200px] rounded-full border-2 border-primary/40"
              style={{ animation: 'spin 12s linear infinite' }}
            />

            {/* Center core */}
            <div className="orbit-ring relative w-16 sm:w-24 lg:w-28 xl:w-32 h-16 sm:h-24 lg:h-28 xl:h-32 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/5 border border-primary/50 flex items-center justify-center shadow-glow">
              <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping opacity-50" />
              <div className="relative w-8 sm:w-12 lg:w-14 xl:w-16 h-8 sm:h-12 lg:h-14 xl:h-16 rounded-xl bg-primary/30 flex items-center justify-center">
                <Zap className="w-4 sm:w-6 lg:w-7 xl:w-8 h-4 sm:h-6 lg:h-7 xl:h-8 text-primary" />
              </div>
            </div>

            {/* Floating badges - Hidden on very small screens */}
            <div className="hero-badge hidden sm:flex absolute top-4 left-0 lg:-left-4 xl:-left-8 glass rounded-2xl p-3 lg:p-4 items-center gap-3 shadow-xl">
              <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <Zap className="w-5 lg:w-6 h-5 lg:h-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-xs lg:text-sm">Lightning Fast</div>
                <div className="text-xs text-muted-foreground">Optimized performance</div>
              </div>
            </div>

            <div className="hero-badge hidden sm:flex absolute top-1/4 right-0 lg:-right-4 glass rounded-2xl p-3 lg:p-4 items-center gap-3 shadow-xl">
              <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <Globe className="w-5 lg:w-6 h-5 lg:h-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-xs lg:text-sm">Global Scale</div>
                <div className="text-xs text-muted-foreground">Enterprise ready</div>
              </div>
            </div>

            <div className="hero-badge hidden sm:flex absolute bottom-8 left-0 lg:left-4 glass rounded-2xl p-3 lg:p-4 items-center gap-3 shadow-xl">
              <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <Layers className="w-5 lg:w-6 h-5 lg:h-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-xs lg:text-sm">Full Stack</div>
                <div className="text-xs text-muted-foreground">Complete solutions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />

      {/* CSS for spin animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
