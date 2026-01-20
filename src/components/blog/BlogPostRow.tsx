import type { BlogPost } from "@/data/blog";

type Props = {
  post: BlogPost;
  onClick?: () => void;
};

export default function BlogPostRow({ post, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="blog-card group flex w-full gap-4 p-4 rounded-xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-300 text-left"
    >
      <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
          {post.category}
        </span>
        <h4 className="font-semibold text-sm sm:text-base mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h4>
        <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 mb-2 hidden sm:block">{post.excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </button>
  );
}
