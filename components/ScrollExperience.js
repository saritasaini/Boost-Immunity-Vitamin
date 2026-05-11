import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Bottle3D from './Bottle3D';
import Ingredients from './Ingredients';
import MarqueeTicker from './MarqueeTicker';
import Footer from './Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollExperience() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const container = containerRef.current;

      mm.add({
        isMobile: "(max-width: 768px)",
        isDesktop: "(min-width: 769px)"
      }, (context) => {
        let { isMobile } = context.conditions;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=800%",
            pin: true,
            scrub: 1,
            markers: false,
          }
        });

        // Initial state set via GSAP to avoid Tailwind conflicts
        tl.set(".bottle-main-wrapper", { x: isMobile ? "0vw" : "32vw", y: -80, scale: 1.18 }); 
        tl.set(".hero-big-text", { y: 70, opacity: 1 });
        tl.set(".hero-bottom-text", { x: 100, y: 60, opacity: 1 });
        tl.set(".buy-button-wrapper", { opacity: 1, scale: isMobile ? 0.7 : 1 });
        tl.set(".slot-machine-container", { opacity: 0, y: 100, scale: 0.9 });

        // SECTION 1 to SECTION 2 TRANSITION (0-1)
        // Hero text now SLIDES UP out of the way
        tl.to(".hero-big-text", { y: "-100vh", opacity: 0, duration: 1, ease: "power2.in" }, 0.1);
        tl.to(".hero-bottom-text", { y: "-100vh", opacity: 0, duration: 1, ease: "power2.in" }, 0.1);
        // Kept y: -80 to prevent cutting and match Section 1's correct position
        tl.to(".bottle-main-wrapper", { x: "0vw", y: -80, duration: 1, ease: "power2.inOut" }, 0.1);
        
        // Reveal Section 2 Elements
        tl.to(".slot-machine-container", { opacity: 1, duration: 0.5 }, 0.5);
        tl.to(".stay-sick-text", { opacity: 1, duration: 0.8 }, 0.6);
        tl.to(".left-circle-graphic", { opacity: 1, duration: 0.8 }, 0.6);
        tl.to(".proactive-right", { opacity: 1, pointerEvents: "auto", duration: 0.8 }, 0.7);
        tl.to(".slot-machine-container", { pointerEvents: "auto", duration: 0 }, 0.7);

        // SECTION 2 STAY (1-2)
        // Kept y: -80 consistent
        tl.to(".bottle-main-wrapper", { x: "0vw", y: -80, duration: 1, ease: "power2.inOut" }, 1);

        // SECTION 3: INGREDIENTS "MOM LOVE" (2-3)
        tl.to(".slot-machine-container, .proactive-right", { opacity: 0, y: -200, duration: 1, ease: "power2.in" }, 2);
        tl.fromTo(".ingredients-section-content", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 1, pointerEvents: "auto" }, 2);
        // Bottle stays centered and prominent through Section 3
        tl.to(".bottle-main-wrapper", { x: "0vw", y: -80, scale: 1.18, duration: 1 }, 2);

        // Baki sections logic remains same...
        tl.to(".ingredients-section-content", { opacity: 0, y: "-100%", duration: 1 }, 3.5);
        tl.fromTo(".elderberry-content", { opacity: 0 }, { opacity: 1, duration: 1 }, 3);
        tl.to(".elderberry-content", { opacity: 0, duration: 1 }, 4);
        tl.fromTo(".vitamin-c-content", { opacity: 0 }, { opacity: 1, duration: 1 }, 4);
        tl.to(".vitamin-c-content", { opacity: 0, duration: 1 }, 5);
        tl.fromTo(".zinc-content", { opacity: 0 }, { opacity: 1, duration: 1 }, 5);
        tl.to(".zinc-content", { opacity: 0, duration: 1 }, 6);
        tl.fromTo(".pillars-content", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, 6);
        tl.to(".pillars-content", { opacity: 0, duration: 1 }, 7);
        tl.fromTo(".testimonials-content", { opacity: 0 }, { opacity: 1, duration: 1 }, 7);
        tl.to(".testimonials-content", { opacity: 0, y: -100, duration: 0.5 }, 7.8);
        tl.fromTo(".final-marquee", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 0.5 }, 7.8);
      });

    }, containerRef);
    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="experience-container relative w-full min-h-screen overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      
      <div className="bottle-main-wrapper fixed inset-0 pointer-events-none z-40 flex items-center justify-center">
        <div className="w-full h-screen max-w-6xl relative flex items-center justify-center">
          <div className="relative w-[300px] md:w-[350px] h-full flex items-center justify-center">
            <Bottle3D />

            {/* BUY Button next to bottle */}
            <div className="buy-button-wrapper absolute right-2 md:right-4 top-[42%] -translate-y-1/2 flex flex-col items-center pointer-events-auto z-50">
              <button className="group relative bg-white text-black rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-black text-[6px] md:text-[7px] border border-black/5 shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:scale-110 transition-transform cursor-pointer outline-none">
                <span className="relative z-10">BUY</span>
                <span className="absolute inset-0 rounded-full bg-white opacity-40 animate-pulse-ring group-hover:hidden"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Hero Section 1 Content */}
      <div className="hero-big-text absolute inset-0 z-40 flex flex-col justify-center px-6 md:px-12 lg:px-20 pointer-events-none">
        <h1 className="font-display text-[clamp(50px,12vw,150px)] lg:text-[165px] leading-[0.8] font-black text-white uppercase tracking-tighter">
          BECAUSE<br />
          BEING SICK<br />
          SUCKS
        </h1>
      </div>

      <div className="hero-bottom-text absolute bottom-24 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none max-w-xs md:max-w-md">
        <p className="text-white text-sm md:text-base font-bold leading-tight uppercase tracking-widest opacity-80">
          BOOST Immunity<br />
          Gummy Vitamin
        </p>
      </div>

      {/* Section 2: Triple Split Content (Left, Center, Right) */}
      
      <div className="slot-machine-container opacity-0 absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
        {/* Large Circular Ring - Pure White Border */}
        <div className="left-circle-graphic opacity-0 absolute left-[-10%] top-[30%] -translate-y-1/2 w-[118vh] h-[118vh] border-2 border-white rounded-full pointer-events-none hidden md:block">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-white rounded-full"></div>
        </div>

        <div className="stay-sick-text opacity-0 absolute left-[5%] top-[60%] -translate-y-1/2 flex flex-col items-start gap-0 z-10 scale-90 md:scale-100">
           <div className="text-white font-black text-6xl md:text-8xl uppercase tracking-tighter leading-[0.8] ml-20 md:ml-32">STAY</div>
           <div className="flex items-center gap-4">
              <div className="text-white font-black text-6xl md:text-8xl uppercase tracking-tighter leading-[0.8]">SICK</div>
              <span className="text-4xl md:text-6xl">🤙</span>
           </div>
           <div className="flex items-center gap-4 mt-2">
              <span className="text-4xl md:text-6xl">🤧</span>
              <div className="text-white font-black text-6xl md:text-8xl uppercase tracking-tighter leading-[0.8]">NOT</div>
           </div>
           <div className="text-white font-black text-6xl md:text-8xl uppercase tracking-tighter leading-[0.8]">SICK</div>
        </div>
      </div>

      {/* Right Side: Proactive Brand Content */}
      <div className="proactive-right absolute right-[4%] md:right-[6%] top-[60%] -translate-y-1/2 flex flex-col items-start max-w-sm md:max-w-md lg:max-w-lg z-30 opacity-0 pointer-events-none">
        <p className="text-white font-black tracking-[0.2em] uppercase text-[10px] md:text-xs mb-6 opacity-80">
          BOOST HELPS YOU GET SICK LESS
        </p>
        <h2 className="font-display text-[clamp(28px,3.5vw,55px)] leading-[0.85] text-white font-black uppercase mb-6 tracking-tighter">
          BE PROACTIVE<br />NOT REACTIVE<br />ABOUT YOUR<br />IMMUNITY
        </h2>
        <p className="text-white/90 text-xs md:text-sm leading-snug mb-8 font-medium max-w-[280px]">
          No one gives a f*ck about their immune system unless they have to...and it took us a pandemic to realize that. BOOST is here to fix that.
        </p>
        <button className="border-2 border-white text-white rounded-full px-16 py-4 font-black text-xs md:text-sm uppercase tracking-widest hover:bg-white hover:text-orange-500 transition-all cursor-pointer pointer-events-auto">
          BUY BOOST
        </button>
      </div>

      {/* Section 3: Ingredients "Mom Love" */}
      <Ingredients />

      {/* Elderberry Section 4 */}
      <div className="elderberry-content absolute inset-0 z-30 flex items-center justify-center opacity-0 pointer-events-none">
        <div className="text-center">
          <h2 className="text-white font-black text-5xl md:text-7xl lg:text-9xl uppercase tracking-tighter">ELDERBERRY</h2>
          <p className="text-white/80 max-w-md mx-auto mt-6 text-sm md:text-lg">Rich in antioxidants and vitamins that may boost your immune system.</p>
        </div>
      </div>

      {/* Vitamin C Section 5 */}
      <div className="vitamin-c-content absolute inset-0 z-30 flex items-center justify-center opacity-0 pointer-events-none">
        <div className="text-center">
          <h2 className="text-white font-black text-5xl md:text-7xl lg:text-9xl uppercase tracking-tighter">VITAMIN C</h2>
          <p className="text-white/80 max-w-md mx-auto mt-6 text-sm md:text-lg">The gold standard for immune support and antioxidant protection.</p>
        </div>
      </div>

      {/* Zinc Section 6 */}
      <div className="zinc-content absolute inset-0 z-30 flex items-center justify-center opacity-0 pointer-events-none">
        <div className="text-center">
          <h2 className="text-white font-black text-5xl md:text-7xl lg:text-9xl uppercase tracking-tighter">ZINC</h2>
          <p className="text-white/80 max-w-md mx-auto mt-6 text-sm md:text-lg">A vital mineral that helps the immune system fight off invading bacteria and viruses.</p>
        </div>
      </div>

      {/* Brand Pillars Section 7 */}
      <div className="pillars-content absolute inset-0 z-30 flex items-center justify-center px-12 md:px-24 opacity-0 pointer-events-none">
        <div className="flex flex-col md:flex-row gap-12 items-center justify-between w-full max-w-7xl">
          <div className="flex-1">
            <h3 className="text-black font-black text-4xl md:text-6xl uppercase leading-none mb-6">CLEAN INGREDIENTS.</h3>
            <p className="text-black/60 text-lg">No artificial colors, no high fructose corn syrup. Just the good stuff.</p>
          </div>
          <div className="flex-1">
            <h3 className="text-black font-black text-4xl md:text-6xl uppercase leading-none mb-6">REAL RESULTS.</h3>
            <p className="text-black/60 text-lg">Scientifically backed ingredients to keep you at your best.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section 8 */}
      <div className="testimonials-content absolute inset-0 z-30 flex flex-col items-center justify-center opacity-0 pointer-events-none">
        <h2 className="text-black font-black text-4xl md:text-6xl lg:text-8xl uppercase tracking-tighter text-center mb-12">
          WORD ON<br/>THE STREET.
        </h2>
      </div>

      {/* Final Marquee & Footer */}
      <div className="final-marquee absolute inset-0 z-40 flex flex-col justify-end opacity-0 pointer-events-none">
        <MarqueeTicker />
        <Footer />
      </div>

    </div>
  );
}