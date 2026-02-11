import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Zap, Globe, Layers, Code2, Cpu, Database, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Wait for the page to be visible (preloader to complete)
    const checkVisibilityAndAnimate = () => {
      const parent = heroRef.current?.closest('.visible');
      if (!parent && !hasAnimated) {
        // Page still loading, check again
        requestAnimationFrame(checkVisibilityAndAnimate);
        return;
      }
      
      if (hasAnimated) return;
      setHasAnimated(true);
      
      // Clear any existing inline styles from previous animations
      const elementsToReset = heroRef.current?.querySelectorAll('.hero-line, .hero-subtitle, .hero-cta, .hero-stat, .orbit-ring, .orbit-icon, .hero-badge');
      elementsToReset?.forEach(el => {
        gsap.set(el, { clearProps: 'all' });
      });

      runAnimations();
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(checkVisibilityAndAnimate, 100);
    
    return () => clearTimeout(timer);
  }, [hasAnimated]);

  const runAnimations = () => {
    const ctx = gsap.context(() => {
      // Initial state - hide elements
      gsap.set(['.hero-line', '.hero-subtitle', '.hero-cta', '.hero-stat', '.orbit-ring', '.orbit-icon', '.hero-badge'], {
        opacity: 0,
      });

      const tl = gsap.timeline({ 
        defaults: { ease: 'power4.out' },
        delay: 0.3,
      });

      // Dramatic text reveal with clip-path
      tl.fromTo('.hero-line', 
        { 
          y: 120, 
          opacity: 0,
          rotationX: -80,
          transformOrigin: 'top center',
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.4,
          stagger: 0.12,
          ease: 'power4.out',
        }
      )
      // Subtitle with blur effect
      .fromTo('.hero-subtitle', 
        { 
          y: 60, 
          opacity: 0,
          filter: 'blur(10px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
        }, '-=0.8')
      // CTAs with scale bounce
      .fromTo('.hero-cta', 
        { 
          y: 40, 
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.7)',
        }, '-=0.5')
      // Stats counter animation
      .fromTo('.hero-stat', 
        { 
          y: 50, 
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
        }, '-=0.4')
      // Orbit rings with elastic bounce
      .fromTo('.orbit-ring', 
        { 
          scale: 0, 
          opacity: 0,
          rotation: -180,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'elastic.out(1, 0.6)',
        }, '-=0.8')
      // Orbit icons pop in
      .fromTo('.orbit-icon', 
        { 
          scale: 0, 
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(2)',
        }, '-=0.6')
      // Floating badges slide in
      .fromTo('.hero-badge', 
        { 
          x: (i) => i % 2 === 0 ? -100 : 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        }, '-=0.4');

      // Floating orbs with continuous animation
      gsap.to(orb1Ref.current, {
        y: -50,
        x: 30,
        scale: 1.1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(orb2Ref.current, {
        y: 40,
        x: -40,
        scale: 0.9,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });

      // Enhanced scroll-based parallax with multiple layers
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Slowest layer - background orbs
          gsap.to('.parallax-bg', {
            y: progress * 150,
            scale: 1 - progress * 0.1,
            ease: 'none',
            duration: 0,
          });
          
          // Slow layer - orbit rings
          gsap.to('.parallax-slow', {
            y: progress * 100,
            rotationZ: progress * 10,
            ease: 'none',
            duration: 0,
          });
          
          // Medium layer - floating badges
          gsap.to('.parallax-medium', {
            y: progress * 180,
            ease: 'none',
            duration: 0,
          });
          
          // Fast layer - decorative elements
          gsap.to('.parallax-fast', {
            y: progress * 250,
            ease: 'none',
            duration: 0,
          });

          // Hero content fades and moves up
          gsap.to('.hero-content-left', {
            y: progress * 80,
            opacity: 1 - progress * 0.7,
            ease: 'none',
            duration: 0,
          });

          // Grid parallax
          gsap.to('.parallax-grid', {
            y: progress * 50,
            opacity: 0.015 - progress * 0.01,
            ease: 'none',
            duration: 0,
          });
        },
      });

      // Enhanced mouse parallax for interactive 3D feel
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (clientX - centerX) / 25;
        const moveY = (clientY - centerY) / 25;

        // Background orbs - slowest response
        gsap.to('.parallax-bg', {
          x: moveX * 0.3,
          y: moveY * 0.2,
          duration: 2,
          ease: 'power2.out',
        });

        // Orbit rings - 3D rotation effect
        gsap.to('.parallax-slow', {
          x: moveX * 0.6,
          rotationY: moveX * 0.08,
          rotationX: -moveY * 0.06,
          duration: 1.5,
          ease: 'power2.out',
        });

        // Floating badges - medium response
        gsap.to('.parallax-medium', {
          x: moveX * 1.2,
          y: moveY * 0.6,
          duration: 1.2,
          ease: 'power2.out',
        });

        // Fast elements - quick response
        gsap.to('.parallax-fast', {
          x: moveX * 2,
          y: moveY * 1,
          duration: 0.8,
          ease: 'power2.out',
        });

        // Orbit ring 3D tilt
        gsap.to('.orbit-ring', {
          rotationY: moveX * 0.1,
          rotationX: -moveY * 0.08,
          duration: 1.5,
          ease: 'power2.out',
        });

        // Subtle text 3D effect
        gsap.to('.hero-line', {
          rotationY: moveX * 0.02,
          rotationX: -moveY * 0.01,
          duration: 1.8,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, heroRef);
  };

  return (
    <section
      ref={heroRef}
      className="relative w-screen min-h-screen bg-background flex items-center overflow-hidden"
      style={{ marginLeft: 'calc(-50vw + 50%)' }}
    >
      {/* Animated gradient orbs - Background parallax layer */}
      <div
        ref={orb1Ref}
        className="parallax-bg absolute top-10 right-[5%] w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(192 60% 50% / 0.5) 0%, transparent 60%)' }}
      />
      <div
        ref={orb2Ref}
        className="parallax-bg absolute bottom-10 left-[10%] w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(280 50% 50% / 0.4) 0%, transparent 60%)' }}
      />
      
      {/* Additional floating orb for depth */}
      <div
        className="parallax-fast absolute top-1/3 left-1/4 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 60%)' }}
      />

      {/* Subtle grid - with parallax */}
      <div 
        className="parallax-grid absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left content */}
          <div className="hero-content-left space-y-6 sm:space-y-8" style={{ perspective: '1000px' }}>
            <div className="overflow-hidden" style={{ perspective: '1200px' }}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight">
                <span className="hero-line block text-foreground will-change-transform">Building</span>
                <span className="hero-line block text-gradient will-change-transform">tomorrow's</span>
                <span className="hero-line block text-foreground will-change-transform">software</span>
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
          <div className="relative h-[350px] sm:h-[450px] lg:h-[550px] xl:h-[600px] flex items-center justify-center parallax-slow" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
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

            {/* Floating badges - With medium parallax layer */}
            <div className="hero-badge parallax-medium hidden sm:flex absolute top-4 left-0 lg:-left-4 xl:-left-8 glass rounded-2xl p-3 lg:p-4 items-center gap-3 shadow-xl">
              <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <Zap className="w-5 lg:w-6 h-5 lg:h-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-xs lg:text-sm">Lightning Fast</div>
                <div className="text-xs text-muted-foreground">Optimized performance</div>
              </div>
            </div>

            <div className="hero-badge parallax-medium hidden sm:flex absolute top-1/4 right-0 lg:-right-4 glass rounded-2xl p-3 lg:p-4 items-center gap-3 shadow-xl">
              <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <Globe className="w-5 lg:w-6 h-5 lg:h-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-xs lg:text-sm">Global Scale</div>
                <div className="text-xs text-muted-foreground">Enterprise ready</div>
              </div>
            </div>

            <div className="hero-badge parallax-medium hidden sm:flex absolute bottom-8 left-0 lg:left-4 glass rounded-2xl p-3 lg:p-4 items-center gap-3 shadow-xl">
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
