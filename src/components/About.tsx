import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Award, Users, Rocket, Target, Heart } from 'lucide-react';

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
      gsap.from('.about-content', {
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        x: -60,
        opacity: 0,
        duration: 1,
      });

      gsap.from('.about-visual', {
        scrollTrigger: {
          trigger: '.about-visual',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        x: 60,
        opacity: 0,
        duration: 1,
      });

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

      // Counter animation for stats
      const statItems = statsRef.current?.querySelectorAll('.stat-value');
      statItems?.forEach((stat) => {
        const target = parseInt(stat.textContent?.replace(/\D/g, '') || '0');
        const suffix = stat.textContent?.replace(/\d/g, '') || '';

        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          textContent: 0,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate: function () {
            stat.textContent = Math.ceil(parseFloat(stat.textContent || '0')) + suffix;
          },
        });
      });

      gsap.from('.stat-item', {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      });

      gsap.from('.value-card', {
        scrollTrigger: {
          trigger: '.values-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      });
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
            {/* Main visual container */}
            <div className="relative">
              {/* Floating decorative elements */}
              <div className="parallax-element absolute -top-8 -right-8 w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/10 flex items-center justify-center">
                <Rocket className="w-10 h-10 text-primary" />
              </div>
              <div className="parallax-element absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/10 flex items-center justify-center">
                <Award className="w-8 h-8 text-purple-400" />
              </div>

              {/* Main card */}
              <div className="aspect-square rounded-3xl bg-gradient-card border border-border p-8 shadow-card overflow-hidden">
                <div className="w-full h-full rounded-2xl bg-background/50 border border-border relative overflow-hidden">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-glow opacity-50" />
                  
                  {/* Grid pattern */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                  }} />

                  {/* Center content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      {/* Animated rings */}
                      <div className="relative">
                        <div className="absolute inset-0 w-32 h-32 rounded-full border border-primary/20 animate-ping" style={{ animationDuration: '3s' }} />
                        <div className="absolute inset-0 w-32 h-32 rounded-full border border-primary/30 animate-pulse" />
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 flex items-center justify-center mx-auto">
                          <div className="text-4xl sm:text-5xl font-bold text-gradient">IE</div>
                        </div>
                      </div>
                      <div className="mt-6 text-muted-foreground text-sm">Innovation • Excellence</div>
                    </div>
                  </div>

                  {/* Floating badges */}
                  <div className="absolute top-8 left-8 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-xs font-medium">
                    🚀 Fast Delivery
                  </div>
                  <div className="absolute bottom-8 right-8 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-xs font-medium">
                    ⭐ 5-Star Rated
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-8 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-xs font-medium">
                    🔒 Secure
                  </div>
                </div>
              </div>
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
