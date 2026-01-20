export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  content: {
    intro: string;
    sections: Array<{ heading: string; body: string }>;
  };
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "future-of-ai-enterprise-software",
    title: "The Future of AI in Enterprise Software Development",
    excerpt:
      "Explore how artificial intelligence is reshaping the way businesses build and deploy software solutions.",
    category: "AI & Machine Learning",
    author: "Alex Mitchell",
    date: "Jan 15, 2026",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
    featured: true,
    content: {
      intro:
        "Enterprise teams aren’t replacing engineers with AI—they’re redesigning workflows around it. The winners will be the organizations that treat AI as a reliability and velocity multiplier, with strong architecture and guardrails.",
      sections: [
        {
          heading: "From coding assistant to delivery system",
          body:
            "The shift is moving beyond autocomplete: AI now helps with requirements refinement, test generation, and release notes. The biggest gains come when AI is integrated into CI pipelines and documentation flows.",
        },
        {
          heading: "Governance becomes a product feature",
          body:
            "As AI touches more code paths, governance is no longer a policy PDF. Teams need repeatable controls—lint rules, secret scanning, model usage logging, and human review gates for sensitive changes.",
        },
        {
          heading: "Quality: the new bottleneck",
          body:
            "AI can generate a lot of code fast, but quality still depends on tests, observability, and clear ownership. Focus on strong component boundaries, typed APIs, and contract tests.",
        },
      ],
    },
  },
  {
    id: 2,
    slug: "scalable-microservices-architecture",
    title: "Building Scalable Microservices Architecture",
    excerpt:
      "A comprehensive guide to designing and implementing microservices that grow with your business.",
    category: "Architecture",
    author: "Sarah Chen",
    date: "Jan 10, 2026",
    readTime: "12 min read",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop",
    content: {
      intro:
        "Microservices don’t fix poor domain modeling—but they amplify good modeling. The key is to split by business capability, not by technical layers.",
      sections: [
        {
          heading: "Start with boundaries",
          body:
            "Define services around business workflows and data ownership. Avoid shared databases—use events or well-defined APIs for cross-service communication.",
        },
        {
          heading: "Operate like a platform",
          body:
            "Standardize observability, deployment, and service templates. A lightweight internal platform prevents every team from reinventing tooling.",
        },
        {
          heading: "Design for failure",
          body:
            "Use timeouts, retries with jitter, circuit breakers, and idempotency keys. Reliability isn’t a later phase; it’s part of the interface design.",
        },
      ],
    },
  },
  {
    id: 3,
    slug: "cloud-cost-optimization-2026",
    title: "Cloud Cost Optimization Strategies for 2026",
    excerpt:
      "Learn practical techniques to reduce your cloud spending without sacrificing performance.",
    category: "Cloud",
    author: "Marcus Johnson",
    date: "Jan 5, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop",
    content: {
      intro:
        "Cost optimization is a product discipline: you need visibility, ownership, and continuous improvement loops—not a one-time savings sprint.",
      sections: [
        {
          heading: "Measure per feature",
          body:
            "Track cost by service and by environment. Tag resources, then build dashboards that map spend to teams and product areas.",
        },
        {
          heading: "Right-size with confidence",
          body:
            "Use autoscaling and load tests to find stable baselines. The most common waste comes from oversized instances and idle dev environments.",
        },
        {
          heading: "Tune storage and data",
          body:
            "Move cold data to cheaper tiers, compress logs, and control retention. Data gravity is real—plan lifecycle policies early.",
        },
      ],
    },
  },
  {
    id: 4,
    slug: "react-19-what-developers-need-to-know",
    title: "React 19: What Developers Need to Know",
    excerpt:
      "Breaking down the new features and improvements in React 19 and how to leverage them.",
    category: "Frontend",
    author: "Emily Zhang",
    date: "Dec 28, 2025",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=800&fit=crop",
    content: {
      intro:
        "React 19 continues the trend toward better server-first patterns and improved ergonomics. The biggest wins show up when your component design is already disciplined.",
      sections: [
        {
          heading: "Better primitives, same fundamentals",
          body:
            "New features help—but clear component boundaries, stable props, and sensible state ownership still matter most.",
        },
        {
          heading: "Performance is architecture",
          body:
            "Don’t start by micro-optimizing. Start by reducing unnecessary rerenders, flattening prop chains, and avoiding global state misuse.",
        },
      ],
    },
  },
];

export const getBlogPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const getRecommendedBlogs = (slug: string, limit = 3) => {
  const current = getBlogPostBySlug(slug);
  const candidates = blogPosts.filter((p) => p.slug !== slug);
  if (!current) return candidates.slice(0, limit);

  const sameCategory = candidates.filter((p) => p.category === current.category);
  const rest = candidates.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
};
