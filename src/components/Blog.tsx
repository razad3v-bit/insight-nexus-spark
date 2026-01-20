import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog";
import FeaturedPostCard from "@/components/blog/FeaturedPostCard";
import BlogPostRow from "@/components/blog/BlogPostRow";

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-header', 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.blog-header',
            start: 'top 85%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      gsap.fromTo('.blog-featured', 
        { x: -60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.blog-featured',
            start: 'top 85%',
            once: true,
          },
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      gsap.fromTo('.blog-card', 
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.blog-grid',
            start: 'top 85%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative w-screen py-16 sm:py-20 lg:py-28 xl:py-32 overflow-hidden"
      style={{ marginLeft: 'calc(-50vw + 50%)' }}
    >
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-gradient-glow pointer-events-none opacity-30" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-gradient-glow pointer-events-none opacity-20" />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="blog-header text-center mb-12 sm:mb-16">
          <span className="text-primary font-medium mb-3 sm:mb-4 block text-sm sm:text-base">
            Blog & Insights
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Latest From Our <span className="text-gradient">Blog</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Stay updated with the latest trends, insights, and best practices in software development.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Featured Post */}
          {featuredPost && (
            <FeaturedPostCard post={featuredPost} onClick={() => navigate(`/blog/${featuredPost.slug}`)} />
          )}

          {/* Regular Posts Grid */}
          <div className="blog-grid space-y-6">
            {regularPosts.map((post) => (
              <BlogPostRow key={post.slug} post={post} onClick={() => navigate(`/blog/${post.slug}`)} />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="group" onClick={() => navigate("/blog")}> 
            View All Articles
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
