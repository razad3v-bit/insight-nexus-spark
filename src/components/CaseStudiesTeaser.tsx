import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const caseStudies = [
  {
    title: "From legacy to lightning-fast",
    desc: "Modernized a critical app with measurable performance and UX gains.",
    tag: "Modernization",
  },
  {
    title: "Design system + velocity",
    desc: "Reusable components that kept brand consistency while shipping faster.",
    tag: "Product Design",
  },
  {
    title: "Ship with confidence",
    desc: "Automated testing + observability so releases stay boring (in a good way).",
    tag: "Engineering",
  },
];

export default function CaseStudiesTeaser() {
  return (
    <section className="section-padding w-screen relative" style={{ marginLeft: "calc(-50vw + 50%)" }}>
      <div className="container-custom">
        <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Proof, not promises
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Work that moves the needle
            </h2>
            <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-xl">
              A quick look at how we approach delivery: outcomes first, craft always.
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            Explore insights
            <ArrowRight className="h-4 w-4" />
          </Link>
        </header>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {caseStudies.map((c) => (
            <div
              key={c.title}
              className="bg-gradient-card border border-border rounded-2xl p-6 sm:p-7 shadow-card card-hover"
            >
              <div className="inline-flex items-center rounded-full bg-muted/60 border border-border px-3 py-1 text-xs text-muted-foreground">
                {c.tag}
              </div>
              <h3 className="mt-4 text-xl sm:text-2xl font-semibold tracking-tight">
                {c.title}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">{c.desc}</p>
              <div className="mt-6 flex items-center justify-between">
                <a
                  href="#projects"
                  className="text-sm font-semibold text-primary hover:opacity-90 transition-opacity"
                >
                  See projects
                </a>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
