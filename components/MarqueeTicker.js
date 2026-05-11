export default function MarqueeTicker() {
  const text = "• AN IMMUNITY VITAMIN • IT'S LIKE A CONDOM FOR YOUR HEALTH • AN IMMUNITY VITAMIN • FOMO FOR YOUR HEALTH • BECAUSE BEING SICK SUCKS • AN IMMUNITY VITAMIN • DON'T PANIC, TAKE BOOST • BOOST YOUR IMMUNITY ";

  return (
    <div className="marquee-ticker-container">
      <div className="w-full bg-transparent overflow-hidden py-4 flex flex-col justify-center">
        <div className="flex w-max animate-marquee-left hover:pause-on-hover">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="font-display text-lg md:text-xl tracking-widest text-white px-8 leading-none marquee-ticker-span font-bold">
              {text}
            </span>
          ))}
        </div>
        <div className="flex w-max animate-marquee-right hover:pause-on-hover mt-0.5">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="font-display text-lg md:text-xl tracking-widest text-white/80 px-8 leading-none marquee-ticker-span font-bold">
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
