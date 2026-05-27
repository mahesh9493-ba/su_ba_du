import React, { useEffect, useRef, useState } from 'react';

const ROMANTIC_QUOTES = [
  "You are the best part of my life",
  "Every second brings me closer to celebrating you",
  "You deserve the happiest memories",
  "The world is a far more beautiful place with you in it",
  "Your smile lights up my entire sky",
  "You are my favorite thought",
  "To the one who makes my heart beat faster",
  "You deserve all the magic in the universe"
];

export default function BackgroundEffects({ densityMultiplier = 1 }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [quoteOpacity, setQuoteOpacity] = useState(0);

  // Quote rotation system
  useEffect(() => {
    // Fade in first quote
    setTimeout(() => setQuoteOpacity(0.09), 1000);

    const interval = setInterval(() => {
      // Fade out
      setQuoteOpacity(0);
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % ROMANTIC_QUOTES.length);
        // Fade back in
        setQuoteOpacity(0.09);
      }, 1500);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

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
        this.y = 0;
        this.size = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
      }
      update() {
        this.alpha += this.twinkleSpeed * this.twinkleDir;
        if (this.alpha > 0.8) {
          this.alpha = 0.8;
          this.twinkleDir = -1;
        } else if (this.alpha < 0.1) {
          this.alpha = 0.1;
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

    class Firefly {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 1.2;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.5 + 0.2;
        this.sinAmp = Math.random() * 0.8 + 0.2;
        this.alpha = Math.random() * 0.4 + 0.3;
        this.pulseSpeed = Math.random() * 0.01 + 0.005;
        this.pulseDir = Math.random() > 0.5 ? 1 : -1;
        // Luxury Red & Rose tones
        this.color = Math.random() > 0.4 ? 'rgba(230, 57, 70, ' : 'rgba(255, 143, 163, ';
      }
      update() {
        this.angle += 0.01;
        this.x += Math.cos(this.angle) * this.sinAmp;
        this.y -= this.speed;

        if (this.y < -10) {
          this.y = height + 10;
          this.x = Math.random() * width;
        }
        if (this.x < -10 || this.x > width + 10) {
          this.x = Math.random() * width;
        }

        this.alpha += this.pulseSpeed * this.pulseDir;
        if (this.alpha > 0.75) {
          this.alpha = 0.75;
          this.pulseDir = -1;
        } else if (this.alpha < 0.2) {
          this.alpha = 0.2;
          this.pulseDir = 1;
        }

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const dist = Math.hypot(this.x - mx, this.y - my);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          const angle = Math.atan2(this.y - my, this.x - mx);
          this.x += Math.cos(angle) * force * 4;
          this.y += Math.sin(angle) * force * 4;
        }
      }
      draw() {
        // Highly optimized double-layered glow (10x faster than shadowBlur)
        ctx.fillStyle = 'rgba(230, 57, 70, ' + (this.alpha * 0.18) + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `${this.color}${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class SkyLantern {
      constructor(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + Math.random() * 200;
        this.w = Math.random() * 12 + 8;
        this.h = this.w * 1.35;
        this.speed = Math.random() * 0.4 + 0.15;
        this.alpha = Math.random() * 0.4 + 0.3;
        this.swaySpeed = Math.random() * 0.005 + 0.002;
        this.swayAngle = Math.random() * Math.PI;
      }
      update() {
        this.y -= this.speed;
        this.swayAngle += this.swaySpeed;
        this.x += Math.sin(this.swayAngle) * 0.25;

        if (this.y < -50) {
          this.y = height + 50;
          this.x = Math.random() * width;
          this.w = Math.random() * 12 + 8;
          this.h = this.w * 1.35;
        }
      }
      draw() {
        // Optimized radial glow backing
        ctx.fillStyle = 'rgba(230, 57, 70, ' + (this.alpha * 0.12) + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y - this.h / 2, this.w * 2.2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw elegant red-rose lantern shape
        ctx.fillStyle = `rgba(230, 57, 70, ${this.alpha * 0.85})`;
        ctx.beginPath();
        ctx.moveTo(this.x - this.w / 2, this.y);
        ctx.lineTo(this.x - this.w / 2.5, this.y - this.h);
        ctx.lineTo(this.x + this.w / 2.5, this.y - this.h);
        ctx.lineTo(this.x + this.w / 2, this.y);
        ctx.closePath();
        ctx.fill();

        // Bottom fire core
        ctx.fillStyle = `rgba(255, 180, 180, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.w / 4, 0, Math.PI, true);
        ctx.fill();
      }
    }

    class ClickParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 1;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.01;
        this.gravity = 0.05;
        this.isHeart = Math.random() > 0.3;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.alpha -= this.decay;
      }
      draw() {
        if (this.alpha <= 0) return;
        // Ruby red clicking sparks
        ctx.fillStyle = `rgba(230, 57, 70, ${this.alpha})`;
        
        if (this.isHeart) {
          ctx.beginPath();
          const d = this.size * 2;
          ctx.moveTo(this.x, this.y + d / 4);
          ctx.bezierCurveTo(this.x - d / 2, this.y - d / 2, this.x - d, this.y + d / 3, this.x, this.y + d);
          ctx.bezierCurveTo(this.x + d, this.y + d / 3, this.x + d / 2, this.y - d / 2, this.x, this.y + d / 4);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    const isMobile = width < 768;
    const starCount = Math.floor((isMobile ? 60 : 180) * densityMultiplier);
    const fireflyCount = Math.floor((isMobile ? 25 : 60) * densityMultiplier);
    const lanternCount = Math.floor((isMobile ? 8 : 20) * densityMultiplier);

    const stars = Array.from({ length: starCount }, () => new Star());
    const fireflies = Array.from({ length: fireflyCount }, () => new Firefly());
    const lanterns = Array.from({ length: lanternCount }, () => new SkyLantern(true));
    let clickParticles = [];

    const handleCanvasClick = (e) => {
      for (let i = 0; i < 18; i++) {
        clickParticles.push(new ClickParticle(e.clientX, e.clientY));
      }
    };
    window.addEventListener('click', handleCanvasClick);

    const tick = () => {
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.fillStyle = '#080303';
      ctx.fillRect(0, 0, width, height);

      const grad = ctx.createRadialGradient(
        width / 2, height / 2, 10,
        width / 2, height / 2, Math.max(width, height)
      );
      grad.addColorStop(0, 'rgba(25, 5, 5, 0.15)'); // Soft dark red tint core
      grad.addColorStop(0.5, 'rgba(5, 2, 2, 0.45)');
      grad.addColorStop(1, 'rgba(3, 1, 1, 0.96)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      lanterns.forEach(lantern => {
        lantern.update();
        lantern.draw();
      });

      fireflies.forEach(firefly => {
        firefly.update();
        firefly.draw();
      });

      clickParticles = clickParticles.filter(p => p.alpha > 0);
      clickParticles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleCanvasClick);
    };
  }, [densityMultiplier]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
      />

      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none px-4"
        style={{ zIndex: 1 }}
      >
        <p
          className="text-center font-serif text-3xl md:text-5xl lg:text-6xl text-luxury-rose italic font-medium tracking-wide leading-relaxed filter blur-[0.5px] transition-opacity duration-1000 ease-in-out max-w-4xl"
          style={{ 
            opacity: quoteOpacity,
            transition: 'opacity 1.5s ease-in-out',
            textShadow: '0 0 40px rgba(230, 57, 70, 0.3)'
          }}
        >
          “{ROMANTIC_QUOTES[currentQuoteIndex]}”
        </p>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-luxury-darker via-transparent to-transparent opacity-90" style={{ zIndex: 2 }} />
    </div>
  );
}
