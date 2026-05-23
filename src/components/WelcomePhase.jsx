import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Sparkles } from 'lucide-react';

const DAILY_REGISTRY = {
  may23: {
    dateLabel: "May 23 - 8 Days to Destiny",
    chapterTitle: "Chapter I: Peach Tea Comfort",
    clue: "Think of your special lowercase nickname, our favorite digital character (@), and our anniversary year... bagi + @ + 02",
    loveNote: "Today, let's remember the first time we stayed up all night sharing warm comfort talks. Every day is a sweet step closer! 🍑☕",
    bgMesh1: "from-amber-500/20 to-rose-500/5",
    bgMesh2: "from-orange-400/15 to-rose-600/5",
    borderColor: "border-orange-400/30 hover:border-orange-300/60",
    glowColor: "rgba(249, 115, 22, 0.4)",
    textGlow: "drop-shadow-[0_4px_10px_rgba(249,115,22,0.35)]",
    shackleColor: "#f97316",
    heartColors: ["#ffedd5", "#f97316", "#ea580c"],
    lockBorder: "border-orange-500/20 group-hover:opacity-60",
    highlightColor: "text-orange-300"
  },
  may24: {
    dateLabel: "May 24 - 7 Days to Destiny",
    chapterTitle: "Chapter II: Mint Lavender Meadows",
    clue: "Spelling your beautiful name in lowercase, followed by the signature email character, and our double digit: bagi + @ + 02",
    loveNote: "Seven days remaining! You make my world feel as fresh and calm as walking through lavender fields under a morning sun. 🌿💜",
    bgMesh1: "from-emerald-500/15 to-teal-500/5",
    bgMesh2: "from-violet-500/15 to-fuchsia-900/5",
    borderColor: "border-teal-400/30 hover:border-violet-300/60",
    glowColor: "rgba(20, 184, 166, 0.4)",
    textGlow: "drop-shadow-[0_4px_10px_rgba(20,184,166,0.35)]",
    shackleColor: "#14b8a6",
    heartColors: ["#ccfbf1", "#14b8a6", "#0f766e"],
    lockBorder: "border-teal-500/20 group-hover:opacity-60",
    highlightColor: "text-teal-300"
  },
  may25: {
    dateLabel: "May 25 - 6 Days to Destiny",
    chapterTitle: "Chapter III: Stardust Cosmic Blue",
    clue: "Spelling your name in lowercase + the connecting email symbol + our double-digit key: bagi + @ + 02",
    loveNote: "Six days remaining. Every single star in the sky represents a sweet second I want to spend sharing warm mountain sunset talks with you. ✨🌌",
    bgMesh1: "from-blue-600/20 to-indigo-900/5",
    bgMesh2: "from-cyan-500/15 to-purple-800/5",
    borderColor: "border-blue-400/30 hover:border-cyan-300/60",
    glowColor: "rgba(59, 130, 246, 0.4)",
    textGlow: "drop-shadow-[0_4px_10px_rgba(59,130,246,0.35)]",
    shackleColor: "#3b82f6",
    heartColors: ["#dbeafe", "#3b82f6", "#1d4ed8"],
    lockBorder: "border-blue-500/20 group-hover:opacity-60",
    highlightColor: "text-blue-300"
  },
  may26: {
    dateLabel: "May 26 - 5 Days to Destiny",
    chapterTitle: "Chapter IV: Cinnamon Hugs",
    clue: "A warm password reminder: Dudu's nickname for Bagi, the link symbol, and the double digit anniversary number: bagi + @ + 02",
    loveNote: "Five days left. Wishing you the coziest warm afternoon hug. Our journey is the sweetest adventure I've ever experienced. 🍂🍁",
    bgMesh1: "from-amber-600/20 to-yellow-600/5",
    bgMesh2: "from-red-700/15 to-orange-900/5",
    borderColor: "border-amber-500/30 hover:border-amber-400/60",
    glowColor: "rgba(245, 158, 11, 0.4)",
    textGlow: "drop-shadow-[0_4px_10px_rgba(245,158,11,0.35)]",
    shackleColor: "#d97706",
    heartColors: ["#fef3c7", "#f59e0b", "#d97706"],
    lockBorder: "border-amber-500/20 group-hover:opacity-60",
    highlightColor: "text-amber-300"
  },
  may27: {
    dateLabel: "May 27 - 4 Days to Destiny",
    chapterTitle: "Chapter V: Lavender Velvet Sleep",
    clue: "The coziest clue: lowercase nickname + keycap symbol + the magical double-digit that triggers the reveal: bagi + @ + 02",
    loveNote: "Four days left! Counting down to cozy blanket fort talks and warm lazy morning smiles. You are my home and my coziest space. 🛌💖",
    bgMesh1: "from-indigo-500/20 to-purple-800/5",
    bgMesh2: "from-pink-500/15 to-rose-900/5",
    borderColor: "border-indigo-400/30 hover:border-pink-300/60",
    glowColor: "rgba(99, 102, 241, 0.4)",
    textGlow: "drop-shadow-[0_4px_10px_rgba(99,102,241,0.35)]",
    shackleColor: "#6366f1",
    heartColors: ["#e0e7ff", "#6366f1", "#4f46e5"],
    lockBorder: "border-indigo-500/20 group-hover:opacity-60",
    highlightColor: "text-indigo-300"
  },
  may28: {
    dateLabel: "May 28 - 3 Days to Destiny",
    chapterTitle: "Chapter VI: Lemon Sherbet Spark",
    clue: "Almost there! Type your signature lowercase nickname, our digital link character, and the low-digits: bagi + @ + 02",
    loveNote: "Three days left! The excitement is building up. Every single chime of our crystal music box ticks in rhythm with my heartbeat. 🍋💛",
    bgMesh1: "from-yellow-500/20 to-amber-400/5",
    bgMesh2: "from-lime-500/15 to-emerald-900/5",
    borderColor: "border-yellow-400/30 hover:border-lime-300/60",
    glowColor: "rgba(234, 179, 8, 0.4)",
    textGlow: "drop-shadow-[0_4px_10px_rgba(234, 179, 8,0.35)]",
    shackleColor: "#eab308",
    heartColors: ["#fef9c3", "#eab308", "#ca8a04"],
    lockBorder: "border-yellow-500/20 group-hover:opacity-60",
    highlightColor: "text-yellow-300"
  },
  may29: {
    dateLabel: "May 29 - 2 Days to Destiny",
    chapterTitle: "Chapter VII: Rose Quartz Sunset",
    clue: "Getting super close! Enter your lowercase nickname, the @ sign, and our double-digit year key: bagi + @ + 02",
    loveNote: "Two days until our magical reveal opens! Getting the coziest mountain sunset chais ready. Our cozy dream realm is almost here. 🌅💗",
    bgMesh1: "from-rose-400/20 to-orange-400/5",
    bgMesh2: "from-pink-500/15 to-purple-900/5",
    borderColor: "border-rose-400/30 hover:border-pink-300/60",
    glowColor: "rgba(244, 63, 94, 0.4)",
    textGlow: "drop-shadow-[0_4px_10px_rgba(244, 63, 94,0.35)]",
    shackleColor: "#f43f5e",
    heartColors: ["#ffe4e6", "#f43f5e", "#be123c"],
    lockBorder: "border-rose-500/20 group-hover:opacity-60",
    highlightColor: "text-rose-300"
  },
  may30: {
    dateLabel: "May 30 - 1 Day to Destiny",
    chapterTitle: "Chapter VIII: Heartbeat Crimson",
    clue: "The final step! Lowercase nickname, email at-sign, and the double digit anniversary number: bagi + @ + 02",
    loveNote: "Only one single day remains! Tomorrow, midnight opens the gateway to our grand cinematic celebration. My heart is racing! 🥁🔥",
    bgMesh1: "from-red-600/20 to-rose-700/5",
    bgMesh2: "from-red-500/15 to-black/5",
    borderColor: "border-red-500/30 hover:border-rose-400/60",
    glowColor: "rgba(220, 38, 38, 0.4)",
    textGlow: "drop-shadow-[0_4px_10px_rgba(220, 38, 38, 0.35)]",
    shackleColor: "#dc2626",
    heartColors: ["#fee2e2", "#dc2626", "#991b1b"],
    lockBorder: "border-red-500/20 group-hover:opacity-60",
    highlightColor: "text-red-400"
  },
  may31: {
    dateLabel: "May 31 - The Special Day",
    chapterTitle: "Happy Birthday Bagi!",
    clue: "Happy Birthday, my love! Use your signature key to unlock the grand reveal: bagi + @ + 02",
    loveNote: "Today, the gateway opens! Happy Birthday to the coziest morning smile and the love of my life. Thank you for being mine. 🎂🎉💖",
    bgMesh1: "from-yellow-400/20 to-rose-600/5",
    bgMesh2: "from-red-600/15 to-yellow-600/5",
    borderColor: "border-yellow-400/30 hover:border-rose-400/60",
    glowColor: "rgba(234, 179, 8, 0.5)",
    textGlow: "drop-shadow-[0_4px_15px_rgba(234,179,8,0.55)]",
    shackleColor: "#ca8a04",
    heartColors: ["#fef9c3", "#ca8a04", "#854d0e"],
    lockBorder: "border-yellow-500/30 group-hover:opacity-75",
    highlightColor: "text-yellow-400"
  }
};

export default function WelcomePhase({ onUnlock, onPreUnlock }) {
  const [key, setKey] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null);

  // Auto-calculate the active day based on system calendar date
  const getSystemDayKey = () => {
    const today = new Date();
    const month = today.getMonth(); // 0-indexed, 4 = May
    const date = today.getDate();
    
    if (month === 4) { // May
      if (date === 24) return 'may24';
      if (date === 25) return 'may25';
      if (date === 26) return 'may26';
      if (date === 27) return 'may27';
      if (date === 28) return 'may28';
      if (date === 29) return 'may29';
      if (date === 30) return 'may30';
      if (date >= 31) return 'may31';
    }
    return 'may23'; // Default fallback
  };

  const selectedDayKey = getSystemDayKey();
  const activeDayConfig = DAILY_REGISTRY[selectedDayKey] || DAILY_REGISTRY.may23;

  // Auto focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleContainerClick = () => {
    if (inputRef.current && !isSuccess) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    if (isSuccess) return;
    const val = e.target.value;
    
    // Prevent excessive typing overflow
    if (val.length > 12) return;
    
    setKey(val);

    // Case-insensitive automatic unlock trigger when 'bagi@02' is fully typed
    if (val.toLowerCase() === 'bagi@02') {
      setIsSuccess(true);
      setIsError(false);
      
      // Synchronously unlock audio context inside user gesture to bypass browser autoplay blocks
      if (window.unlockSurpriseAudio) {
        window.unlockSurpriseAudio();
      }
      if (onPreUnlock) {
        onPreUnlock();
      }
      
      // Delay transition for success animation to play out
      setTimeout(() => {
        onUnlock();
      }, 1200);
    } else if (val.length >= 7) {
      // Trigger error immediately if they complete 7 characters and it doesn't match
      setIsError(true);
      
      setTimeout(() => {
        setIsError(false);
        setKey('');
      }, 800);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isSuccess && key !== '') {
      if (key.toLowerCase() === 'bagi@02') {
        setIsSuccess(true);
        setIsError(false);
        
        if (window.unlockSurpriseAudio) {
          window.unlockSurpriseAudio();
        }
        if (onPreUnlock) {
          onPreUnlock();
        }
        
        setTimeout(() => {
          onUnlock();
        }, 1200);
      } else {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
          setKey('');
        }, 800);
      }
    }
  };

  // Listen to physical keyboard events globally for a seamless feel
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (isSuccess || e.ctrlKey || e.altKey || e.metaKey) return;
      
      if (e.key.length === 1 && document.activeElement !== inputRef.current) {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isSuccess]);

  // Shake animation variant
  const cardVariants = {
    idle: { scale: 1 },
    error: {
      x: [0, -12, 12, -12, 12, -6, 6, 0],
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    success: {
      scale: [1, 0.98, 1.05, 1.08],
      boxShadow: `0px 0px 50px ${activeDayConfig.glowColor}`,
      borderColor: "rgba(255, 255, 255, 0.4)",
      transition: { duration: 1.0, ease: "easeOut" }
    }
  };

  const handleMouseMove = (e) => {
    if (isSuccess) return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    const rotateX = -(y / (box.height / 2)) * 12;
    const rotateY = (x / (box.width / 2)) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative z-20 px-4 py-8 select-none overflow-hidden">
      
      {/* 1. Dynamic Animated Premium Background Meshes matching Chapter Theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.15, 0.9, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute -left-[10%] -top-[10%] w-[350px] h-[350px] md:w-[650px] md:h-[650px] rounded-full bg-gradient-to-tr ${activeDayConfig.bgMesh1} filter blur-[80px] md:blur-[120px] mix-blend-screen opacity-70 transition-all duration-1000`}
        />
        <motion.div
          animate={{
            x: [0, -60, 60, 0],
            y: [0, 50, -50, 0],
            scale: [1, 0.85, 1.15, 1]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute -right-[10%] -bottom-[10%] w-[350px] h-[350px] md:w-[650px] md:h-[650px] rounded-full bg-gradient-to-bl ${activeDayConfig.bgMesh2} filter blur-[80px] md:blur-[120px] mix-blend-screen opacity-60 transition-all duration-1000`}
        />
      </div>

      <motion.div
        key="welcome-card"
        variants={cardVariants}
        animate={isSuccess ? "success" : isError ? "error" : "idle"}
        onClick={handleContainerClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          rotateX: isHovered && !isSuccess ? tilt.x : 0,
          rotateY: isHovered && !isSuccess ? tilt.y : 0,
          scale: isSuccess ? 1.04 : isHovered ? 1.015 : 1,
        }}
        transition={isHovered ? { type: "spring", stiffness: 350, damping: 25 } : { duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        style={{ transformStyle: "preserve-3d", perspective: 1200 }}
        className={`w-full max-w-lg p-6 md:p-10 rounded-3xl glassmorphism-luxury border ${activeDayConfig.borderColor} flex flex-col items-center text-center shadow-3xl relative overflow-hidden cursor-pointer transition-all duration-1000`}
      >
        {/* Subtle decorative futuristic grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:16px_28px] pointer-events-none" />

        {/* Ambient card neon border light */}
        <div className={`absolute inset-0 border border-t-white/20 border-l-white/15 border-r-white/5 border-b-white/5 rounded-3xl pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-40'}`} />

        {/* Dynamic visual key portal - Heart/Portal lock representation */}
        <div 
          className="relative w-24 h-24 flex items-center justify-center mb-6"
          style={{ transform: "translateZ(50px)" }}
        >
          {/* Circular neon orbital trail */}
          <motion.div
            animate={{
              scale: isSuccess ? [1, 1.4, 1.25] : [1, 1.08, 1],
              rotate: isSuccess ? 180 : [0, 360],
            }}
            transition={{
              scale: isSuccess ? { duration: 0.8, ease: "easeOut" } : { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: isSuccess ? { duration: 0.8, ease: "easeOut" } : { duration: 12, repeat: Infinity, ease: "linear" }
            }}
            className={`absolute inset-0 rounded-full border border-dashed transition-all duration-700 ${
              isSuccess 
                ? 'border-rose-400 bg-rose-500/10 shadow-[0_0_35px_rgba(244,63,94,0.5)]'
                : isError
                ? 'border-red-500 bg-red-950/20 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                : `${activeDayConfig.borderColor} bg-black/15 shadow-[0_0_20px_${activeDayConfig.glowColor}]`
            }`}
          />

          {/* Inner ambient portal aura glow */}
          <div className={`absolute w-14 h-14 rounded-full filter blur-md opacity-40 transition-all duration-700 bg-gradient-to-tr ${activeDayConfig.bgMesh1}`} />

          {/* Beautiful Custom Heart-Lock SVG with 3D Popout */}
          <motion.div
            animate={isSuccess ? { scale: [1, 1.35, 1], rotateY: 360 } : {}}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="relative z-10"
          >
            <svg 
              width="50" 
              height="50" 
              viewBox="0 0 64 64" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="portalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isSuccess ? "#ff8fa3" : isError ? "#f87171" : activeDayConfig.heartColors[0]} />
                  <stop offset="50%" stopColor={isSuccess ? "#ff4d6d" : isError ? "#dc2626" : activeDayConfig.heartColors[1]} />
                  <stop offset="100%" stopColor={isSuccess ? "#c9184a" : isError ? "#991b1b" : activeDayConfig.heartColors[2]} />
                </linearGradient>
                <filter id="svgGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              <g filter="url(#svgGlow)">
                {/* Main Heart Shape Lock Base */}
                <path 
                  d="M32 12 C24 12 18 17 18 24 C18 36 32 46 32 46 C32 46 46 36 46 24 C46 17 40 12 32 12 Z" 
                  fill="url(#portalGrad)" 
                  opacity="0.95"
                />
                
                {/* Highlight shackle of the lock - opens on success */}
                <motion.path 
                  d="M24 24 V16 C24 11.5 27.5 8 32 8 C36.5 8 40 11.5 40 16 V24" 
                  stroke="url(#portalGrad)" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-700"
                  animate={isSuccess ? { 
                    y: -6, 
                    rotate: -35,
                    originX: "24px",
                    originY: "24px"
                  } : {}}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                
                {/* Runic Keyhole in the center */}
                <path 
                  d="M32 21 C30.6 21 29.5 22.1 29.5 23.5 C29.5 24.5 30.1 25.3 31 25.7 V31.5 C31 32 31.4 32.5 32 32.5 C32.6 32.5 33 32 33 31.5 V25.7 C33.9 25.3 34.5 24.5 34.5 23.5 C34.5 22.1 33.4 21 32 21 Z" 
                  fill={isSuccess ? "#ffccd5" : "#110204"} 
                  className="transition-colors duration-300"
                />
              </g>
            </svg>
          </motion.div>

          {/* Burst Particles of hearts and sparkles on correct key input */}
          {isSuccess && (
            <div className="absolute inset-0 pointer-events-none z-20">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: 0, 
                    scale: Math.random() * 0.9 + 0.5,
                    x: (Math.random() - 0.5) * 160,
                    y: (Math.random() - 0.5) * 160 - 25,
                    rotate: Math.random() * 360
                  }}
                  transition={{ duration: 1.2, delay: i * 0.04, ease: "easeOut" }}
                  className="absolute left-1/2 top-1/2 w-4 h-4 text-rose-400"
                  style={{ marginLeft: '-8px', marginTop: '-8px' }}
                >
                  {i % 2 === 0 ? '❤️' : '✨'}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Narrative Headings with depth effects */}
        <span 
          style={{ transform: "translateZ(30px)" }}
          className={`text-[9px] md:text-[10px] tracking-[0.45em] uppercase font-semibold mb-2.5 relative z-10 block transition-colors duration-1000 ${activeDayConfig.highlightColor}`}
        >
          The Gateway of Tomorrow
        </span>
        
        <h1 
          style={{ transform: "translateZ(40px)" }}
          className={`text-3xl md:text-5xl font-serif font-bold bg-gradient-to-r from-white via-rose-100 to-rose-200 bg-clip-text text-transparent tracking-wide mb-3 leading-tight relative z-10 transition-all duration-1000 ${activeDayConfig.textGlow}`}
        >
          Unlocking a Dream
        </h1>
        
        <p 
          style={{ transform: "translateZ(25px)" }}
          className="text-xs md:text-sm font-light text-white/70 leading-relaxed mb-6 max-w-sm relative z-10"
        >
          Dudu's dream awaits. Enter the secret key to begin the journey.
        </p>

        {/* Unlock Input Area */}
        <div 
          style={{ transform: "translateZ(45px)" }}
          className="relative w-full max-w-[260px] flex flex-col items-center z-10"
        >
          {/* Hidden HTML input for keyboard control (works on both mobile & desktop) */}
          <input
            ref={inputRef}
            type="text"
            value={key}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-20"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />

          {/* Majestic Holographic Key Display Frame */}
          <div className="relative group w-full">
            {/* Shifting outer holographic border glow */}
            <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${activeDayConfig.bgMesh1} blur opacity-30 transition-opacity duration-500 group-hover:opacity-60 ${isSuccess ? 'opacity-100 animate-pulse' : ''}`} />
            
            <motion.div 
              animate={isSuccess ? { scale: [1, 1.05, 1], borderColor: '#f43f5e' } : {}}
              className={`w-full h-14 rounded-2xl border flex items-center justify-center font-mono text-base md:text-lg font-bold tracking-[0.18em] transition-all duration-500 relative overflow-hidden ${
                isSuccess 
                  ? 'border-rose-400 bg-rose-500/20 text-rose-300 shadow-[0_0_25px_rgba(244,63,94,0.35)]' 
                  : isError 
                  ? 'border-red-500 bg-red-950/20 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.35)]' 
                  : key !== '' 
                  ? 'border-white/50 bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                  : 'border-white/10 bg-black/35 text-white/20'
              }`}
            >
              {key === '' ? (
                <div className="flex items-center gap-2 text-white/25">
                  <Key className="w-4 h-4 opacity-40 animate-[pulse_2s_infinite]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-light">Enter Secret Key</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>{key}</span>
                  {!isSuccess && !isError && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className={`w-2 h-5 ml-1 inline-block rounded-sm shadow-[0_0_8px_#ff8fa3] bg-current`}
                    />
                  )}
                </div>
              )}
            </motion.div>
          </div>

          <span className="text-[9px] uppercase tracking-widest text-white/40 mt-3 block font-medium transition-colors duration-300">
            {isSuccess ? 'Access Granted' : isError ? 'Incorrect Key' : 'Tap & type the code'}
          </span>
        </div>

        {/* Dynamic Daily Clue & Message Tray */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full mt-6 p-4 rounded-2xl bg-white/5 border border-white/5 relative z-10 flex flex-col items-center text-center shadow-inner"
        >
          <div className="flex items-center gap-1.5 font-semibold mb-1">
            <Sparkles className={`w-3.5 h-3.5 animate-pulse ${activeDayConfig.highlightColor}`} />
            <span className={`text-[8.5px] uppercase tracking-[0.22em] ${activeDayConfig.highlightColor}`}>
              {activeDayConfig.dateLabel}
            </span>
          </div>
          
          <h4 className="text-white text-xs font-serif font-bold tracking-wide mb-1 transition-all duration-1000">
            {activeDayConfig.chapterTitle}
          </h4>
          
          <p className="text-[10px] sm:text-[11px] text-white/60 font-light leading-relaxed max-w-sm italic mb-2.5 transition-all duration-1000">
            "{activeDayConfig.loveNote}"
          </p>

        </motion.div>
      </motion.div>
    </div>
  );
}
