import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Briefcase, ArrowRight, CheckCircle2 } from "lucide-react";

import { benefits, positions } from "@/data/careers";
import { Button } from "@/components/ui/button";

export default function CareersIndex() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Button variant="outline" onClick={() => document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" })}>
            View roles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </header>

      <main>
        <section className="relative py-16 sm:py-24 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-glow pointer-events-none opacity-30" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-primary font-medium mb-4 block">Careers</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Build products that ship.</h1>
              <p className="text-muted-foreground text-lg sm:text-xl mb-8">
                Join a team that obsesses over craft, velocity, and measurable outcomes.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button onClick={() => document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" })}>
                  Browse open positions
                </Button>
                <Button variant="outline" onClick={() => navigate("/blog")}>Read our culture</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16 bg-gradient-to-b from-background to-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 p-4 rounded-xl bg-gradient-card border border-border">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm sm:text-base">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="open-positions" className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-6 mb-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold">Open <span className="text-gradient">Positions</span></h2>
                <p className="text-muted-foreground max-w-2xl">
                  Click a role to view full details and responsibilities.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
              {positions.map((job) => (
                <button
                  key={job.slug}
                  type="button"
                  onClick={() => navigate(`/careers/${job.slug}`)}
                  className="group p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-300 text-left"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                      </div>
                    </div>

                    <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      {job.experience}
                    </span>
                  </div>

                  <p className="text-muted-foreground mt-4 line-clamp-2">{job.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-primary">
                    View details
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-gradient-card border border-border p-8 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">How to apply</h2>
                <p className="text-muted-foreground">Pick a role, review details, then submit your application in under 2 minutes.</p>
              </div>
              <Button onClick={() => document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" })}>Get started</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
