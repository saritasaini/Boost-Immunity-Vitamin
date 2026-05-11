import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-normal">
        <Link href="/" className="flex flex-col group mix-blend-difference">
          <span className="font-display lowercase text-white text-4xl tracking-wide leading-none group-hover:opacity-80 transition-opacity">boost</span>
          <span className="text-white text-[10px] tracking-widest font-bold uppercase mt-1">immunity vitamin</span>
        </Link>

        {/* Desktop Nav Pills */}
        <div className="hidden md:flex items-center gap-8 border border-white rounded-full px-8 py-2 bg-transparent mix-blend-difference">
          {['SHOP', 'ABOUT'].map((item) => (
            <Link
              key={item}
              href={item === 'SHOP' ? '/shop' : `/${item.toLowerCase()}`}
              className="text-white text-sm font-bold tracking-widest hover:opacity-70 transition-opacity"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="border border-white rounded-full px-8 py-2 text-white text-sm font-bold tracking-widest hover:bg-white hover:text-black transition-colors mix-blend-difference"
          >
            CART
          </button>
          
          {/* Mobile Hamburger */}
          <button className="flex flex-col gap-1.5 md:hidden">
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>
        </div>
      </nav>

      {/* Cart Drawer Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] transition-opacity duration-500 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[100%] md:w-[450px] bg-[#F9F6F2] z-[101] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-8 h-full flex flex-col">
          {/* Close Button */}
          <button 
            onClick={() => setIsCartOpen(false)}
            className="w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform mb-12"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Cart Header */}
          <div className="mb-10">
            <h2 className="font-display text-6xl md:text-7xl font-black uppercase tracking-[0.05em] text-black leading-none mb-0">
              CART
            </h2>
            <p className="text-lg md:text-xl font-medium text-black/80 -mt-0.5 md:-mt-1">
              Your cart is empty
            </p>
          </div>

          {/* Go Shopping Link */}
          <Link 
            href="/shop" 
            onClick={() => setIsCartOpen(false)}
            className="group flex items-center gap-3 text-lg font-bold tracking-wide text-black hover:translate-x-2 transition-transform"
          >
            Go Shopping
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>

          <div className="mt-auto pt-8 border-t border-black/10">
            <p className="text-sm text-black/40 font-medium">
              Free shipping on all orders over $50
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
