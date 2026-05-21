import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Key, Sparkles } from 'lucide-react';

export default function WelcomePhase({ onUnlock, onPreUnlock }) {
  const [key, setKey] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null);

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

    // Case-insensitive automatic unlock trigger when 'bagi@02' is fully typed (7 characters)
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
    // Also allow manual validation by pressing Enter
    if (e.key === 'Enter' && !isSuccess && key !== '') {
      if (key.toLowerCase() === 'bagi@02') {
        setIsSuccess(true);
        setIsError(false);
        
        // Synchronously unlock audio context inside user gesture to bypass browser autoplay blocks
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
      
      // Auto-focus the hidden input if the user starts typing printable keys
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
      boxShadow: "0px 0px 50px rgba(230, 57, 70, 0.7)",
      borderColor: "rgba(255, 143, 163, 0.9)",
      transition: { duration: 1.0, ease: "easeOut" }
    }
  };

  const handleMouseMove = (e) => {
    if (isSuccess) return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Max rotation 12 degrees
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
    <div className="min-h-screen flex items-center justify-center relative z-20 px-4 py-8 select-none overflow-hidden">
      {/* 1. Dynamic Animated Premium Background Meshes */}
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
          className="absolute -left-[10%] -top-[10%] w-[350px] h-[350px] md:w-[650px] md:h-[650px] rounded-full bg-gradient-to-tr from-luxury-red/20 to-luxury-ruby/5 filter blur-[80px] md:blur-[120px] mix-blend-screen opacity-70"
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
          className="absolute -right-[10%] -bottom-[10%] w-[350px] h-[350px] md:w-[650px] md:h-[650px] rounded-full bg-gradient-to-bl from-luxury-rose/15 to-purple-900/5 filter blur-[80px] md:blur-[120px] mix-blend-screen opacity-60"
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
        className="w-full max-w-lg p-8 md:p-12 rounded-3xl glassmorphism-luxury border border-white/10 flex flex-col items-center text-center shadow-3xl relative overflow-hidden cursor-pointer"
      >
        {/* Subtle decorative futuristic grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:16px_28px] pointer-events-none" />

        {/* Ambient card neon border light */}
        <div className={`absolute inset-0 border border-t-white/20 border-l-white/15 border-r-white/5 border-b-white/5 rounded-3xl pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-40'}`} />

        {/* Dynamic visual key portal - Heart/Portal lock representation */}
        <div 
          className="relative w-28 h-28 flex items-center justify-center mb-8"
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
                ? 'border-luxury-rose bg-luxury-red/10 shadow-[0_0_35px_rgba(255,143,163,0.5)]'
                : isError
                ? 'border-red-500 bg-red-950/20 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                : 'border-luxury-rose/30 hover:border-luxury-rose/60 bg-black/10'
            }`}
          />

          {/* Inner ambient portal aura glow */}
          <div className={`absolute w-18 h-18 rounded-full filter blur-md opacity-40 transition-all duration-700 ${
            isSuccess ? 'bg-luxury-rose' : isError ? 'bg-red-600 animate-pulse' : 'bg-luxury-red'
          }`} />

          {/* Beautiful Custom Heart-Lock SVG with 3D Popout */}
          <motion.div
            animate={isSuccess ? { scale: [1, 1.35, 1], rotateY: 360 } : {}}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="relative z-10"
          >
            <svg 
              width="56" 
              height="56" 
              viewBox="0 0 64 64" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="portalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color={isSuccess ? "#ff8fa3" : isError ? "#f87171" : "#ffffff"} />
                  <stop offset="50%" stop-color={isSuccess ? "#ff4d6d" : isError ? "#dc2626" : "#ffccd5"} />
                  <stop offset="100%" stop-color={isSuccess ? "#c9184a" : isError ? "#991b1b" : "#e63946"} />
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
                
                {/* Golden/Crimson highlight shackle of the lock - opens on success */}
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
                  className="absolute left-1/2 top-1/2 w-4 h-4 text-luxury-rose"
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
          className="text-[9px] md:text-[10px] tracking-[0.45em] text-luxury-rose uppercase font-semibold mb-3 relative z-10 block"
        >
          The Gateway of Tomorrow
        </span>
        
        <h1 
          style={{ transform: "translateZ(40px)" }}
          className="text-3xl md:text-5xl font-serif font-bold text-luxury-gradient tracking-wide mb-4 leading-tight relative z-10 drop-shadow-[0_4px_10px_rgba(230,57,70,0.25)]"
        >
          Unlocking a Dream
        </h1>
        
        <p 
          style={{ transform: "translateZ(25px)" }}
          className="text-xs md:text-sm font-light text-white/70 leading-relaxed mb-8 max-w-sm relative z-10"
        >
          Dudu's dream awaits. Enter the secret key to begin the journey.
        </p>

        {/* Unlock Input Area */}
        <div 
          style={{ transform: "translateZ(45px)" }}
          className="relative w-full max-w-[280px] flex flex-col items-center z-10"
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
            <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-luxury-red to-luxury-rose blur opacity-30 transition-opacity duration-500 group-hover:opacity-60 ${isSuccess ? 'opacity-100 animate-pulse' : ''}`} />
            
            <motion.div 
              animate={isSuccess ? { scale: [1, 1.05, 1], borderColor: '#ff8fa3' } : {}}
              className={`w-full h-16 rounded-2xl border flex items-center justify-center font-mono text-lg md:text-xl font-bold tracking-[0.18em] transition-all duration-500 relative overflow-hidden ${
                isSuccess 
                  ? 'border-luxury-rose bg-luxury-red/20 text-luxury-rose shadow-[0_0_25px_rgba(255,143,163,0.35)]' 
                  : isError 
                  ? 'border-red-500 bg-red-950/20 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.35)]' 
                  : key !== '' 
                  ? 'border-white/50 bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                  : 'border-white/10 bg-black/35 text-white/20'
              }`}
            >
              {/* If empty, show key icon and placeholder */}
              {key === '' ? (
                <div className="flex items-center gap-2 text-white/25">
                  <Key className="w-5 h-5 opacity-40 animate-[pulse_2s_infinite]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-sans font-light">Enter Secret Key</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>{key}</span>
                  {/* Blinking cursor */}
                  {!isSuccess && !isError && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-2.5 h-6 bg-luxury-rose ml-1 inline-block rounded-sm shadow-[0_0_8px_#ff8fa3]"
                    />
                  )}
                </div>
              )}
            </motion.div>
          </div>

          <span className="text-[10px] uppercase tracking-widest text-white/40 mt-4 block font-medium transition-colors duration-300">
            {isSuccess ? 'Access Granted' : isError ? 'Incorrect Key' : 'Tap & type the code'}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
