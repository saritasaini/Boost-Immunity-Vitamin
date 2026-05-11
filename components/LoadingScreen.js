import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ isFinished }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline();
    tl.fromTo(logoRef.current, 
      { opacity: 0, scale: 0.85, y: 10 }, 
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power4.out" }
    );
    tl.fromTo(textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.6"
    );

    // Subtle pulse while loading
    gsap.to(logoRef.current, {
      scale: 1.03,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  useEffect(() => {
    if (isFinished) {
      // Kill the pulse animation before fading out
      gsap.killTweensOf(logoRef.current);
      
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
        }
      });

      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut"
      });
    }
  }, [isFinished]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(315.01deg, #ff710d 8.31%, #ffb800 88.22%)' }}
    >
      <div className="flex flex-col items-center select-none">
        {/* Logo Text */}
        <h1 
          ref={logoRef} 
          className="text-white text-[110px] md:text-[160px] font-black tracking-[-0.06em] leading-none"
          style={{ 
            fontFamily: 'var(--font-primary), "Inter", sans-serif',
            fontFeatureSettings: '"ss01" on, "ss02" on'
          }}
        >
          boost
        </h1>
        
        {/* Loading Progress Wrapper */}
        <div className="mt-8 flex flex-col items-center">
          <p 
            ref={textRef} 
            className="text-white/60 text-[10px] md:text-[11px] tracking-[0.5em] uppercase font-bold"
            style={{ fontFamily: 'var(--font-primary), sans-serif' }}
          >
            Powering Up
          </p>
          {/* Subtle loading bar */}
          <div className="w-32 h-[1px] bg-white/20 mt-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/60 animate-loading-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
