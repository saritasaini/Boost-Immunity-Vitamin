import Bottle3D from './Bottle3D';

export default function VeganSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center py-20"
      style={{ background: '#fffcf4' }}>

      {/* Giant stylish text — solid black, condensed as in screenshot */}
      <div className="w-full px-6 md:px-12 lg:px-20 relative z-20">
        <div className="font-display whitespace-nowrap text-[clamp(65px,14.5vw,160px)] leading-[0.88] text-black font-black text-left tracking-[0.02em] uppercase"
          style={{ fontStretch: 'condensed' }}>
          <div>&nbsp;&nbsp;&nbsp;VEGAN</div>
          <div>NON GMO</div>
          <div>NUT FREE</div>
          <div>GLUTEN FREE</div>
          <div>MADE IN USA</div>
        </div>
      </div>

      {/* Center container for the BUY bubble, aligning perfectly with the first fixed bottle */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-30">
        <div className="w-[300px] md:w-[350px] h-screen relative flex items-center justify-center">
          {/* We do NOT render a second Bottle3D here to keep the original bottle fixed and prevent canvas lag */}
          {/* BUY Bubble sitting above the bottle cap, exactly as in screenshot */}
          <div className="absolute top-[37%] md:top-[38%] left-[58%] w-10 h-10 md:w-11 md:h-11 rounded-full border border-black bg-white flex items-center justify-center pointer-events-auto cursor-pointer hover:scale-115 active:scale-95 transition-transform shadow-[0_4px_10px_rgba(0,0,0,0.08)] z-30">
            <span className="text-[10px] font-black text-black tracking-wider uppercase">BUY</span>
          </div>
        </div>
      </div>

      {/* Small description text on the right - styled exactly as in screenshot */}
      <div className="absolute top-[45%] right-[6%] md:right-[10%] w-[150px] md:w-[200px] z-30 select-none">
        <p className="text-[11px] md:text-[13px] font-sans font-bold text-neutral-800 leading-snug tracking-tight text-left">
          A catalyst in promoting<br />a health-conscious<br />lifestyle.
        </p>
      </div>

    </section>
  );
}
