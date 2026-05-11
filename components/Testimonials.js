export default function Testimonials() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto bg-transparent text-center border-t border-white/10">
      <h2 className="font-display text-[clamp(40px,6vw,70px)] mb-24 leading-[1.1] tracking-wide">
        Let the <span className="inline-block mx-1">💪</span> BOOST <span className="inline-block mx-1">💪</span> flow thru you <span className="inline-block mx-1">⚡️</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 text-left px-4 md:px-10">
        <div className="pl-8 border-l-[3px] border-white/80">
          <p className="text-2xl md:text-4xl italic mb-6 leading-snug font-serif font-light">
            "I haven't sneezed since I took BOOST"
          </p>
          <p className="text-caps text-white/60 tracking-widest">
            @superman
          </p>
        </div>

        <div className="pl-8 border-l-[3px] border-white/80">
          <p className="text-2xl md:text-4xl italic mb-6 leading-snug font-serif font-light">
            "It's the perfect pick-me-up"
          </p>
          <p className="text-caps text-white/60 tracking-widest">
            @Karenfromyouroffice
          </p>
        </div>
      </div>
    </section>
  );
}
