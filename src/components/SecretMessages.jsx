import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkles, Smile, Coffee, Play, Pause, RefreshCw, Send } from 'lucide-react';
import CinematicStorybook from './CinematicStorybook';

const REASONS = [
  {
    id: 1,
    icon: Heart,
    title: "Your Infinite Kindness",
    desc: "You consistently put others first, offering a gentle smile and supportive shoulder to everyone in your path. Your empathy is a beautiful superpower."
  },
  {
    id: 2,
    icon: Sparkles,
    title: "Your Brilliant Mind",
    desc: "Conversations with you are an adventure. You bring insight, intelligence, and a spark of curiosity that challenges and inspires me daily."
  },
  {
    id: 3,
    icon: Coffee,
    title: "Your Grounding Warmth",
    desc: "No matter how chaotic the world gets, sitting next to you with a warm drink instantly feels like coming home. You are my safe haven."
  },
  {
    id: 4,
    icon: Star,
    title: "Your Radiant Light",
    desc: "Your laughter is contagious and has this incredible ability to brighten even the darkest, mistiest winter mornings. You glow from within."
  },
  {
    id: 5,
    icon: Smile,
    title: "Your Pure Authenticity",
    desc: "You are unapologetically yourself, showing a level of truth, loyalty, and strength that makes me look up to you and celebrate you every single day."
  }
];

const HIDDEN_NOTES = [
  "You make me laugh like nobody else in the universe can! 🌸",
  "I cherish the quiet, simple morning coffees we share. ☕",
  "Your courage and support give me so much strength. 🛡️",
  "You deserve the absolute happiest memories today and always. 🎁",
  "No matter what, I am always standing right by your side. ❤️"
];

const EXTENDED_HIDDEN_NOTES = [
  "You make me laugh like nobody else in the universe can! 🌸",
  "I cherish the quiet, simple morning coffees we share. ☕",
  "Your courage and support give me so much strength. 🛡️",
  "You deserve the absolute happiest memories today and always. 🎁",
  "No matter what, I am always standing right by your side. ❤️",
  "Your beautiful presence makes every cold day warm. ☀️",
  "I love looking at the world through your brilliant perspective. 🔭",
  "You are a rare, exquisite soul, and I appreciate you completely. ✨",
  "Every small adventure with you becomes a beautiful lifetime memory. 🗺️",
  "Your laugh is my absolute favorite song in the cosmos. 🎵",
  "Thank you for being the most loving and beautiful team partner ever. 🤝",
  "I am so incredibly proud of who you are and everything you do. 🏆"
];

export default function SecretMessages({ type, onClose }) {
  if (type === 'messages') {
    return <CinematicStorybook onClose={onClose} />;
  }

  // Envelope State
  const [isOpen, setIsOpen] = useState(false);
  
  // Star Catcher State
  const [activeStars, setActiveStars] = useState([
    { id: 1, x: 20, y: 30, text: HIDDEN_NOTES[0], caught: false },
    { id: 2, x: 75, y: 25, text: HIDDEN_NOTES[1], caught: false },
    { id: 3, x: 35, y: 70, text: HIDDEN_NOTES[2], caught: false },
    { id: 4, x: 80, y: 75, text: HIDDEN_NOTES[3], caught: false },
    { id: 5, x: 50, y: 50, text: HIDDEN_NOTES[4], caught: false }
  ]);
  const [starNote, setStarNote] = useState(null);

  const handleResetStars = () => {
    const shuffled = [...EXTENDED_HIDDEN_NOTES].sort(() => 0.5 - Math.random());
    const newStars = [
      { id: 1, x: Math.random() * 70 + 15, y: Math.random() * 55 + 15, text: shuffled[0], caught: false },
      { id: 2, x: Math.random() * 70 + 15, y: Math.random() * 55 + 15, text: shuffled[1], caught: false },
      { id: 3, x: Math.random() * 70 + 15, y: Math.random() * 55 + 15, text: shuffled[2], caught: false },
      { id: 4, x: Math.random() * 70 + 15, y: Math.random() * 55 + 15, text: shuffled[3], caught: false },
      { id: 5, x: Math.random() * 70 + 15, y: Math.random() * 55 + 15, text: shuffled[4], caught: false }
    ];
    setActiveStars(newStars);
    setStarNote(null);
  };

  // Audio Player State
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioTranscript, setAudioTranscript] = useState("");

  const handlePlayVoiceMessage = () => {
    setIsAudioPlaying(!isAudioPlaying);
    if (!isAudioPlaying) {
      // Simulate typewriter vocal transcription
      setAudioTranscript("");
      const fullText = "“Hey... I just wanted to record a quick little note to say how incredibly much you mean to me. The world is so much brighter with you in it. Happy Birthday, my favorite human! 🎙️❤️”";
      let i = 0;
      const interval = setInterval(() => {
        setAudioTranscript((prev) => prev + fullText[i]);
        i++;
        if (i >= fullText.length - 1) {
          clearInterval(interval);
        }
      }, 40);
    }
  };

  const handleCatchStar = (id, text) => {
    setActiveStars(prev => prev.map(s => s.id === id ? { ...s, caught: true } : s));
    setStarNote(text);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center py-16 px-6 relative overflow-hidden select-none">
      
      {/* Dynamic Header */}
      <div className="text-center mb-10 max-w-xl relative z-10">
        <span className="text-xs uppercase tracking-[0.3em] text-luxury-rose font-medium mb-2 block">
          {type === 'messages' && "Intimate Parchment"}
          {type === 'special' && "Chapters of Appreciation"}
          {type === 'surprises' && "Twinkling Celestial Secrets"}
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-luxury-gradient">
          {type === 'messages' && "Special Message"}
          {type === 'special' && "Why You're Special"}
          {type === 'surprises' && "Hidden Surprises"}
        </h2>
      </div>

      <div className="w-full max-w-3xl flex flex-col items-center relative z-10">
        
        {/* ==============================================
            CATEGORY 1: WAX-SEALED MESSAGE ENVELOPE
            ============================================== */}
        {type === 'messages' && (
          <div className="w-full max-w-lg flex flex-col items-center mt-6">
            
            {/* Realistic CSS/Framer Envelope */}
            <div 
              onClick={() => !isOpen && setIsOpen(true)}
              className={`relative w-[320px] h-[220px] bg-[#1a1b22] border border-white/5 rounded-lg shadow-[0_20px_45px_rgba(0,0,0,0.8)] cursor-pointer select-none transition-transform duration-500 hover:scale-[1.02] ${isOpen ? 'pointer-events-none' : ''}`}
            >
              {/* Envelope Flap Top */}
              <div 
                className="absolute inset-x-0 top-0 h-0 border-t-[100px] border-t-[#22242e] border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent origin-top transition-transform duration-700 z-30"
                style={{
                  transform: isOpen ? 'rotateX(180deg) translateY(-1px)' : 'rotateX(0deg)',
                  borderTopColor: isOpen ? '#111216' : '#22242e'
                }}
              />

              {/* Side Flaps (Pocket) */}
              <div className="absolute inset-0 border-b-[110px] border-b-[#14151b] border-l-[160px] border-l-[#1c1d26] border-r-[160px] border-r-[#1c1d26] z-10 rounded-b-lg pointer-events-none" />

              {/* Deep Burgundy Wax Seal */}
              {!isOpen && (
                <motion.div 
                  className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-r from-luxury-red via-[#800f14] to-[#4a0404] border border-luxury-rose/25 flex items-center justify-center shadow-lg z-40 active:scale-95 duration-200 heartbeat-glow"
                  whileHover={{ scale: 1.08 }}
                >
                  <Heart className="w-6 h-6 text-white fill-white/80 animate-pulse" />
                </motion.div>
              )}

              {/* Sliding Card Letter */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ y: 0, scale: 0.95, opacity: 0 }}
                    animate={{ y: -160, scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1, ease: [0.25, 1, 0.5, 1] }}
                    className="absolute inset-x-4 top-4 bg-[#ece8dc] p-6 rounded shadow-xl text-[#2b2b2b] z-20 pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="font-handwritten text-2xl md:text-3xl leading-relaxed text-[#3c2a10] filter blur-[0.1px] max-h-[220px] overflow-y-auto pr-1 select-text custom-scrollbar">
                      <p className="mb-3 font-semibold">To my favorite person,</p>
                      <p className="mb-3">
                        From the moment you entered my world, everything took on a more beautiful, vibrant shade. Thank you for your endless patience, your brilliant mind, and the warm kindness you share so effortlessly.
                      </p>
                      <p>
                        You make every single ordinary day feel like a magical surprise. Happy Birthday, and here is to creating infinitely more sweet chapters together. ❤️
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {isOpen && (
              <button
                onClick={() => setIsOpen(false)}
                className="mt-28 px-5 py-2.5 rounded-full border border-luxury-red/20 glassmorphism text-luxury-red hover:text-white hover:border-luxury-red/50 transition-all font-light tracking-widest text-[10px] uppercase cursor-pointer"
              >
                Close Letter ✉️
              </button>
            )}
          </div>
        )}

        {/* ==============================================
            CATEGORY 2: WHY YOU'RE SPECIAL CARD GRID
            ============================================== */}
        {type === 'special' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-4">
            {REASONS.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                  className="p-6 rounded-xl glassmorphism border border-white/5 shadow-md flex flex-col items-center text-center relative overflow-hidden group glassmorphism-hover"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-luxury-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="w-12 h-12 rounded-full border border-luxury-red/25 flex items-center justify-center text-luxury-red mb-4 group-hover:scale-105 group-hover:bg-luxury-red/5 transition-all duration-300 relative z-10">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h4 className="text-md font-serif font-bold text-luxury-rose mb-2 relative z-10">
                    {reason.title}
                  </h4>
                  <p className="text-xs font-light text-white/50 leading-relaxed relative z-10">
                    {reason.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ==============================================
            CATEGORY 3: HIDDEN SURPRISES & VOICE MESSAGE
            ============================================== */}
        {type === 'surprises' && (
          <div className="w-full flex flex-col items-center gap-10 mt-2">
            
            {/* Catch Twinkling Stars Minigame Panel */}
            <div className="w-full p-6 border border-white/5 bg-black/15 backdrop-blur-sm rounded-xl relative h-[250px] overflow-hidden">
              <span className="absolute top-3 left-3 text-[9px] tracking-widest uppercase font-semibold text-white/30 z-10 select-none">
                Interactive: Click floating stars
              </span>

              {/* Caught Note Display Overlay */}
              <AnimatePresence mode="wait">
                {starNote ? (
                  <motion.div
                    key={starNote}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center p-8 text-center bg-luxury-darker/70 z-30"
                  >
                    <div className="flex flex-col items-center">
                      <Sparkles className="w-5 h-5 text-luxury-red mb-3 animate-pulse" />
                      <p className="font-serif text-lg md:text-xl text-luxury-rose italic tracking-wide max-w-md filter blur-[0.1px]">
                        “{starNote}”
                      </p>
                      <button
                        onClick={() => setStarNote(null)}
                        className="mt-4 text-[9px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                      >
                        Keep Searching ✨
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  // Help prompt if no active note
                  <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-40">
                    <p className="text-xs font-light text-white/40">Catch the twinkling ruby-red particles...</p>
                  </div>
                )}
              </AnimatePresence>

              {/* Floating clickable stars */}
              {activeStars.map((star) => (
                !star.caught && (
                  <motion.button
                    key={star.id}
                    onClick={() => handleCatchStar(star.id, star.text)}
                    className="absolute w-8 h-8 rounded-full flex items-center justify-center text-luxury-rose hover:text-white cursor-pointer outline-none pointer-events-auto shadow-md"
                    style={{ left: `${star.x}%`, top: `${star.y}%` }}
                    animate={{
                      y: [0, -10, 0],
                      scale: [1, 1.15, 1],
                      filter: ['drop-shadow(0 0 2px rgba(230,57,70,0.4))', 'drop-shadow(0 0 8px rgba(230,57,70,0.8))', 'drop-shadow(0 0 2px rgba(230,57,70,0.4))']
                    }}
                    transition={{
                      duration: Math.random() * 2 + 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </motion.button>
                )
              ))}

              {activeStars.every(s => s.caught) && !starNote && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-luxury-darker/80 z-20">
                  <Sparkles className="w-6 h-6 text-luxury-rose mb-2 animate-bounce" />
                  <p className="text-xs text-[#ffccd5] tracking-widest uppercase mb-3">You caught all stars! 🌌</p>
                  <button
                    onClick={handleResetStars}
                    className="px-4 py-2 rounded-full border border-luxury-rose/25 bg-luxury-red/10 text-white font-medium text-[10px] tracking-widest uppercase hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto shadow-md cursor-pointer"
                  >
                    Release More Stars ☄️
                  </button>
                </div>
              )}
            </div>

            {/* Premium Voice Message Player */}
            <div className="w-full max-w-md p-6 rounded-xl glassmorphism-luxury border border-luxury-red/15 flex flex-col items-center">
              <span className="text-[10px] tracking-widest uppercase text-luxury-rose font-medium mb-3 select-none">
                Hidden Vocal Surprise
              </span>

              {/* Custom Audio visual wave container */}
              <div className="w-full h-12 flex justify-center items-center gap-[4px] border-b border-white/5 mb-5 overflow-hidden">
                {isAudioPlaying ? (
                  // Bouncing active wave bars
                  Array.from({ length: 22 }).map((_, i) => {
                    const duration = Math.random() * 0.7 + 0.5;
                    const delay = Math.random() * 0.4;
                    return (
                      <div
                        key={i}
                        className="w-[3px] bg-luxury-red rounded-full h-full"
                        style={{
                          animation: `activeSoundWave ${duration}s infinite ease-in-out alternate`,
                          animationDelay: `${delay}s`,
                          maxHeight: `${Math.random() * 70 + 30}%`
                        }}
                      />
                    );
                  })
                ) : (
                  // Static flat line
                  <div className="w-4/5 h-[1.5px] bg-white/10 rounded-full" />
                )}
              </div>

              {/* Play button */}
              <button
                onClick={handlePlayVoiceMessage}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-luxury-red via-luxury-rose to-luxury-red text-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto border border-luxury-rose/20"
                title={isAudioPlaying ? "Pause Memo" : "Play Recorded Memo"}
              >
                {isAudioPlaying ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current ml-1" />
                )}
              </button>

              {/* Transcript Text reveal */}
              <AnimatePresence>
                {audioTranscript && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="w-full mt-4 bg-black/20 p-4 rounded-lg text-center"
                  >
                    <p className="font-handwritten text-2xl text-luxury-rose leading-relaxed filter blur-[0.1px]">
                      {audioTranscript}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        )}

      </div>

      {/* Embedded active visual wave animations */}
      <style>{`
        @keyframes activeSoundWave {
          0% { transform: scaleY(0.15); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
