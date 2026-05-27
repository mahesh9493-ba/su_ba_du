import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Compass, Heart, MessageCircle, X } from 'lucide-react';

// Subcomponents (we will create these next)
import MemoryTimeline from './MemoryTimeline';
import FutureDreams from './FutureDreams';
import SecretMessages from './SecretMessages';

const BUBBLES = [
  {
    id: 'memories',
    title: 'Our Memories',
    icon: Camera,
    color: 'shadow-[0_0_30px_rgba(255,143,163,0.35)] border-luxury-rose/30 text-luxury-rose',
    bgGlow: 'from-luxury-rose/10 to-transparent',
    desc: 'A walk down memory lane',
    delay: 0
  },
  {
    id: 'dreams',
    title: 'Future Dreams',
    icon: Compass,
    color: 'shadow-[0_0_30px_rgba(230,57,70,0.35)] border-luxury-crimson/30 text-luxury-crimson',
    bgGlow: 'from-luxury-crimson/10 to-transparent',
    desc: 'Our galactic hopes & trips',
    delay: 0.2
  },
  {
    id: 'special',
    title: 'Why You\'re Special',
    icon: Heart,
    color: 'shadow-[0_0_30px_rgba(255,46,99,0.35)] border-luxury-red/30 text-luxury-red',
    bgGlow: 'from-luxury-red/10 to-transparent',
    desc: 'A collection of reasons',
    delay: 0.4
  },
  {
    id: 'messages',
    title: 'The Book of Us',
    icon: MessageCircle,
    color: 'shadow-[0_0_35px_rgba(230,57,70,0.45)] border-luxury-rose/30 text-luxury-rose animate-pulse',
    bgGlow: 'from-luxury-red/20 to-transparent',
    desc: 'An interactive cinematic book of our love ❤️',
    delay: 0.6
  }
];

export default function MemoryPops({ onReplayClimax }) {
  const [activePortal, setActivePortal] = useState(null);

  // Mark surprise as unlocked on first successful access
  React.useEffect(() => {
    localStorage.setItem('surprise_unlocked', 'true');
  }, []);

  // Render active portal content
  const renderPortalContent = () => {
    switch (activePortal) {
      case 'memories':
        return <MemoryTimeline onClose={() => setActivePortal(null)} />;
      case 'dreams':
        return <FutureDreams onClose={() => setActivePortal(null)} />;
      case 'special':
        return <SecretMessages type="special" onClose={() => setActivePortal(null)} />;
      case 'messages':
        return <SecretMessages type="messages" onClose={() => setActivePortal(null)} />;
      default:
        return null;
    }
  };

  return (
    <div 
      style={!activePortal ? {
        backgroundImage: 'linear-gradient(to bottom, rgba(3, 5, 20, 0.88), rgba(1, 1, 3, 0.96)), url("/sunset_chai.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      } : {}}
      className="min-h-screen w-full flex flex-col items-center justify-start pt-16 pb-20 relative z-10 select-none transition-all duration-[1s]"
    >
      
      {/* 1. Portal selection grid overlay */}
      <AnimatePresence mode="wait">
        {!activePortal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center px-4"
          >
            {/* Header */}
            <div className="text-center mb-16 max-w-xl">
              <span className="text-xs uppercase tracking-[0.3em] text-luxury-rose font-medium mb-3 block">
                The Celebration Continues
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-semibold text-luxury-gradient leading-tight mb-4">
                Just For You ❤️
              </h2>
              <p className="text-sm font-light text-white/50 leading-relaxed">
                Click on any of the floating globes to unlock interactive sections, emotional stories, and secret handwritten messages.
              </p>

              {/* Subtle Replay Climax Option for Returning Visits */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                whileHover={{ opacity: 0.95, scale: 1.03 }}
                onClick={() => onReplayClimax && onReplayClimax('transition')}
                className="mt-6 text-[8.5px] uppercase tracking-[0.2em] text-rose-300/80 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 py-1.5 px-4.5 rounded-full border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 shadow-sm mx-auto select-none pointer-events-auto"
              >
                <span>🎬 Replay Birthday Climax & Cake</span>
              </motion.button>

            </div>

            {/* Orbital drifting bubble layout */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 w-full max-w-4xl pt-4">
              {BUBBLES.map((bubble) => {
                const IconComponent = bubble.icon;
                return (
                  <motion.div
                    key={bubble.id}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      delay: bubble.delay,
                      duration: 1,
                      ease: [0.25, 1, 0.5, 1]
                    }}
                    onClick={() => setActivePortal(bubble.id)}
                    className={`w-40 h-40 md:w-48 md:h-48 rounded-full border glassmorphism flex flex-col items-center justify-center text-center p-4 cursor-pointer relative pointer-events-auto ${bubble.color} ${bubble.id === 'special' ? 'animate-float-slow' : 'animate-float-medium'} glassmorphism-hover group`}
                    style={{
                      animationDelay: `${bubble.delay}s`,
                    }}
                  >
                    {/* Glowing globe inner visual */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${bubble.bgGlow} opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />
                    <div className="absolute inset-1 rounded-full border border-white/5 group-hover:border-white/15 transition-colors duration-500 pointer-events-none" />

                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 mb-3 group-hover:scale-110 transition-transform duration-500 relative z-10" />
                    
                    <span className="text-xs md:text-sm font-serif font-semibold tracking-wider uppercase mb-1 relative z-10 group-hover:text-white transition-colors">
                      {bubble.title}
                    </span>
                    <span className="text-[9px] md:text-[10px] text-white/40 group-hover:text-white/60 transition-colors tracking-wide max-w-[120px] leading-tight relative z-10">
                      {bubble.desc}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Fullscreen Portal Overlay Display */}
      <AnimatePresence>
        {activePortal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 w-full h-full z-40 bg-luxury-darker/95 backdrop-blur-xl overflow-y-auto pointer-events-auto"
          >
            {/* Top-Right Floating Elegant Back Button */}
            <button
              onClick={() => setActivePortal(null)}
              className="fixed top-6 left-6 z-[110] w-12 h-12 rounded-full glassmorphism-luxury flex items-center justify-center text-luxury-rose hover:text-white hover:border-luxury-rose/50 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg pointer-events-auto"
              title="Return to Menu"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Portal Component Root */}
            <div className="w-full h-full min-h-screen">
              {renderPortalContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
