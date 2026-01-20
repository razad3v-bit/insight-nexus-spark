import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "What industries do you specialize in?",
    a: "We partner across SaaS, fintech, healthcare, and internal enterprise platforms—anywhere speed and reliability matter.",
  },
  {
    q: "How fast can we ship an MVP?",
    a: "Typically 4–8 weeks depending on scope. We start with a discovery sprint, then build in weekly deliverable increments.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes—monitoring, iterative improvements, and roadmap delivery. We can work as your product engineering partner.",
  },
  {
    q: "Can you work with our existing team?",
    a: "Absolutely. We integrate into your workflow, tighten engineering standards, and help your team ship faster with confidence.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-header",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ".faq-header", start: "top 85%", once: true },
        },
      );

      gsap.fromTo(
        ".faq-card",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ".faq-card", start: "top 85%", once: true },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="absolute top-1/2 left-[-120px] w-[360px] h-[360px] bg-gradient-glow pointer-events-none opacity-20" />
      <div className="absolute bottom-[-140px] right-[-120px] w-[420px] h-[420px] bg-gradient-glow pointer-events-none opacity-15" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="faq-header text-center mb-10 sm:mb-14">
          <span className="text-primary font-medium mb-3 block">FAQ</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Quick answers, <span className="text-gradient">zero fluff</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mt-4">
            Everything you need to know before we build together.
          </p>
        </div>

        <div className="faq-card rounded-2xl bg-gradient-card border border-border p-6 sm:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
