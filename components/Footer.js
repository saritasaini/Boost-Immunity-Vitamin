import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full px-10 pt-32 pb-16 text-white font-sans flex flex-col gap-32 brand-gradient">
      
      {/* GET BOOSTED CTA Section */}
      <div className="w-full">
        <Link href="/shop" className="group relative z-10 flex items-center gap-12 max-w-max">
          <h2 className="font-display text-[clamp(50px,12vw,150px)] leading-[0.85] tracking-tight text-white font-black uppercase">
            GET<br />BOOSTED
          </h2>
          <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-white flex items-center justify-center group-hover:bg-white group-hover:text-[#ff710d] transition-all duration-500">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-16 md:h-16">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </Link>
      </div>

      {/* Footer Links & Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 border-t border-white/20 pt-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <span className="font-display text-4xl leading-none">boost</span>
            <span className="text-[10px] tracking-[0.3em] font-bold uppercase mt-2 opacity-80">immunity vitamin</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed opacity-60">
            The first company exclusively dedicated to your immune system. Because being sick sucks.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] tracking-[0.2em] font-black uppercase opacity-40">Shop</h4>
            <Link href="/shop" className="text-sm font-bold hover:opacity-60 transition-opacity">Gummies</Link>
            <Link href="/shop" className="text-sm font-bold hover:opacity-60 transition-opacity">Bundles</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] tracking-[0.2em] font-black uppercase opacity-40">Company</h4>
            <Link href="/about" className="text-sm font-bold hover:opacity-60 transition-opacity">About</Link>
            <Link href="#" className="text-sm font-bold hover:opacity-60 transition-opacity">Contact</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] tracking-[0.2em] font-black uppercase opacity-40">Social</h4>
            <Link href="#" className="text-sm font-bold hover:opacity-60 transition-opacity">Instagram</Link>
            <Link href="#" className="text-sm font-bold hover:opacity-60 transition-opacity">Twitter</Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/10">
        <p className="text-[10px] tracking-widest opacity-40 uppercase font-bold">
          © 2026 BOOST IMMUNITY. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-8">
          <Link href="#" className="text-[10px] tracking-widest opacity-40 hover:opacity-100 uppercase font-bold transition-opacity">Privacy</Link>
          <Link href="#" className="text-[10px] tracking-widest opacity-40 hover:opacity-100 uppercase font-bold transition-opacity">Terms</Link>
        </div>
      </div>
    </footer>
  );
}