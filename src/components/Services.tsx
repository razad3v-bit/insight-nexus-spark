import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, Smartphone, Cloud, Palette, Database, Shield, 
  ArrowRight, Zap, Globe, Cpu, Lock, BarChart3 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Modern, scalable web applications built with cutting-edge technologies for optimal performance and user experience.',
    features: ['React & Next.js', 'TypeScript', 'API Integration', 'Performance Optimization'],
    gradient: 'from-blue-500 to-cyan-500',
    stats: '500+ Projects',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile solutions that deliver seamless experiences across iOS and Android.',
    features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store Optimization'],
    gradient: 'from-purple-500 to-pink-500',
    stats: '200+ Apps',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and migration services for enterprise-grade reliability and performance.',
    features: ['AWS & Azure', 'Kubernetes', 'Serverless', 'Auto-scaling'],
    gradient: 'from-emerald-500 to-teal-500',
    stats: '99.9% Uptime',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces designed with user psychology in mind to drive engagement and conversions.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    gradient: 'from-orange-500 to-amber-500',
    stats: '50+ Designs',
  },
  {
    icon: Database,
    title: 'Data Engineering',
    description: 'Robust data pipelines and analytics solutions that transform raw data into actionable business insights.',
    features: ['ETL Pipelines', 'Data Warehousing', 'Real-time Analytics', 'ML Integration'],
    gradient: 'from-red-500 to-rose-500',
    stats: '10TB+ Processed',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your digital assets, data, and customer information.',
    features: ['Penetration Testing', 'Security Audits', 'Compliance', '24/7 Monitoring'],
    gradient: 'from-indigo-500 to-violet-500',
    stats: 'Zero Breaches',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.services-header', 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.services-header',
            start: 'top 85%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      // Cards animation
      gsap.fromTo('.service-card', 
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        }
      );

      // Parallax floating icons
      gsap.to('.floating-icon', {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="services" 
      className="relative w-screen py-16 sm:py-20 lg:py-28 xl:py-32 overflow-hidden"
      style={{ marginLeft: 'calc(-50vw + 50%)' }}
    >
      {/* Background visual elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[5%] floating-icon opacity-10">
          <Globe className="w-16 h-16 text-primary" />
        </div>
        <div className="absolute top-40 right-[10%] floating-icon opacity-10">
          <Cpu className="w-20 h-20 text-primary" />
        </div>
        <div className="absolute bottom-40 left-[15%] floating-icon opacity-10">
          <Lock className="w-14 h-14 text-primary" />
        </div>
        <div className="absolute bottom-20 right-[5%] floating-icon opacity-10">
          <BarChart3 className="w-18 h-18 text-primary" />
        </div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-gradient-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-glow pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="services-header text-center mb-12 sm:mb-16">
          <span className="text-primary font-medium mb-3 sm:mb-4 block text-sm sm:text-base">What We Do</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            From concept to deployment, we deliver end-to-end solutions tailored to your unique business needs.
          </p>
        </div>

        <div className="services-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative bg-gradient-card p-6 sm:p-8 rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-500"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Top decorative line */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                {/* Icon with gradient background */}
                <div className={`w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <service.icon className="w-7 sm:w-8 h-7 sm:h-8 text-white" />
                </div>

                {/* Stats badge */}
                <div className="absolute top-0 right-0 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                  {service.stats}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features list */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Zap className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm group/link"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-muted-foreground mb-4">Need a custom solution?</p>
          <a href="#contact" className="btn-primary">
            Let's Discuss Your Project
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
