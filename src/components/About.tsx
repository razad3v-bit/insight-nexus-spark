import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Award, Users, Rocket, Heart, Target, Code, Globe, Shield, Lightbulb, Braces, Cpu, Layers, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered', icon: Rocket },
  { value: 50, suffix: '+', label: 'Happy Clients', icon: Heart },
  { value: 8, suffix: '+', label: 'Years Experience', icon: Award },
  { value: 25, suffix: '+', label: 'Team Members', icon: Users },
];

const values = [
  { title: 'Innovation First', description: 'We embrace cutting-edge technologies and creative solutions.', icon: Lightbulb },
  { title: 'Client Success', description: 'Your success is our success. We measure results, not hours.', icon: Target },
  { title: 'Quality Obsessed', description: 'Every line of code and pixel is crafted with precision.', icon: Sparkles },
  { title: 'Transparent Process', description: 'Open communication and honest feedback at every stage.', icon: Shield },
];

const useCountUp = (target: number, duration: number = 2000, startCounting: boolean = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let startTime: number | null = null;
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, startCounting]);
  return count;
};

const StatCounter = ({ stat, isVisible }: { stat: typeof stats[0]; isVisible: boolean }) => {
  const count = useCountUp(stat.value, 2500, isVisible);
  return (
    <div className="about-stat group relative text-center p-6 sm:p-8 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
          <stat.icon className="w-6 h-6 text-primary" />
        </div>
        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-1 sm:mb-2">
          {count}{stat.suffix}
        </div>
        <div className="text-muted-foreground text-sm sm:text-base font-medium">{stat.label}</div>
      </div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Content left slide-in with 3D rotation ---
      gsap.fromTo('.about-content',
        { x: -80, opacity: 0, rotationY: 8 },
        {
          scrollTrigger: { trigger: '.about-content', start: 'top 85%', once: true },
          x: 0, opacity: 1, rotationY: 0,
          duration: 1.2, ease: 'power3.out',
        }
      );

      // --- Staggered paragraph reveals ---
      gsap.fromTo('.about-text-line',
        { y: 40, opacity: 0, filter: 'blur(6px)' },
        {
          scrollTrigger: { trigger: '.about-content', start: 'top 80%', once: true },
          y: 0, opacity: 1, filter: 'blur(0px)',
          duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.3,
        }
      );

      // --- Visual right with 3D perspective entrance ---
      gsap.fromTo('.about-visual',
        { x: 80, opacity: 0, rotationY: -10, scale: 0.9 },
        {
          scrollTrigger: { trigger: '.about-visual', start: 'top 85%', once: true },
          x: 0, opacity: 1, rotationY: 0, scale: 1,
          duration: 1.4, ease: 'power3.out',
        }
      );

      // --- 3D floating cards pop in ---
      gsap.fromTo('.about-float-card',
        { scale: 0, opacity: 0, rotation: -15 },
        {
          scrollTrigger: { trigger: '.about-visual', start: 'top 80%', once: true },
          scale: 1, opacity: 1, rotation: 0,
          duration: 0.8, stagger: 0.15, ease: 'back.out(1.7)', delay: 0.5,
        }
      );

      // --- Orbit ring scale-in ---
      gsap.fromTo('.about-orbit',
        { scale: 0, opacity: 0 },
        {
          scrollTrigger: { trigger: '.about-visual', start: 'top 80%', once: true },
          scale: 1, opacity: 1,
          duration: 1.2, stagger: 0.2, ease: 'elastic.out(1, 0.5)', delay: 0.3,
        }
      );

      // --- Continuous floating animation for cards ---
      gsap.utils.toArray<HTMLElement>('.about-float-card').forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -12 : 12,
          x: i % 2 === 0 ? 6 : -6,
          rotation: i % 2 === 0 ? 2 : -2,
          duration: 3 + i * 0.5,
          repeat: -1, yoyo: true, ease: 'sine.inOut',
          delay: i * 0.3,
        });
      });

      // --- Multi-layer scroll parallax ---
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set('.about-parallax-slow', { y: p * -60 });
          gsap.set('.about-parallax-medium', { y: p * -120 });
          gsap.set('.about-parallax-fast', { y: p * -180 });
          gsap.set('.about-glow-orb', { y: p * 80, scale: 1 + p * 0.15 });
        },
      });

      // --- Mouse-driven 3D tilt on visual ---
      const handleMouseMove = (e: MouseEvent) => {
        if (!visualRef.current) return;
        const rect = visualRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;

        gsap.to('.about-3d-scene', {
          rotationY: dx * 12,
          rotationX: -dy * 8,
          duration: 1.2, ease: 'power2.out',
        });

        gsap.to('.about-float-card', {
          x: (i) => dx * (15 + i * 8),
          y: (i) => dy * (10 + i * 5),
          duration: 1, ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // --- Stats ---
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => setStatsVisible(true),
      });

      gsap.fromTo('.about-stat',
        { y: 60, opacity: 0, scale: 0.85, rotationX: -20 },
        {
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true },
          y: 0, opacity: 1, scale: 1, rotationX: 0,
          duration: 0.8, stagger: 0.12, ease: 'power3.out',
        }
      );

      // --- Value cards with 3D flip entrance ---
      gsap.fromTo('.about-value-card',
        { y: 60, opacity: 0, rotationX: -30, scale: 0.9 },
        {
          scrollTrigger: { trigger: '.about-values-grid', start: 'top 85%', once: true },
          y: 0, opacity: 1, rotationX: 0, scale: 1,
          duration: 0.8, stagger: 0.12, ease: 'power3.out',
        }
      );

      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-screen py-16 sm:py-20 lg:py-28 xl:py-32 overflow-hidden"
      style={{ marginLeft: 'calc(-50vw + 50%)' }}
    >
      {/* Parallax glow orbs */}
      <div className="about-glow-orb absolute top-0 left-0 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-gradient-glow -translate-x-1/3 pointer-events-none opacity-60" />
      <div className="about-glow-orb absolute bottom-0 right-0 w-[350px] lg:w-[500px] h-[350px] lg:h-[500px] bg-gradient-glow translate-x-1/4 pointer-events-none opacity-40" />
      <div className="about-glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, hsl(192 35% 52% / 0.2) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 sm:mb-20 lg:mb-24">
          {/* Left content */}
          <div className="about-content" style={{ perspective: '1200px' }}>
            <span className="about-text-line text-primary font-medium mb-3 sm:mb-4 block text-sm sm:text-base tracking-wider uppercase">About Us</span>
            <h2 className="about-text-line text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-[1.05]">
              Innovating Since <span className="text-gradient">2016</span>
            </h2>
            <p className="about-text-line text-muted-foreground text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
              At Insightexus, we're passionate about turning complex challenges into elegant
              digital solutions. Our team of experts combines technical excellence with creative
              thinking to deliver software that makes a difference.
            </p>
            <p className="about-text-line text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
              We believe in building long-term partnerships with our clients, understanding their
              unique needs, and crafting solutions that drive real business results.
            </p>

            {/* Mission card */}
            <div className="about-text-line bg-gradient-card rounded-xl border border-border p-6 mb-8 group hover:border-primary/30 transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Our Mission</h4>
                  <p className="text-muted-foreground text-sm">
                    To empower businesses with innovative technology solutions that drive growth,
                    enhance efficiency, and create exceptional user experiences.
                  </p>
                </div>
              </div>
            </div>

            <div className="about-text-line space-y-3">
              {['Agile Development', 'Continuous Innovation', '24/7 Support'].map((item, index) => (
                <div key={index} className="flex items-center gap-3 group/item">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 group-hover/item:scale-110 transition-transform" />
                  <span className="text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual - 3D interactive scene */}
          <div ref={visualRef} className="about-visual relative h-[400px] sm:h-[500px] lg:h-[600px]" style={{ perspective: '1000px' }}>
            <div className="about-3d-scene absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
              {/* Orbit rings */}
              <div className="about-orbit about-parallax-slow absolute w-[260px] sm:w-[340px] lg:w-[400px] h-[260px] sm:h-[340px] lg:h-[400px] rounded-full border border-primary/15"
                style={{ animation: 'aboutSpin 30s linear infinite' }} />
              <div className="about-orbit about-parallax-slow absolute w-[190px] sm:w-[250px] lg:w-[290px] h-[190px] sm:h-[250px] lg:h-[290px] rounded-full border border-primary/25"
                style={{ animation: 'aboutSpin 22s linear infinite reverse' }} />
              <div className="about-orbit absolute w-[120px] sm:w-[160px] lg:w-[180px] h-[120px] sm:h-[160px] lg:h-[180px] rounded-full border-2 border-primary/35"
                style={{ animation: 'aboutSpin 15s linear infinite' }} />

              {/* Pulsing core */}
              <div className="about-orbit relative w-20 sm:w-24 lg:w-28 h-20 sm:h-24 lg:h-28 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/5 border border-primary/50 flex items-center justify-center shadow-glow">
                <div className="absolute inset-0 rounded-2xl bg-primary/15 animate-ping opacity-40" />
                <div className="relative flex items-center justify-center">
                  <Braces className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 text-primary" />
                </div>
              </div>

              {/* Orbiting node dots */}
              <div className="about-orbit absolute w-[260px] sm:w-[340px] lg:w-[400px] h-[260px] sm:h-[340px] lg:h-[400px]"
                style={{ animation: 'aboutSpin 30s linear infinite' }}>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary/60 shadow-glow" />
                <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/40" />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary/60 shadow-glow" />
                <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/40" />
              </div>

              {/* Floating feature cards */}
              <div className="about-float-card about-parallax-fast absolute top-2 right-2 sm:right-8 glass rounded-2xl p-3 sm:p-4 flex items-center gap-3 shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                  <Code className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-xs sm:text-sm">Clean Code</div>
                  <div className="text-xs text-muted-foreground">Best practices</div>
                </div>
              </div>

              <div className="about-float-card about-parallax-medium absolute top-12 sm:top-16 left-0 sm:left-2 glass rounded-2xl p-3 sm:p-4 flex items-center gap-3 shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-xs sm:text-sm">Global Reach</div>
                  <div className="text-xs text-muted-foreground">Worldwide clients</div>
                </div>
              </div>

              <div className="about-float-card about-parallax-fast absolute bottom-16 sm:bottom-20 right-0 sm:right-4 glass rounded-2xl p-3 sm:p-4 flex items-center gap-3 shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-xs sm:text-sm">AI-Powered</div>
                  <div className="text-xs text-muted-foreground">Smart solutions</div>
                </div>
              </div>

              <div className="about-float-card about-parallax-medium absolute bottom-4 left-2 sm:left-8 glass rounded-2xl p-3 sm:p-4 flex items-center gap-3 shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-xs sm:text-sm">Full Stack</div>
                  <div className="text-xs text-muted-foreground">End-to-end</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-20" style={{ perspective: '800px' }}>
          {stats.map((stat, index) => (
            <StatCounter key={index} stat={stat} isVisible={statsVisible} />
          ))}
        </div>

        {/* Core Values */}
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Our Core <span className="text-gradient">Values</span></h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="about-values-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" style={{ perspective: '800px' }}>
          {values.map((value, index) => (
            <div
              key={index}
              className="about-value-card group p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-lg mb-2">{value.title}</h4>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes aboutSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default About;
