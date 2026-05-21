import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const TRACKS = {
  celebration: "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3"
};

// Web Audio API Cozy Music-Box Ambient Synthesizer
class CozyAmbientSynth {
  constructor() {
    this.ctx = null;
    this.drone1 = null;
    this.drone2 = null;
    this.masterGain = null;
    this.delayNode = null;
    this.delayFeedback = null;
    this.chimeTimer = null;
    this.isPlaying = false;
    this.currentTheme = 'days';
    this.chimeVolume = 0.05;
  }

  start() {
    if (this.isPlaying) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      this.ctx = new AudioContextClass();
      
      // Cozy spacious delay feedback loop for echoing music-box tones
      this.delayNode = this.ctx.createDelay();
      this.delayNode.delayTime.setValueAtTime(0.65, this.ctx.currentTime);
      
      this.delayFeedback = this.ctx.createGain();
      this.delayFeedback.gain.setValueAtTime(0.38, this.ctx.currentTime);
      
      this.delayNode.connect(this.delayFeedback);
      this.delayFeedback.connect(this.delayNode);

      // Master Gain Node for volume control
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

      this.delayNode.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      // Warm Cozy sine drone fundamental (soothing bass glow)
      this.drone1 = this.ctx.createOscillator();
      this.drone1.type = "sine";
      this.drone1.frequency.setValueAtTime(130.81, this.ctx.currentTime); // C3 fundamental
      
      const drone1Gain = this.ctx.createGain();
      drone1Gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      this.drone1.connect(drone1Gain);
      drone1Gain.connect(this.masterGain);

      // Fluffy warm sine drone (perfect fifth G3, warm sunset breeze)
      this.drone2 = this.ctx.createOscillator();
      this.drone2.type = "sine";
      this.drone2.frequency.setValueAtTime(196.00, this.ctx.currentTime); // G3 perfect fifth
      
      const drone2Gain = this.ctx.createGain();
      drone2Gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      this.drone2.connect(drone2Gain);
      drone2Gain.connect(this.masterGain);

      this.drone1.start();
      this.drone2.start();

      this.isPlaying = true;
      this.updateThemeParams(this.currentTheme);
      this.playRandomChime();
      this.scheduleNextChime();
    } catch (e) {
      console.log("Cozy Ambient Synth failed to start: ", e);
    }
  }

  updateThemeParams(theme) {
    this.currentTheme = theme;
    if (!this.ctx || !this.drone1 || !this.drone2 || !this.masterGain) return;
    
    const now = this.ctx.currentTime;
    
    // Soothing transitions between frequencies when stages morph
    switch(theme) {
      case 'days':
        this.drone1.frequency.exponentialRampToValueAtTime(130.81, now + 1.5); // Cozy C3
        this.drone2.frequency.exponentialRampToValueAtTime(196.00, now + 1.5); // Cozy G3
        this.masterGain.gain.linearRampToValueAtTime(0.12, now + 1.0);
        this.chimeVolume = 0.05;
        break;
      case 'hours':
        this.drone1.frequency.exponentialRampToValueAtTime(146.83, now + 1.5); // Sweet D3
        this.drone2.frequency.exponentialRampToValueAtTime(220.00, now + 1.5); // Sweet A3
        this.masterGain.gain.linearRampToValueAtTime(0.14, now + 1.0);
        this.chimeVolume = 0.07;
        break;
      case 'minutes':
        this.drone1.frequency.exponentialRampToValueAtTime(164.81, now + 1.5); // Gentle E3
        this.drone2.frequency.exponentialRampToValueAtTime(246.94, now + 1.5); // Gentle B3
        this.masterGain.gain.linearRampToValueAtTime(0.16, now + 1.0);
        this.chimeVolume = 0.09;
        break;
      case 'seconds':
        this.drone1.frequency.exponentialRampToValueAtTime(110.00, now + 1.5); // Deep heart sub-bass A2
        this.drone2.frequency.exponentialRampToValueAtTime(165.00, now + 1.5); // Comforting E3
        this.masterGain.gain.linearRampToValueAtTime(0.18, now + 1.0);
        this.chimeVolume = 0.12;
        break;
      default:
        break;
    }
  }

  setMuted(isMuted) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.linearRampToValueAtTime(isMuted ? 0 : (this.currentTheme === 'seconds' ? 0.18 : 0.12), now + 0.15);
  }

  scheduleNextChime() {
    if (!this.isPlaying) return;
    
    // In seconds mode, we only play the synchronous heartbeat ticks in the frontend component
    const interval = this.currentTheme === 'seconds' 
      ? 99999999 // virtually infinite
      : 3500 + Math.random() * 4000; // 3.5 to 7.5 seconds
      
    this.chimeTimer = setTimeout(() => {
      this.playRandomChime();
      this.scheduleNextChime();
    }, interval);
  }

  playRandomChime() {
    if (!this.isPlaying || !this.ctx || this.currentTheme === 'seconds') return;
    try {
      // Sparkling C-major pentatonic music-box scale
      const scale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51];
      const pitch = scale[Math.floor(Math.random() * scale.length)];
      
      const osc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      
      // Sweet crystal sine wave
      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      
      // Plucked string envelope: instant attack, rapid decaying music-box ringing
      chimeGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      chimeGain.gain.linearRampToValueAtTime(this.chimeVolume, this.ctx.currentTime + 0.05);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.2);
      
      osc.connect(chimeGain);
      chimeGain.connect(this.masterGain);
      chimeGain.connect(this.delayNode);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 2.3);
    } catch (e) {
      // ignore
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.chimeTimer) clearTimeout(this.chimeTimer);
    try {
      if (this.drone1) {
        this.drone1.stop();
        this.drone1.disconnect();
      }
      if (this.drone2) {
        this.drone2.stop();
        this.drone2.disconnect();
      }
      if (this.ctx) {
        this.ctx.close();
      }
    } catch (e) {
      // ignore
    }
    this.drone1 = null;
    this.drone2 = null;
    this.ctx = null;
  }
}

export default function AudioPlayer({ isCelebration, isMuted, setIsMuted, isUserInteracted, hideControls, countdownTheme }) {
  const audioCelebrationRef = useRef(null);
  const synthRef = useRef(null);
  const [isPlayingSynth, setIsPlayingSynth] = useState(false);
  const [isPlayingMp3, setIsPlayingMp3] = useState(false);

  // Initialize synchronous global audio context pre-unlock trigger
  useEffect(() => {
    window.unlockSurpriseAudio = () => {
      console.log("Synchronously unlocking browser audio context...");
      
      // 1. Initialize and start synth
      if (!synthRef.current) {
        synthRef.current = new CozyAmbientSynth();
      }
      synthRef.current.start();
      synthRef.current.setMuted(false);
      setIsPlayingSynth(true);

      // 2. Warm up celebration audio track in background
      if (audioCelebrationRef.current) {
        audioCelebrationRef.current.muted = false;
        audioCelebrationRef.current.play().then(() => {
          audioCelebrationRef.current.pause(); // immediate pause to keep it silent
          audioCelebrationRef.current.currentTime = 0;
        }).catch(err => {
          console.log("Celebration audio warming up warning: ", err);
        });
      }
    };

    return () => {
      if (window.unlockSurpriseAudio) {
        delete window.unlockSurpriseAudio;
      }
      if (synthRef.current) {
        synthRef.current.stop();
      }
    };
  }, []);

  // Synchronously update synth volume and mp3 volume on mute toggle
  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.setMuted(isMuted);
    }
    if (audioCelebrationRef.current) {
      audioCelebrationRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Synchronously update synth frequency profiles when countdown theme changes
  useEffect(() => {
    if (synthRef.current && isPlayingSynth) {
      synthRef.current.updateThemeParams(countdownTheme || 'days');
    }
  }, [countdownTheme, isPlayingSynth]);

  // Switch to high-fidelity MP3 track when transition/celebration phase begins
  useEffect(() => {
    if (!isUserInteracted) return;

    if (isCelebration) {
      // 1. Stop the generative background synthesizer
      if (synthRef.current) {
        synthRef.current.stop();
        setIsPlayingSynth(false);
      }

      // 2. Play the gorgeous grand piano studio track
      if (audioCelebrationRef.current) {
        audioCelebrationRef.current.volume = 0;
        audioCelebrationRef.current.muted = isMuted;
        
        audioCelebrationRef.current.play()
          .then(() => {
            setIsPlayingMp3(true);
            // Elegant volume fade-in
            let currentVol = 0;
            const targetVol = 0.65;
            const interval = setInterval(() => {
              currentVol += 0.05;
              if (audioCelebrationRef.current) {
                audioCelebrationRef.current.volume = Math.min(targetVol, currentVol);
              }
              if (currentVol >= targetVol) {
                clearInterval(interval);
              }
            }, 100);
          })
          .catch(err => {
            console.log("MP3 Play blocked or failed: ", err);
          });
      }
    } else {
      // Back to countdown - start synth if interacted
      if (!isCelebration && isUserInteracted) {
        if (!synthRef.current) {
          synthRef.current = new CozyAmbientSynth();
        }
        synthRef.current.start();
        synthRef.current.setMuted(isMuted);
        setIsPlayingSynth(true);

        if (audioCelebrationRef.current) {
          audioCelebrationRef.current.pause();
          setIsPlayingMp3(false);
        }
      }
    }
  }, [isCelebration, isUserInteracted]);

  const handleToggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  // If hideControls is active (like in intro/countdown phases), return audio hooks with invisible markup
  if (hideControls) {
    return (
      <audio
        ref={audioCelebrationRef}
        src={TRACKS.celebration}
        loop
        preload="auto"
      />
    );
  }

  const isPlayingActive = isPlayingMp3 || isPlayingSynth;

  return (
    <div className="fixed top-6 right-6 z-[100] flex items-center gap-3">
      <button
        onClick={handleToggleMute}
        className="w-12 h-12 rounded-full glassmorphism-luxury flex items-center justify-center text-luxury-red hover:text-white transition-all duration-300 pointer-events-auto shadow-lg hover:scale-105 active:scale-95 group relative border border-white/10"
        title={isMuted ? "Unmute Background Score" : "Mute Background Score"}
        style={{
          boxShadow: isPlayingActive && !isMuted ? '0 0 15px rgba(230, 57, 70, 0.35)' : '0 4px 12px rgba(0,0,0,0.5)'
        }}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
        ) : (
          <Volume2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
        )}

        {!isMuted && isPlayingActive && (
          <span className="absolute inset-0 rounded-full border border-luxury-red opacity-40 animate-ping pointer-events-none" />
        )}
      </button>

      {!isMuted && isPlayingActive && (
        <div className="flex items-end gap-[3px] h-6 px-3 py-1 rounded-full glassmorphism pointer-events-none select-none border border-luxury-red/10 bg-black/30">
          <div className="w-[2px] bg-luxury-red rounded-full h-full animate-[visualizerWave_0.9s_infinite_ease-in-out_alternate]" style={{ animationDelay: '0.1s' }} />
          <div className="w-[2px] bg-luxury-red rounded-full h-full animate-[visualizerWave_1.2s_infinite_ease-in-out_alternate]" style={{ animationDelay: '0.3s' }} />
          <div className="w-[2px] bg-luxury-red rounded-full h-full animate-[visualizerWave_0.7s_infinite_ease-in-out_alternate]" style={{ animationDelay: '0.0s' }} />
          <div className="w-[2px] bg-luxury-red rounded-full h-full animate-[visualizerWave_1.4s_infinite_ease-in-out_alternate]" style={{ animationDelay: '0.5s' }} />
          <div className="w-[2px] bg-luxury-red rounded-full h-full animate-[visualizerWave_1.0s_infinite_ease-in-out_alternate]" style={{ animationDelay: '0.2s' }} />
        </div>
      )}

      <audio
        ref={audioCelebrationRef}
        src={TRACKS.celebration}
        loop
        preload="auto"
      />

      <style>{`
        @keyframes visualizerWave {
          0% { height: 15%; }
          100% { height: 100%; }
        }
      `}</style>
    </div>
  );
}
