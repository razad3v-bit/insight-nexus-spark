import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '50+', label: 'Happy Clients' },
  { value: '8+', label: 'Years Experience' },
  { value: '25+', label: 'Team Members' },
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

      gsap.from('.about-image', {
        scrollTrigger: {
          trigger: '.about-image',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        x: 60,
        opacity: 0,
        duration: 1,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gradient-glow -translate-y-1/2 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="about-content">
            <span className="text-primary font-medium mb-4 block">About Us</span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Innovating Since <span className="text-gradient">2016</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              At Insightexus, we're passionate about turning complex challenges into elegant
              digital solutions. Our team of experts combines technical excellence with creative
              thinking to deliver software that makes a difference.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We believe in building long-term partnerships with our clients, understanding their
              unique needs, and crafting solutions that drive real business results. From startups
              to enterprises, we've helped businesses across industries achieve their digital goals.
            </p>
          </div>

          <div className="about-image relative">
            <div className="aspect-square rounded-2xl bg-gradient-card border border-border p-8 shadow-card">
              <div className="w-full h-full rounded-xl bg-background/50 border border-border flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-glow opacity-50" />
                <div className="relative z-10 text-center">
                  <div className="text-6xl font-bold text-gradient mb-2">IE</div>
                  <div className="text-muted-foreground">Innovation • Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item text-center p-8 rounded-2xl bg-gradient-card border border-border"
            >
              <div className="stat-value text-4xl lg:text-5xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
