import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Building2,
  HeartPulse,
  ShoppingCart,
  GraduationCap,
  Landmark,
  Truck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    icon: ShoppingCart,
    title: "Ecommerce",
    desc: "Conversion-focused storefronts, checkout optimizations, and catalog tooling.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    desc: "Accessible patient experiences, portals, scheduling, and compliant workflows.",
  },
  {
    icon: Landmark,
    title: "Fintech",
    desc: "Secure dashboards, onboarding flows, and real-time data experiences.",
  },
  {
    icon: GraduationCap,
    title: "EdTech",
    desc: "Learning platforms, content delivery, and performance analytics.",
  },
  {
    icon: Truck,
    title: "Logistics",
    desc: "Tracking systems, dispatch tooling, and operational automation.",
  },
  {
    icon: Building2,
    title: "B2B SaaS",
    desc: "Multi-tenant apps, admin panels, billing readiness, and integrations.",
  },
];

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".industries-header",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".industry-card",
        { opacity: 0, y: 18, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="industries" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        <div className="absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <header className="industries-header max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground">Where we deliver impact</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Built for real industries, not demos
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We tailor UX, performance, and architecture to the constraints of your domain—compliance,
            latency, scale, and the realities of shipping.
          </p>
        </header>

        <div className="mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <article
              key={i.title}
              className="industry-card group relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 opacity-70 group-hover:opacity-100" />
              <div className="relative flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-border">
                  <i.icon className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{i.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.desc}</p>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex items-center text-sm font-medium text-foreground story-link"
                  >
                    Discuss a project
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
