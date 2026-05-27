import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, Sparkles, Smile, MessageCircle } from 'lucide-react';

const FLOATING_QUOTES = [
  "You feel like peace.",
  "My heart became calm after you.",
  "Some people become home silently.",
  "You were never planned… yet you became everything.",
  "I stopped searching after you.",
  "You are my calm in every chaos."
];

const STAGES = [
  {
    id: 'intro',
    lines: [
      { text: "Why You Are Special ❤️", type: 'title' },
      { text: "Some feelings are too deep to explain…", type: 'subtitle' }
    ]
  },
  {
    id: 1,
    lines: [
      { text: "I still don’t know why you became so special to me.", delay: 0 },
      { text: "And honestly…", delay: 2000 },
      { text: "I don’t even want to know the reason anymore.", delay: 3500 },
      { text: "Because some feelings become beautiful only when they remain unexplainable.", delay: 5800 }
    ]
  },
  {
    id: 2,
    lines: [
      { text: "You came into my life unexpectedly.", delay: 0 },
      { text: "No planning.", delay: 1800 },
      { text: "No force.", delay: 2800 },
      { text: "No perfect timing.", delay: 3800 },
      { text: "Still… somehow,", delay: 5000 },
      { text: "you became the calmest part of my world.", delay: 6000 }
    ]
  },
  {
    id: 3,
    lines: [
      { text: "Even today, when I think about how we met,", delay: 0 },
      { text: "how we slowly connected,", delay: 1800 },
      { text: "and how deeply you became part of my life…", delay: 3600 },
      { text: "it honestly feels like something only God could have planned.", delay: 5800 }
    ]
  },
  {
    id: 4,
    lines: [
      { text: "I never searched for perfection.", delay: 0 },
      { text: "I never searched for forever.", delay: 1800 },
      { text: "But somewhere between random conversations, silent care, late-night talks, and beautiful memories…", delay: 3600 },
      { text: "my heart quietly chose you.", delay: 6500 },
      { text: "And the most surprising part is…", delay: 8500 },
      { text: "it never wanted anyone else after that.", delay: 10500 }
    ]
  },
  {
    id: 5,
    lines: [
      { text: "I don’t want temporary feelings.", delay: 0 },
      { text: "I don’t want another special person.", delay: 2000 },
      { text: "I don’t want love that changes with time.", delay: 4000 }
    ]
  },
  {
    id: 6,
    lines: [
      { text: "Maybe that is why you feel different.", delay: 0 },
      { text: "Not because I can explain it…", delay: 2000 },
      { text: "But because my soul feels peaceful with you.", delay: 3800 }
    ]
  },
  {
    id: 7,
    lines: [
      { text: "You are not special because of one reason.", delay: 0 },
      { text: "You are special because, without even realizing it…", delay: 2200 },
      { text: "you became part of my prayers, my peace, my dreams, and every future I secretly wish for.", delay: 4800 }
    ]
  },
  {
    id: 8,
    lines: [
      { text: "And honestly…", delay: 0 },
      { text: "if trying to explain why you are special reduces the beauty of this feeling…", delay: 2200 },
      { text: "then I never want to explain it.", delay: 4800 }
    ]
  },
  {
    id: 'finale',
    lines: [
      { text: "I want to be a one woman man…", delay: 0, type: 'giant' },
      { text: "and that one woman should always be you, Bagi. ❤️", delay: 3500, type: 'giant' },
      { text: "Some connections are not meant to be understood…", delay: 8500, type: 'script' },
      { text: "They are simply meant to be felt. ❤️", delay: 11500, type: 'script' }
    ]
  }
];

function TypewriterLine({ text, speed = 35, className }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    const timer = setInterval(() => {
      setDisplayedText(text.substring(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {displayedText.length < text.length && (
        <span className="inline-block w-1.5 h-4 bg-luxury-rose/85 animate-pulse ml-0.5" />
      )}
    </span>
  );
}

export default function WhyYouAreSpecial({ onClose }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const canvasRef = useRef(null);

  const activeStage = STAGES[stageIndex];
  const isIntro = activeStage.id === 'intro';
  const isFinale = activeStage.id === 'finale';

  // Handle stage ticking delays
  useEffect(() => {
    setVisibleCount(0);
    const currentLines = activeStage.lines;
    const timers = currentLines.map((line, index) => {
      return setTimeout(() => {
        setVisibleCount(prev => Math.max(prev, index + 1));
      }, line.delay || 0);
    });

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, [stageIndex]);

  // High performance starry canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle Classes
    class Star {
      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.2 + 0.4;
        this.alpha = Math.random() * 0.4 + 0.1;
        this.twinkleSpeed = Math.random() * 0.015 + 0.003;
        this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
      }
      update() {
        this.alpha += this.twinkleSpeed * this.twinkleDir;
        if (this.alpha > 0.7) {
          this.alpha = 0.7;
          this.twinkleDir = -1;
        } else if (this.alpha < 0.05) {
          this.alpha = 0.05;
          this.twinkleDir = 1;
        }
      }
      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class CosmicCloud {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 200 + 100;
        this.color = Math.random() > 0.5 ? 'rgba(13, 21, 58, 0.15)' : 'rgba(212, 165, 116, 0.03)';
        this.vx = Math.random() * 0.2 - 0.1;
        this.vy = Math.random() * 0.2 - 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -this.radius || this.x > width + this.radius || this.y < -this.radius || this.y > height + this.radius) {
          this.reset();
        }
      }
      draw() {
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class GoldenParticle {
      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 50;
        this.size = Math.random() * 2 + 0.8;
        this.speed = Math.random() * 0.4 + 0.1;
        this.alpha = Math.random() * 0.6 + 0.2;
        this.angle = Math.random() * Math.PI;
        this.amplitude = Math.random() * 0.6 + 0.2;
      }
      update() {
        this.y -= this.speed;
        this.angle += 0.01;
        this.x += Math.sin(this.angle) * this.amplitude;
        if (this.y < -10) {
          this.reset();
        }
      }
      draw() {
        // Optimized double-layered glow (10x faster than shadowBlur)
        ctx.fillStyle = `rgba(212, 165, 116, ${this.alpha * 0.18})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(212, 165, 116, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class FloatingQuote {
      constructor(text) {
        this.text = text;
        this.reset();
        this.y = Math.random() * height;
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 120;
        this.speed = Math.random() * 0.12 + 0.04;
        this.alpha = 0;
        this.targetAlpha = Math.random() * 0.05 + 0.035; // 3.5% to 8.5% opacity (very subtle)
        this.scale = Math.random() * 0.25 + 0.85; // Font scale
        this.angle = Math.random() * Math.PI;
      }
      update() {
        this.y -= this.speed;
        this.angle += 0.003;
        this.x += Math.sin(this.angle) * 0.08;

        if (this.alpha < this.targetAlpha) {
          this.alpha += 0.0006;
        }

        if (this.y < -60) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.font = `italic ${Math.floor(16 * this.scale)}px "Outfit", "Inter", sans-serif`;
        ctx.fillStyle = `rgba(212, 165, 116, ${this.alpha})`;
        ctx.textAlign = 'center';
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
      }
    }

    const starCount = width < 768 ? 60 : 140;
    const cloudCount = 4;
    const particleCount = width < 768 ? 20 : 45;

    const stars = Array.from({ length: starCount }, () => new Star());
    const clouds = Array.from({ length: cloudCount }, () => new CosmicCloud());
    const particles = Array.from({ length: particleCount }, () => new GoldenParticle());
    const quotes = FLOATING_QUOTES.map(q => new FloatingQuote(q));

    const tick = () => {
      // Draw background sky gradient
      ctx.fillStyle = '#02030a';
      ctx.fillRect(0, 0, width, height);

      // Deep galactic radial glow
      const radialGrad = ctx.createRadialGradient(
        width / 2, height / 2, 50,
        width / 2, height / 2, Math.max(width, height)
      );
      radialGrad.addColorStop(0, 'rgba(8, 15, 45, 0.4)');
      radialGrad.addColorStop(0.5, 'rgba(3, 5, 20, 0.95)');
      radialGrad.addColorStop(1, '#010103');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // Clouds
      clouds.forEach(c => {
        c.update();
        c.draw();
      });

      // Stars
      stars.forEach(s => {
        s.update();
        s.draw();
      });

      // Floating Quotes (Subconscious drifting)
      quotes.forEach(q => {
        q.update();
        q.draw();
      });

      // Golden light particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNext = () => {
    if (stageIndex < STAGES.length - 1) {
      setStageIndex(stageIndex + 1);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full z-50 overflow-hidden flex flex-col items-center justify-center select-none bg-black">
      
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Galaxy Subtle Fog Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-color-dodge transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(212,165,116,0.15) 0%, rgba(3,5,20,0) 80%)'
        }}
      />

      {/* Climax Heartbeat Pulsing Aura */}
      <AnimatePresence>
        {isFinale && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
            {/* Pulsing Core Circle */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1.05, 1.15, 1],
                opacity: [0.15, 0.38, 0.22, 0.38, 0.15]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-full flex items-center justify-center filter blur-[2px]"
              style={{
                background: 'radial-gradient(circle, rgba(212, 165, 116, 0.08) 0%, transparent 68%)',
                boxShadow: '0 0 70px rgba(212, 165, 116, 0.12), inset 0 0 70px rgba(212, 165, 116, 0.1)'
              }}
            >
              <Heart className="w-20 h-20 md:w-32 md:h-32 text-luxury-rose/25 fill-luxury-rose/5 animate-pulse" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Monologue Center Content */}
      <div className="w-full max-w-3xl px-6 md:px-12 flex flex-col items-center justify-center relative z-10 text-center select-text">
        <AnimatePresence mode="wait">
          <motion.div
            key={stageIndex}
            initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -30, filter: 'blur(5px)' }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="w-full flex flex-col items-center gap-6"
          >
            {isIntro ? (
              // Stage 0: Intro Title Screen
              <div className="flex flex-col items-center py-10">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="w-20 h-20 rounded-full border border-luxury-rose/20 bg-luxury-rose/5 flex items-center justify-center text-luxury-rose mb-8 heartbeat-glow"
                >
                  <Heart className="w-8 h-8 fill-luxury-rose/20" />
                </motion.div>
                
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-luxury-gradient tracking-wide mb-4 text-shadow-luxury leading-tight select-none">
                  Why You Are Special ❤️
                </h1>
                
                <p className="text-sm md:text-lg font-light text-luxury-rose/70 italic tracking-widest font-serif mb-12 select-none">
                  “Some feelings are too deep to explain…”
                </p>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212, 165, 116, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className="px-8 py-3 rounded-full border border-[#d4a574]/40 bg-gradient-to-r from-[#d4a574]/10 via-[#050716] to-[#d4a574]/10 text-[#d4a574] hover:text-white font-medium text-xs tracking-[0.25em] uppercase transition-all duration-300 shadow-md cursor-pointer flex items-center gap-2 select-none"
                >
                  Listen to My Soul <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            ) : isFinale ? (
              // Stage 9: Climax Finale Screen (Slow camera zoom styling)
              <motion.div 
                animate={{ scale: [1, 1.04] }}
                transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="flex flex-col items-center gap-10 py-8"
              >
                {/* Giant Glowing Climax Typography */}
                <div className="flex flex-col gap-5 max-w-2xl">
                  {visibleCount >= 1 && (
                    <div className="text-2xl md:text-4xl font-serif font-bold text-white leading-relaxed text-shadow-luxury">
                      <TypewriterLine text={activeStage.lines[0].text} speed={40} />
                    </div>
                  )}
                  {visibleCount >= 2 && (
                    <div className="text-2xl md:text-4xl font-serif font-bold text-[#d4a574] leading-relaxed text-shadow-luxury">
                      <TypewriterLine text={activeStage.lines[1].text} speed={40} />
                    </div>
                  )}
                </div>

                {/* Scripted/Italic Slow Text Reveal */}
                <div className="flex flex-col gap-3 max-w-xl mt-4 border-t border-luxury-rose/10 pt-8">
                  {visibleCount >= 3 && (
                    <p className="text-base md:text-lg italic font-light text-[#ece8dc]/80 font-serif leading-relaxed">
                      <TypewriterLine text={activeStage.lines[2].text} speed={30} />
                    </p>
                  )}
                  {visibleCount >= 4 && (
                    <p className="text-base md:text-lg italic font-semibold text-luxury-rose font-serif leading-relaxed tracking-wide">
                      <TypewriterLine text={activeStage.lines[3].text} speed={35} />
                    </p>
                  )}
                </div>

                {/* Final Custom Return button overlay */}
                {visibleCount >= 4 && (
                  <motion.button
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1.5 }}
                    onClick={onClose}
                    className="mt-10 px-6 py-2.5 rounded-full border border-luxury-rose/20 bg-luxury-rose/5 text-luxury-rose/80 hover:text-white hover:border-luxury-rose/50 font-light tracking-[0.2em] text-[10px] uppercase transition-all duration-300 shadow-md cursor-pointer select-none"
                  >
                    Return to Menu ❤️
                  </motion.button>
                )}
              </motion.div>
            ) : (
              // Stages 1-8: Progressive Monologue text
              <div className="flex flex-col gap-6 w-full text-center">
                {activeStage.lines.map((line, idx) => {
                  const isVisible = visibleCount >= idx + 1;
                  return (
                    <div key={idx} className="min-h-[2.5rem] flex items-center justify-center">
                      <AnimatePresence>
                        {isVisible && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="w-full text-center"
                          >
                            <p 
                              className={`text-lg md:text-2xl font-light leading-relaxed font-serif ${
                                idx === activeStage.lines.length - 1 && activeStage.lines.length > 2
                                  ? 'text-[#d4a574] font-medium tracking-wide drop-shadow-[0_0_12px_rgba(212,165,116,0.3)]'
                                  : 'text-white/90'
                              }`}
                            >
                              <TypewriterLine text={line.text} speed={30} />
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Tap Anywhere Progress Prompt */}
                {visibleCount >= activeStage.lines.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.45, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    onClick={handleNext}
                    className="mt-14 text-[10px] tracking-[0.25em] text-[#d4a574]/80 uppercase cursor-pointer select-none flex items-center justify-center gap-1.5"
                  >
                    Tap anywhere to continue
                    <ChevronRight className="w-3 h-3 animate-bounce" />
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Screen Click-to-Progress Handlers (Only active when typewriter completes for current page, and not on intro/finale) */}
      {!isIntro && !isFinale && visibleCount >= activeStage.lines.length && (
        <div 
          onClick={handleNext} 
          className="absolute inset-0 w-full h-full z-0 cursor-pointer pointer-events-auto" 
        />
      )}
    </div>
  );
}
