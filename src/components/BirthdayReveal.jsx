import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

export default function BirthdayReveal({ onExploreMemories }) {
  const [revealStage, setRevealStage] = useState('darkness'); // 'darkness', 'lava', 'lighting', 'waiting-to-blow', 'blowing', 'message', 'final-moment'
  const [candle1Lit, setCandle1Lit] = useState(false);
  const [candle2Lit, setCandle2Lit] = useState(false);
  const [candle3Lit, setCandle3Lit] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);
  const [showLava, setShowLava] = useState(false);
  const [balloons, setBalloons] = useState([]);
  const [steamParticles, setSteamParticles] = useState([]);
  const [sparks, setSparks] = useState([]);
  const [fireworks, setFireworks] = useState([]);
  const [typewrittenLine, setTypewrittenLine] = useState("");



  // Run automatically on mount
  useEffect(() => {

    // 1. Enter Lava stage (t = 2000ms)
    const tLava = setTimeout(() => {
      setRevealStage('lava');
      setShowLava(true);
    }, 2000);

    // 2. Enter Candle ignition stage (t = 5000ms)
    const tLighting = setTimeout(() => {
      setRevealStage('lighting');
      setTimeout(() => { setCandle1Lit(true); }, 600);
      setTimeout(() => { setCandle2Lit(true); }, 1200);
      setTimeout(() => { setCandle3Lit(true); }, 1800);
    }, 5000);

    // 3. Move to waiting state to let user blow the candles (t = 7800ms)
    const tWait = setTimeout(() => {
      setRevealStage('waiting-to-blow');
    }, 7800);

    return () => {
      clearTimeout(tLava);
      clearTimeout(tLighting);
      clearTimeout(tWait);
    };
  }, []);


  // Click to blow candles handler
  const handleBlowCandles = () => {
    if (revealStage !== 'waiting-to-blow') return;

    // Extinguish flames, start smoke trails, blow sound
    setCandle1Lit(false);
    setCandle2Lit(false);
    setCandle3Lit(false);
    setShowSmoke(true);

    // Move to blowing stage
    setRevealStage('blowing');

    // After 1.2 seconds, completely remove the cake from the viewport and reveal the wish
    setTimeout(() => {
      setRevealStage('message');

    }, 1200);

    // After 6.2 seconds, transition to the final parchment letter & typewriter line
    setTimeout(() => {
      setRevealStage('final-moment');
    }, 6200);
  };

  // Rising steam bubbles
  useEffect(() => {
    if (revealStage === 'lava' || revealStage === 'lighting' || revealStage === 'waiting-to-blow') {
      const interval = setInterval(() => {
        setSteamParticles(prev => [
          ...prev.slice(-12),
          {
            id: Math.random(),
            x: Math.random() * 60 - 30,
            scale: Math.random() * 0.4 + 0.6,
            duration: Math.random() * 2 + 1.5
          }
        ]);

      }, 1200);
      return () => clearInterval(interval);
    }
  }, [revealStage]);

  // Swarming golden sparkles
  useEffect(() => {
    if (revealStage === 'lighting' || revealStage === 'waiting-to-blow' || revealStage === 'blowing' || revealStage === 'message' || revealStage === 'final-moment') {
      const interval = setInterval(() => {
        setSparks(prev => [
          ...prev.slice(-30),
          {
            id: Math.random(),
            x: Math.random() * 260 - 130,
            y: Math.random() * 200 - 80,
            scale: Math.random() * 0.5 + 0.5,
            rotation: Math.random() * 360,
            duration: Math.random() * 3 + 2.5
          }
        ]);
      }, 350);
      return () => clearInterval(interval);
    }
  }, [revealStage]);

  // Distant expanding fireworks
  useEffect(() => {
    if (revealStage === 'message' || revealStage === 'final-moment') {
      const interval = setInterval(() => {
        setFireworks(prev => [
          ...prev.slice(-4),
          {
            id: Math.random(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 35 + 10,
            color: ['#d4af37', '#ff8fa3', '#e63946', '#ae2012'][Math.floor(Math.random() * 4)],
            scale: Math.random() * 0.7 + 0.6
          }
        ]);

      }, 2800);
      return () => clearInterval(interval);
    }
  }, [revealStage]);

  // Automatic balloons floating up during message reveal
  useEffect(() => {
    if (revealStage === 'message') {
      const colors = ['#ff2e63', '#e63946', '#ff8fa3', '#ae2012', '#ffccd5', '#ffffff'];
      const newBalloons = Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: Math.random() * 92 + 4,
        size: Math.random() * 25 + 35,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2.5,
        duration: Math.random() * 4 + 6
      }));
      setBalloons(newBalloons);
    }
  }, [revealStage]);

  // Typewriter final message
  const finalLine = "“Some birthdays become special because of celebrations…\nBut this one is special because it celebrates you. ❤️”";
  useEffect(() => {
    if (revealStage === 'final-moment') {
      let i = 0;
      const timer = setInterval(() => {
        const nextStr = finalLine.slice(0, i + 1);
        setTypewrittenLine(nextStr);
        i++;
        if (i >= finalLine.length) {
          clearInterval(timer);
        }
      }, 45);
      return () => clearInterval(timer);
    }
  }, [revealStage]);

  // Candle item that renders lit flame or smoke trail
  const Candle = ({ lit, index, offsetClass }) => {
    return (
      <div className={`flex flex-col items-center relative ${offsetClass}`}>
        <AnimatePresence>
          {lit ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-2.5 h-6 bg-gradient-to-t from-red-500 via-yellow-400 to-yellow-100 rounded-full animate-candle-flicker blur-[1px] shadow-[0_0_12px_rgba(250,204,21,0.85)] absolute -top-5"
            />
          ) : showSmoke ? (
            <motion.div
              initial={{ opacity: 0.8, scaleY: 0.6, y: -4 }}
              animate={{ opacity: 0, scaleY: 1.6, y: -28, x: 8 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="w-1 bg-white/40 h-6 rounded-full absolute -top-5 blur-[0.5px]"
            />
          ) : null}
        </AnimatePresence>
        <div className="w-1.5 h-10 bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-500 rounded-t-sm shadow-md" />
      </div>
    );
  };

  // Gorgeous 3D Cake Cylinder
  const Cake3D = () => {
    return (
      <div className="relative py-12 flex flex-col items-center justify-center pointer-events-none">
        
        {/* Tier 1 (Top Layer) */}
        <div className="w-36 h-14 relative z-30 flex flex-col items-center">
          
          {/* 3 Candles */}
          <div className="absolute inset-x-0 -top-12 z-40 flex justify-around pointer-events-none w-full px-4">
            <Candle lit={candle1Lit} index={1} offsetClass="-left-1" />
            <Candle lit={candle2Lit} index={2} offsetClass="-top-2" />
            <Candle lit={candle3Lit} index={3} offsetClass="-right-1" />
          </div>

          {/* Top Face of top layer */}
          <div className="w-full h-5 bg-gradient-to-b from-[#4a2511] to-[#241005] rounded-full border-b border-white/5 relative z-10">
            <div className="absolute inset-0 bg-[#1f0d02] rounded-full opacity-90 blur-[0.5px] scale-90 border border-amber-600/10" />
            {/* Gold flakes */}
            <div className="absolute inset-x-4 top-1 h-2 flex justify-around opacity-60">
              <span className="w-1 h-1 bg-[#d4af37] rotate-12 rounded-full" />
              <span className="w-1.5 h-0.5 bg-[#e5c158] rounded-full" />
              <span className="w-1 h-1 bg-[#d4af37] -rotate-45 rounded-full" />
            </div>
          </div>
          
          {/* Cylinder side of top layer */}
          <div className="absolute inset-x-0 top-2.5 bottom-0 bg-gradient-to-r from-[#190a03] via-[#3d2314] to-[#120601] rounded-b-full z-0 overflow-hidden">
            {/* Slow Chocolate Drips */}
            <div className="absolute inset-x-0 top-0 h-10 flex justify-around pointer-events-none">
              <motion.div 
                animate={{ height: showLava ? 36 : 0 }} 
                transition={{ duration: 6, ease: "easeInOut" }}
                className="w-2.5 bg-[#1e0b00] rounded-b-full shadow-lg border-r border-white/5" 
              />
              <motion.div 
                animate={{ height: showLava ? 48 : 0 }} 
                transition={{ duration: 8, ease: "easeInOut", delay: 0.5 }}
                className="w-3 bg-[#2b1202] rounded-b-full shadow-lg" 
              />
              <motion.div 
                animate={{ height: showLava ? 30 : 0 }} 
                transition={{ duration: 7, ease: "easeInOut", delay: 1 }}
                className="w-2.5 bg-[#1e0b00] rounded-b-full shadow-lg border-l border-white/5" 
              />
            </div>
          </div>
        </div>

        {/* Tier 2 (Cream layer) */}
        <div className="w-[150px] h-4 -mt-2.5 relative z-20">
          <div className="w-full h-2.5 bg-gradient-to-b from-[#fceade] to-[#e8cbb9] rounded-full relative z-10" />
          <div className="absolute inset-x-0 top-1 bottom-0 bg-gradient-to-r from-[#ffe8d6] via-[#fff3b0] to-[#ffe8d6] rounded-b-full z-0" />
        </div>

        {/* Tier 3 (Bottom Layer) */}
        <div className="w-48 h-16 -mt-2 relative z-10">
          {/* Top Face */}
          <div className="w-full h-6 bg-gradient-to-b from-[#3a1d0c] to-[#1f0f03] rounded-full relative z-10">
            <div className="absolute inset-x-8 top-1 h-3 flex justify-around opacity-60">
              <span className="w-1.5 h-1 bg-[#d4af37] rotate-45 rounded-full" />
              <span className="w-1 h-1 bg-[#ffffff] rounded-full" />
              <span className="w-1.5 h-0.5 bg-[#e5c158] rounded-full" />
            </div>
          </div>
          
          {/* Cylinder side of bottom layer */}
          <div className="absolute inset-x-0.5 top-3.5 bottom-0 bg-gradient-to-r from-[#140802] via-[#2d170b] to-[#0f0501] rounded-b-full z-0 border-b border-black/40 overflow-hidden">
            {/* Drips */}
            <div className="absolute inset-x-0 top-0 h-12 flex justify-around pointer-events-none">
              <motion.div 
                animate={{ height: showLava ? 42 : 0 }} 
                transition={{ duration: 7, ease: "easeInOut", delay: 1.5 }}
                className="w-3.5 bg-[#1e0b00] rounded-b-full shadow-md" 
              />
              <motion.div 
                animate={{ height: showLava ? 28 : 0 }} 
                transition={{ duration: 5, ease: "easeInOut", delay: 2 }}
                className="w-3 bg-[#2c1200] rounded-b-full shadow-md" 
              />
            </div>
          </div>
        </div>

        {/* Obsidian stand */}
        <div className="w-56 h-5 -mt-3.5 relative z-0">
          <div className="w-full h-2.5 bg-gradient-to-b from-[#1c1209] to-[#050301] rounded-full border-t border-amber-600/20 relative z-10" />
          <div className="absolute inset-x-0 top-1 bottom-0 bg-gradient-to-r from-[#0d0703] via-[#1a0f07] to-[#030100] rounded-b-full z-0 shadow-2xl" />
        </div>
        <div className="w-32 h-5 bg-gradient-to-b from-[#0f0804] to-black rounded-b-full shadow-md z-[0] -mt-1" />
      
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-16 pb-24 relative overflow-hidden px-4 select-none bg-gradient-to-b from-[#0f0804] via-[#221004] to-[#0c0502] transition-all duration-1000">
      
      {/* 1. Golden/Rose Ambient Glowing Mesh Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
        <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] rounded-full bg-yellow-600/10 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-rose-600/10 blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      {/* 2. Cinematic Film Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] bg-[radial-gradient(transparent_50%,rgba(0,0,0,0.85))]" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
      }} />

      {/* 3. Floating Balloons Render */}
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

      {/* 4. Background Fireworks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
        {fireworks.map((fw) => (
          <div
            key={fw.id}
            className="absolute rounded-full bg-white animate-ping"
            style={{
              left: `${fw.x}%`,
              top: `${fw.y}%`,
              width: '12px',
              height: '12px',
              backgroundColor: fw.color,
              filter: `blur(1.5px) drop-shadow(0 0 15px ${fw.color})`,
              transform: `scale(${fw.scale})`,
              animationDuration: '2.5s'
            }}
          />
        ))}
      </div>

      {/* 5. Main Visual Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-20 w-full max-w-4xl pt-8">
        
        {/* Interactive Instruction Prompt */}
        <AnimatePresence>
          {revealStage === 'waiting-to-blow' && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs uppercase tracking-[0.25em] text-[#ffccd5] font-semibold mb-6 animate-pulse text-center filter drop-shadow-[0_0_8px_rgba(255,204,21,0.5)]"
            >
              Make a wish & click the cake to blow the candles 🕯️❤️
            </motion.p>
          )}
        </AnimatePresence>

        {/* 3D Cake Cylinder Container (Clickable to Blow) */}
        <AnimatePresence>
          {(revealStage === 'darkness' || revealStage === 'lava' || revealStage === 'lighting' || revealStage === 'waiting-to-blow' || revealStage === 'blowing') && (
            <motion.div
              key="cake-reveal-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: revealStage === 'blowing' ? 0 : 1,
                scale: revealStage === 'blowing' ? 0.72 : 1,
                y: revealStage === 'blowing' ? 45 : 0
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              onClick={handleBlowCandles}
              className="relative flex flex-col items-center justify-center cursor-pointer pointer-events-auto"
            >
              {/* Steam Rising Particles */}
              <div className="absolute -top-12 z-40 pointer-events-none">
                {steamParticles.map(p => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 0, scale: 0.3 }}
                    animate={{ opacity: [0, 0.45, 0], y: -80, x: p.x, scale: p.scale }}
                    transition={{ duration: p.duration, ease: "easeOut" }}
                    className="absolute w-4 h-4 bg-white/20 rounded-full blur-[3px]"
                  />
                ))}
              </div>

              {/* Golden Swarming Sparks */}
              <div className="absolute inset-0 pointer-events-none z-30">
                {sparks.map(s => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: [0, 0.85, 0], x: s.x, y: s.y, rotate: s.rotation, scale: s.scale }}
                    transition={{ duration: s.duration, ease: "easeOut" }}
                    className="absolute text-yellow-400/70"
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                  </motion.div>
                ))}
              </div>

              {/* Renders the full luxury cake cylinder */}
              <Cake3D />

            </motion.div>
          )}
        </AnimatePresence>

        {/* 6. Giant Glowing Birthday Greeting text shown after cake vanishes */}
        <AnimatePresence>
          {revealStage === 'message' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col items-center text-center max-w-2xl mt-4 z-20 px-4"
            >
              <motion.h1
                initial={{ letterSpacing: '0.1em' }}
                animate={{ letterSpacing: '0.22em' }}
                transition={{ duration: 2.0 }}
                className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-luxury-gradient text-center uppercase tracking-widest leading-none drop-shadow-[0_0_20px_rgba(230,57,70,0.65)]"
              >
                HAPPY BIRTHDAY BAGI ❤️
              </motion.h1>

              {/* Glowing separator line */}
              <div className="h-[1px] w-24 bg-luxury-red/45 my-4 animate-glow-pulse" />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="font-serif italic text-rose-200 text-lg sm:text-2xl leading-relaxed max-w-xl text-center"
              >
                “You are not just a beautiful memory in Dudu’s life…
                <br />
                You became the most peaceful part of his world. ❤️”
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 7. Dudu's Typewritten line & Ink parchment letter card */}
        <AnimatePresence>
          {revealStage === 'final-moment' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="flex flex-col items-center w-full max-w-2xl mt-4 z-20 px-2"
            >
              {/* Typewritten line */}
              <div className="font-serif italic text-yellow-100 text-base sm:text-lg text-center leading-relaxed h-14 min-h-[56px] select-text">
                {typewrittenLine}
                {typewrittenLine.length < finalLine.length && (
                  <span className="inline-block w-2.5 h-4 bg-yellow-400/80 animate-pulse ml-1" />
                )}
              </div>

              {/* Parchment letter */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
                className="w-full p-6 sm:p-10 rounded-2xl glassmorphism-luxury border border-luxury-red/20 shadow-2xl flex flex-col items-center relative mt-4 select-text"
              >
                <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-b from-luxury-red/5 via-transparent to-transparent" />

                <div className="font-handwritten text-xl sm:text-2xl md:text-3xl text-left text-[#ffcbd5] leading-relaxed mb-6 font-light max-h-[380px] sm:max-h-[460px] md:max-h-[500px] overflow-y-auto pr-3 select-text custom-scrollbar space-y-4 w-full">
                  <p className="font-bold text-[#ffccd5]">To My Beautiful Bagi ❤️</p>
                  
                  <p>
                    Happy Birthday to the person who entered my life unexpectedly… and slowly became my safest place.
                  </p>

                  <p>
                    I still don’t know how simple conversations became emotions, how random moments became unforgettable memories, or how your presence became part of my everyday peace.
                  </p>

                  <p>
                    But somewhere between Tirumala roads, late-night calls, Burger King conversations, rainy bike rides, metro journeys, chai talks, and silent walks under street lights… you quietly became the most beautiful chapter of my life.
                  </p>

                  <p>
                    Before you, life was just moving. But after you, life started feeling meaningful.
                  </p>

                  <p>
                    You changed me in ways you probably never even realized. You made me care more, feel more, dream more, and believe in forever again.
                  </p>

                  <p>
                    Today, on your birthday, I don’t just wish you happiness…
                  </p>

                  <p>
                    I silently pray that every smile on your face stays forever, every dream in your heart comes true, and every difficult moment in your life becomes lighter because I’m beside you.
                  </p>

                  <p>
                    I don’t know what destiny has planned for us… But if life gives me one beautiful blessing, I hope it is you — today, tomorrow, and in every chapter ahead.
                  </p>

                  <p>
                    One day, I want us to look back at all these memories, smile at how beautifully everything started, and thank God for making our paths cross unexpectedly.
                  </p>

                  <p>
                    Because honestly… Meeting you was never part of my plan.
                  </p>

                  <p>
                    But now, you have become part of every prayer, every future dream, and every peaceful version of my life.
                  </p>

                  <p className="font-bold text-[#ffccd5]">Happy Birthday, Bagi. ❤️</p>

                  <p className="text-right text-rose-300 font-semibold text-lg sm:text-xl md:text-2xl pr-4 w-full">
                    — Yours, Dudu
                  </p>
                </div>

                {/* Return button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.2, duration: 0.8 }}
                  onClick={onExploreMemories}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-luxury-red via-[#d00000] to-luxury-red text-white font-medium tracking-widest text-xs uppercase shadow-[0_4px_15px_rgba(230,57,70,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto border border-luxury-rose/25 relative overflow-hidden group cursor-pointer"
                >
                  <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                  Unfold Our Magical Chapters 📖
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

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
        @keyframes flicker {
          0%, 100% {
            transform: scale(1) rotate(-1.5deg);
            filter: drop-shadow(0 0 4px rgba(251,146,60,0.85));
          }
          50% {
            transform: scale(1.08) rotate(2deg) translateY(-1px);
            filter: drop-shadow(0 0 10px rgba(253,224,71,0.95));
          }
        }
        .animate-candle-flicker {
          animation: flicker 0.8s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}
