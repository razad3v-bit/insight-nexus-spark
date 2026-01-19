import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Award, Users, Rocket, Target, Heart, Code, Globe, Shield, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered', icon: Rocket },
  { value: 50, suffix: '+', label: 'Happy Clients', icon: Heart },
  { value: 8, suffix: '+', label: 'Years Experience', icon: Award },
  { value: 25, suffix: '+', label: 'Team Members', icon: Users },
];

const values = [
  { title: 'Innovation First', description: 'We embrace cutting-edge technologies and creative solutions.' },
  { title: 'Client Success', description: 'Your success is our success. We measure results, not hours.' },
  { title: 'Quality Obsessed', description: 'Every line of code and pixel is crafted with precision.' },
  { title: 'Transparent Process', description: 'Open communication and honest feedback at every stage.' },
];

// Counter hook for count-up animation
const useCountUp = (target: number, duration: number = 2000, startCounting: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, startCounting]);

  return count;
};

const StatCounter = ({ stat, isVisible }: { stat: typeof stats[0], isVisible: boolean }) => {
  const count = useCountUp(stat.value, 2500, isVisible);

  return (
    <div className="stat-item group text-center p-6 sm:p-8 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-500">
      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
        <stat.icon className="w-6 h-6 text-primary" />
      </div>
      <div className="stat-value text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-1 sm:mb-2">
        {count}{stat.suffix}
      </div>
      <div className="text-muted-foreground text-sm sm:text-base font-medium">{stat.label}</div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-content', 
        { x: -60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.about-content',
            start: 'top 85%',
            once: true,
          },
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        }
      );

      gsap.fromTo('.about-visual', 
        { x: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.about-visual',
            start: 'top 85%',
            once: true,
          },
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        }
      );

      // Parallax effect on visual elements
      gsap.to('.parallax-element', {
        y: -40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Trigger count-up when stats section is visible
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => setStatsVisible(true),
      });

      gsap.fromTo('.stat-item', 
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );

      gsap.fromTo('.value-card', 
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 85%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
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
      {/* Background glows */}
      <div className="absolute top-1/2 left-0 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] bg-gradient-glow -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-gradient-glow pointer-events-none opacity-50" />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 sm:mb-20 lg:mb-24">
          <div className="about-content">
            <span className="text-primary font-medium mb-3 sm:mb-4 block text-sm sm:text-base">About Us</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Innovating Since <span className="text-gradient">2016</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
              At Insightexus, we're passionate about turning complex challenges into elegant
              digital solutions. Our team of experts combines technical excellence with creative
              thinking to deliver software that makes a difference.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
              We believe in building long-term partnerships with our clients, understanding their
              unique needs, and crafting solutions that drive real business results. From startups
              to enterprises, we've helped businesses across industries achieve their digital goals.
            </p>

            {/* Mission statement */}
            <div className="bg-gradient-card rounded-xl border border-border p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
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

            {/* Values highlight */}
            <div className="space-y-3">
              {['Agile Development', 'Continuous Innovation', '24/7 Support'].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-visual relative">
            {/* Redesigned visual - Hexagonal network design */}
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
              {/* Central hexagon grid */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg width="300" height="300" viewBox="0 0 300 300" className="sm:w-[350px] sm:h-[350px]">
                  {/* Animated connecting lines */}
                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Hexagon paths */}
                  <polygon points="150,30 220,70 220,150 150,190 80,150 80,70" fill="none" stroke="url(#lineGrad)" strokeWidth="1" className="animate-pulse" />
                  <polygon points="150,50 200,80 200,140 150,170 100,140 100,80" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="1" />
                  <polygon points="150,70 180,90 180,130 150,150 120,130 120,90" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1.5" filter="url(#glow)" />
                  
                  {/* Connecting dots */}
                  <circle cx="150" cy="30" r="4" fill="hsl(var(--primary))" className="animate-pulse" />
                  <circle cx="220" cy="70" r="3" fill="hsl(var(--primary) / 0.7)" />
                  <circle cx="220" cy="150" r="4" fill="hsl(var(--primary))" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <circle cx="150" cy="190" r="3" fill="hsl(var(--primary) / 0.7)" />
                  <circle cx="80" cy="150" r="4" fill="hsl(var(--primary))" className="animate-pulse" style={{ animationDelay: '1s' }} />
                  <circle cx="80" cy="70" r="3" fill="hsl(var(--primary) / 0.7)" />
                  
                  {/* Orbiting elements */}
                  <g className="animate-spin" style={{ transformOrigin: '150px 110px', animationDuration: '20s' }}>
                    <circle cx="250" cy="110" r="6" fill="hsl(var(--primary) / 0.3)" />
                    <circle cx="50" cy="110" r="6" fill="hsl(var(--primary) / 0.3)" />
                  </g>
                </svg>
              </div>

              {/* Floating feature cards */}
              <div className="parallax-element absolute top-4 right-4 sm:right-12 p-4 rounded-xl bg-background/80 backdrop-blur-sm border border-border shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Code className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Clean Code</div>
                    <div className="text-xs text-muted-foreground">Best practices</div>
                  </div>
                </div>
              </div>

              <div className="parallax-element absolute top-16 left-0 sm:left-4 p-4 rounded-xl bg-background/80 backdrop-blur-sm border border-border shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Global Reach</div>
                    <div className="text-xs text-muted-foreground">Worldwide clients</div>
                  </div>
                </div>
              </div>

              <div className="parallax-element absolute bottom-20 right-0 sm:right-8 p-4 rounded-xl bg-background/80 backdrop-blur-sm border border-border shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Secure</div>
                    <div className="text-xs text-muted-foreground">Enterprise-grade</div>
                  </div>
                </div>
              </div>

              <div className="parallax-element absolute bottom-8 left-4 sm:left-12 p-4 rounded-xl bg-background/80 backdrop-blur-sm border border-border shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Innovative</div>
                    <div className="text-xs text-muted-foreground">Future-ready</div>
                  </div>
                </div>
              </div>

              {/* Decorative gradient orbs */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Stats with Count-up animation */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-20"
        >
          {stats.map((stat, index) => (
            <StatCounter key={index} stat={stat} isVisible={statsVisible} />
          ))}
        </div>

        {/* Core Values */}
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Our Core <span className="text-gradient">Values</span></h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="values-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="value-card p-6 rounded-xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-primary">{index + 1}</span>
              </div>
              <h4 className="font-semibold mb-2">{value.title}</h4>
              <p className="text-muted-foreground text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
