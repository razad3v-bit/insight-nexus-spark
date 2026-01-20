import { Calendar, Clock, User } from "lucide-react";

import type { BlogPost } from "@/data/blog";

type Props = {
  post: BlogPost;
  onClick?: () => void;
};

export default function FeaturedPostCard({ post, onClick }: Props) {
  return (
    <button onClick={onClick} type="button" className="blog-featured group text-left">
      <div className="relative rounded-2xl overflow-hidden mb-6">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
            Featured
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium mb-3">
            {post.category}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          {post.author}
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {post.date}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {post.readTime}
        </div>
      </div>
    </button>
  );
}
