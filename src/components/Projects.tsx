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
    <section ref={sectionRef} id="projects" className="section-padding relative">
      <div className="container-custom">
        <div className="projects-header text-center mb-16">
          <span className="text-primary font-medium mb-4 block">Our Work</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our portfolio of successful projects that have transformed businesses.
          </p>
        </div>

        <div className="projects-grid grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative overflow-hidden rounded-2xl border border-border card-hover cursor-pointer"
            >
              <div className={`aspect-[4/3] bg-gradient-to-br ${project.color} p-8 flex flex-col justify-end`}>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                
                <div className="relative z-10">
                  <span className="text-primary text-sm font-medium mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="flex items-center gap-2 text-primary font-medium">
                    View Case Study
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#" className="btn-outline inline-flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
