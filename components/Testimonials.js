import { useEffect, useState, useRef } from 'react';

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrolledPast = window.innerHeight - rect.top;

      if (scrolledPast > 0) {
        setOffset(scrolledPast * 0.15);
      } else {
        setOffset(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative z-20 w-full min-h-[110vh] md:min-h-[120vh] flex flex-col justify-center py-[150px] md:py-[200px]" style={{ background: '#fffcf4' }}>

      {/* Decorative Large Thin Yellow Circle */}
      <div className="absolute top-[5%] md:top-[10%] left-[-5%] md:left-[-5%] w-[600px] md:w-[630px] h-[400px] md:h-[630px] border-[2px] border-[#ffb800] rounded-full pointer-events-none opacity-80" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center h-full">

        {/* Left Side: Bold Typography */}
        <div className="relative flex flex-col items-start justify-center w-full md:w-[40%] select-none mb-20 md:mb-0 -mt-64 md:-mt-96">
          <div className="relative z-10 font-display text-[clamp(50px,6vw,85px)] leading-[0.85] text-black font-bold uppercase tracking-tight flex flex-col items-start">
            <span className="relative z-10">LET THE</span>
            <span className="relative z-10 ml-[12%] md:ml-[5%] mt-3 flex items-center gap-4">
              <span className="text-[clamp(40px,5vw,75px)]">💪</span> BOOST
            </span>
            <span className="relative z-10 ml-[12%] md:ml-[5%] mt-3 flex items-center gap-4">
              <span className="text-[clamp(40px,5vw,75px)]">💪</span> FLOW
            </span>
            <span className="relative z-10 mt-3">THRU</span>
            <span className="relative z-10 flex items-center gap-1 mt-3">
              &nbsp; YOU <span className="text-[clamp(45px,6vw,80px)] -mt-2">⚡️</span>
            </span>
          </div>
        </div>

        {/* Left Side Additional Floating Cards - Detached from flow */}
        <div className="absolute top-[85%] md:top-[95%] left-[5%] md:left-[10%] w-full max-w-[280px] flex flex-col gap-8 z-30">

          {/* Left Card 1: superman — NO animation */}
          <div className="bg-[#fffcf4] border-[1.5px] border-[#ffb800] rounded-md shadow-none transform -rotate-[8deg] -translate-y-12 md:-translate-y-24 cursor-default w-full overflow-hidden">
            <div className="p-5 md:p-6 pb-6">
              <div className="flex gap-1.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-[18px] h-[18px] text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-black font-medium font-sans text-[17px] leading-snug tracking-tight">
                I haven't sneezed since I took BOOST
              </p><br />
            </div>
            <div className="border-t-[1.5px] border-[#ffb800] p-4 px-5 flex items-center gap-3 bg-[#FAF8F5]">
              <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="13" r="6" />
                  <circle cx="7" cy="7" r="2.5" />
                  <circle cx="17" cy="7" r="2.5" />
                </svg>
              </div>
              <p className="text-black text-[15px] font-medium tracking-wide">@superman</p>
            </div>
          </div>

          {/* Left Card 2: Karenfromyouroffice — NO animation */}
          <div className="bg-[#fffcf4] border-[1.5px] border-[#ffb800] rounded-md shadow-none transform rotate-[6deg] cursor-default w-full overflow-hidden">
            <div className="p-5 md:p-6 pb-6">
              <div className="flex gap-1.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-[18px] h-[18px] text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-black font-medium font-sans text-[17px] leading-snug tracking-tight">
                It's the perfect pick-me-up
              </p><br />
            </div>
            <div className="border-t-[1.5px] border-[#ffb800] p-4 px-5 flex items-center gap-3 bg-[#FAF8F5]">
              <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="13" r="6" />
                  <circle cx="7" cy="7" r="2.5" />
                  <circle cx="17" cy="7" r="2.5" />
                </svg>
              </div>
              <p className="text-black text-[15px] font-medium tracking-wide">@Karenfromyouroffice</p>
            </div>
          </div>

        </div>

        {/* Center: Empty space for the fixed 3D bottle */}
        <div className="hidden md:block w-[20%] pointer-events-none"></div>

        {/* Right Side: Word on the Street & Testimonial Cards */}
        <div className="flex flex-col items-end md:items-start justify-end w-full md:w-[30%] text-center md:text-left pt-10 md:pt-0 transform md:translate-y-[180px]">

          <div className="mb-12">
            <h2 className="font-display text-[clamp(30px,3vw,55px)] font-bold text-black uppercase leading-[0.9] tracking-tight">
              WORD ON<br />THE STREET
            </h2>
            <p className="text-black font-medium text-lg md:text-xl mt-4">
              Trust us with your immunity
            </p>
          </div>

          {/* Floating Sticker Cards */}
          <div className="relative w-full max-w-[280px] flex flex-col -space-y-8 mt-4 z-30">

            {/* Card 1: JesseClemente — WITH animation */}
            <div
              className="bg-[#fffcf4] border-[1.5px] border-[#ffb800] rounded-md shadow-none cursor-default w-[95%] md:w-full ml-auto md:ml-0 overflow-hidden transition-transform duration-300 ease-out"
              style={{ transform: `rotate(5deg) translateY(${offset * 0.5}px)` }}
            >
              <div className="p-5 md:p-6 pb-6">
                <div className="flex gap-1.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-[18px] h-[18px] text-black" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-black font-medium font-sans text-[17px] leading-snug tracking-tight">
                  It's like a refreshing cold shower
                </p><br />
              </div>
              <div className="border-t-[1.5px] border-[#ffb800] p-4 px-5 md:px-6 flex items-center gap-3 bg-[#FAF8F5]">
                <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="13" r="6" />
                    <circle cx="7" cy="7" r="2.5" />
                    <circle cx="17" cy="7" r="2.5" />
                  </svg>
                </div>
                <p className="text-black text-[15px] font-medium tracking-wide">@JesseClemente</p>
              </div>
            </div>

            {/* Card 2: TheentireKUWTKcast — WITH animation */}
            <div
              className="bg-[#fffcf4] border-[1.5px] border-[#ffb800] rounded-md shadow-none cursor-default w-[95%] md:w-full -ml-2 md:-ml-6 overflow-hidden transition-transform duration-300 ease-out"
              style={{ transform: `rotate(-5deg) translateY(${offset}px)` }}
            >
              <div className="p-5 md:p-6 pb-6">
                <div className="flex gap-1.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-[18px] h-[18px] text-black" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-black font-medium font-sans text-[17px] leading-snug tracking-tight">
                  The only [best] way to rise and shine
                </p><br />
              </div>
              <div className="border-t-[1.5px] border-[#ffb800] p-4 px-5 md:px-6 flex items-center gap-3 bg-[#FAF8F5]">
                <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="13" r="6" />
                    <circle cx="7" cy="7" r="2.5" />
                    <circle cx="17" cy="7" r="2.5" />
                  </svg>
                </div>
                <p className="text-black text-[15px] font-medium tracking-wide">@TheentireKUWTKcast</p>
              </div>
            </div>

            {/* Card 3: yourex — WITH animation (1.5x faster) */}
            <div
              className="bg-[#fffcf4] border-[1.5px] border-[#ffb800] rounded-md shadow-none cursor-default w-[95%] md:w-full overflow-hidden transition-transform duration-300 ease-out"
              style={{ transform: `rotate(5deg) translateY(${offset * 1.5}px)` }}
            >
              <div className="p-5 md:p-6 pb-6">
                <div className="flex gap-1.5 mb-4">
                  <svg className="w-[18px] h-[18px] text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} className="w-[18px] h-[18px] text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-black font-medium font-sans text-[17px] leading-snug tracking-tight">
                  I hate it
                </p><br />
              </div>
              <div className="border-t-[1.5px] border-[#ffb800] p-4 px-5 flex items-center gap-3 bg-[#FAF8F5]">
                <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="13" r="6" />
                    <circle cx="7" cy="7" r="2.5" />
                    <circle cx="17" cy="7" r="2.5" />
                  </svg>
                </div>
                <p className="text-black text-[15px] font-medium tracking-wide">@yourex</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}