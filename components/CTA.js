import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-20 md:py-32 px-10 w-full flex flex-col justify-center items-start relative overflow-hidden" style={{ background: 'var(--gradient)' }}>
      <Link href="/shop" className="group relative z-10 flex items-center gap-12">
        <h2 className="font-display text-[clamp(50px,12vw,200px)] leading-[0.85] tracking-tight text-white font-black uppercase">
          GET<br />BOOSTED
        </h2>
        
        {/* Circle Arrow Icon */}
        <div className="hidden md:flex w-[80px] h-[80px] md:w-[140px] md:h-[140px] rounded-full border-[1.5px] border-white items-center justify-center transition-transform duration-500 group-hover:rotate-45">
          <svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2">
            <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>
    </section>
  );
}
