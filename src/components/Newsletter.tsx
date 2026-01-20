import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".newsletter-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscribed",
      description: "We'll send occasional product + engineering insights.",
    });
    setEmail("");
  };

  return (
    <section ref={sectionRef} id="newsletter" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        <div className="absolute left-1/2 top-8 h-[360px] w-[760px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="newsletter-card relative overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-sm p-6 sm:p-10">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Monthly insights</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                A practical newsletter for builders
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
                Short, high-signal notes on UX, performance, and shipping product—no fluff.
              </p>
            </div>

            <form onSubmit={onSubmit} className="relative flex flex-col sm:flex-row gap-3">
              <label className="sr-only" htmlFor="newsletterEmail">
                Email
              </label>
              <input
                id="newsletterEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="you@company.com"
                className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="btn-primary inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl"
              >
                <span>Subscribe</span>
                <Send className="h-4 w-4" />
              </button>
              <p className="sm:absolute sm:-bottom-7 sm:left-1 text-xs text-muted-foreground">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
