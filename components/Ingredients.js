import React from 'react';

export default function Ingredients() {
  return (
    <div className="ingredients-section-content absolute inset-0 z-30 flex flex-col items-center justify-center opacity-0 pointer-events-none">
      
      {/* Big Headline - Layered behind bottle */}
      <div className="flex flex-col items-center justify-center w-full px-6 select-none">
        <h2 className="text-white font-black text-[clamp(40px,12vw,160px)] leading-[0.75] uppercase tracking-tighter text-center">
          INGREDIENTS
        </h2>
        <h2 className="text-white font-black text-[clamp(40px,12vw,160px)] leading-[0.75] uppercase tracking-tighter text-center mt-2">
          YOUR MOM
        </h2>
        <h2 className="text-white font-black text-[clamp(40px,12vw,160px)] leading-[0.75] uppercase tracking-tighter text-center mt-2">
          WILL LOVE
        </h2>
      </div>

      {/* Side Text */}
      <div className="absolute left-[5%] md:left-[8%] top-[40%] -translate-y-1/2 max-w-[150px] md:max-w-[200px]">
        <p className="text-white font-black text-[10px] md:text-xs leading-tight uppercase opacity-90">
          AND YOU,<br />
          OF COURSE.
        </p>
      </div>



    </div>
  );
}
