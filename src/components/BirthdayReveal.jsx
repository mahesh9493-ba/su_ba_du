import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BirthdayReveal({ onExploreMemories }) {
  const [isCandleLit, setIsCandleLit] = useState(true);
  const [showHappyBirthday, setShowHappyBirthday] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [balloons, setBalloons] = useState([]);

  const handleBlowCandle = () => {
    if (!isCandleLit) return;
    setIsCandleLit(false);

    // Spawn rich red, rose, and pink balloons
    const colors = ['#ff2e63', '#e63946', '#ff8fa3', '#ae2012', '#ffccd5', '#ffffff'];
    const newBalloons = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      size: Math.random() * 30 + 35,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      duration: Math.random() * 4 + 5
    }));
    setBalloons(newBalloons);

    setTimeout(() => {
      setShowHappyBirthday(true);
    }, 800);

    setTimeout(() => {
      setShowLetter(true);
    }, 2800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 pb-24 relative z-10 px-4 select-none">
      
      {/* Floating Balloons Render */}
      <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden pointer-events-none z-30">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className="absolute rounded-full flex flex-col items-center"
            style={{
              left: `${balloon.x}%`,
              width: `${balloon.size}px`,
              height: `${balloon.size * 1.25}px`,
              backgroundColor: balloon.color,
              bottom: `-150px`,
              opacity: 0.85,
              boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.2)',
              animation: `riseBalloon ${balloon.duration}s linear forwards`,
              animationDelay: `${balloon.delay}s`,
            }}
          >
            <div className="w-[1px] bg-white/40 h-24 absolute top-full" />
            <div 
              className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] absolute top-full"
              style={{ borderBottomColor: balloon.color }}
            />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!showHappyBirthday && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col items-center text-center max-w-lg mt-8"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-luxury-rose font-medium mb-6">
              Make a wish and click the candle to blow
            </p>

            {/* Velvet Strawberry Glaze 3D Cake */}
            <div 
              onClick={handleBlowCandle}
              className={`relative cursor-pointer select-none w-80 py-16 flex flex-col items-center justify-center transition-transform duration-500 hover:scale-[1.05] active:scale-95 ${isCandleLit ? 'animate-float-slow' : ''}`}
            >
              {/* Cake Top Layer (Strawberry Red Glaze) */}
              <div className="w-40 h-16 relative z-30 flex flex-col items-center">
                
                {/* Candle flame block nested in the top layer for absolute perfect centering */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-20 z-40 flex flex-col items-center pointer-events-none">
                  {isCandleLit ? (
                    <div className="w-4 h-9 bg-gradient-to-t from-red-500 via-rose-400 to-red-200 rounded-full animate-candle-flicker blur-[1.5px] shadow-[0_0_20px_rgba(230,57,70,0.85)]" />
                  ) : (
                    <div className="w-1 bg-white/40 h-8 rounded-full animate-[smokeTrail_1.5s_ease-out_forwards]" />
                  )}
                  {/* Candle body in rose crimson */}
                  <div className="w-2.5 h-16 bg-gradient-to-r from-luxury-rose via-luxury-red to-luxury-ruby rounded-t-sm shadow-md" />
                </div>

                {/* Top face of Top Layer */}
                <div className="w-full h-6 bg-gradient-to-b from-[#ff8fa3] to-[#e63946] rounded-full border-b border-white/10 relative z-10">
                  {/* Frosting drips */}
                  <div className="absolute inset-x-0 top-3 h-5 flex justify-around">
                    <div className="w-3.5 h-5 bg-[#e63946] rounded-b-full shadow-sm" />
                    <div className="w-4.5 h-7 bg-[#e63946] rounded-b-full shadow-sm" style={{ marginTop: '-2px' }} />
                    <div className="w-3.5 h-4 bg-[#e63946] rounded-b-full shadow-sm" />
                    <div className="w-5 h-8 bg-[#e63946] rounded-b-full shadow-sm" style={{ marginTop: '-4px' }} />
                    <div className="w-3.5 h-5 bg-[#e63946] rounded-b-full shadow-sm" />
                  </div>
                </div>
                {/* Cylinder Side of Top Layer */}
                <div className="absolute inset-x-0 top-3 bottom-0 bg-gradient-to-r from-[#b7094c] via-[#e63946] to-[#7209b7] rounded-b-full z-0" />
              </div>

              {/* Cake Middle Cream Layer (Vanilla Cream) */}
              <div className="w-[172px] h-5 -mt-3 relative z-20">
                {/* Top face of Cream Layer */}
                <div className="w-full h-2.5 bg-red-100/90 rounded-full relative z-10" />
                {/* Cylinder Side of Cream Layer */}
                <div className="absolute inset-x-0 top-1 bottom-0 bg-gradient-to-r from-[#f7e1d7] via-[#fff3b0] to-[#f7e1d7] rounded-b-full z-0" />
              </div>

              {/* Cake Bottom Layer (Velvet Crimson Frosting) */}
              <div className="w-48 h-20 -mt-3 relative z-10">
                {/* Top face of Bottom Layer */}
                <div className="w-full h-8 bg-gradient-to-b from-[#ae2012] to-[#9b2226] rounded-full relative z-10">
                  {/* Sprinkles decoration */}
                  <div className="absolute inset-x-4 top-2 h-4 flex justify-around opacity-75">
                    <span className="w-2 h-1 bg-[#ff2e63] rotate-45 rounded-full" />
                    <span className="w-1.5 h-1.5 bg-[#ffffff] rounded-full" />
                    <span className="w-2 h-1 bg-[#ff8fa3] -rotate-12 rounded-full" />
                    <span className="w-1.5 h-1.5 bg-luxury-rose rounded-full" />
                    <span className="w-2.5 h-1 bg-[#ffccd5] rotate-45 rounded-full" />
                  </div>
                </div>
                {/* Cylinder Side of Bottom Layer */}
                <div className="absolute inset-x-0 top-4 bottom-0 bg-gradient-to-r from-[#5f0f40] via-[#ae2012] to-[#31001c] rounded-b-full z-0 border-b border-black/40" />
              </div>

              {/* Obsidian Red plate stand */}
              <div className="w-56 h-6 -mt-4 relative z-0">
                {/* Top face of Plate */}
                <div className="w-full h-3 bg-gradient-to-b from-luxury-red to-[#7a0d16] rounded-full border-t border-luxury-rose/30 relative z-10" />
                {/* Cylinder Side of Plate */}
                <div className="absolute inset-x-0 top-1.5 bottom-0 bg-gradient-to-r from-[#4a0404] via-[#7a0d16] to-[#1a0000] rounded-b-full z-0 shadow-2xl" />
              </div>
              {/* Stand Neck */}
              <div className="w-32 h-6 bg-gradient-to-b from-[#3a0408] to-[#1a0000] rounded-b-full shadow-md z-[0] -mt-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Giant Crimson Birthday Text Reveal */}
      <AnimatePresence>
        {showHappyBirthday && (
          <div className="flex flex-col items-center w-full max-w-3xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.22em' }}
              transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
              className="text-4xl md:text-7xl font-serif font-bold text-luxury-gradient tracking-widest text-center uppercase leading-none drop-shadow-[0_5px_18px_rgba(230,57,70,0.55)] mb-4"
            >
              HAPPY BIRTHDAY ❤️
            </motion.h1>

            {/* Glowing red divider line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '80px', opacity: 0.6 }}
              transition={{ delay: 0.8, duration: 1.2 }}
              className="h-[1px] bg-luxury-red my-4"
            />
          </div>
        )}
      </AnimatePresence>

      {/* 3. Deeply Touching Glassmorphic Handwritten Letter */}
      <AnimatePresence>
        {showLetter && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
            className="w-full max-w-xl p-8 md:p-10 rounded-2xl glassmorphism-luxury border border-luxury-red/20 mt-6 shadow-2xl flex flex-col items-center text-center relative"
          >
            <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-b from-luxury-red/5 via-transparent to-transparent" />

            <div className="font-handwritten text-3xl md:text-4xl text-luxury-rose leading-relaxed mb-6 font-light max-h-[300px] overflow-y-auto pr-2 select-text custom-scrollbar">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="mb-4 text-[#ffcbd5]"
              >
                “You are one of the most incredibly special, beautiful, and deeply valued people in my entire life.”
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.2 }}
                className="mb-4 text-[#ffcbd5]"
              >
                “Today is a celebration of the wonderful light and happiness you bring to the world and everyone fortunate enough to know you.”
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1.2 }}
                className="text-[#ffcbd5]"
              >
                “May your year ahead be loaded with glowing smiles, beautiful achievements, and magical moments. I have crafted a little journey down memory lane just for you...”
              </motion.p>
            </div>

            {/* Explore surprise button in ruby gradients */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.4, duration: 0.8 }}
              onClick={onExploreMemories}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-luxury-red via-[#d00000] to-luxury-red text-white font-medium tracking-widest text-xs uppercase shadow-[0_4px_15px_rgba(230,57,70,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto border border-luxury-rose/25 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
              Explore the Surprises ✨
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes riseBalloon {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.85;
          }
          50% {
            transform: translateY(-50vh) rotate(5deg) translateX(25px);
          }
          100% {
            transform: translateY(-120vh) rotate(-10deg) translateX(-20px);
            opacity: 0;
          }
        }
        @keyframes smokeTrail {
          0% {
            transform: scaleY(1) translateY(0);
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            transform: scaleY(1.8) translateY(-25px) translateX(15px);
            opacity: 0;
            filter: blur(3px);
          }
        }
      `}</style>
    </div>
  );
}
