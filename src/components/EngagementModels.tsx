import { CalendarClock, Layers3, Rocket, ShieldCheck } from "lucide-react";

const models = [
  {
    title: "Build Sprint",
    desc: "A focused, time-boxed push to validate an idea and ship a working slice.",
    icon: Rocket,
  },
  {
    title: "Dedicated Team",
    desc: "A long-term squad embedded with your product, design, and engineering cadence.",
    icon: Layers3,
  },
  {
    title: "Design → Dev Handoff",
    desc: "We translate high-fidelity design into pixel-precise, accessible UI.",
    icon: CalendarClock,
  },
  {
    title: "Quality & Security",
    desc: "Testing, performance budgets, and secure-by-default implementation practices.",
    icon: ShieldCheck,
  },
];

export default function EngagementModels() {
  return (
    <section className="section-padding w-screen relative" style={{ marginLeft: "calc(-50vw + 50%)" }}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <header className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Engagement models built for momentum
            </h2>
            <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-xl">
              Choose the delivery shape that matches your timeline—without compromising craft.
            </p>
          </header>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {models.map((m) => (
              <article
                key={m.title}
                className="bg-gradient-card border border-border rounded-2xl p-6 sm:p-7 shadow-card"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                  <m.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="mt-4 text-lg sm:text-xl font-semibold tracking-tight">{m.title}</h3>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground">{m.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
