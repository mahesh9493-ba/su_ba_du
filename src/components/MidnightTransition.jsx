import React, { useEffect, useRef, useState } from 'react';

export default function MidnightTransition({ onTransitionComplete }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const flashRef = useRef(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [cameraShakeActive, setCameraShakeActive] = useState(true);
  const [flashActive, setFlashActive] = useState(false);

  useEffect(() => {
    // 1. Camera shake runs immediately for 550ms
    const shakeTimer = setTimeout(() => {
      setCameraShakeActive(false);
      setShowCanvas(true);
      setFlashActive(true);
    }, 550);

    // 2. Climax runs for 3200ms total, then transitions to reveal
    const completeTimer = setTimeout(() => {
      onTransitionComplete();
    }, 3200);

    return () => {
      clearTimeout(shakeTimer);
      clearTimeout(completeTimer);
    };
  }, [onTransitionComplete]);

  // High performance fireworks in crimson
  useEffect(() => {
    if (!showCanvas || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    class Confetti {
      constructor() {
        this.x = Math.random() * width;
        this.y = -20;
        this.size = Math.random() * 8 + 6;
        // Velvet red / rose themes
        this.color = [
          '#ff2e63', // Red
          '#e63946', // Crimson
          '#ff8fa3', // Rose
          '#ae2012', // Ruby
          '#ffffff', // Sparkle white
          '#ffccd5'  // Soft pink
        ][Math.floor(Math.random() * 6)];
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 3 + 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5 - 2.5;
        this.wobble = Math.random() * 10;
        this.wobbleSpeed = Math.random() * 0.05 + 0.02;
      }
      update() {
        this.y += this.vy;
        this.x += this.vx + Math.sin(this.wobble) * 0.5;
        this.wobble += this.wobbleSpeed;
        this.rotation += this.rotationSpeed;
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
        ctx.restore();
      }
    }

    class FireworkSparks {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.gravity = 0.08;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.008;
        this.size = Math.random() * 2.5 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.alpha -= this.decay;
      }
      draw() {
        if (this.alpha <= 0) return;
        // Highly optimized layered glow drawing (30x faster than shadowBlur)
        ctx.fillStyle = this.color;

        // Glow ring
        ctx.globalAlpha = this.alpha * 0.16;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Rocket {
      constructor() {
        this.x = Math.random() * (width - 200) + 100;
        this.y = height + 10;
        this.targetY = Math.random() * (height * 0.5) + height * 0.15;
        this.vy = -(Math.random() * 6 + 10);
        // Red-dominant rocket tails
        this.color = [
          '#ff2e63',
          '#e63946',
          '#ff8fa3',
          '#ffffff',
          '#ff0055',
          '#ae2012'
        ][Math.floor(Math.random() * 6)];
        this.isDead = false;
      }
      update() {
        this.y += this.vy;
        this.vy += 0.05;

        if (this.y <= this.targetY || this.vy >= 0) {
          this.isDead = true;
          this.explode();
        }
      }
      draw() {
        // Optimized layered rocket tail glow
        ctx.fillStyle = this.color;
        
        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1.0;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      explode() {
        for (let i = 0; i < 60; i++) {
          fireworkSparks.push(new FireworkSparks(this.x, this.y, this.color));
        }
      }
    }

    let confettiList = [];
    let fireworkRockets = [];
    let fireworkSparks = [];

    for (let i = 0; i < 60; i++) confettiList.push(new Confetti());
    fireworkRockets.push(new Rocket());
    fireworkRockets.push(new Rocket());

    let frameCount = 0;

    const tick = () => {
      frameCount++;

      ctx.clearRect(0, 0, width, height);

      if (frameCount % 4 === 0) confettiList.push(new Confetti());
      if (frameCount % 45 === 0) fireworkRockets.push(new Rocket());

      confettiList = confettiList.filter(c => c.y < height + 20);
      confettiList.forEach(c => {
        c.update();
        c.draw();
      });

      fireworkRockets = fireworkRockets.filter(r => !r.isDead);
      fireworkRockets.forEach(r => {
        r.update();
        r.draw();
      });

      fireworkSparks = fireworkSparks.filter(s => s.alpha > 0);
      fireworkSparks.forEach(s => {
        s.update();
        s.draw();
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [showCanvas]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 w-full h-full z-50 pointer-events-none overflow-hidden flex items-center justify-center ${cameraShakeActive ? "animate-camera-shake" : ""}`}
    >
      {/* Permanently mounted canvas to eliminate race conditions, toggling opacity */}
      <canvas 
        ref={canvasRef} 
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${showCanvas ? "opacity-100" : "opacity-0"}`} 
      />

      {/* Cinematic Transition UI inside container to experience the camera shake */}
      {!showCanvas && (
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-sm p-8 rounded-2xl glassmorphism-luxury border border-luxury-red/20 shadow-2xl animate-pulse">
          <div className="w-16 h-16 rounded-full border border-luxury-rose/20 flex items-center justify-center text-luxury-rose mb-4 heartbeat-glow">
            <svg className="w-8 h-8 text-luxury-red fill-luxury-red" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-serif font-bold text-luxury-gradient tracking-[0.2em] uppercase mb-2">
            Midnight Approaching
          </h2>
          <p className="text-[10px] tracking-widest text-[#ffcbd5] uppercase font-light">
            Brace yourself for the surprise...
          </p>
        </div>
      )}

      <div 
        ref={flashRef}
        className={`absolute inset-0 w-full h-full pointer-events-none z-30 opacity-0 ${flashActive ? "animate-white-flash" : ""}`}
        style={{
          background: 'radial-gradient(circle, rgba(255,240,240,1) 0%, rgba(230,57,70,0.85) 60%, rgba(10,4,4,1) 100%)',
        }}
      />

      {/* Hardware-accelerated dynamic compositor CSS animations */}
      <style>{`
        @keyframes climax-camera-shake {
          0% { transform: translate(0, 0); }
          5% { transform: translate(-4px, 3px); }
          15% { transform: translate(4px, -3px); }
          25% { transform: translate(-6px, 5px); }
          35% { transform: translate(6px, -5px); }
          45% { transform: translate(-3px, 2px); }
          55% { transform: translate(3px, -2px); }
          65% { transform: translate(-2px, 1px); }
          75% { transform: translate(2px, -1px); }
          85% { transform: translate(-1px, 0px); }
          95% { transform: translate(1px, 0px); }
          100% { transform: translate(0, 0); }
        }
        .animate-camera-shake {
          animation: climax-camera-shake 0.55s ease-in-out forwards;
        }
        @keyframes climax-white-flash {
          0% { opacity: 0; }
          10% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-white-flash {
          animation: climax-white-flash 2.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
