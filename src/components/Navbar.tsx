import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import BrandMark from "@/components/BrandMark";

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.mobile-menu-item',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "#contact" },
  ];

  const NavItem = ({ name, href, className }: { name: string; href: string; className: string }) => {
    const common = { className, onClick: handleLinkClick };
    if (href.startsWith("/")) {
      return (
        <Link key={name} to={href} {...common}>
          {name}
        </Link>
      );
    }
    return (
      <a key={name} href={href} {...common}>
        {name}
      </a>
    );
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled ? 'glass py-3' : 'py-4 sm:py-6'
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="nav-item flex items-center gap-3 shrink-0">
              <img src={logo} alt="Insightexus" className="h-8 sm:h-10 w-auto" />
              <BrandMark />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-4">
              {navLinks.map((link) =>
                NavItem({
                  name: link.name,
                  href: link.href,
                  className:
                    "nav-item relative px-4 xl:px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 rounded-lg hover:bg-muted/50",
                })
              )}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="#contact" className="nav-item btn-primary text-sm py-2.5 px-6">
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden nav-item p-2 rounded-lg hover:bg-muted/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-[72px] left-0 right-0 bg-background border-b border-border p-6 space-y-2">
            {navLinks.map((link) =>
              NavItem({
                name: link.name,
                href: link.href,
                className:
                  "mobile-menu-item block px-4 py-3 text-lg font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-xl transition-colors",
              })
            )}
            <div className="pt-4 border-t border-border mt-4">
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="mobile-menu-item btn-primary w-full text-center block"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
