import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Metric = {
  label: string;
  value: number;
  suffix?: string;
  hint: string;
};

const metrics: Metric[] = [
  { label: "Avg. release cadence", value: 14, suffix: "d", hint: "Ship every two weeks" },
  { label: "Performance uplift", value: 38, suffix: "%", hint: "Measured on Lighthouse" },
  { label: "Conversion increase", value: 22, suffix: "%", hint: "Across key funnels" },
  { label: "Stakeholder alignment", value: 4, suffix: "x", hint: "Fewer revision loops" },
];

function useCountUp(target: number, durationMs = 900, start = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const startTs = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTs) / durationMs);
      setValue(Math.round(target * t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, start, target]);

  return value;
}

function MetricCard({ metric, start }: { metric: Metric; start: boolean }) {
  const n = useCountUp(metric.value, 950, start);
  return (
    <div className="metric-card relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 overflow-hidden">
      <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
      <div className="relative">
        <p className="text-sm text-muted-foreground">{metric.label}</p>
        <p className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
          {n}
          {metric.suffix}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{metric.hint}</p>
      </div>
    </div>
  );
}

export default function ImpactMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [startCount, setStartCount] = useState(false);

  const list = useMemo(() => metrics, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => setStartCount(true),
      });

      gsap.fromTo(
        ".metrics-header",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );

      gsap.fromTo(
        ".metric-card",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="metrics" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        <div className="absolute -top-48 right-[-120px] h-[380px] w-[380px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <header className="metrics-header max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground">Proof over promises</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Outcomes you can measure
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We focus on the metrics that matter: speed to ship, user experience, and business results.
          </p>
        </header>

        <div className="mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((m) => (
            <MetricCard key={m.label} metric={m} start={startCount} />
          ))}
        </div>
      </div>
    </section>
  );
}
