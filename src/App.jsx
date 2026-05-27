import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

// Core Components
import BackgroundEffects from './components/BackgroundEffects';

import CountdownPhase from './components/CountdownPhase';
import MidnightTransition from './components/MidnightTransition';
import BirthdayReveal from './components/BirthdayReveal';
import MemoryPops from './components/MemoryPops';

export default function App() {
  const [phase, setPhase] = useState(() => {
    const target = new Date('2026-05-31T00:00:00').getTime();
    if (Date.now() >= target && localStorage.getItem('surprise_unlocked') === 'true') {
      return 'portals';
    }
    return 'countdown';
  }); // 'countdown', 'transition', 'reveal', 'portals'

  const [targetDate] = useState('2026-05-31T00:00:00'); // Targeted Midnight
  const [currentCountdownTheme, setCurrentCountdownTheme] = useState('days'); // 'days', 'hours', 'minutes', 'seconds'

  // Stable callbacks to prevent unnecessary child effect cancellations
  const handleTransitionComplete = useCallback(() => {
    setPhase('reveal');
  }, []);

  const handleBypassPhase = useCallback((targetPhase) => {
    setPhase(targetPhase);
  }, []);

  const handleThemeChange = useCallback((theme) => {
    setCurrentCountdownTheme(theme);
  }, []);

  // Ultra-High Performance Desktop Liquid Custom Cursor Tracking (Ref-Based)
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const mousePosRef = useRef({ x: -100, y: -100 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Enable custom cursor only on large desktop layouts
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Smooth ring cursor delay lag interpolation (Runs entirely outside React re-renders!)
  useEffect(() => {
    if (!isDesktop) return;

    let ringX = -100;
    let ringY = -100;
    let animationId;

    const updateRing = () => {
      const dx = mousePosRef.current.x - ringX;
      const dy = mousePosRef.current.y - ringY;
      
      ringX += dx * 0.15;
      ringY += dy * 0.15;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${ringX}px`;
        cursorRingRef.current.style.top = `${ringY}px`;
      }
      animationId = requestAnimationFrame(updateRing);
    };

    animationId = requestAnimationFrame(updateRing);
    return () => cancelAnimationFrame(animationId);
  }, [isDesktop]);

  const handleEnterExperience = () => {
    setPhase('countdown');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-luxury-dark select-none text-white font-sans">
      
      {/* 1. Global Custom Animated Luxury Cursor */}
      {isDesktop && (
        <>
          <div 
            ref={cursorDotRef}
            className="custom-cursor"
            style={{ left: '-100px', top: '-100px' }}
          />
          <div 
            ref={cursorRingRef}
            className="custom-cursor-ring"
            style={{ left: '-100px', top: '-100px' }}
          />
        </>
      )}


      {/* 2. Global Canvas Background Particles & Fireflies (Active throughout) */}
      <BackgroundEffects densityMultiplier={phase === 'portals' ? 0.6 : 1} />



      {/* 4. Global Screen Phase Router */}
      <AnimatePresence mode="wait">
        


        {/* PHASE B: COUNTDOWN EXPERIENCE */}
        {phase === 'countdown' && (
          <motion.div
            key="countdown-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 1 }}
            className="relative z-10 w-full"
          >
            <CountdownPhase 
              targetDate={targetDate} 
              onCountdownComplete={handleTransitionComplete} 
              onThemeChange={handleThemeChange}
              onBypassPhase={handleBypassPhase}
            />
          </motion.div>
        )}

        {/* PHASE C: CINEMATIC MIDNIGHT TRANSITION */}
        {phase === 'transition' && (
          <motion.div 
            key="transition-screen" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 w-full h-full z-50 pointer-events-none"
          >
            <MidnightTransition onTransitionComplete={handleTransitionComplete} />
          </motion.div>
        )}

        {/* PHASE D: BIRTHDAY REVEAL & LETTER */}
        {phase === 'reveal' && (
          <motion.div
            key="reveal-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1.2 }}
            className="relative z-10 w-full"
          >
            <BirthdayReveal onExploreMemories={() => setPhase('portals')} />
          </motion.div>
        )}

        {/* PHASE E: INTERACTIVE SURPRISE PORTALS */}
        {phase === 'portals' && (
          <motion.div
            key="portals-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="relative z-10 w-full"
          >
            <MemoryPops onReplayClimax={(targetPhase) => setPhase(targetPhase)} />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
