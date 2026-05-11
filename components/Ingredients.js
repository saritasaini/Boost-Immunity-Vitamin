import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function Ingredients() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".ing-card", {
        scrollTrigger: {
          trigger: ".ing-cards-container",
          start: "top 85%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const items = [
    { name: "ELDERBERRY", img: "/images/elderberries.png" },
    { name: "VITAMIN C", img: "/images/orange.png" },
    { name: "ZINC", img: "/images/zinc.png" }
  ];

  return (
    <section ref={sectionRef} className="w-full py-24 bg-transparent overflow-hidden relative">
      <div className="px-6 mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 max-w-7xl mx-auto">
        <h2 className="font-display text-[clamp(60px,8vw,100px)] italic leading-[0.8] uppercase">
          INGRED—<br/>IENTS
        </h2>
        <p className="italic text-white/70 max-w-xs md:text-right text-lg md:text-xl pb-2 font-serif tracking-wide">
          And you, of course. Your mom will love it.
        </p>
      </div>

      {/* Marquee Row 1 */}
      <div className="w-full py-8 mb-20 relative flex overflow-hidden border-t border-white/20 group">
        <div className="animate-marquee-left whitespace-nowrap flex items-center group-hover:pause-on-hover">
          {[...items, ...items, ...items, ...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center mx-10 gap-10">
              <img src={item.img} alt={item.name} className="w-24 h-24 object-cover clip-path-circle" />
              <span className="font-display text-5xl md:text-6xl tracking-wide">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Ingredient Cards */}
      <div className="ing-cards-container max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        {[
          { name: "Elderberry", img: "/images/elderberries.png" },
          { name: "Vitamin C", img: "/images/orange.png" },
          { name: "Zinc", img: "/images/zinc.png" }
        ].map((item, i) => (
          <div key={i} className="ing-card flex flex-col items-center group">
            <div className="w-full aspect-square mb-8 overflow-hidden relative border border-white/10 bg-white/5 flex items-center justify-center p-10 rounded-2xl group-hover:bg-white/10 transition-colors">
              <img src={item.img} alt={item.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110" />
            </div>
            <h3 className="font-display text-4xl md:text-5xl tracking-wider uppercase">{item.name}</h3>
          </div>
        ))}
      </div>

      {/* Marquee Row 2 */}
      <div className="w-full py-8 relative flex overflow-hidden border-y border-white/20 group">
        <div className="animate-marquee-left whitespace-nowrap flex items-center group-hover:pause-on-hover">
          {[...items, ...items, ...items, ...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center mx-10 gap-10">
              <span className="font-display text-5xl md:text-6xl tracking-wide opacity-50">{item.name}</span>
              <img src={item.img} alt={item.name} className="w-24 h-24 object-cover clip-path-circle opacity-50 grayscale" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
