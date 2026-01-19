import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechVentures',
    image: 'SJ',
    content: 'Insightexus transformed our digital presence completely. Their team delivered a world-class platform that exceeded our expectations. The attention to detail and technical expertise is unmatched.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'CTO, FinanceFlow',
    image: 'MC',
    content: 'Working with Insightexus was a game-changer for our startup. They built our entire fintech infrastructure from scratch, delivering on time and within budget. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Lead, HealthFirst',
    image: 'ER',
    content: 'The mobile app they developed for us has over 100k downloads and a 4.9-star rating. Their UI/UX expertise and development skills are truly exceptional.',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Founder, CloudScale',
    image: 'DK',
    content: 'Insightexus helped us migrate our entire infrastructure to the cloud. The process was seamless, and we\'ve seen a 40% reduction in operational costs since then.',
    rating: 5,
  },
  {
    name: 'Amanda Foster',
    role: 'Director, RetailMax',
    image: 'AF',
    content: 'Our e-commerce platform built by Insightexus handles millions of transactions monthly without a hitch. Their scalability solutions are top-notch.',
    rating: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonials-header', 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.testimonials-header',
            start: 'top 85%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      gsap.fromTo('.testimonial-visual', 
        { scale: 0.9, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.testimonial-visual',
            start: 'top 85%',
            once: true,
          },
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-screen py-16 sm:py-20 lg:py-28 xl:py-32 overflow-hidden"
      style={{ marginLeft: 'calc(-50vw + 50%)' }}
    >
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gradient-glow pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-gradient-glow pointer-events-none" />

      {/* Floating quote marks */}
      <div className="absolute top-20 left-[10%] opacity-10">
        <Quote className="w-24 h-24 text-primary" />
      </div>
      <div className="absolute bottom-20 right-[10%] opacity-10 rotate-180">
        <Quote className="w-24 h-24 text-primary" />
      </div>

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="testimonials-header text-center mb-12 sm:mb-16">
          <span className="text-primary font-medium mb-3 sm:mb-4 block text-sm sm:text-base">
            Client Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            Don't just take our word for it. Here's what industry leaders say about working with us.
          </p>
        </div>

        <div className="testimonial-visual relative max-w-4xl mx-auto">
          {/* Main testimonial card */}
          <div className="bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 shadow-card relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className={`text-lg sm:text-xl lg:text-2xl leading-relaxed mb-8 transition-all duration-500 ${
                  isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
              >
                "{testimonials[activeIndex].content}"
              </blockquote>

              {/* Author */}
              <div
                className={`flex items-center gap-4 transition-all duration-500 delay-100 ${
                  isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-lg">
                  {testimonials[activeIndex].image}
                </div>
                <div>
                  <div className="font-semibold text-lg">{testimonials[activeIndex].name}</div>
                  <div className="text-muted-foreground">{testimonials[activeIndex].role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-gradient-card border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setActiveIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-primary'
                      : 'bg-border hover:bg-muted-foreground'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-gradient-card border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>

        {/* Client logos */}
        <div className="mt-16 sm:mt-20">
          <p className="text-center text-muted-foreground text-sm mb-8">Trusted by leading companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16 opacity-60">
            {['TechVentures', 'FinanceFlow', 'HealthFirst', 'CloudScale', 'RetailMax'].map((company, index) => (
              <div
                key={index}
                className="text-lg sm:text-xl font-bold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
