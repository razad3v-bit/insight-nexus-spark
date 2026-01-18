import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'FinTech Dashboard',
    category: 'Web Application',
    description: 'Real-time financial analytics platform with advanced data visualization.',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    title: 'HealthCare App',
    category: 'Mobile Development',
    description: 'Patient management system with telemedicine integration.',
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    description: 'Scalable marketplace with AI-powered recommendations.',
    color: 'from-orange-500/20 to-amber-500/20',
  },
  {
    title: 'IoT Management System',
    category: 'Cloud Solutions',
    description: 'Enterprise IoT platform managing millions of connected devices.',
    color: 'from-purple-500/20 to-pink-500/20',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-header', {
        scrollTrigger: {
          trigger: '.projects-header',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="projects" 
      className="relative w-screen py-16 sm:py-20 lg:py-28 xl:py-32"
      style={{ marginLeft: 'calc(-50vw + 50%)' }}
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="projects-header text-center mb-12 sm:mb-16">
          <span className="text-primary font-medium mb-3 sm:mb-4 block text-sm sm:text-base">Our Work</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            Explore our portfolio of successful projects that have transformed businesses.
          </p>
        </div>

        <div className="projects-grid grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative overflow-hidden rounded-2xl border border-border card-hover cursor-pointer"
            >
              <div className={`aspect-[4/3] bg-gradient-to-br ${project.color} p-6 sm:p-8 flex flex-col justify-end`}>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                
                <div className="relative z-10">
                  <span className="text-primary text-xs sm:text-sm font-medium mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">{project.description}</p>
                  
                  <div className="flex items-center gap-2 text-primary font-medium text-sm sm:text-base">
                    View Case Study
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <a href="#" className="btn-outline inline-flex items-center gap-2 text-sm sm:text-base">
            <ExternalLink className="w-4 sm:w-5 h-4 sm:h-5" />
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
