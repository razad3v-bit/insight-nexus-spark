import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { blogPosts } from "@/data/blog";
import { Button } from "@/components/ui/button";

export default function BlogIndex() {
  const navigate = useNavigate();
  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];
  const rest = blogPosts.filter((p) => p.slug !== featured?.slug);

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

          <Button variant="outline" onClick={() => document.getElementById("all-posts")?.scrollIntoView({ behavior: "smooth" })}>
            Browse articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </header>

      <main>
        <section className="relative py-16 sm:py-24 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-glow pointer-events-none opacity-30" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-primary font-medium mb-4 block">Blog & Insights</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Learn what we’re building—and how we build it.
              </h1>
              <p className="text-muted-foreground text-lg sm:text-xl mb-8">
                Strategy, engineering, design, and delivery—packed into short reads you can apply immediately.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => navigate(`/blog/${featured.slug}`)}>Read featured</Button>
                <Button variant="outline" onClick={() => document.getElementById("all-posts")?.scrollIntoView({ behavior: "smooth" })}>
                  View all
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-20" id="all-posts">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <button
                type="button"
                onClick={() => navigate(`/blog/${featured.slug}`)}
                className="group rounded-2xl overflow-hidden bg-gradient-card border border-border hover:border-primary/30 transition-colors text-left"
              >
                <div className="relative">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-[260px] sm:h-[340px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="inline-flex px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium mb-3">
                      {featured.category}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{featured.excerpt}</p>
                  </div>
                </div>
                <div className="p-5 text-sm text-muted-foreground flex items-center justify-between">
                  <span>{featured.author}</span>
                  <span className="flex items-center gap-2">
                    <span>{featured.date}</span>
                    <span>•</span>
                    <span>{featured.readTime}</span>
                  </span>
                </div>
              </button>

              <div className="space-y-4">
                {rest.map((p) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => navigate(`/blog/${p.slug}`)}
                    className="group flex gap-4 p-4 rounded-xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-300 text-left"
                  >
                    <div className="shrink-0 w-28 h-24 rounded-lg overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
                        {p.category}
                      </span>
                      <h3 className="font-semibold text-sm sm:text-base mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">{p.excerpt}</p>
                      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                        <span>{p.date}</span>
                        <span>•</span>
                        <span>{p.readTime}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
