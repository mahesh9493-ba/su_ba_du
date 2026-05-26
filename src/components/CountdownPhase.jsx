import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NARRATIVES = [
  "Ticking towards cozy mountain sunset chai talks... ☕🌅",
  "Every second brings us closer to a lifetime of warm hugs and smiles. 🤗❤️",
  "Counting down to late-night chats and cozy morning smiles. 🛌✨",
  "Our hearts are looping in perfect harmony, ticking towards our special day. 🔄💖",
  "Getting ready for sweet workout high-fives and everyday laughs. 🏃‍♂️💨"
];

const THEMES = {
  days: {
    name: "Cozy Space",
    desc: "A warm, peaceful space with floating clouds and glowing sunset tones.",
    titleGlow: "drop-shadow-[0_4px_25px_rgba(244,63,94,0.35)] bg-gradient-to-r from-rose-400 via-white to-orange-300",
    meshGlow: "bg-rose-500/5 filter blur-[100px]",
    orbitBorder: "border-rose-300/30 hover:border-rose-400/60",
    orbitGlow: "shadow-[0_0_25px_rgba(244,63,94,0.25)]",
    pulseClass: "heartbeat-glow",
    textColor: "text-rose-300/90",
    gradientStart: "#ff9a9e",
    gradientEnd: "#fecfef",
    particles: ['🌸', '✨'],
  },
  hours: {
    name: "Sunset Alignment",
    desc: "A golden sunset alignment showcasing hours remaining.",
    titleGlow: "drop-shadow-[0_4px_25px_rgba(245,158,11,0.45)] bg-gradient-to-r from-amber-400 via-white to-yellow-300",
    meshGlow: "bg-orange-500/10 filter blur-[110px]",
    orbitBorder: "border-amber-400/40 hover:border-yellow-300/70",
    orbitGlow: "shadow-[0_0_30px_rgba(245,158,11,0.4)]",
    pulseClass: "shadow-[0_0_35px_rgba(245,158,11,0.25)] animate-pulse",
    textColor: "text-amber-300/90",
    gradientStart: "#f59e0b",
    gradientEnd: "#d97706",
    particles: ['✨', '💛'],
  },
  minutes: {
    name: "Stardust Drift",
    desc: "A cute neon plasma space detailing minutes remaining.",
    titleGlow: "drop-shadow-[0_4px_25px_rgba(255,143,163,0.5)] bg-gradient-to-r from-pink-400 via-white to-rose-300",
    meshGlow: "bg-pink-600/10 filter blur-[120px]",
    orbitBorder: "border-pink-400/40 hover:border-pink-300/80",
    orbitGlow: "shadow-[0_0_35px_rgba(255,143,163,0.45)]",
    pulseClass: "shadow-[0_0_40px_rgba(255,143,163,0.3)]",
    textColor: "text-pink-300/90",
    gradientStart: "#ff8fa3",
    gradientEnd: "#ff4d6d",
    particles: ['⭐', '💖'],
  },
  seconds: {
    name: "Heartbeat Nebula",
    desc: "A dramatic, intimate countdown of pure seconds.",
    titleGlow: "drop-shadow-[0_4px_35px_rgba(244,63,94,0.8)] bg-gradient-to-r from-red-500 via-white to-rose-500 animate-pulse",
    meshGlow: "bg-red-500/15 filter blur-[130px] animate-pulse",
    orbitBorder: "border-red-400/60 hover:border-rose-400/90 seconds-pulse",
    orbitGlow: "shadow-[0_0_45px_rgba(244,63,94,0.75)]",
    pulseClass: "shadow-[0_0_50px_rgba(244,63,94,0.45)] heartbeat-glow",
    textColor: "text-red-400/95 font-bold tracking-[0.1em]",
    gradientStart: "#f43f5e",
    gradientEnd: "#881337",
    particles: ['🔥', '❤️'],
  }
};

export default function CountdownPhase({ onCountdownComplete, targetDate, onThemeChange, onBypassPhase }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [petals, setPetals] = useState([]);
  const [narrativeIdx, setNarrativeIdx] = useState(0);

  // Cinematic Time-Travel Simulation variables for Demo Switcher
  const [simulationMode, setSimulationMode] = useState(null); // null, 'days', 'hours', 'minutes', 'seconds'
  const [simulatedTarget, setSimulatedTarget] = useState(0);
  const [isSwapperOpen, setIsSwapperOpen] = useState(false);

  // Calculate active stage theme based on remaining countdown metrics
  let activeTheme = 'days';
  if (timeLeft.days > 0) {
    activeTheme = 'days';
  } else if (timeLeft.hours > 0) {
    activeTheme = 'hours';
  } else if (timeLeft.minutes > 0) {
    activeTheme = 'minutes';
  } else {
    activeTheme = 'seconds';
  }

  // Bubble up theme changes to the global App state
  useEffect(() => {
    if (onThemeChange) {
      onThemeChange(activeTheme);
    }
  }, [activeTheme, onThemeChange]);

  // Set up Simulated Countdown Values for developer demo swapper
  const handleSetSimulation = (mode) => {
    if (mode === 'real') {
      setSimulationMode(null);
      return;
    }
    
    setSimulationMode(mode);
    const now = Date.now();
    let offset = 0;
    
    switch (mode) {
      case 'days':
        offset = 10 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000 + 12 * 60 * 1000 + 30 * 1000;
        break;
      case 'hours':
        offset = 0 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000 + 45 * 60 * 1000 + 12 * 1000;
        break;
      case 'minutes':
        offset = 0 * 24 * 60 * 60 * 1000 + 0 * 60 * 60 * 1000 + 18 * 60 * 1000 + 42 * 1000;
        break;
      case 'seconds':
        offset = 0 * 24 * 60 * 60 * 1000 + 0 * 60 * 60 * 1000 + 0 * 60 * 1000 + 25 * 1000;
        break;
      default:
        break;
    }
    
    setSimulatedTarget(now + offset);
  };

  // 1. Calculate precise remaining time to May 31 or simulated target
  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = simulationMode ? simulatedTarget : +new Date(targetDate);
      const difference = target - Date.now();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      } else {
        if (simulationMode) {
          // Loop back simulation when it hits 0 so they can test infinitely
          handleSetSimulation(simulationMode);
          return;
        } else {
          onCountdownComplete();
        }
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate, onCountdownComplete, simulationMode, simulatedTarget]);

  // 2. Spawn floating background particles based on active stage
  useEffect(() => {
    const interval = setInterval(() => {
      setPetals((prev) => {
        const themeConfig = THEMES[activeTheme] || THEMES.days;
        const emojis = themeConfig.particles;
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        const newPetal = {
          id: Date.now() + Math.random(),
          x: Math.random() * 100, // horizontal start position
          size: activeTheme === 'seconds' ? Math.random() * 18 + 14 : Math.random() * 14 + 10,
          duration: activeTheme === 'seconds' ? Math.random() * 4 + 3 : Math.random() * 8 + 6, // faster in seconds
          opacity: Math.random() * 0.45 + 0.25,
          emoji: randomEmoji
        };
        return [...prev.slice(-18), newPetal]; // Keep max 18 active particles to prevent lag
      });
    }, activeTheme === 'seconds' ? 400 : activeTheme === 'minutes' ? 700 : 1200);
    
    return () => clearInterval(interval);
  }, [activeTheme]);

  // 3. Cycle romantic love narratives
  useEffect(() => {
    const interval = setInterval(() => {
      setNarrativeIdx((prev) => (prev + 1) % NARRATIVES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);



  const pad = (num) => String(num).padStart(2, '0');
  const themeConfig = THEMES[activeTheme] || THEMES.days;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4 py-8 select-none overflow-hidden gap-4"
    >
      
      {/* Custom CSS animations and styles for cozy elements */}
      <style>{`
        @keyframes central-shanka-bob {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-5px) scale(1.03); }
        }
        @keyframes central-chakra-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ruby-heart-pulse {
          0%, 100% { transform: scale(1) filter(drop-shadow(0 0 4px rgba(244,63,94,0.4))); }
          50% { transform: scale(1.18) filter(drop-shadow(0 0 8px rgba(244,63,94,0.7))); }
        }
        .animate-shanka {
          animation: central-shanka-bob 5s ease-in-out infinite;
        }
        .animate-chakra {
          animation: central-chakra-spin 25s linear infinite;
          transform-origin: 60px 48px;
        }
        .animate-ruby-heart {
          animation: ruby-heart-pulse 1.3s ease-in-out infinite;
        }
        .seconds-pulse {
          animation: seconds-glow-pulse 1s linear infinite;
        }
        @keyframes seconds-glow-pulse {
          0%, 100% { border-color: rgba(244, 63, 94, 0.45); box-shadow: 0 0 20px rgba(244, 63, 94, 0.25); }
          50% { border-color: rgba(251, 113, 133, 0.85); box-shadow: 0 0 35px rgba(251, 113, 133, 0.55); }
        }
        @keyframes days-breathing {
          0%, 100% { transform: scale(1) translateY(0px); filter: drop-shadow(0 4px 15px rgba(244, 63, 94, 0.25)); }
          50% { transform: scale(1.03) translateY(-4px); filter: drop-shadow(0 10px 30px rgba(244, 63, 94, 0.5)); }
        }
        @keyframes seconds-heartbeat-bounce {
          0% { transform: scale(0.93); filter: drop-shadow(0 0 20px rgba(244, 63, 94, 0.45)); }
          8% { transform: scale(1.1); filter: drop-shadow(0 0 45px rgba(244, 63, 94, 0.85)); }
          16% { transform: scale(0.99); filter: drop-shadow(0 0 25px rgba(244, 63, 94, 0.6)); }
          24% { transform: scale(1.04); filter: drop-shadow(0 0 38px rgba(244, 63, 94, 0.75)); }
          45%, 100% { transform: scale(0.93); filter: drop-shadow(0 0 20px rgba(244, 63, 94, 0.45)); }
        }
        @keyframes seconds-flash {
          0%, 100% { opacity: 0.25; transform: scale(0.96); filter: blur(100px); }
          8%, 24% { opacity: 0.75; transform: scale(1.06); filter: blur(85px); }
          45% { opacity: 0.25; transform: scale(0.96); filter: blur(100px); }
        }
        .neon-text-glow {
          text-shadow: 0 0 10px rgba(244, 63, 94, 0.5), 0 0 20px rgba(244, 63, 94, 0.3), 0 0 30px rgba(244, 63, 94, 0.2);
        }
        @keyframes cloud-slide {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(12px); }
        }
        .animate-clouds {
          animation: cloud-slide 10s ease-in-out infinite;
        }
      `}</style>

      {/* Floating particles matching active stage */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <AnimatePresence>
          {petals.map((petal) => (
            <motion.div
              key={petal.id}
              initial={{ y: "115vh", x: `${petal.x}vw`, opacity: 0, rotate: 0 }}
              animate={{
                y: "-15vh",
                opacity: [0, petal.opacity, petal.opacity, 0],
                x: [
                  `${petal.x}vw`, 
                  `calc(${petal.x}vw + ${Math.sin(petal.duration) * 45}px)`,
                  `calc(${petal.x}vw - ${Math.cos(petal.duration) * 45}px)`
                ],
                rotate: 360
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: petal.duration, ease: "linear" }}
              className="absolute text-shadow-glow"
              style={{ fontSize: `${petal.size}px` }}
            >
              {petal.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Cozy background gradient wash */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 transition-all duration-1000">
        <div className={`w-[290px] h-[290px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] rounded-full transition-all duration-1000 ${themeConfig.meshGlow}`} />
      </div>

      {/* Title Header Block */}
      <div className="w-full max-w-4xl flex flex-col items-center relative z-10 pt-2">
        <h1
          className={`text-3xl md:text-5xl font-serif font-bold tracking-wide mb-1 text-center leading-tight transition-all duration-1000 bg-clip-text text-transparent ${themeConfig.titleGlow}`}
          style={{ backgroundSize: "200% auto" }}
        >
          Just For Bagi ❤️
        </h1>

        {/* Narrative loop */}
        <div className="h-6 flex items-center justify-center mb-1 overflow-hidden max-w-md text-center px-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={narrativeIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 0.7, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.8 }}
              className={`text-xs md:text-sm font-light italic tracking-wide transition-colors duration-1000 ${themeConfig.textColor}`}
            >
              {NARRATIVES[narrativeIdx]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* UNIFIED CONTAINER FOR COUNTDOWN CARD AND TESTER SWAPPER (DEVELOPER MODE INSIDE COUNTDOWN) */}
      <div className="w-full max-w-3xl flex flex-col items-center justify-center relative z-10 pointer-events-auto gap-4">
        
        {/* Main Countdown Stage Frame */}
        <div className="w-full flex items-center justify-center min-h-[350px]">
          <AnimatePresence mode="wait">
            
            {/* ========================================================
                DAYS STAGE: SHOWING DAYS : HOURS : MINUTES : SECONDS
                ======================================================== */}
            {activeTheme === 'days' && (
              <motion.div
                key="days-stage"
                initial={{ opacity: 0, scale: 0.93, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.07, y: -30 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center text-center w-full px-4"
              >
                {/* Massive Days display as primary focus */}
                <div className="flex flex-col items-center justify-center animate-[days-breathing_8s_ease-in-out_infinite]">
                  <h2 className="text-8xl sm:text-[9rem] md:text-[11rem] font-serif font-black tracking-widest leading-none text-transparent bg-clip-text bg-gradient-to-b from-rose-100 via-rose-300 to-orange-300 drop-shadow-[0_8px_30px_rgba(244,63,94,0.35)]">
                    {pad(timeLeft.days)}
                  </h2>
                  
                  <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.55em] text-rose-300 uppercase mt-2">
                    Days
                  </span>
                </div>

                {/* Styled horizontal glass tray displaying other metrics: Hours : Minutes : Seconds */}
                <div className="mt-6 px-5 py-3.5 rounded-2xl glassmorphism border border-white/10 flex items-center gap-4 sm:gap-6 shadow-md bg-white/5 animate-clouds">
                  <div className="flex flex-col items-center">
                    <span className="text-lg sm:text-xl font-bold font-serif text-white/90">{pad(timeLeft.hours)}</span>
                    <span className="text-[8px] uppercase tracking-wider text-rose-300/70">Hours</span>
                  </div>
                  <span className="text-sm font-bold text-rose-400 animate-pulse">:</span>
                  <div className="flex flex-col items-center">
                    <span className="text-lg sm:text-xl font-bold font-serif text-white/90">{pad(timeLeft.minutes)}</span>
                    <span className="text-[8px] uppercase tracking-wider text-rose-300/70">Minutes</span>
                  </div>
                  <span className="text-sm font-bold text-rose-400 animate-pulse">:</span>
                  <div className="flex flex-col items-center">
                    <span className="text-lg sm:text-xl font-bold font-serif text-white/90">{pad(timeLeft.seconds)}</span>
                    <span className="text-[8px] uppercase tracking-wider text-rose-300/70">Seconds</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================================
                HOURS STAGE: SHOWING HOURS : MINUTES : SECONDS
                ======================================================== */}
            {activeTheme === 'hours' && (
              <motion.div
                key="hours-stage"
                initial={{ opacity: 0, scale: 0.93, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.07, y: -30 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center text-center w-full px-4 relative"
              >
                {/* Spinning background rings */}
                <div className="absolute w-[290px] h-[290px] sm:w-[390px] sm:h-[390px] pointer-events-none opacity-20 z-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-amber-300 animate-[spin_40s_linear_infinite]">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4, 4" />
                    <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1, 8" />
                  </svg>
                </div>

                {/* Primary focus: Hours */}
                <div className="flex flex-col items-center justify-center relative z-10">
                  <h2 className="text-8xl sm:text-[9rem] md:text-[11rem] font-serif font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-400 drop-shadow-[0_6px_25px_rgba(245,158,11,0.5)]">
                    {pad(timeLeft.hours)}
                  </h2>
                  <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.45em] text-amber-300 uppercase mt-2">
                    Hours
                  </span>
                </div>

                {/* Smaller remaining tray: Minutes : Seconds */}
                <div className="mt-6 px-5 py-3 rounded-2xl glassmorphism border border-amber-500/10 flex items-center gap-5 shadow-sm bg-black/10 relative z-10">
                  <div className="flex flex-col items-center">
                    <span className="text-md sm:text-lg font-bold font-serif text-white/90">{pad(timeLeft.minutes)}</span>
                    <span className="text-[8px] uppercase tracking-wider text-amber-300/70">Minutes</span>
                  </div>
                  <span className="text-sm font-bold text-amber-400 animate-pulse">:</span>
                  <div className="flex flex-col items-center">
                    <span className="text-md sm:text-lg font-bold font-serif text-white/90">{pad(timeLeft.seconds)}</span>
                    <span className="text-[8px] uppercase tracking-wider text-amber-300/70">Seconds</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================================
                MINUTES STAGE: SHOWING MINUTES : SECONDS
                ======================================================== */}
            {activeTheme === 'minutes' && (
              <motion.div
                key="minutes-stage"
                initial={{ opacity: 0, scale: 0.93, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.07, y: -30 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center text-center w-full px-4 relative"
              >
                {/* Cozy modern digital grid mesh */}
                <div className="absolute inset-0 bg-pink-900/5 backdrop-blur-[7px] rounded-3xl border border-pink-500/10 pointer-events-none overflow-hidden max-w-lg mx-auto h-[350px] my-auto">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] opacity-25" />
                </div>

                {/* Primary focus: Minutes */}
                <div className="flex flex-col items-center justify-center relative z-10">
                  <h2 className="font-mono text-8xl sm:text-[9rem] md:text-[11rem] font-extrabold tracking-tight leading-none text-pink-300 drop-shadow-[0_0_35px_rgba(255,77,109,0.85)] neon-text-glow">
                    {pad(timeLeft.minutes)}
                  </h2>
                  <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.4em] text-pink-400 uppercase mt-2">
                    Minutes
                  </span>
                </div>

                {/* Advanced Seconds Radial Gauge under Minutes Stage */}
                <div className="mt-6 relative z-10 flex flex-col items-center justify-center">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-pink-500/10 scale-110 animate-[spin_20s_linear_infinite]" />
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 60 60">
                      <circle cx="30" cy="30" r="26" stroke="rgba(244, 63, 94, 0.1)" strokeWidth="3" fill="none" />
                      <motion.circle 
                        cx="30" cy="30" r="26" stroke="#ff4d6d" strokeWidth="3.5" fill="none" strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 26}
                        animate={{ strokeDashoffset: (2 * Math.PI * 26) - (timeLeft.seconds / 60) * (2 * Math.PI * 26) }}
                        transition={{ duration: 1, ease: "linear" }}
                        className="drop-shadow-[0_0_8px_rgba(255,77,109,0.85)]"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-mono text-xl sm:text-2xl font-black text-white drop-shadow-[0_0_10px_rgba(255,77,109,0.5)] leading-none">{pad(timeLeft.seconds)}</span>
                      <span className="text-[7px] uppercase tracking-wider text-pink-300 font-bold mt-1">Secs</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================================
                SECONDS STAGE: SHOWING SECONDS ONLY (DRAMATIC BEAT)
                ======================================================== */}
            {activeTheme === 'seconds' && (
              <motion.div
                key="seconds-stage"
                initial={{ opacity: 0, scale: 0.93, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.07, y: -30 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center text-center w-full px-4 relative"
              >
                <div className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full bg-rose-500/10 filter blur-[95px] animate-[seconds-flash_1s_infinite] pointer-events-none z-0" />
                
                {/* Bouncing Second numbers */}
                <div className="flex flex-col items-center justify-center relative z-10 animate-[seconds-heartbeat-bounce_1s_infinite]">
                  <h2 className="font-sans text-[10rem] sm:text-[13rem] md:text-[16rem] font-black tracking-tighter leading-none text-red-500 drop-shadow-[0_0_55px_rgba(244,63,94,0.9)]">
                    {pad(timeLeft.seconds)}
                  </h2>
                  <span className="text-[11px] sm:text-xs md:text-sm font-black tracking-[0.45em] text-rose-400 uppercase mt-2 animate-pulse">
                    Seconds
                  </span>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* 5. Majestic Glowing Floating Swapper (NOW EMBEDDED INSIDE CARD DIRECTLY AFTER THE COUNTDOWN DISPLAY) */}
        {false && (
          <div className="w-full max-w-md z-20 px-4 mt-2">
            <div className="rounded-2xl glassmorphism border border-white/5 p-3.5 flex flex-col items-center shadow-lg bg-black/25">
              <button 
                onClick={() => setIsSwapperOpen(!isSwapperOpen)}
                className="text-[9.5px] uppercase tracking-[0.3em] text-rose-300 font-bold hover:text-white transition-all flex items-center gap-1.5 cursor-pointer py-0.5 select-none"
              >
                <span>✨ {isSwapperOpen ? 'Hide Developer Mode' : 'Open Developer Mode (Time-Travel Swapper)'}</span>
                <span className="text-[7.5px] opacity-60">{isSwapperOpen ? '▲' : '▼'}</span>
              </button>

              <AnimatePresence>
                {isSwapperOpen && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="w-full flex flex-col items-center mt-3.5 border-t border-white/5 pt-3.5 overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 justify-center w-full">
                      <button
                        onClick={() => handleSetSimulation('days')}
                        className={`px-3 py-1.5 rounded-lg text-[9px] uppercase tracking-wider font-semibold border transition-all duration-300 ${
                          simulationMode === 'days'
                            ? 'bg-rose-400 text-black border-rose-400 font-bold shadow-md'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        Days Mode
                      </button>

                      <button
                        onClick={() => handleSetSimulation('hours')}
                        className={`px-3 py-1.5 rounded-lg text-[9px] uppercase tracking-wider font-semibold border transition-all duration-300 ${
                          simulationMode === 'hours'
                            ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-md'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        Hours Mode
                      </button>

                      <button
                        onClick={() => handleSetSimulation('minutes')}
                        className={`px-3 py-1.5 rounded-lg text-[9px] uppercase tracking-wider font-semibold border transition-all duration-300 ${
                          simulationMode === 'minutes'
                            ? 'bg-pink-400 text-black border-pink-400 font-bold shadow-md'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        Minutes Mode
                      </button>

                      <button
                        onClick={() => handleSetSimulation('seconds')}
                        className={`px-3 py-1.5 rounded-lg text-[9px] uppercase tracking-wider font-semibold border transition-all duration-300 ${
                          simulationMode === 'seconds'
                            ? 'bg-red-500 text-black border-red-500 font-bold shadow-md'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        Seconds Mode
                      </button>

                      <button
                        onClick={() => handleSetSimulation('real')}
                        className={`px-3 py-1.5 rounded-lg text-[9px] uppercase tracking-wider font-semibold border transition-all duration-300 ${
                          simulationMode === null
                            ? 'bg-white text-black border-white font-bold shadow-md'
                            : 'bg-white/5 border-white/10 text-white/30 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        Real Time
                      </button>
                    </div>
                    
                    <p className="text-[7.5px] uppercase tracking-widest text-white/30 text-center mt-2.5">
                      {simulationMode 
                        ? `Simulating: ${themeConfig.name} Realm` 
                        : "Running live countdown targeting midnight on May 31"}
                    </p>

                    {/* Developer Quick-Bypass & Travel Grid */}
                    <div className="w-full h-px bg-white/5 my-3.5" />
                    
                    <span className="text-[8.5px] uppercase tracking-[0.25em] text-rose-300 font-bold mb-3.5 self-start pl-1">
                      🚀 Developer Fast Travel
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full">
                      {/* Cinematic Opening (Full Sequence) */}
                      <button
                        onClick={() => {
                          onCountdownComplete(); // triggers setPhase('transition')
                        }}
                        className="py-2.5 px-3 rounded-xl text-[9px] uppercase tracking-wider font-extrabold transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.25)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] border border-purple-500/20 active:scale-95 flex flex-col items-center justify-center gap-1.5 cursor-pointer select-none"
                      >
                        <span className="text-base">🎬</span>
                        <span>Cinematic Opening</span>
                      </button>

                      {/* Wished Page (Direct Reveal) */}
                      <button
                        onClick={() => {
                          if (onBypassPhase) {
                            onBypassPhase('reveal');
                          } else {
                            onCountdownComplete();
                          }
                        }}
                        className="py-2.5 px-3 rounded-xl text-[9px] uppercase tracking-wider font-extrabold transition-all duration-300 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.25)] hover:shadow-[0_0_25px_rgba(244,63,94,0.5)] border border-rose-500/20 active:scale-95 flex flex-col items-center justify-center gap-1.5 cursor-pointer select-none"
                      >
                        <span className="text-base">🎂</span>
                        <span>Wished Page</span>
                      </button>

                      {/* Additional Features (Just For You Menu) */}
                      <button
                        onClick={() => {
                          if (onBypassPhase) {
                            onBypassPhase('portals');
                          } else {
                            onCountdownComplete();
                          }
                        }}
                        className="py-2.5 px-3 rounded-xl text-[9px] uppercase tracking-wider font-extrabold transition-all duration-300 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.25)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] border border-teal-500/20 active:scale-95 flex flex-col items-center justify-center gap-1.5 cursor-pointer select-none"
                      >
                        <span className="text-base">✨</span>
                        <span>Menu Page</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

      </div>

    </motion.div>
  );
}
