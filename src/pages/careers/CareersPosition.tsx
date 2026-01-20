import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin, Clock, Briefcase } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getPositionBySlug } from "@/data/careers";

export default function CareersPosition() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const position = slug ? getPositionBySlug(slug) : undefined;

  if (!position) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Careers
            </Link>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Position not found</h1>
          <p className="text-muted-foreground mb-8">This role may have been filled or renamed.</p>
          <Button onClick={() => navigate("/careers")}>Go to Careers</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Careers
          </Link>
          <Button onClick={() => navigate(`/careers/${position.slug}/apply`)}>Apply now</Button>
        </div>
      </header>

      <main className="relative pt-12 sm:pt-16 pb-16 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-20 left-[-120px] w-[420px] h-[420px] bg-gradient-glow pointer-events-none opacity-25" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {position.department}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-4 mb-4">{position.title}</h1>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              {position.type}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {position.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {position.experience}
            </span>
          </div>

          <p className="mt-8 text-lg text-muted-foreground leading-relaxed">{position.description}</p>

          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-card border border-border">
              <h2 className="text-xl font-bold mb-3">Responsibilities</h2>
              <ul className="space-y-2">
                {position.responsibilities.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-card border border-border">
              <h2 className="text-xl font-bold mb-3">Requirements</h2>
              <ul className="space-y-2">
                {position.requirements.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {position.niceToHave?.length ? (
            <div className="mt-6 p-6 rounded-2xl bg-gradient-card border border-border">
              <h2 className="text-xl font-bold mb-3">Nice to have</h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {position.niceToHave.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-10 p-6 rounded-2xl bg-gradient-card border border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Ready to apply?</h3>
              <p className="text-muted-foreground">Submit your application for this role in a few steps.</p>
            </div>
            <Button onClick={() => navigate(`/careers/${position.slug}/apply`)}>
              Apply now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
