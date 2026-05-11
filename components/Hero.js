import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-elem", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });

      // Slot machine effect
      gsap.to(".slot-words", {
        yPercent: -50,
        duration: 0.6,
        ease: "back.inOut(1.7)",
        repeat: -1,
        repeatDelay: 2,
        yoyo: true
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 pt-20 pb-10 relative">
      <p className="hero-elem text-caps mb-8 text-white/80">BECAUSE BEING SICK SUCKS</p>
      
      <h1 className="hero-elem flex flex-col items-center mb-6 w-full">
        <span className="font-display text-[clamp(60px,12vw,140px)] leading-[0.8] tracking-tight w-full">BOOST</span>
        <span className="font-display text-[clamp(40px,6vw,90px)] italic text-white/90 leading-[0.9] mt-4">Immunity Gummy Vitamin</span>
      </h1>

      <div className="hero-elem text-3xl md:text-5xl font-display tracking-wide mb-10 flex items-center justify-center gap-4 overflow-hidden h-14 md:h-20 mt-4">
        <span>STAY</span>
        <div className="h-full overflow-hidden relative flex-col justify-start items-center bg-white/10 px-4 rounded">
           <div className="slot-words flex flex-col items-center">
             <span className="h-14 md:h-20 flex items-center">SICK 🤙</span>
             <span className="h-14 md:h-20 flex items-center text-white/70">RAD 🤘</span>
           </div>
        </div>
        <span>NOT</span>
        <div className="h-full overflow-hidden relative flex-col justify-start items-center bg-white/10 px-4 rounded">
           <div className="slot-words flex flex-col items-center">
             <span className="h-14 md:h-20 flex items-center">SICK 🤧</span>
             <span className="h-14 md:h-20 flex items-center text-white/70">WEAK 🤒</span>
           </div>
        </div>
      </div>

      <p className="hero-elem text-base text-white/70 lowercase mb-6 mt-4 tracking-wide">BOOST helps you get sick less</p>
      
      <p className="hero-elem max-w-[560px] text-base md:text-lg mb-12 leading-relaxed font-light opacity-90">
        No one gives a f*ck about their immune system unless they have to...and it took us a pandemic to realize that. BOOST is here to fix that.
      </p>

      <button className="hero-elem group relative px-10 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-sm overflow-hidden transition-transform hover:scale-105 mb-4">
        <span className="relative z-10 group-hover:text-white transition-colors duration-300">Buy BOOST</span>
        <div className="absolute inset-0 h-full w-0 bg-transparent group-hover:w-full transition-all duration-300 ease-out z-0 border border-white rounded-full"></div>
      </button>
    </section>
  );
}
