import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-item', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3' : 'py-6'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="#" className="nav-item flex items-center gap-3">
          <img src={logo} alt="Insightexus" className="h-10 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-item text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>

        <a href="#contact" className="nav-item btn-primary text-sm py-3 px-6">
          Get Started
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
