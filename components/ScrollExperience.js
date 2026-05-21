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

        // Initial state set via GSAP to avoid Tailwind conflicts
        gsap.set(".bottle-main-wrapper", { y: -80, scale: 1.18 });
        gsap.set(".hero-big-text", { y: 70, opacity: 1 });
        gsap.set(".hero-bottom-text", { y: 60, opacity: 1 });
        gsap.set(".buy-button-wrapper", { opacity: 1, scale: isMobile ? 0.7 : 1 });
        gsap.set(".stay-sick-text, .left-circle-graphic, .proactive-right", { opacity: 0 });

        // Initial states for orange images (pre-rotated and hidden to prevent Tailwind conflicts)
        gsap.set(".orange-img-1", { opacity: 0, rotation: -95, scale: 0 });
        gsap.set(".orange-img-2", { opacity: 0, rotation: -80, scale: 0 });
        gsap.set(".orange-img-3", { opacity: 0, rotation: -85, scale: 0 });
        gsap.set(".orange-img-4", { opacity: 0, rotation: 80, scale: 0 });

        // Initial states for zinc images (pre-rotated and hidden to prevent Tailwind conflicts)
        gsap.set(".zinc-img-1", { opacity: 0, rotation: -95, scale: 0 });
        gsap.set(".zinc-img-2", { opacity: 0, rotation: -80, scale: 0 });
        gsap.set(".zinc-img-3", { opacity: 0, rotation: -85, scale: 0 });
        gsap.set(".zinc-img-4", { opacity: 0, rotation: 80, scale: 0 });

        // Initial state for zinc background overlay
        gsap.set(".zinc-bg-overlay", { opacity: 0 });


        // Section 2: Slot Machine
        gsap.to(".slot-machine-container", {
          scrollTrigger: {
            trigger: ".slot-machine-container",
            start: "top 75%",
            toggleActions: "play none none none"
          },
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          onStart: () => {
            gsap.to(".slot-machine-container", { pointerEvents: "auto" });
          }
        });

        gsap.to(".stay-sick-text, .left-circle-graphic", {
          scrollTrigger: {
            trigger: ".slot-machine-container",
            start: "top 70%",
            toggleActions: "play none none none"
          },
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
        });

        gsap.to(".proactive-right", {
          scrollTrigger: {
            trigger: ".proactive-right",
            start: "top 75%",
            toggleActions: "play none none none"
          },
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.8,
          ease: "power2.out"
        });

        // Section 3: Ingredients
        gsap.to(".ingredients-section-content", {
          scrollTrigger: {
            trigger: ".ingredients-section-content",
            start: "top 75%",
            toggleActions: "play none none none"
          },
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          pointerEvents: "auto"
        });

        // Section 4: Elderberry Enter Fade-in (decoupled from pin spacer)
        gsap.to(".elderberry-content", {
          scrollTrigger: {
            trigger: ".ingredients-section-content",
            start: "bottom 30%",
            toggleActions: "play none none reverse"
          },
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        });

        // Section 4: Ingredients Multi-Phase pinned storytelling (Elderberry ➔ Orange ➔ Zinc)
        const elderOutTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".elderberry-content",
            start: "top top",
            end: "+=600%",
            pin: true,
            scrub: 1
          }
        });

        // Phase 1: Elderberries remove one-by-one, rotating and scaling up as they hide
        elderOutTl
          .to(".elder-img-1", { opacity: 0, rotation: "+=90", scale: 1.5, duration: 1 })
          .to(".elder-img-3", { opacity: 0, rotation: "-=90", scale: 1.5, duration: 1 })
          .to(".elder-img-2", { opacity: 0, rotation: "+=90", scale: 1.5, duration: 1 })
          .to(".elder-img-4", { opacity: 0, rotation: "-=90", scale: 1.5, duration: 1 });

        // Phase 2: Dynamic Background & Text Transition (Orange to Purple / Elderberry to Orange text)
        elderOutTl
          .to(".purple-bg-overlay", { opacity: 1, duration: 2 })
          .to(".elder-text-block", { opacity: 0, duration: 2 }, "<")
          .to(".orange-text-block", { opacity: 1, duration: 2 }, "<");

        // Phase 3A: Oranges put one-by-one, rotating as they appear
        elderOutTl
          .to(".orange-img-1", { opacity: 0.95, rotation: -5, scale: 1, duration: 1 })
          .to(".orange-img-3", { opacity: 0.95, rotation: 5, scale: 1, duration: 1 })
          .to(".orange-img-2", { opacity: 0.90, rotation: 10, scale: 1, duration: 1 })
          .to(".orange-img-4", { opacity: 0.95, rotation: -10, scale: 1, duration: 1 });

        // Phase 3B: Oranges remove one-by-one, rotating and scaling up as they hide
        elderOutTl
          .to(".orange-img-1", { opacity: 0, rotation: "+=90", scale: 1.5, duration: 1 })
          .to(".orange-img-3", { opacity: 0, rotation: "-=90", scale: 1.5, duration: 1 })
          .to(".orange-img-2", { opacity: 0, rotation: "+=90", scale: 1.5, duration: 1 })
          .to(".orange-img-4", { opacity: 0, rotation: "-=90", scale: 1.5, duration: 1 });

        // Phase 4: Transition 2 (Purple to Light Grey/Lilac / Orange to Zinc text)
        elderOutTl
          .to(".zinc-bg-overlay", { opacity: 1, duration: 2 })
          .to(".orange-text-block", { opacity: 0, duration: 2 }, "<")
          .to(".zinc-text-block", { opacity: 1, duration: 2 }, "<");

        // Phase 5A: Zinc crystals put one-by-one, rotating as they appear
        elderOutTl
          .to(".zinc-img-1", { opacity: 0.95, rotation: -5, scale: 1, duration: 1 })
          .to(".zinc-img-3", { opacity: 0.95, rotation: 5, scale: 1, duration: 1 })
          .to(".zinc-img-2", { opacity: 0.90, rotation: 10, scale: 1, duration: 1 })
          .to(".zinc-img-4", { opacity: 0.95, rotation: -10, scale: 1, duration: 1 });

        // Phase 5B: Zinc crystals remove one-by-one, rotating and scaling up as they hide
        elderOutTl
          .to(".zinc-img-1", { opacity: 0, rotation: "+=90", scale: 1.5, duration: 1 })
          .to(".zinc-img-3", { opacity: 0, rotation: "-=90", scale: 1.5, duration: 1 })
          .to(".zinc-img-2", { opacity: 0, rotation: "+=90", scale: 1.5, duration: 1 })
          .to(".zinc-img-4", { opacity: 0, rotation: "-=90", scale: 1.5, duration: 1 });

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

      {/* Purple background overlay for Elderberry Section 4 */}
      <div
        className="purple-bg-overlay fixed inset-0 z-10 opacity-0 pointer-events-none transition-opacity duration-500"
        style={{ background: 'linear-gradient(135deg, #6f00ff 0%, #929dff 100%)' }}
      />

      {/* Zinc background overlay for Section 4 Zinc Phase */}
      <div
        className="zinc-bg-overlay fixed inset-0 z-12 opacity-0 pointer-events-none transition-opacity duration-500"
        style={{ background: 'linear-gradient(150deg, rgba(230, 230, 250, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(175, 175, 240, 1) 97%)' }}
      />

      <div className="bottle-main-wrapper fixed inset-0 pointer-events-none z-40 flex items-center justify-center">
        <div className="w-full h-screen max-w-6xl relative flex items-center justify-center">
          <div className="hero-canvas-container relative w-[300px] md:w-[350px] h-full flex items-center justify-center">
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
      <div className="hero-big-text absolute inset-0 z-40 flex flex-col justify-center pl-4 md:pl-8 lg:pl-12 pr-6 md:pr-12 lg:pr-20 pointer-events-none">
        <h1 className="font-display text-[clamp(50px,12vw,150px)] lg:text-[165px] leading-[0.8] font-black text-white uppercase tracking-tighter">
          BECAUSE<br />
          BEING SICK<br />
          SUCKS
        </h1>
      </div>

      <div className="hero-bottom-text absolute bottom-26 left-1/2 -translate-x-[40%] z-30 text-center pointer-events-none max-w-xs md:max-w-md">
        <p className="text-white text-sm md:text-base font-bold leading-tight uppercase tracking-widest opacity-80">
          BOOST Immunity<br />
          Gummy Vitamin
        </p>
      </div>

      {/* Section 2: Triple Split Content (Left, Center, Right) */}

      <div className="slot-machine-container opacity-0 absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
        {/* Large Circular Ring - Pure White Border */}
        <div className="left-circle-graphic opacity-0 absolute left-[-2%] top-[44%] -translate-y-1/2 w-[110vh] h-[110vh] border-2 border-white rounded-full pointer-events-none hidden md:block">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-white rounded-full"></div>
        </div>

        <div className="stay-sick-text opacity-0 absolute left-[12%] top-[70%] -translate-y-1/2 flex flex-col items-start gap-0 z-10 scale-90 md:scale-100">
          <div className="text-white font-bold text-6xl md:text-8xl uppercase tracking-tighter leading-[0.8] ml-20 md:ml-32">STAY</div>
          <div className="flex items-center gap-4">
            <div className="text-white font-bold text-6xl md:text-8xl uppercase tracking-tighter leading-[0.8]">SICK</div>
            <span className="text-4xl md:text-6xl">🤙</span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-4xl md:text-6xl">🤧</span>
            <div className="text-white font-bold text-6xl md:text-8xl uppercase tracking-tighter leading-[0.8]">NOT</div>
          </div>
          <div className="text-white font-bold text-6xl md:text-8xl uppercase tracking-tighter leading-[0.8]">SICK</div>
        </div>
      </div>

      {/* Right Side: Proactive Brand Content */}
      <div className="proactive-right absolute right-[4%] md:right-[6%] top-[70%] -translate-y-1/2 flex flex-col items-start max-w-sm md:max-w-md lg:max-w-lg z-30 opacity-0 pointer-events-none">
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

      {/* Section 4: Ingredients Spotlight (Elderberry & Orange & Zinc Three Phase Story) */}
      <div className="elderberry-content absolute inset-0 z-30 flex items-center justify-between px-6 md:px-16 lg:px-24 pointer-events-none select-none">

        {/* Floating Atmospheric Elderberries */}
        <img src="/images/elderberries.png" alt="Elderberry Cluster 1" className="elder-img-1 absolute top-[-15%] left-[10vw] w-[33vw] md:w-[21vw] aspect-square object-contain pointer-events-none opacity-95 blur-[4px] rotate-[-5deg]" />
        <img src="/images/elderberries.png" alt="Elderberry Cluster 2" className="elder-img-2 absolute bottom-[-35%] left-[6vw] w-[42vw] md:w-[28vw] aspect-square object-contain pointer-events-none opacity-90 rotate-[10deg]" />
        <img src="/images/elderberries.png" alt="Elderberry Cluster 3" className="elder-img-3 absolute top-[-20%] right-[-2vw] w-[38vw] md:w-[25vw] aspect-square object-contain pointer-events-none opacity-95 rotate-[5deg]" />
        <img src="/images/elderberries.png" alt="Elderberry Cluster 4" className="elder-img-4 absolute bottom-[-35%] right-[-2vw] w-[40vw] md:w-[26vw] aspect-square object-contain pointer-events-none opacity-95 blur-[5px] rotate-[-10deg]" />

        {/* Floating Atmospheric Oranges (Hidden initially, pre-rotated to rotate in beautifully) */}
        <img src="/images/orange.png" alt="Orange Cluster 1" className="orange-img-1 absolute top-[-15%] left-[10vw] w-[33vw] md:w-[21vw] aspect-square object-contain pointer-events-none blur-[4px]" />
        <img src="/images/orange.png" alt="Orange Cluster 2" className="orange-img-2 absolute bottom-[-35%] left-[6vw] w-[42vw] md:w-[28vw] aspect-square object-contain pointer-events-none" />
        <img src="/images/orange.png" alt="Orange Cluster 3" className="orange-img-3 absolute top-[-20%] right-[-2vw] w-[38vw] md:w-[25vw] aspect-square object-contain pointer-events-none" />
        <img src="/images/orange.png" alt="Orange Cluster 4" className="orange-img-4 absolute bottom-[-35%] right-[-2vw] w-[40vw] md:w-[26vw] aspect-square object-contain pointer-events-none blur-[5px]" />

        {/* Floating Atmospheric Zinc Crystals (Hidden initially, pre-rotated to rotate in beautifully) */}
        <img src="/images/zinc.png" alt="Zinc Cluster 1" className="zinc-img-1 absolute top-[-15%] left-[10vw] w-[38vw] md:w-[25vw] aspect-square object-contain pointer-events-none blur-[4px]" />
        <img src="/images/zinc.png" alt="Zinc Cluster 2" className="zinc-img-2 absolute bottom-[-35%] left-[6vw] w-[48vw] md:w-[33vw] aspect-square object-contain pointer-events-none" />
        <img src="/images/zinc.png" alt="Zinc Cluster 3" className="zinc-img-3 absolute top-[-20%] right-[-2vw] w-[44vw] md:w-[30vw] aspect-square object-contain pointer-events-none" />
        <img src="/images/zinc.png" alt="Zinc Cluster 4" className="zinc-img-4 absolute bottom-[-35%] right-[-2vw] w-[46vw] md:w-[31vw] aspect-square object-contain pointer-events-none blur-[5px]" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto items-center relative z-10">

          {/* ELDERBERRY SECTION TEXT BLOCK */}
          <div className="elder-text-block col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
            <div className="flex flex-col items-start justify-center text-left w-full">
              <p className="text-white/60 tracking-[0.25em] uppercase text-[10px] md:text-xs font-black mb-2 md:mb-4">INGREDIENTS</p>
              <h2 className="text-white font-black text-5xl md:text-6xl lg:text-[75px] uppercase tracking-tighter leading-[0.85] mb-2">ELDERBERRY</h2>
              <h2 className="text-transparent [-webkit-text-stroke:1.5px_white] font-black text-5xl md:text-6xl lg:text-[75px] uppercase tracking-tighter leading-[0.85] mb-2">VITAMIN C</h2>
              <h2 className="text-transparent [-webkit-text-stroke:1.5px_white] font-black text-5xl md:text-6xl lg:text-[75px] uppercase tracking-tighter leading-[0.85]">ZINC</h2>
            </div>
            <div className="flex flex-col items-start justify-center w-full pl-0 md:pl-24 lg:pl-44 translate-x-[3vw] md:translate-x-[6vw]">
              <p className="text-white/60 tracking-[0.25em] uppercase text-[10px] md:text-xs font-black mb-6">BENEFITS</p>
              <div className="flex flex-col w-full text-white font-bold text-base md:text-[17px] tracking-tight">
                <div className="border-b border-white/20 pb-1.5 mb-1.5 w-full">01. Provides Major Cold and Flu Relief</div>
                <div className="border-b border-white/20 pb-1.5 mb-1.5 w-full">02. Alleviates Sinus Infections</div>
                <div className="border-b border-white/20 pb-1.5 mb-1.5 w-full">03. Encourages Healthy Skin</div>
                <div className="border-b border-white/20 pb-1.5 mb-1.5 w-full">04. Reduces Inflammation</div>
              </div>
              <p className="text-white/60 text-[10px] md:text-[11px] font-semibold mt-4">BOOST has 150mg of Elderberry Extract per serving</p>
            </div>
          </div>

          {/* ORANGE / VITAMIN C SECTION TEXT BLOCK (Overlay) */}
          <div className="orange-text-block col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full absolute inset-0 opacity-0 pointer-events-none">
            <div className="flex flex-col items-start justify-center text-left w-full">
              <p className="text-white/60 tracking-[0.25em] uppercase text-[10px] md:text-xs font-black mb-2 md:mb-4">INGREDIENTS</p>
              <h2 className="text-transparent [-webkit-text-stroke:1.5px_white] font-black text-5xl md:text-6xl lg:text-[75px] uppercase tracking-tighter leading-[0.85] mb-2">ELDERBERRY</h2>
              <h2 className="text-white font-black text-5xl md:text-6xl lg:text-[75px] uppercase tracking-tighter leading-[0.85] mb-2">VITAMIN C</h2>
              <h2 className="text-transparent [-webkit-text-stroke:1.5px_white] font-black text-5xl md:text-6xl lg:text-[75px] uppercase tracking-tighter leading-[0.85]">ZINC</h2>
            </div>
            <div className="flex flex-col items-start justify-center w-full pl-0 md:pl-24 lg:pl-44 translate-x-[3vw] md:translate-x-[6vw]">
              <p className="text-white/60 tracking-[0.25em] uppercase text-[10px] md:text-xs font-black mb-6">BENEFITS</p>
              <div className="flex flex-col w-full text-white font-bold text-base md:text-[17px] tracking-tight">
                <div className="border-b border-white/20 pb-1.5 mb-1.5 w-full whitespace-nowrap">01. Improves Common Cold Symptoms</div>
                <div className="border-b border-white/20 pb-1.5 mb-1.5 w-full">02. Holds Antioxidant Properties</div>
                <div className="border-b border-white/20 pb-1.5 mb-1.5 w-full">03. Promotes Glowing Skin</div>
                <div className="border-b border-white/20 pb-1.5 mb-1.5 w-full">04. Enhances Brain Function</div>
              </div>
              <p className="text-white/60 text-[10px] md:text-[11px] font-semibold mt-4">BOOST has 100mg of Vitamin C per serving</p>
            </div>
          </div>

          {/* ZINC SECTION TEXT BLOCK (Overlay - Light theme exactly as in screenshot) */}
          <div className="zinc-text-block col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full absolute inset-0 opacity-0 pointer-events-none">
            <div className="flex flex-col items-start justify-center text-left w-full">
              <p className="text-black/60 tracking-[0.25em] uppercase text-[10px] md:text-xs font-black mb-2 md:mb-4">INGREDIENTS</p>
              <h2 className="text-transparent [-webkit-text-stroke:1.5px_black] font-black text-5xl md:text-6xl lg:text-[75px] uppercase tracking-tighter leading-[0.85] mb-2">ELDERBERRY</h2>
              <h2 className="text-transparent [-webkit-text-stroke:1.5px_black] font-black text-5xl md:text-6xl lg:text-[75px] uppercase tracking-tighter leading-[0.85] mb-2">VITAMIN C</h2>
              <h2 className="text-black font-black text-5xl md:text-6xl lg:text-[75px] uppercase tracking-tighter leading-[0.85]">ZINC</h2>
            </div>
            <div className="flex flex-col items-start justify-center w-full pl-0 md:pl-24 lg:pl-44 translate-x-[3vw] md:translate-x-[6vw]">
              <p className="text-black/60 tracking-[0.25em] uppercase text-[10px] md:text-xs font-black mb-6">BENEFITS</p>
              <div className="flex flex-col w-full text-black font-bold text-base md:text-[17px] tracking-tight">
                <div className="border-b border-black/20 pb-1.5 mb-1.5 w-full">01. Acts as a Powerful Antioxidant</div>
                <div className="border-b border-black/20 pb-1.5 mb-1.5 w-full">02. Helps Balance Hormones</div>
                <div className="border-b border-black/20 pb-1.5 mb-1.5 w-full">03. Maintains Heart Health</div>
                <div className="border-b border-black/20 pb-1.5 mb-1.5 w-full">04. Aids in Digestion</div>
              </div>
              <p className="text-black/60 text-[10px] md:text-[11px] font-semibold mt-4">BOOST has 10mg of Zinc per serving</p>
            </div>
          </div>

        </div>
      </div>

      {/* Footer and other sections removed */}

    </div>
  );
}