import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ArrowUpRight, Layers, Code2, Smartphone, Globe, Database, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'FinTech Dashboard',
    category: 'Web Application',
    description: 'Real-time financial analytics platform with advanced data visualization, AI-powered insights, and secure transaction processing.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    accentColor: 'blue',
    icon: Database,
    tech: ['React', 'Node.js', 'PostgreSQL', 'D3.js'],
    stats: { users: '50K+', transactions: '$2B+' },
    featured: true,
  },
  {
    title: 'HealthCare App',
    category: 'Mobile Development',
    description: 'Comprehensive patient management system with telemedicine integration, appointment scheduling, and health tracking.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    accentColor: 'emerald',
    icon: Smartphone,
    tech: ['React Native', 'Firebase', 'WebRTC', 'HIPAA'],
    stats: { downloads: '100K+', rating: '4.9★' },
    featured: true,
  },
  {
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    description: 'Scalable marketplace with AI-powered recommendations, real-time inventory management, and seamless checkout experience.',
    gradient: 'from-orange-500/20 to-amber-500/20',
    accentColor: 'orange',
    icon: Globe,
    tech: ['Next.js', 'Stripe', 'Elasticsearch', 'Redis'],
    stats: { products: '1M+', orders: '500K/mo' },
    featured: false,
  },
  {
    title: 'IoT Management System',
    category: 'Cloud Solutions',
    description: 'Enterprise IoT platform managing millions of connected devices with real-time monitoring and predictive maintenance.',
    gradient: 'from-purple-500/20 to-pink-500/20',
    accentColor: 'purple',
    icon: Layers,
    tech: ['AWS IoT', 'Kubernetes', 'Grafana', 'TimescaleDB'],
    stats: { devices: '5M+', uptime: '99.99%' },
    featured: false,
  },
  {
    title: 'AI Content Studio',
    category: 'AI/ML Platform',
    description: 'Generative AI platform for content creation with multi-modal capabilities, brand voice customization, and workflow automation.',
    gradient: 'from-rose-500/20 to-red-500/20',
    accentColor: 'rose',
    icon: Code2,
    tech: ['Python', 'TensorFlow', 'OpenAI', 'FastAPI'],
    stats: { content: '10M+', accuracy: '98%' },
    featured: true,
  },
  {
    title: 'Cybersecurity Suite',
    category: 'Security',
    description: 'Enterprise security platform with threat detection, vulnerability scanning, compliance monitoring, and incident response.',
    gradient: 'from-indigo-500/20 to-violet-500/20',
    accentColor: 'indigo',
    icon: Shield,
    tech: ['Go', 'Rust', 'ML', 'SIEM Integration'],
    stats: { threats: '1B+ blocked', clients: '200+' },
    featured: false,
  },
];

const categories = ['All', 'Web Application', 'Mobile Development', 'Full Stack', 'Cloud Solutions', 'AI/ML Platform', 'Security'];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

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

      // Parallax for decorative elements
      gsap.to('.parallax-shape', {
        yPercent: -50,
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
      id="projects" 
      className="relative w-screen py-16 sm:py-20 lg:py-28 xl:py-32 overflow-hidden"
      style={{ marginLeft: 'calc(-50vw + 50%)' }}
    >
      {/* Background decorative shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="parallax-shape absolute top-20 left-[5%] w-32 h-32 rounded-full bg-primary/5 blur-2xl" />
        <div className="parallax-shape absolute top-40 right-[10%] w-48 h-48 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="parallax-shape absolute bottom-40 left-[15%] w-40 h-40 rounded-full bg-emerald-500/5 blur-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="projects-header text-center mb-12 sm:mb-16">
          <span className="text-primary font-medium mb-3 sm:mb-4 block text-sm sm:text-base">Our Work</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4 mb-8">
            Explore our portfolio of successful projects that have transformed businesses across industries.
          </p>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gradient-card border border-border hover:border-primary/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className={`project-card group relative overflow-hidden rounded-2xl border border-border cursor-pointer transition-all duration-500 hover:border-primary/30 ${
                project.featured ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Visual header area */}
              <div className={`relative aspect-[4/3] bg-gradient-to-br ${project.gradient} p-6 sm:p-8`}>
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }} />

                {/* Floating icon */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-background/20 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <project.icon className="w-6 h-6 text-white" />
                </div>

                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-primary/90 text-xs font-bold text-primary-foreground">
                    Featured
                  </div>
                )}

                {/* Stats floating cards */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                  {Object.entries(project.stats).map(([key, value], idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 rounded-lg bg-background/80 backdrop-blur-sm border border-white/10"
                    >
                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                      <div className="text-sm font-bold">{value}</div>
                    </div>
                  ))}
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-6 sm:p-8 bg-gradient-card">
                <span className="text-primary text-xs sm:text-sm font-medium mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-md bg-background/50 border border-border text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-primary font-medium text-sm">
                  View Case Study
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <a href="#contact" className="btn-outline inline-flex items-center gap-2 text-sm sm:text-base">
            <ExternalLink className="w-4 sm:w-5 h-4 sm:h-5" />
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
