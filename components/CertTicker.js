export default function CertTicker() {
  const items = [
    { text: "Vegan", italic: false },
    { text: "Non GMO", italic: false },
    { text: "Nut Free", italic: false },
    { text: "Gluten Free", italic: true },
    { text: "Made in USA", italic: false }
  ];

  return (
    <div className="w-full py-12 overflow-hidden bg-transparent flex">
      <div className="animate-marquee-left whitespace-nowrap flex items-center">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center">
                <span className={`font-display text-[50px] md:text-[60px] mx-8 tracking-wide uppercase ${item.italic ? 'italic text-white/80' : ''}`}>
                  {item.text}
                </span>
                <span className="text-white/50 text-xl mx-2">•</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
