import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import logo from '@/assets/logo.png';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // Animate progress
      gsap.to({}, {
        duration: 2,
        onUpdate: function() {
          setProgress(Math.round(this.progress() * 100));
        },
      });

      // Logo and content entrance
      tl.from('.preloader-logo', {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
      })
      .from('.preloader-ring', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      }, '-=0.6')
      .from('.preloader-text', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      }, '-=0.4')
      .from('.preloader-bar-container', {
        scaleX: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.4')
      .to('.preloader-bar', {
        scaleX: 1,
        duration: 1.5,
        ease: 'power2.inOut',
      }, '-=0.3')
      // Side opener animation - panels slide out
      .to('.preloader-content', {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      }, '+=0.2')
      .to('.preloader-left', {
        xPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
      })
      .to('.preloader-right', {
        xPercent: 100,
        duration: 0.8,
        ease: 'power4.inOut',
      }, '-=0.8')
      .set(preloaderRef.current, { display: 'none' });

    }, preloaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
    >
      {/* Left panel - solid background, no borders */}
      <div className="preloader-left absolute top-0 left-0 w-1/2 h-full bg-background">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
      </div>
      
      {/* Right panel - solid background, no borders */}
      <div className="preloader-right absolute top-0 right-0 w-1/2 h-full bg-background">
        <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="preloader-content relative z-10 flex flex-col items-center">
        {/* Animated rings */}
        <div className="relative mb-8">
          <div className="preloader-ring absolute inset-0 w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-primary/20 animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="preloader-ring absolute inset-0 w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="preloader-ring absolute -inset-4 w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-primary/10" />
          
          {/* Logo container */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-card border border-border flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-glow" />
            <img
              src={logo}
              alt="Insightexus"
              className="preloader-logo relative z-10 h-12 sm:h-16 w-auto"
            />
          </div>
        </div>
        
        {/* Brand text */}
        <div className="text-center mb-8">
          <h1 className="preloader-text text-2xl sm:text-3xl font-bold text-gradient mb-2">
            Insightexus
          </h1>
          <p className="preloader-text text-muted-foreground text-sm sm:text-base">
            Innovating The Future
          </p>
        </div>

        {/* Progress bar */}
        <div className="preloader-bar-container w-48 sm:w-64 h-1.5 bg-border rounded-full overflow-hidden origin-left">
          <div
            className="preloader-bar h-full rounded-full origin-left"
            style={{ 
              background: 'linear-gradient(90deg, hsl(192 35% 52%), hsl(180 40% 65%))',
              transform: 'scaleX(0)',
              width: '100%',
            }}
          />
        </div>

        {/* Progress percentage */}
        <span className="preloader-text text-primary text-lg font-bold mt-4">
          {progress}%
        </span>

        {/* Loading dots */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preloader;
