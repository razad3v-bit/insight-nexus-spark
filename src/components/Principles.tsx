import { Gauge, PencilRuler, Workflow } from "lucide-react";

const principles = [
  {
    title: "Performance by default",
    desc: "Fast interactions, sensible loading states, and predictable behavior across devices.",
    icon: Gauge,
  },
  {
    title: "Design that scales",
    desc: "Clear type hierarchy, consistent spacing, and reusable UI patterns that hold up.",
    icon: PencilRuler,
  },
  {
    title: "Systems over hacks",
    desc: "Well-structured code and processes so adding features stays easy, not fragile.",
    icon: Workflow,
  },
];

export default function Principles() {
  return (
    <section className="section-padding w-screen relative" style={{ marginLeft: "calc(-50vw + 50%)" }}>
      <div className="container-custom">
        <div className="rounded-3xl border border-border bg-gradient-card shadow-card overflow-hidden">
          <div className="p-7 sm:p-10 lg:p-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Principles that keep the UI clean
            </h2>
            <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-2xl">
              Typography, spacing, and interaction rules that make products feel premium—and stay maintainable.
            </p>

            <div className="mt-8 sm:mt-10 grid md:grid-cols-3 gap-6">
              {principles.map((p) => (
                <div key={p.title} className="rounded-2xl border border-border bg-card/40 p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg sm:text-xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border bg-background/30 px-7 sm:px-10 lg:px-12 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                Want a UI audit? We can review your product for typography, spacing, and accessibility.
              </p>
              <a href="#contact" className="btn-outline px-6 py-3 text-sm">
                Request audit
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
