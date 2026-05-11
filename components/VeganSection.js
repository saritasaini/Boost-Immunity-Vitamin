import Bottle3D from './Bottle3D';

export default function VeganSection() {
  return (
    <section className="relative w-full min-h-[120vh] overflow-hidden flex items-center py-32"
      style={{ background: '#ffffff' }}>

      {/* Giant stylish text — already loaded, no fading */}
      <div className="w-full px-4 md:px-8 relative z-10">
        <div className="font-display text-[clamp(80px,16vw,240px)] leading-[0.92] text-[#1a1a1a] font-black text-left tracking-[0.02em] uppercase"
          style={{ fontStretch: 'condensed' }}>
          <div>VEGAN</div>
          <div>NON GMO</div>
          <div>NUT FREE</div>
          <div>GLUTEN FREE</div>
          <div>MADE IN USA</div>
        </div>
      </div>

      {/* Bottle - positioned exactly as in ScrollExperience */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-20">
        <div className="w-full h-[600px] md:h-[800px]">
          <Bottle3D />
        </div>
      </div>

      {/* Small description text on the right */}
      <div className="absolute top-[28%] right-[6%] w-[200px] z-30">
        <p className="text-sm font-sans text-gray-500 leading-relaxed">
          A catalyst in promoting a health-conscious lifestyle.
        </p>
      </div>

    </section>
  );
}
