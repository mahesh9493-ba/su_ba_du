import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera, Sparkles } from 'lucide-react';

const MEMORIES = [
  {
    id: 1,
    title: "Where it all began",
    date: "Autumn Afternoon",
    desc: "A warm cup of coffee, endless conversations, and a spark that started everything.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80",
    caption: "The start of something beautiful..."
  },
  {
    id: 2,
    title: "Under the stars",
    date: "Midsummer Night",
    desc: "Counting constellations and realizing the brightest star was sitting right next to me.",
    img: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600&auto=format&fit=crop&q=80",
    caption: "Lost in the night, found in you."
  },
  {
    id: 3,
    title: "Endless sunsets",
    date: "By the Shore",
    desc: "Watching the sun dissolve into the sea, holding hands, and wishing time would freeze always.",
    img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80",
    caption: "Sunsets are warmer with you."
  },
  {
    id: 4,
    title: "Quiet winter walks",
    date: "December Mornings",
    desc: "Wrapping up in warm coats, laughing through the cold, and finding warmth in your smile.",
    img: "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?w=600&auto=format&fit=crop&q=80",
    caption: "Warm hearts in cold weather."
  }
];

// Interactive 3D Tilt Polaroid Card Component
function PolaroidCard({ memory }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shineStyle, setShineStyle] = useState({ opacity: 0 });
  const [imageError, setImageError] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    
    // Relative mouse positions from 0 to 1
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation vectors (limits to max 12 degrees)
    const rotateYVal = ((x / rect.width) - 0.5) * 24;
    const rotateXVal = (0.5 - (y / rect.height)) * 24;
    
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);

    // Reflective glare shine style
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;
    setShineStyle({
      opacity: 0.15,
      background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`
    });
  };

  const handleMouseLeave = () => {
    // Reset to flat
    setRotateX(0);
    setRotateY(0);
    setShineStyle({ opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-[280px] md:w-[320px] bg-[#111216]/95 p-4 rounded-xl border border-luxury-rose/15 polaroid-card select-none relative overflow-hidden transition-all duration-300 pointer-events-auto"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 15px rgba(230,57,70,0.08)'
      }}
    >
      {/* 3D Shine Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-overlay z-20"
        style={shineStyle}
      />

      {/* Frame border */}
      <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-black/40 border border-white/5 mb-4 group">
        {/* Memory Image with Offline Fallback */}
        {imageError ? (
          <div className="w-full h-full bg-gradient-to-br from-[#ae2012]/30 via-[#e63946]/40 to-[#ff8fa3]/30 flex flex-col items-center justify-center p-4 text-center">
            <Camera className="w-10 h-10 text-luxury-rose mb-2 animate-pulse" />
            <span className="text-[10px] tracking-widest text-[#ffccd5] uppercase font-semibold">Our Memory</span>
            <span className="text-[8px] tracking-wider text-white/40 mt-1 uppercase">Surprise Captured</span>
            <Sparkles className="w-3.5 h-3.5 text-white/30 mt-2 animate-spin-slow" style={{ animationDuration: '8s' }} />
          </div>
        ) : (
          <img
            src={memory.img}
            alt={memory.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105 pointer-events-none"
            loading="lazy"
          />
        )}
        {/* Soft shadow inside image frame */}
        <div className="absolute inset-0 shadow-[inset_0_4px_15px_rgba(0,0,0,0.6)] pointer-events-none" />
      </div>

      {/* Polaroid bottom caption */}
      <div className="flex flex-col items-center text-center">
        <span className="text-[10px] tracking-widest uppercase text-luxury-rose font-medium mb-1">
          {memory.date}
        </span>
        <h4 className="text-md font-serif font-semibold text-white/90 mb-2">
          {memory.title}
        </h4>
        <p className="text-xs font-light text-white/50 leading-relaxed px-1 mb-4">
          {memory.desc}
        </p>

        {/* Elegant handwriting signature */}
        <div className="font-handwritten text-2xl text-luxury-rose mt-1 mb-1 filter blur-[0.2px]">
          “{memory.caption}”
        </div>
      </div>
    </div>
  );
}

export default function MemoryTimeline() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 350;
    container.scrollTo({
      left: container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center relative py-12 px-6 overflow-hidden">
      
      {/* Background Parallax Large Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
        <h3 className="font-serif text-[12vw] font-bold text-white/[0.02] tracking-widest uppercase">
          Our Journey
        </h3>
      </div>

      <div className="w-full max-w-6xl flex flex-col relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-md">
            <span className="text-xs uppercase tracking-[0.3em] text-luxury-rose font-medium mb-2 block">
              A Walk Down Memory Lane
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-luxury-gradient leading-tight">
              Chapters of Us
            </h2>
          </div>

          {/* Slider controls */}
          <div className="flex items-center gap-3 mt-6 md:mt-0 pointer-events-auto">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full border border-luxury-rose/15 glassmorphism flex items-center justify-center text-luxury-rose hover:text-white hover:border-luxury-rose/40 hover:scale-105 active:scale-95 transition-all duration-300"
              title="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full border border-luxury-rose/15 glassmorphism flex items-center justify-center text-luxury-rose hover:text-white hover:border-luxury-rose/40 hover:scale-105 active:scale-95 transition-all duration-300"
              title="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Card Track */}
        <div
          ref={scrollContainerRef}
          className="w-full flex items-stretch gap-6 md:gap-8 overflow-x-auto py-8 px-2 scrollbar-none select-none relative snap-x snap-mandatory pointer-events-auto"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none'  // IE
          }}
        >
          {MEMORIES.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="snap-start"
            >
              <PolaroidCard memory={memory} />
            </motion.div>
          ))}
        </div>

        {/* Small Scroll Indication helper */}
        <p className="text-center text-[10px] tracking-widest uppercase text-white/30 font-light mt-8 pointer-events-none">
          Swipe or use arrows to scroll timeline
        </p>
      </div>
    </div>
  );
}
