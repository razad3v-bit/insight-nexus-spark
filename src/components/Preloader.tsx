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

      // Animate progress bar
      gsap.to({}, {
        duration: 1.5,
        onUpdate: function() {
          setProgress(Math.round(this.progress() * 100));
        },
      });

      // Logo entrance
      tl.from('.preloader-logo', {
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
      })
      .from('.preloader-progress', {
        scaleX: 0,
        duration: 1.2,
        ease: 'power2.inOut',
      }, '-=0.4')
      .from('.preloader-text', {
        y: 20,
        opacity: 0,
        duration: 0.5,
      }, '-=0.8')
      // Side opener animation
      .to('.preloader-left', {
        xPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
      }, '+=0.3')
      .to('.preloader-right', {
        xPercent: 100,
        duration: 0.8,
        ease: 'power4.inOut',
      }, '-=0.8')
      .to('.preloader-content', {
        opacity: 0,
        duration: 0.3,
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
      {/* Left panel */}
      <div className="preloader-left absolute top-0 left-0 w-1/2 h-full bg-background border-r border-border" />
      
      {/* Right panel */}
      <div className="preloader-right absolute top-0 right-0 w-1/2 h-full bg-background border-l border-border" />

      {/* Content */}
      <div className="preloader-content relative z-10 flex flex-col items-center gap-8">
        <img
          src={logo}
          alt="Insightexus"
          className="preloader-logo h-16 sm:h-20 w-auto"
        />
        
        {/* Progress bar */}
        <div className="w-48 sm:w-64 h-1 bg-border rounded-full overflow-hidden">
          <div
            className="preloader-progress h-full rounded-full origin-left"
            style={{ 
              background: 'linear-gradient(90deg, hsl(192 35% 52%), hsl(180 40% 65%))',
              width: `${progress}%`,
            }}
          />
        </div>

        <span className="preloader-text text-muted-foreground text-sm font-medium">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default Preloader;
