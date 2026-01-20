import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getBlogPostBySlug, getRecommendedBlogs } from "@/data/blog";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const recommended = slug ? getRecommendedBlogs(slug) : [];

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Post not found</h1>
          <p className="text-muted-foreground mb-8">This article may have been moved or renamed.</p>
          <Button onClick={() => navigate("/blog")}>Go to Blog</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <Button variant="outline" onClick={() => navigate("/contact")}>Contact</Button>
        </div>
      </header>

      <main>
        <article className="relative pt-10 sm:pt-14 pb-16 sm:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <div className="absolute top-24 right-[-120px] w-[420px] h-[420px] bg-gradient-glow pointer-events-none opacity-25" />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{post.title}</h1>
            <div className="text-sm text-muted-foreground flex flex-wrap items-center gap-2">
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <div className="mt-10 rounded-2xl overflow-hidden border border-border bg-gradient-card">
              <img src={post.image} alt={post.title} className="w-full h-[260px] sm:h-[380px] object-cover" loading="lazy" />
            </div>

            <p className="mt-10 text-lg text-muted-foreground leading-relaxed">{post.content.intro}</p>

            <div className="mt-10 space-y-8">
              {post.content.sections.map((s) => (
                <section key={s.heading}>
                  <h2 className="text-2xl font-bold mb-3">{s.heading}</h2>
                  <p className="text-muted-foreground leading-relaxed">{s.body}</p>
                </section>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-gradient-card border border-border">
              <h3 className="text-xl font-bold mb-2">Want help implementing this?</h3>
              <p className="text-muted-foreground mb-4">
                We can turn these ideas into production-ready systems—strategy, design, and engineering.
              </p>
              <Button onClick={() => navigate("/", { replace: false })}>Talk to us</Button>
            </div>
          </div>
        </article>

        <section className="pb-16 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-6 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Recommended reads</h2>
                <p className="text-muted-foreground">More articles you might like.</p>
              </div>
              <Button variant="outline" onClick={() => navigate("/blog")}>
                All posts
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              {recommended.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => navigate(`/blog/${p.slug}`)}
                  className="group rounded-2xl overflow-hidden bg-gradient-card border border-border hover:border-primary/30 transition-colors text-left"
                >
                  <div className="relative">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                  </div>
                  <div className="p-5">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                      {p.category}
                    </span>
                    <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{p.excerpt}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
