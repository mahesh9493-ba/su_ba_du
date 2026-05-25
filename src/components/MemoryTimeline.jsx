import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Camera, Sparkles, Heart, Star, CloudRain, Clock } from 'lucide-react';

const CHAPTERS = [
  {
    id: 1,
    title: "Our First Glimpse of Destiny — Tirumala Roads ❤️",
    theme: "The Trip That Quietly Changed Everything",
    narration: [
      "Tirumala was not just another trip.",
      "It quietly became the beginning of something neither of them expected.",
      "Somewhere between temple roads, group laughter, and silent little moments…",
      "Dudu slowly started noticing Bagi differently.",
      "Without saying anything… that journey stayed in his heart forever."
    ],
    img: "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?w=800&auto=format&fit=crop&q=80",
    effect: "diyas",
    accent: "from-orange-500/20 via-amber-500/10 to-transparent",
    glow: "shadow-[0_0_40px_rgba(245,158,11,0.25)] border-orange-500/20"
  },
  {
    id: 2,
    title: "A Ride of Eternal Comfort — Airport Road & Rain Bike Ride ❤️",
    theme: "The Ride Dudu Never Wanted to End",
    narration: [
      "Some memories are beautiful because of what happened…",
      "And some become unforgettable because of how they felt.",
      "That rainy airport road ride… the cold wind, the rain drops, and Bagi sitting behind him quietly…",
      "Dudu wished that road would never end.",
      "Sometimes, peace looks like a rainy road ride with the right person. ❤️"
    ],
    img: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop&q=80",
    effect: "rain",
    accent: "from-blue-500/20 via-teal-500/10 to-transparent",
    glow: "shadow-[0_0_40px_rgba(59,130,246,0.25)] border-blue-500/20"
  },
  {
    id: 3,
    title: "Watching Sunrises with You — Nandi Hills ❤️",
    theme: "Watching Sunrises Together",
    narration: [
      "At Nandi Hills, it was not about the sunrise anymore…",
      "For Dudu, the most beautiful view there… was Bagi smiling beside him.",
      "As the cold wind blew and others stood around, Dudu felt a tiny bit possessive inside… but seeing Bagi smile only at him, a deep, happy warmth filled his heart.",
      "Some mornings become memories forever."
    ],
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    effect: "fog",
    accent: "from-yellow-500/20 via-orange-500/10 to-transparent",
    glow: "shadow-[0_0_40px_rgba(234,179,8,0.25)] border-yellow-500/20"
  },
  {
    id: 4,
    title: "Whispered Prayers in Silence — Arunachalam Paths ❤️",
    theme: "The Spiritual Memory",
    narration: [
      "Some journeys bring peace to the mind…",
      "But Arunachalam gave peace to Dudu’s heart.",
      "Walking beside Bagi through temple paths… felt like a blessing he never asked for, but always needed.",
      "In that silence, his prayers slowly started including her."
    ],
    img: "https://images.unsplash.com/photo-1604599211621-492d7134e6b2?w=800&auto=format&fit=crop&q=80",
    effect: "bells",
    accent: "from-red-500/20 via-orange-500/10 to-transparent",
    glow: "shadow-[0_0_40px_rgba(239,68,68,0.25)] border-red-500/20"
  },
  {
    id: 5,
    title: "Simple Talks & Sweet Comfort — Burger King Chitchats ❤️",
    theme: "The Conversations That Became Comfort",
    narration: [
      "What started as random conversations… slowly became comfort.",
      "Burger King was never just about food anymore…",
      "It became the place where hours felt like minutes.",
      "Small talks, random jokes, and simple moments… started becoming Dudu’s favorite memories."
    ],
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80",
    effect: "cozy",
    accent: "from-rose-500/20 via-pink-500/10 to-transparent",
    glow: "shadow-[0_0_40px_rgba(244,63,94,0.25)] border-rose-500/20"
  },
  {
    id: 6,
    title: "Sweet Bites of Pure Joy — Waffle Stories ❤️",
    theme: "Sweet Little Memories",
    narration: [
      "Some memories are serious.",
      "And some are just sweet little moments that make the heart smile.",
      "Waffle stories, random teasing, shared desserts, and uncontrollable laughter…",
      "Those tiny moments slowly became unforgettable."
    ],
    img: "https://images.unsplash.com/photo-1573821663912-569905455b1c?w=800&auto=format&fit=crop&q=80",
    effect: "hearts",
    accent: "from-pink-500/20 via-rose-500/10 to-transparent",
    glow: "shadow-[0_0_40px_rgba(236,72,153,0.25)] border-pink-500/20"
  },
  {
    id: 7,
    title: "Growing Together Side-by-Side — Studying Together ❤️",
    theme: "The Comfort of Presence",
    narration: [
      "Even silence started feeling beautiful around Bagi.",
      "Studying together, sharing notes, small glances, and peaceful conversations…",
      "Dudu slowly realized… her presence itself had become his comfort."
    ],
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
    effect: "lamp",
    accent: "from-amber-600/20 via-yellow-500/10 to-transparent",
    glow: "shadow-[0_0_40px_rgba(217,119,6,0.25)] border-amber-600/20"
  },
  {
    id: 8,
    title: "Your Warm Voice in the Dark — Late Night Office Calls ❤️",
    theme: "No Matter How Busy Life Became",
    narration: [
      "No matter how busy life became…",
      "They still found time for each other.",
      "Meetings after office, metro journeys, evening chai talks, and tired smiles… slowly became part of their routine happiness.",
      "Love was no longer in big moments.",
      "It quietly started living inside everyday life."
    ],
    video: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c02b5e7d07936a28290f6ed5e2fc092e&profile_id=139&oauth2_token_id=57447761",
    effect: "metro",
    accent: "from-teal-500/20 via-cyan-500/10 to-transparent",
    glow: "shadow-[0_0_40px_rgba(20,184,166,0.25)] border-teal-500/20"
  },
  {
    id: 9,
    title: "Peace Under Warm Street Lights — Night Walks in Streets ❤️",
    theme: "The Nights That Felt Peaceful",
    narration: [
      "Some of their best memories were never planned.",
      "No expensive places. No grand celebrations. Just long night walks, quiet roads, street lights, and endless conversations.",
      "Sometimes they talked for hours… and sometimes they simply walked in silence.",
      "But even silence felt beautiful beside each other.",
      "Dudu slowly realized… peace was no longer a place.",
      "It was walking beside Bagi on quiet nights. ❤️",
      "The cold breeze, random jokes, late-night chai, and those peaceful walks through empty streets… slowly became memories he never wanted to forget."
    ],
    img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80",
    effect: "night",
    accent: "from-purple-900/35 via-black/20 to-transparent",
    glow: "shadow-[0_0_40px_rgba(147,51,234,0.22)] border-purple-500/20"
  }
];

// Interactive Parallax Polaroid Component with specific emotional animations
function CinematicFrame({ chapter }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 12;
    const rotateY = (x / (rect.width / 2)) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered ? tilt.x : 0,
        rotateY: isHovered ? tilt.y : 0,
        scale: isHovered ? 1.02 : 1
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={`relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border glassmorphism bg-black/40 ${chapter.glow} p-2.5 sm:p-4`}
    >
      {/* 1. Base Image or Looping Metro Journey Video */}
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/40">
        {chapter.video ? (
          <video
            src={chapter.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover pointer-events-none scale-[1.02]"
          />
        ) : imageError ? (
          <div className="w-full h-full bg-gradient-to-br from-rose-950/40 via-black to-luxury-darker flex flex-col items-center justify-center p-4">
            <Camera className="w-10 h-10 text-rose-400 mb-2 animate-pulse" />
            <span className="text-[10px] tracking-widest text-[#ffccd5] uppercase font-bold">Memory Frame</span>
          </div>
        ) : (
          <img
            src={chapter.img}
            alt={chapter.theme}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-[4s] ease-out hover:scale-105 pointer-events-none"
            loading="lazy"
          />
        )}

        {/* Ambient Dark Cinema Shading */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

        {/* 2. Theme Specific Particle Layer */}
        {chapter.effect === 'rain' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-85">
            <div className="absolute inset-0 rain-drop-container">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute bg-sky-200/40 w-[1px] h-12 animate-rain" 
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-${Math.random() * 20}%`,
                    animationDuration: `${Math.random() * 0.8 + 0.5}s`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {chapter.effect === 'diyas' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-70">
            {[...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-orange-400/80 filter blur-[0.5px]"
                initial={{ opacity: 0.1, y: "110%", x: `${Math.random() * 90}%` }}
                animate={{
                  opacity: [0.1, 0.7, 0],
                  y: ["110%", "-10%"],
                  x: [`${Math.random() * 90}%`, `${Math.random() * 90 + (Math.random() - 0.5) * 15}%`]
                }}
                transition={{
                  duration: Math.random() * 6 + 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 4
                }}
                style={{ fontSize: `${Math.random() * 10 + 10}px` }}
              >
                🕯️
              </motion.span>
            ))}
          </div>
        )}

        {chapter.effect === 'fog' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-overlay opacity-50">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent filter blur-md animate-fog-drift" />
          </div>
        )}

        {chapter.effect === 'bells' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-65">
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-yellow-300/40"
                initial={{ opacity: 0, scale: 0.8, y: "90%", x: `${Math.random() * 90}%` }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: ["90%", "10%"],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: Math.random() * 5 + 4,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: Math.random() * 3
                }}
                style={{ fontSize: `${Math.random() * 8 + 8}px` }}
              >
                ✨
              </motion.span>
            ))}
          </div>
        )}

        {chapter.effect === 'hearts' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-80">
            {[...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-pink-400/80"
                initial={{ opacity: 0.1, y: "110%", x: `${Math.random() * 90}%` }}
                animate={{
                  opacity: [0.1, 0.8, 0],
                  y: ["110%", "-10%"],
                  x: [`${Math.random() * 90}%`, `${Math.random() * 90 + (Math.random() - 0.5) * 15}%`],
                  rotate: [0, Math.random() * 45 - 22.5]
                }}
                transition={{
                  duration: Math.random() * 5 + 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 3
                }}
                style={{ fontSize: `${Math.random() * 12 + 10}px` }}
              >
                💖
              </motion.span>
            ))}
          </div>
        )}

        {chapter.effect === 'lamp' && (
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_10%,rgba(245,158,11,0.22)_0%,transparent_60%)] mix-blend-screen" />
        )}

        {chapter.effect === 'night' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-70">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3.5 h-3.5 rounded-full bg-amber-400/40 filter blur-[1.5px]"
                initial={{ 
                  opacity: 0.1, 
                  y: `${Math.random() * 80 + 10}%`, 
                  x: "115%" 
                }}
                animate={{
                  opacity: [0.1, 0.7, 0.1],
                  x: ["115%", "-15%"],
                  y: [
                    `${Math.random() * 80 + 10}%`, 
                    `calc(${Math.random() * 80 + 10}% + ${(Math.random() - 0.5) * 35}px)`
                  ]
                }}
                transition={{
                  duration: Math.random() * 10 + 8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 6
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Chapter Metadata HUD */}
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-end pointer-events-none z-20"
      >
        <div>
          <span className="text-[7.5px] sm:text-[9px] uppercase tracking-[0.3em] text-rose-300 font-bold block mb-1">
            {chapter.theme}
          </span>
          <h4 className="text-sm sm:text-lg font-serif font-bold text-white tracking-wide">
            {chapter.title}
          </h4>
        </div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10 bg-black/45 flex items-center justify-center text-rose-400">
          <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-[pulse_3s_infinite]" />
        </div>
      </div>
    </motion.div>
  );
}

export default function MemoryTimeline() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(1);

  // Track vertical scroll progress within portal context
  const handleScroll = (e) => {
    const el = e.currentTarget;
    const progress = el.scrollTop / (el.scrollHeight - el.clientHeight);
    setScrollProgress(progress);

    // Calculate active chapter based on scroll position
    const sectionHeight = el.scrollHeight / (CHAPTERS.length + 2); // +2 for intro/outro margins
    const currentSection = Math.floor(el.scrollTop / sectionHeight);
    const activeId = Math.min(Math.max(currentSection, 1), CHAPTERS.length);
    setActiveChapter(activeId);
  };

  return (
    <div 
      onScroll={handleScroll}
      className="fixed inset-0 w-full h-full overflow-y-auto bg-luxury-darker select-none pointer-events-auto custom-scrollbar"
      ref={containerRef}
    >
      {/* 1. Global Custom Background Mesh Shader */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute w-[500px] h-[500px] sm:w-[900px] sm:h-[900px] rounded-full transition-all duration-[1.5s] ease-out filter blur-[100px] sm:blur-[180px] opacity-35 -left-[10%] -top-[10%] bg-gradient-to-tr"
          style={{
            backgroundImage: `radial-gradient(circle, var(--tw-gradient-stops))`,
            stops: CHAPTERS[activeChapter - 1]?.accent || "from-rose-500/20 via-pink-500/10 to-transparent"
          }}
        />
        <div className="absolute w-full h-full bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] opacity-15" />
      </div>

      {/* 2. Floating Timeline Progress Indicator HUD (Desktop only) */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center z-50 select-none pointer-events-none">
        <span className="text-[7.5px] uppercase tracking-[0.25em] text-white/35 font-bold mb-3">Memory</span>
        
        <div className="w-[2px] h-48 bg-white/5 relative rounded-full overflow-hidden flex flex-col justify-between py-1">
          {/* Active progress fill */}
          <div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-rose-500 to-red-500 rounded-full transition-all duration-300"
            style={{ height: `${scrollProgress * 100}%` }}
          />
          {/* Timeline dots */}
          {CHAPTERS.map((ch) => (
            <div 
              key={ch.id} 
              className={`w-1.5 h-1.5 rounded-full border transition-all duration-500 -ml-[2px] relative z-10 ${
                activeChapter === ch.id 
                  ? 'bg-rose-500 border-rose-400 scale-125 shadow-[0_0_8px_#ff8fa3]' 
                  : activeChapter > ch.id
                  ? 'bg-red-400 border-red-500'
                  : 'bg-white/10 border-white/5'
              }`}
            />
          ))}
        </div>
        
        <span className="text-[12px] font-bold text-rose-400 font-serif mt-3">
          {String(activeChapter).padStart(2, '0')}
        </span>
      </div>

      {/* 3. INTIMATE CINEMATIC COVER HEADER */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <span className="text-xs sm:text-sm uppercase tracking-[0.4em] text-rose-300 font-bold mb-4 block">
            A Walk Down Memory Lane
          </span>
          <h1 className="text-4xl sm:text-7xl font-serif font-black tracking-wide bg-gradient-to-r from-white via-rose-100 to-rose-200 bg-clip-text text-transparent leading-tight drop-shadow-[0_4px_15px_rgba(244,63,94,0.35)] mb-6">
            Our Memories ❤️
          </h1>
          
          <div className="w-16 h-px bg-rose-500/30 my-2" />
          
          <p className="text-sm sm:text-lg font-light text-white/50 leading-relaxed max-w-md italic mb-10">
            "These are the simple moments, unexpected journeys, and quiet conversations that built our story."
          </p>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-[9px] uppercase tracking-[0.25em] text-white/30 cursor-pointer"
          >
            <span>Scroll Down to Enter the Diary</span>
            <ChevronDown className="w-4 h-4 text-rose-400" />
          </motion.div>
        </motion.div>
      </div>

      {/* 4. CHRONOLOGICAL CINEMATIC DIARY SECTION TRACK */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-12 relative z-10 flex flex-col gap-24 sm:gap-40 pb-20">
        {CHAPTERS.map((chapter, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={chapter.id}
              className={`min-h-[75vh] flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-16 relative ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Photo Frame Column */}
              <div className="w-full lg:w-1/2 flex items-center justify-center">
                <CinematicFrame chapter={chapter} />
              </div>

              {/* Story Narrative Column */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center px-2 sm:px-6">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.25 }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.35,
                        delayChildren: 0.15
                      }
                    }
                  }}
                  className="flex flex-col gap-4 sm:gap-5"
                >
                  {/* Glowing Chapter Index */}
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-rose-400/90 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse text-rose-400" />
                    Moment {chapter.id}
                  </span>

                  {/* Narration Paragraph Blocks */}
                  {chapter.narration.map((paragraph, pIdx) => {
                    const isLast = pIdx === chapter.narration.length - 1;
                    const isSpecialEnding = 
                      (isLast && chapter.id === 2) || 
                      (chapter.id === 9 && pIdx === 5); // Airport road & Night walks glowing texts
                    
                    return (
                      <motion.p
                        key={pIdx}
                        variants={{
                          hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
                          visible: { opacity: 1, y: 0, filter: "blur(0px)" }
                        }}
                        transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                        className={`text-sm sm:text-base leading-relaxed tracking-wide font-light ${
                          isSpecialEnding
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300 font-bold drop-shadow-[0_0_12px_rgba(244,63,94,0.35)] py-1.5'
                            : isLast
                            ? 'text-white/95 font-serif italic'
                            : 'text-white/60'
                        }`}
                      >
                        {paragraph}
                      </motion.p>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. MEMORY CINEMATIC COLLAGE MONTAGE OUTRO */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 px-4 py-20 bg-gradient-to-b from-transparent to-luxury-darker/60">
        
        {/* Outro Narrative Title */}
        <div className="text-center mb-12 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-rose-300 font-bold mb-3 block">
              Forever Engraved
            </span>
            
            <p className="text-sm sm:text-base leading-relaxed text-white/70 font-light tracking-wide italic mb-4">
              “What started as random moments… Slowly became the most beautiful page of Dudu & Bagi’s life.”
            </p>
            
            <p className="text-sm sm:text-base leading-relaxed text-white/70 font-light tracking-wide italic mb-4">
              “Today, these are not just memories anymore…”
            </p>
            
            <p className="text-sm sm:text-base leading-relaxed text-[#ffccd5] font-serif font-bold tracking-wide italic mb-4">
              “They are the moments that quietly built their story. ❤️”
            </p>

            <div className="w-12 h-px bg-rose-500/20 my-4" />

            <p className="text-xs sm:text-sm leading-relaxed text-rose-200/95 font-light tracking-wider max-w-lg mb-4">
              “And yet, what you read here is barely 1% of the infinite universe of moments Dudu holds in his heart for you. 
              There are countless late-night calls, silly arguments, and quiet smiles...”
            </p>

            <p className="text-xs sm:text-sm leading-relaxed text-rose-300 font-serif font-semibold italic tracking-wide max-w-lg mb-8">
              “But these are the milestones where everything changed—where every single time, Dudu experienced a completely new emotion with you. From the sweet anger of small teasings, to that quiet, warm pinch of possessiveness, to the absolute peace of walking beside you under street lights. ❤️”
            </p>

            {/* Ultimate glowing header text */}
            <h2 className="text-3xl sm:text-5xl font-serif font-black bg-gradient-to-r from-rose-400 via-pink-300 to-rose-400 bg-clip-text text-transparent tracking-wide leading-tight drop-shadow-[0_0_20px_rgba(244,63,94,0.5)] animate-pulse">
              Our Memories… Forever Beautiful. ❤️
            </h2>
          </motion.div>
        </div>

        {/* Cinematic Grid Collage Frame */}
        <div className="w-full max-w-5xl px-4 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative">
          {CHAPTERS.map((ch, index) => (
            <motion.div
              key={ch.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 0.8, scale: 1, y: 0 }}
              whileHover={{ opacity: 1, scale: 1.03, zIndex: 10 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.8, ease: "easeOut" }}
              className="aspect-square rounded-xl overflow-hidden border border-white/5 shadow-2xl relative cursor-pointer"
            >
              {ch.video ? (
                <video
                  src={ch.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-[1.03] pointer-events-none"
                />
              ) : (
                <img 
                  src={ch.img} 
                  alt={ch.theme} 
                  className="w-full h-full object-cover pointer-events-none transition-transform duration-[3s] hover:scale-105"
                />
              )}
              {/* Inner frame ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 text-[8px] sm:text-[9.5px] uppercase tracking-widest text-white/80 font-serif leading-none font-bold">
                {ch.theme.split(" ")[0]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Styles Injector for premium animations */}
      <style>{`
        .rain-drop-container {
          transform: rotate(15deg);
        }
        @keyframes fallRain {
          0% { transform: translateY(-100%); opacity: 0; }
          30% { opacity: 0.75; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-rain {
          animation: fallRain 1s linear infinite;
        }
        @keyframes driftFog {
          0% { transform: translateX(-50%); }
          50% { transform: translateX(50%); }
          100% { transform: translateX(-50%); }
        }
        .animate-fog-drift {
          animation: driftFog 20s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
}
