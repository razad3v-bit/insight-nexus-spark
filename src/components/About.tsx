import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Award, Users, Rocket, Target, Heart, Sparkles, TrendingUp, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '150+', label: 'Projects Delivered', icon: Rocket },
  { value: '50+', label: 'Happy Clients', icon: Heart },
  { value: '8+', label: 'Years Experience', icon: Award },
  { value: '25+', label: 'Team Members', icon: Users },
];

const values = [
  { title: 'Innovation First', description: 'We embrace cutting-edge technologies and creative solutions.' },
  { title: 'Client Success', description: 'Your success is our success. We measure results, not hours.' },
  { title: 'Quality Obsessed', description: 'Every line of code and pixel is crafted with precision.' },
  { title: 'Transparent Process', description: 'Open communication and honest feedback at every stage.' },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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
            {/* Redesigned visual - Abstract floating elements instead of box */}
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
              {/* Main center element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-56 sm:h-56">
                <div className="w-full h-full rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 flex items-center justify-center backdrop-blur-sm animate-pulse">
                  <div className="text-5xl sm:text-6xl font-bold text-gradient">IE</div>
                </div>
                {/* Rotating ring */}
                <div className="absolute inset-0 rounded-3xl border border-primary/10 animate-spin" style={{ animationDuration: '20s' }} />
              </div>

              {/* Floating decorative elements */}
              <div className="parallax-element absolute top-8 right-8 sm:right-16 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/20 flex items-center justify-center backdrop-blur-sm">
                <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
              </div>

              <div className="parallax-element absolute top-20 left-4 sm:left-8 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/20 flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
              </div>

              <div className="parallax-element absolute bottom-16 right-4 sm:right-12 w-18 h-18 sm:w-22 sm:h-22 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center backdrop-blur-sm p-4 sm:p-5">
                <TrendingUp className="w-7 h-7 sm:w-9 sm:h-9 text-emerald-400" />
              </div>

              <div className="parallax-element absolute bottom-24 left-8 sm:left-16 w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/20 flex items-center justify-center backdrop-blur-sm">
                <Zap className="w-5 h-5 sm:w-7 sm:h-7 text-orange-400" />
              </div>

              <div className="parallax-element absolute top-1/3 right-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-rose-500/20 to-red-500/10 border border-rose-500/20 flex items-center justify-center backdrop-blur-sm">
                <Award className="w-5 h-5 sm:w-7 sm:h-7 text-rose-400" />
              </div>

              {/* Floating stats badges */}
              <div className="absolute top-4 left-1/4 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-xs font-medium shadow-lg">
                🚀 Fast Delivery
              </div>
              <div className="absolute bottom-8 left-1/3 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-xs font-medium shadow-lg">
                ⭐ 5-Star Rated
              </div>
              <div className="absolute top-1/2 right-0 translate-x-4 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-xs font-medium shadow-lg">
                🔒 Secure
              </div>

              {/* Connecting lines (decorative) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                    <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M200,200 L320,80" stroke="url(#lineGradient)" strokeWidth="1" fill="none" />
                <path d="M200,200 L80,120" stroke="url(#lineGradient)" strokeWidth="1" fill="none" />
                <path d="M200,200 L320,300" stroke="url(#lineGradient)" strokeWidth="1" fill="none" />
                <path d="M200,200 L120,320" stroke="url(#lineGradient)" strokeWidth="1" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item group text-center p-6 sm:p-8 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="stat-value text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm sm:text-base font-medium">{stat.label}</div>
            </div>
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
