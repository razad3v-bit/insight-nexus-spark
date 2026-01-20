import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getPositionBySlug } from "@/data/careers";

export default function CareersApply() {
  const { slug } = useParams();
  const position = useMemo(() => (slug ? getPositionBySlug(slug) : undefined), [slug]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
    portfolio: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const role = position?.title ?? "Open Position";
    const mailtoLink = `mailto:careers@insightexus.com?subject=Application for ${encodeURIComponent(
      role,
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nLinkedIn: ${formData.linkedin}\nPortfolio: ${formData.portfolio}\n\nMessage:\n${formData.message}`,
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to={position ? `/careers/${position.slug}` : "/careers"}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </header>

      <main className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-[-160px] right-[-160px] w-[520px] h-[520px] bg-gradient-glow pointer-events-none opacity-25" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary font-medium block mb-3">Application</span>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Apply for <span className="text-gradient">{position?.title ?? "a role"}</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            Fill this out and we’ll open your email client with a pre-filled application. Attach your resume before sending.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-gradient-card border border-border">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn</label>
                <Input
                  value={formData.linkedin}
                  onChange={(e) => setFormData((p) => ({ ...p, linkedin: e.target.value }))}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Portfolio / GitHub</label>
                <Input
                  value={formData.portfolio}
                  onChange={(e) => setFormData((p) => ({ ...p, portfolio: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message *</label>
              <Textarea
                required
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                placeholder="Tell us about yourself and why you'd be a great fit..."
                className="min-h-[160px]"
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Apply now
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
