import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    id: 1,
    title: 'The Future of AI in Enterprise Software Development',
    excerpt: 'Explore how artificial intelligence is reshaping the way businesses build and deploy software solutions.',
    category: 'AI & Machine Learning',
    author: 'Alex Mitchell',
    date: 'Jan 15, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    featured: true,
  },
  {
    id: 2,
    title: 'Building Scalable Microservices Architecture',
    excerpt: 'A comprehensive guide to designing and implementing microservices that grow with your business.',
    category: 'Architecture',
    author: 'Sarah Chen',
    date: 'Jan 10, 2026',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    featured: false,
  },
  {
    id: 3,
    title: 'Cloud Cost Optimization Strategies for 2026',
    excerpt: 'Learn practical techniques to reduce your cloud spending without sacrificing performance.',
    category: 'Cloud',
    author: 'Marcus Johnson',
    date: 'Jan 5, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
    featured: false,
  },
  {
    id: 4,
    title: 'React 19: What Developers Need to Know',
    excerpt: 'Breaking down the new features and improvements in React 19 and how to leverage them.',
    category: 'Frontend',
    author: 'Emily Zhang',
    date: 'Dec 28, 2025',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
    featured: false,
  },
];

const Blog = () => {
  const sectionRef = useRef<HTMLElement>(null);

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

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

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
            <div className="blog-featured group cursor-pointer">
              <div className="relative rounded-2xl overflow-hidden mb-6">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                    Featured
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium mb-3">
                    {featuredPost.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{featuredPost.excerpt}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {featuredPost.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {featuredPost.readTime}
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts Grid */}
          <div className="blog-grid space-y-6">
            {regularPosts.map((post) => (
              <div 
                key={post.id}
                className="blog-card group flex gap-4 p-4 rounded-xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer"
              >
                <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
                    {post.category}
                  </span>
                  <h4 className="font-semibold text-sm sm:text-base mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 mb-2 hidden sm:block">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="group">
            View All Articles
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
