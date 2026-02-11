import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Award, Users, Rocket, Heart, Target, Shield, Lightbulb, Sparkles, Binary, Fingerprint, Network, BarChart3, Workflow } from 'lucide-react';

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

      // --- Stacked layers cascade in ---
      gsap.fromTo('.about-layer-card',
        { y: 80, opacity: 0, rotationX: -25, scale: 0.85 },
        {
          scrollTrigger: { trigger: '.about-visual', start: 'top 80%', once: true },
          y: 0, opacity: 1, rotationX: 0, scale: 1,
          duration: 0.9, stagger: 0.18, ease: 'power3.out', delay: 0.4,
        }
      );

      // --- Data stream lines animate ---
      gsap.fromTo('.about-stream-line',
        { scaleX: 0, opacity: 0 },
        {
          scrollTrigger: { trigger: '.about-visual', start: 'top 80%', once: true },
          scaleX: 1, opacity: 1,
          duration: 1, stagger: 0.1, ease: 'power2.out', delay: 0.8,
        }
      );

      // --- Floating metric badges pop ---
      gsap.fromTo('.about-metric-badge',
        { scale: 0, opacity: 0 },
        {
          scrollTrigger: { trigger: '.about-visual', start: 'top 80%', once: true },
          scale: 1, opacity: 1,
          duration: 0.7, stagger: 0.12, ease: 'back.out(2)', delay: 1,
        }
      );

      // --- Continuous subtle floating for layer cards ---
      gsap.utils.toArray<HTMLElement>('.about-layer-card').forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -8 : 8,
          rotation: i % 2 === 0 ? 1 : -1,
          duration: 3.5 + i * 0.4,
          repeat: -1, yoyo: true, ease: 'sine.inOut',
          delay: i * 0.2,
        });
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
          rotationY: dx * 14,
          rotationX: -dy * 10,
          duration: 1.2, ease: 'power2.out',
        });

        gsap.to('.about-layer-card', {
          x: (i) => dx * (10 + i * 6),
          y: (i) => dy * (8 + i * 4),
          duration: 1, ease: 'power2.out',
        });

        gsap.to('.about-metric-badge', {
          x: (i) => dx * (20 + i * 10),
          y: (i) => dy * (12 + i * 6),
          duration: 0.8, ease: 'power2.out',
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

          {/* Right visual - Layered dashboard / data-stream aesthetic */}
          <div ref={visualRef} className="about-visual relative h-[400px] sm:h-[500px] lg:h-[600px]" style={{ perspective: '1000px' }}>
            <div className="about-3d-scene absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>

              {/* Background glow pulse */}
              <div className="absolute w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full opacity-30 pointer-events-none"
                style={{ background: 'radial-gradient(circle, hsl(192 35% 52% / 0.3) 0%, transparent 65%)', animation: 'aboutPulse 4s ease-in-out infinite' }} />

              {/* Stacked tilted layer cards */}
              <div className="about-layer-card about-parallax-slow absolute w-[240px] sm:w-[300px] lg:w-[340px] h-[140px] sm:h-[170px] lg:h-[190px] rounded-2xl glass border border-primary/10 shadow-card"
                style={{ transform: 'translateZ(-60px) translateY(40px)', transformStyle: 'preserve-3d' }}>
                <div className="p-4 sm:p-5 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-primary/60" />
                      <span className="text-xs text-muted-foreground font-medium">Analytics</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-primary/30" />
                      <div className="w-2 h-2 rounded-full bg-primary/20" />
                      <div className="w-2 h-2 rounded-full bg-primary/10" />
                    </div>
                  </div>
                  {/* Mini bar chart */}
                  <div className="flex items-end gap-1.5 mt-3">
                    {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85].map((h, i) => (
                      <div key={i} className="about-stream-line flex-1 rounded-sm bg-primary/20 origin-bottom"
                        style={{ height: `${h}%`, transformOrigin: 'bottom' }} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="about-layer-card about-parallax-medium absolute w-[220px] sm:w-[280px] lg:w-[320px] h-[120px] sm:h-[150px] lg:h-[170px] rounded-2xl glass border border-primary/15 shadow-card"
                style={{ transform: 'translateZ(-20px) translateY(-20px) translateX(20px)', transformStyle: 'preserve-3d' }}>
                <div className="p-4 sm:p-5 h-full flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <Network className="w-4 h-4 text-primary/70" />
                    <span className="text-xs text-muted-foreground font-medium">Architecture</span>
                  </div>
                  {/* Connection nodes */}
                  <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2">
                    {[Fingerprint, Binary, Workflow].map((Icon, i) => (
                      <div key={i} className="relative">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center">
                          <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                        </div>
                        {i < 2 && (
                          <div className="about-stream-line absolute top-1/2 -right-3 sm:-right-4 w-3 sm:w-4 h-px bg-primary/30 origin-left" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="about-layer-card about-parallax-fast absolute w-[200px] sm:w-[260px] lg:w-[300px] h-[100px] sm:h-[130px] lg:h-[150px] rounded-2xl glass border border-primary/20 shadow-card"
                style={{ transform: 'translateZ(20px) translateY(-80px) translateX(-10px)', transformStyle: 'preserve-3d' }}>
                <div className="p-4 sm:p-5 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">System Status</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs text-emerald-400/80">Live</span>
                    </div>
                  </div>
                  {/* Simulated data stream lines */}
                  <div className="space-y-2 mt-2">
                    {[85, 60, 95].map((w, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="about-stream-line h-1.5 rounded-full bg-primary/25 origin-left" style={{ width: `${w}%` }}>
                          <div className="h-full rounded-full bg-primary/50" style={{ width: `${w}%` }} />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{w}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating metric badges */}
              <div className="about-metric-badge absolute -top-2 sm:top-2 right-0 sm:right-6 glass rounded-xl px-3 py-2 shadow-xl border border-primary/20">
                <div className="text-lg sm:text-xl font-bold text-gradient">99.9%</div>
                <div className="text-[10px] text-muted-foreground">Uptime</div>
              </div>

              <div className="about-metric-badge absolute bottom-8 sm:bottom-12 -left-2 sm:left-0 glass rounded-xl px-3 py-2 shadow-xl border border-primary/20">
                <div className="text-lg sm:text-xl font-bold text-gradient">&lt;200ms</div>
                <div className="text-[10px] text-muted-foreground">Response</div>
              </div>

              <div className="about-metric-badge absolute top-1/3 -left-4 sm:-left-2 glass rounded-xl px-3 py-2 shadow-xl border border-primary/20">
                <div className="text-lg sm:text-xl font-bold text-gradient">10x</div>
                <div className="text-[10px] text-muted-foreground">Faster</div>
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
        @keyframes aboutPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.15); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
};

export default About;
