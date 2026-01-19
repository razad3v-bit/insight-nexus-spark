import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Palette, Code2, TestTube, Rocket, HeadphonesIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Lightbulb,
    title: 'Discovery',
    description: 'We dive deep into understanding your business goals, challenges, and vision.',
    details: ['Requirements analysis', 'Market research', 'Stakeholder interviews'],
  },
  {
    icon: Palette,
    title: 'Design',
    description: 'Creating intuitive UI/UX designs that align with your brand identity.',
    details: ['Wireframing', 'Prototyping', 'User testing'],
  },
  {
    icon: Code2,
    title: 'Development',
    description: 'Building robust, scalable solutions using cutting-edge technologies.',
    details: ['Agile sprints', 'Code reviews', 'CI/CD pipeline'],
  },
  {
    icon: TestTube,
    title: 'Testing',
    description: 'Rigorous quality assurance to ensure flawless performance.',
    details: ['Unit testing', 'Integration testing', 'UAT'],
  },
  {
    icon: Rocket,
    title: 'Launch',
    description: 'Seamless deployment with zero downtime migration strategies.',
    details: ['Staging review', 'Go-live support', 'Performance monitoring'],
  },
  {
    icon: HeadphonesIcon,
    title: 'Support',
    description: 'Ongoing maintenance and support to keep your solution running smoothly.',
    details: ['24/7 monitoring', 'Regular updates', 'Dedicated support team'],
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.process-header', 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.process-header',
            start: 'top 85%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      gsap.fromTo('.process-step', 
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.process-timeline',
            start: 'top 85%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
        }
      );

      gsap.fromTo('.process-line', 
        { scaleX: 0 },
        {
          scrollTrigger: {
            trigger: '.process-timeline',
            start: 'top 85%',
            once: true,
          },
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.out',
          delay: 0.3,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen py-16 sm:py-20 lg:py-28 overflow-hidden"
      style={{ marginLeft: 'calc(-50vw + 50%)' }}
    >
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-glow pointer-events-none opacity-20" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-glow pointer-events-none opacity-15" />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="process-header text-center mb-12 sm:mb-16 lg:mb-20">
          <span className="text-primary font-medium mb-3 sm:mb-4 block text-sm sm:text-base">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            How We <span className="text-gradient">Work</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            A proven methodology that ensures project success from concept to completion.
          </p>
        </div>

        <div className="process-timeline relative">
          {/* Connecting line - hidden on mobile */}
          <div className="process-line hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent origin-left" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 lg:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="process-step relative group">
                {/* Step number */}
                <div className="absolute -top-4 -left-2 w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">
                  {index + 1}
                </div>

                <div className="pt-6 p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-500 h-full">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>

                  <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-1.5">
                    {step.details.map((detail, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connector dot for desktop */}
                <div className="hidden lg:block absolute top-24 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary/50 border-2 border-primary group-hover:scale-150 transition-transform" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
