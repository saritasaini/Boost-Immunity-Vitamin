import React from 'react';

export default function Ingredients() {
  return (
    <div className="ingredients-section-content relative w-full h-screen z-30 flex flex-col items-center justify-center overflow-hidden">

      {/* Big Headline - Layered behind bottle */}
      <div className="flex flex-col items-center justify-center w-full px-2 md:px-4 select-none overflow-hidden">
        <h2 className="text-white font-black text-[13.5vw] leading-[0.8] uppercase tracking-tighter text-center whitespace-nowrap">
          INGREDIENTS
        </h2>
        <h2 className="text-white font-black text-[14vw] leading-[0.8] uppercase tracking-tighter text-center whitespace-nowrap mt-0.5 md:mt-1 translate-x-[5vw] md:translate-x-[9vw]">
          YOUR MOM
        </h2>
        <h2 className="text-white font-black text-[14vw] leading-[0.8] uppercase tracking-tighter text-center whitespace-nowrap mt-0.5 md:mt-1 -translate-x-[8vw] md:-translate-x-[12vw]">
          WILL LOVE
        </h2>
      </div>

      {/* Side Text */}
      <div className="absolute left-[5%] md:left-[8%] top-[50%] -translate-y-1/2 max-w-[180px] md:max-w-[250px]">
        <p className="text-white font-bold text-[20px] md:text-[26px] leading-tight uppercase opacity-90">
          AND YOU,<br />
          OF COURSE.
        </p>
      </div>



    </div>
  );
}
