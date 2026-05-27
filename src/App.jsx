import React, { useState, useEffect } from 'react';
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

  // Desktop Liquid Custom Cursor Tracking
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Enable custom cursor only on large desktop layouts
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Smooth ring cursor delay lag interpolation
  useEffect(() => {
    if (!isDesktop) return;
    let animationId;
    const updateRing = () => {
      setRingPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        return {
          x: prev.x + dx * 0.15, // Interpolation speed
          y: prev.y + dy * 0.15
        };
      });
      animationId = requestAnimationFrame(updateRing);
    };
    animationId = requestAnimationFrame(updateRing);
    return () => cancelAnimationFrame(animationId);
  }, [mousePos, isDesktop]);

  const handleEnterExperience = () => {
    setPhase('countdown');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-luxury-dark select-none text-white font-sans">
      
      {/* 1. Global Custom Animated Luxury Cursor */}
      {isDesktop && (
        <>
          <div 
            className="custom-cursor"
            style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
          />
          <div 
            className="custom-cursor-ring"
            style={{ left: `${ringPos.x}px`, top: `${ringPos.y}px` }}
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
              onCountdownComplete={() => setPhase('transition')} 
              onThemeChange={setCurrentCountdownTheme}
              onBypassPhase={setPhase}
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
            <MidnightTransition onTransitionComplete={() => setPhase('reveal')} />
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
