import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Alex Thompson',
    role: 'CEO & Founder',
    initials: 'AT',
    bio: 'Visionary leader with 15+ years in tech. Former Google engineer with a passion for innovation.',
    gradient: 'from-blue-500 to-cyan-500',
    social: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    name: 'Maria Garcia',
    role: 'CTO',
    initials: 'MG',
    bio: 'Full-stack architect specializing in scalable systems. Built platforms serving millions of users.',
    gradient: 'from-purple-500 to-pink-500',
    social: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    name: 'James Wilson',
    role: 'Design Director',
    initials: 'JW',
    bio: 'Award-winning designer with expertise in creating memorable digital experiences.',
    gradient: 'from-orange-500 to-amber-500',
    social: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    name: 'Sophie Chen',
    role: 'Lead Developer',
    initials: 'SC',
    bio: 'React & Node.js expert. Open source contributor with a focus on performance optimization.',
    gradient: 'from-emerald-500 to-teal-500',
    social: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    name: 'Ryan Mitchell',
    role: 'DevOps Lead',
    initials: 'RM',
    bio: 'Cloud infrastructure specialist. AWS & Azure certified with extensive Kubernetes experience.',
    gradient: 'from-red-500 to-rose-500',
    social: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    name: 'Elena Kowalski',
    role: 'Product Manager',
    initials: 'EK',
    bio: 'Strategic thinker bridging business and tech. MBA from Stanford with startup experience.',
    gradient: 'from-indigo-500 to-violet-500',
    social: { linkedin: '#', twitter: '#', github: '#' },
  },
];

const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-header', {
        scrollTrigger: {
          trigger: '.team-header',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from('.team-card', {
        scrollTrigger: {
          trigger: '.team-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative w-screen py-16 sm:py-20 lg:py-28 xl:py-32 overflow-hidden"
      style={{ marginLeft: 'calc(-50vw + 50%)' }}
    >
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-glow pointer-events-none opacity-50" />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="team-header text-center mb-12 sm:mb-16">
          <span className="text-primary font-medium mb-3 sm:mb-4 block text-sm sm:text-base">
            Our Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Meet The <span className="text-gradient">Experts</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            Our talented team of designers, developers, and strategists who bring your vision to life.
          </p>
        </div>

        <div className="team-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-card group relative bg-gradient-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-500"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <div className="relative z-10 p-6 sm:p-8">
                {/* Avatar */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shadow-lg group-hover:scale-105 transition-transform duration-500`}>
                    {member.initials}
                  </div>
                  {/* Online indicator */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-background" />
                </div>

                {/* Info */}
                <h3 className="text-xl sm:text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-primary text-sm sm:text-base font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Social links */}
                <div className="flex gap-3">
                  {[
                    { icon: Linkedin, href: member.social.linkedin },
                    { icon: Twitter, href: member.social.twitter },
                    { icon: Github, href: member.social.github },
                    { icon: Mail, href: `mailto:${member.name.toLowerCase().replace(' ', '.')}@insightexus.com` },
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      className="w-10 h-10 rounded-lg bg-background/50 border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all group/icon"
                    >
                      <social.icon className="w-4 h-4 text-muted-foreground group-hover/icon:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${member.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
            </div>
          ))}
        </div>

        {/* Join team CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-block bg-gradient-card rounded-2xl border border-border p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Want to join our team?</h3>
            <p className="text-muted-foreground mb-4">We're always looking for talented individuals.</p>
            <a href="#contact" className="btn-primary text-sm">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
