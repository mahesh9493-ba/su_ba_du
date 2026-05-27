import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Compass, Star, Sparkles, MessageCircle, PhoneCall, ChevronRight, ChevronLeft, MapPin, Film, Image, Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

const SCENE_ASSETS = {
  scene1: {
    title: "Before Bagi",
    images: [
      { url: "/scene1_dudu_solo.jpg", title: "Dudu walking alone, carefree" },
      { url: "/scene1_gang_night.jpg", title: "Boys gang night out" },
      { url: "/scene1_gang_cafe.jpg", title: "Carefree college gang hangout" }
    ]
  },
  scene2: {
    title: "Bagi’s Entry ❤️",
    images: [
      { url: "/collage_smile_portrait.jpg", title: "Bagi entering Dudu's world" },
      { url: "/scene2_waterfall_trip.jpg", title: "Waterfall adventure 🌊" },
      { url: "/tirumala_trip.jpg", title: "Tirumala misty mountain roads" }
    ]
  },
  scene3: {
    title: "The Changeover ❤️",
    images: [
      { url: "/latenight_call.jpg", title: "Smiling at late night texts" },
      { url: "/collage_sleeping.jpg", title: "Deep emotional attachment" }
    ]
  },
  scene4: {
    title: "Their Connection ❤️",
    images: [
      { url: "/nightwalk_shadow.jpg", title: "Nostalgic walks together" },
      { url: "/burgerking_selfie.jpg", title: "Stealing french fries at canteen" },
      { url: "/sunset_chai.jpg", title: "Finding quiet comfort" }
    ]
  },
  scene5: {
    title: "The Unspoken Promise ❤️",
    images: [
      { url: "/collage_chandelier_1.jpg", title: "Traditional Grace" },
      { url: "/collage_diwali.jpg", title: "Happy Diwali" },
      { url: "/collage_peach_saree.jpg", title: "Golden Glow" }
    ]
  }
};

export default function CinematicStorybook({ onClose }) {
  // View mode state: 'select' | 'cinematic' | 'infographic'
  const [viewMode, setViewMode] = useState('select');
  const [activeScene, setActiveScene] = useState(0);


  // Infographic Lightbox zoom state
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const imgRef = useRef(null);

  // Typewriter text state
  const [sceneTexts, setSceneTexts] = useState({
    scene1: "",
    scene2: "",
    scene3: "",
    scene4: "",
    scene5: "",
    scene6: ""
  });

  const fullTexts = {
    scene1: `Dudu was never someone who believed in forever.

Life for him was simple...
friends, random rides, late-night roaming,
and living every day without thinking too deeply about tomorrow.

He enjoyed attention and talked to others casually,
but nothing ever touched his heart deeply.

There was even a story once...
something he thought was love.
But time passed, people changed,
and that chapter slowly faded like an unfinished dream.

After that, Dudu stopped expecting anything real.
He smiled, laughed loudly with friends,
but deep inside, he stopped believing someone would stay.

College became a blur of tea stalls, late-night bike rides, and escaping responsibilities.

But destiny was already preparing an unexpected turn...`,
    scene2: `And then…
during their final year,
Bagi quietly entered Dudu’s world.

No dramatic announcement.
No perfect cinematic beginning.

Just a simple friendship circle…
and one unexpected journey to Tirumala that changed the course of everything.`,
    scene2Quote: "Sometimes, the most beautiful chapters begin in complete silence. ❤️",
    scene3: `Dudu never realized when simple conversations with Bagi started becoming the best part of his day.

Somewhere between phone calls, small smiles, and late-night talks,
Bagi quietly became his safest comfort.

She never asked him to change.
Yet, Dudu found himself wanting to be a better man for her.

The guy whose heart once wandered everywhere, searching for temporary happiness, suddenly stopped noticing the rest of the world.
For the very first time, his heart found its home.

Without even realizing it, Dudu was completely drawn to Bagi’s presence.

She did not enter his life loudly.
She quietly became his peace.`,
    scene4: `Without even knowing everything about each other,
Dudu and Bagi slowly became each other's comfort and safe haven.

What had started unexpectedly
began to feel like the only permanent thing in their world.`,
    scene4Quote: "For the first time in his life, Dudu was not just living for today… he was secretly praying for forever with Bagi. ❤️",
    scene5: `We never promised each other a lifetime.

We never made loud, dramatic declarations of forever.

But somewhere in the way Dudu watches you eat your favorite food…
In the way you hold his arm a little tighter during cold night rides…
An unspoken promise was quietly written.

A promise that says:
'No matter where life takes us, I want to walk it beside you.'

We don't need a perfect, uncomplicated world.
We just need our silent understanding, our cozy chai dates, and that quiet home we built in each other's hearts. ❤️`,
    scene6: `Dear God,

I never looked for love.
I was just living my life,
carefree and lost in my own world.

But somewhere between unexpected conversations,
late-night calls,
small smiles,
and beautiful memories…

Bagi quietly became the peace my heart never knew it needed.

She changed my world without ever forcing me to change.
She made me care more,
feel more,
and dream of a beautiful future.

Today, I don't pray for a perfect life.
I only ask for one blessing…

If Bagi is the beautiful destiny You sent to me,
please let her stay beside me in every chapter ahead. ❤️`
  };

  // Run typewriter for active scene
  useEffect(() => {
    if (viewMode !== 'cinematic') return;
    const sceneNum = activeScene + 1;
    const sceneKey = `scene${sceneNum}`;
    
    if (!sceneKey) return;
    const targetText = fullTexts[sceneKey];
    if (!targetText) return;

    // Reset text for active scene
    setSceneTexts(prev => ({ ...prev, [sceneKey]: "" }));

    let isActive = true;
    let i = 0;
    let timerId = null;

    const type = () => {
      if (!isActive) return;
      if (i < targetText.length) {
        const nextStr = targetText.slice(0, i + 1);
        setSceneTexts(prev => ({
          ...prev,
          [sceneKey]: nextStr
        }));
        i++;
        timerId = setTimeout(type, 22);
      }
    };
    
    timerId = setTimeout(type, 600);

    return () => {
      isActive = false;
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [activeScene, viewMode]);



  // Texting messages mockup for Scene 3
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chatScript = [
    { sender: 'him', text: "Oyy... pg ki vellava? 🌙" },
    { sender: 'her', text: "Oyy! Ippude vacha... fresh up ayyi, 5 minutes lo call chesta! 🌸" },
    { sender: 'him', text: "Haha, take your time. Eeroju Cream Stone lo mana ice cream incident gurinche aalochistunna 😂" },
    { sender: 'her', text: "Omg! Naa ice cream dongalinchinav kada! 🍨 Nenu inka nee meeda kopam gane unna!" },
    { sender: 'him', text: "Oyy, adi needi kabatte inka tasty ga undi 😜" },
    { sender: 'her', text: "Aww, okay fine... Oyy garu, mimmalni kshaminchesa ❤️ Call chestunna!" }
  ];

  useEffect(() => {
    if (activeScene !== 2 || viewMode !== 'cinematic') {
      setChatMessages([]);
      setIsTyping(false);
      return;
    }

    let chatIndex = 0;
    let isActive = true;
    let timer1 = null;
    let timer2 = null;

    const loadNextMessage = () => {
      if (!isActive) return;
      if (chatIndex >= chatScript.length) return;

      setIsTyping(true);
      const delayText = chatScript[chatIndex].text.length * 35;
      
      timer1 = setTimeout(() => {
        if (!isActive) return;
        setIsTyping(false);
        setChatMessages(prev => {
          if (!isActive) return prev;
          return [...prev, chatScript[chatIndex]];
        });
        chatIndex++;
        
        timer2 = setTimeout(loadNextMessage, 2000);
      }, Math.max(1000, delayText));
    };

    const initialDelay = setTimeout(loadNextMessage, 1500);
    
    return () => {
      isActive = false;
      clearTimeout(initialDelay);
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
      setChatMessages([]);
      setIsTyping(false);
    };
  }, [activeScene, viewMode]);

  // Fading Old Chats for Scene 1
  const oldChats = [
    { sender: 'them', text: "I don't think this is working out..." },
    { sender: 'him', text: "Wait, can we talk about it?" },
    { sender: 'them', text: "Please don't call me. Goodbye." }
  ];

  // Interactive Floating Diyas for Scene 6
  const [diyas, setDiyas] = useState(
    Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 82 + Math.random() * 12,
      scale: 0.6 + Math.random() * 0.5,
      delay: Math.random() * 5,
      sway: Math.random() * 35 + 10,
      hovered: false
    }))
  );

  const handleDiyaHover = (id) => {
    setDiyas(prev => prev.map(d => d.id === id ? { ...d, hovered: true } : d));
    setTimeout(() => {
      setDiyas(prev => prev.map(d => d.id === id ? { ...d, hovered: false } : d));
    }, 1500);
  };

  // State for active dream destination card in Scene 5
  const [hoveredDest, setHoveredDest] = useState(null);

  // 3D Polaroid Hover-Tilt Logic (Scene 4)
  const handleMouseMoveTilt = (e, cardRef) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 10;
    const angleY = (x - xc) / 10;
    card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
  };

  const handleMouseLeaveTilt = (cardRef) => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    }
  };

  const cardRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Scene background mappings
  const sceneBackgrounds = [
    "bg-gradient-to-b from-[#050b18] via-[#02050b] to-luxury-darker", // Scene 1 - Moody Midnight Blue
    "bg-gradient-to-b from-[#2e1903] via-[#140b01] to-luxury-darker", // Scene 2 - Warm Golden Sunrise
    "bg-gradient-to-b from-[#380408] via-[#100102] to-luxury-darker", // Scene 3 - Velvet Crimson
    "bg-gradient-to-b from-[#130724] via-[#05020a] to-luxury-darker", // Scene 4 - Starry Indigo/Purple
    "bg-gradient-to-b from-[#3a0a18] via-[#1a0208] to-luxury-darker", // Scene 5 - Rose Gold Promise
    "bg-gradient-to-b from-[#4d1012] via-[#240405] to-luxury-darker"  // Scene 6 - Divine Temple Golden
  ];

  const handleNext = () => {
    if (activeScene < 5) setActiveScene(prev => prev + 1);
  };

  const handlePrev = () => {
    if (activeScene > 0) setActiveScene(prev => prev - 1);
  };

  // Lightbox dragging implementation
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetZoom = () => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const zoomIn = () => {
    setZoomScale(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setZoomScale(prev => Math.max(prev - 0.25, 0.75));
  };

  return (
    <div 
      style={viewMode === 'cinematic' && activeScene === 5 ? {
        backgroundImage: 'linear-gradient(to bottom, rgba(36, 4, 5, 0.82), rgba(18, 2, 3, 0.95)), url("/wedding_blessings.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply'
      } : {}}
      className={`min-h-screen w-full relative overflow-y-auto select-none transition-colors duration-1000 flex flex-col justify-between ${viewMode === 'cinematic' ? sceneBackgrounds[activeScene] : "bg-gradient-to-b from-[#120406] via-luxury-dark to-luxury-darker"}`}
    >
      
      {/* Cinematic Film Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.035] bg-[radial-gradient(transparent_50%,rgba(0,0,0,0.85))]" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
      }} />

      {/* Header Panel */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-6 pt-20 md:pt-6 pb-3 relative z-30 max-w-7xl mx-auto gap-4 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-luxury-rose font-medium mb-1.5">
            Dudu & Bagi • {viewMode === 'select' && "Dashboard"}
            {viewMode === 'cinematic' && "Cinematic Story"}
            {viewMode === 'infographic' && "Complete Infographic"}
          </span>
          <h1 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-luxury-gradient tracking-wide leading-tight">
            The Change Bagi Never Knew She Made ❤️
          </h1>
          <span className="text-[9px] sm:text-[10px] italic text-white/40 tracking-wider mt-1.5">
            "The unexpected story of Dudu & Bagi..."
          </span>
        </div>

        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3">
          {viewMode !== 'select' && (
            <button
              onClick={() => {
                setViewMode('select');
              }}
              className="px-3 py-1 text-[10px] sm:text-xs rounded-full border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-all pointer-events-auto cursor-pointer"
            >
              Choose Mode
            </button>
          )}



          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-[10px] sm:text-xs rounded-full border border-luxury-red/25 bg-luxury-red/10 text-luxury-rose hover:text-white hover:border-luxury-red/50 hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto cursor-pointer"
          >
            Exit Story
          </button>
        </div>
      </div>

      {/* Main Content Areas based on viewMode */}
      <div className="flex-1 flex flex-col justify-center items-center py-6 px-4 md:px-8 relative z-20 max-w-7xl mx-auto w-full">
        
        {/* ========================================================
            VIEW MODE: SELECT DASHBOARD
            ======================================================== */}
        {viewMode === 'select' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="w-full max-w-5xl flex flex-col items-center gap-10"
          >
            {/* Minimal heading */}
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[11px] uppercase tracking-[0.35em] text-rose-400/80 font-bold"
              >
                Choose Your Experience
              </motion.p>
            </div>

            {/* Two cinematic cards side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">

              {/* Card A — Story Infographic */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                whileHover={{ scale: 1.02, y: -6 }}
                onClick={() => setViewMode('infographic')}
                className="relative rounded-3xl overflow-hidden cursor-pointer group h-72 md:h-80 pointer-events-auto"
              >
                {/* Background image */}
                <img
                  src="/story_infographic.jpg"
                  alt="Story Infographic"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:via-black/30 transition-all duration-500" />
                {/* Rose glow on hover */}
                <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-rose-500/50 rounded-3xl transition-all duration-500" />

                {/* Content pinned to bottom */}
                <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-rose-300 font-bold bg-rose-500/20 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
                      Complete Story
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                    Our Story<br/>in One Frame 🖼️
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1.5 text-[11px] text-white/90 font-semibold bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full group-hover:bg-rose-600/70 group-hover:border-rose-400/30 transition-all duration-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      Open Now
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Card B — Cinematic Movie */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                whileHover={{ scale: 1.02, y: -6 }}
                onClick={() => setViewMode('cinematic')}
                className="relative rounded-3xl overflow-hidden cursor-pointer group h-72 md:h-80 pointer-events-auto"
              >
                {/* Background image */}
                <img
                  src="/latenight_call.jpg"
                  alt="Cinematic Story"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:via-black/30 transition-all duration-500" />
                {/* Purple glow on hover */}
                <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-purple-500/50 rounded-3xl transition-all duration-500" />

                {/* Floating film icon */}
                <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>
                </div>

                {/* Content pinned to bottom */}
                <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-purple-300 font-bold bg-purple-500/20 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
                      Scene by Scene
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                    Cinematic<br/>Journey 🎬
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1.5 text-[11px] text-white/90 font-semibold bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full group-hover:bg-purple-600/70 group-hover:border-purple-400/30 transition-all duration-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Start Journey
                    </span>
                  </div>
                </div>
              </motion.div>

            </div>

          </motion.div>
        )}

        {/* ========================================================
            VIEW MODE: COMPLETE INFOGRAPHIC LIGHTBOX
            ======================================================== */}
        {viewMode === 'infographic' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex flex-col items-center gap-4 relative overflow-hidden"
          >
            {/* Full Story Image */}
            <div className="w-full rounded-2xl border border-luxury-red/20 bg-black/40 overflow-hidden flex items-center justify-center">
              <img 
                src="/story_infographic.jpg" 
                alt="Dudu & Bagi Complete Story" 
                className="w-full h-auto object-contain rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95)]" 
              />
            </div>

            {/* Single Download Button */}
            <a
              href="/story_infographic.jpg"
              download="Our_Story.jpg"
              className="flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(244,63,94,0.4)] hover:shadow-[0_0_45px_rgba(244,63,94,0.65)] transition-all duration-300 active:scale-95 cursor-pointer select-none border border-rose-400/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Our Story
            </a>

          </motion.div>
        )}

        {/* ========================================================
            VIEW MODE: CINEMATIC MOVIE NARRATION
            ======================================================== */}
        {viewMode === 'cinematic' && (
          <AnimatePresence mode="wait">
            
            {/* SCENE 1: BEFORE BAGI */}
            {activeScene === 0 && (
              <motion.div
                key="scene-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full min-h-[70vh]"
              >
                {/* Visuals */}
                <div className="lg:col-span-6 flex justify-center items-center relative min-h-[350px] lg:min-h-[450px] w-full">
                  
                  {/* Floating image 1 (Boys gang) */}
                  <motion.div
                    initial={{ rotate: -8, x: -30, opacity: 0 }}
                    animate={{ rotate: -10, x: -20, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.04, rotate: -2, zIndex: 12 }}
                    className="absolute left-2 sm:left-4 top-2 sm:top-4 w-28 sm:w-44 md:w-52 p-2 sm:p-3 bg-white/5 border border-white/10 rounded-lg shadow-2xl polaroid-card transform pointer-events-auto backdrop-blur-md"
                  >
                    <img
                      src={SCENE_ASSETS.scene1.images[0].url}
                      alt={SCENE_ASSETS.scene1.images[0].title}
                      className="w-full h-20 sm:h-28 md:h-32 object-cover rounded grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <p className="font-handwritten text-sm sm:text-lg text-center text-luxury-rose mt-1.5 sm:mt-2">Just Dudu & the world 🧢</p>
                  </motion.div>

                  {/* Floating image 2 (Lonely night ride) */}
                  <motion.div
                    initial={{ rotate: 10, x: 30, opacity: 0 }}
                    animate={{ rotate: 8, x: 20, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.04, rotate: 2, zIndex: 12 }}
                    className="absolute right-2 sm:right-4 bottom-2 sm:bottom-4 w-28 sm:w-44 md:w-52 p-2 sm:p-3 bg-white/5 border border-white/10 rounded-lg shadow-2xl polaroid-card transform pointer-events-auto backdrop-blur-md"
                  >
                    <img
                      src={SCENE_ASSETS.scene1.images[1].url}
                      alt={SCENE_ASSETS.scene1.images[1].title}
                      className="w-full h-20 sm:h-28 md:h-32 object-cover rounded hover:brightness-110 transition-all duration-500"
                    />
                    <p className="font-handwritten text-sm sm:text-lg text-center text-luxury-rose mt-1.5 sm:mt-2">Boys gang nights out 🌙</p>
                  </motion.div>

                  {/* Floating image 3 (Gang cafe hangout) */}
                  <motion.div
                    initial={{ rotate: -4, y: 20, opacity: 0 }}
                    animate={{ rotate: -3, y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.04, rotate: 0, zIndex: 12 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-2 sm:bottom-6 w-28 sm:w-44 md:w-52 p-2 sm:p-3 bg-white/5 border border-white/10 rounded-lg shadow-2xl polaroid-card transform pointer-events-auto backdrop-blur-md z-10"
                  >
                    <img
                      src={SCENE_ASSETS.scene1.images[2].url}
                      alt={SCENE_ASSETS.scene1.images[2].title}
                      className="w-full h-20 sm:h-28 md:h-32 object-cover rounded hover:brightness-110 transition-all duration-500"
                    />
                    <p className="font-handwritten text-sm sm:text-lg text-center text-luxury-rose mt-1.5 sm:mt-2">Cafe hangouts & laughter ☕</p>
                  </motion.div>

                  {/* Placeholder div to maintain spacing */}

                </div>

                {/* Story Narration */}
                <div className="lg:col-span-6 flex flex-col justify-center px-4 md:px-8">
                  <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-3">Scene 01 • The Carefree Heart</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 leading-tight">
                    Life Before Bagi...
                  </h2>
                  
                  <div className="font-serif text-base sm:text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 leading-relaxed italic filter blur-[0.1px] min-h-[220px] whitespace-pre-line tracking-wide">
                    {sceneTexts.scene1}
                    <span className="inline-block w-2.5 h-4 bg-rose-400/80 animate-[pulse_0.8s_infinite] ml-1.5 shadow-[0_0_10px_rgba(244,63,94,0.7)]" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCENE 2: BAGI'S ENTRY */}
            {activeScene === 1 && (
              <motion.div
                key="scene-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full min-h-[70vh]"
              >
                {/* Narration */}
                <div className="lg:col-span-6 flex flex-col justify-center px-4 md:px-8 order-2 lg:order-1">
                  <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-3">Scene 02 • The Spark</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 leading-tight">
                    Bagi’s Entry
                  </h2>
                  
                  <div className="font-serif text-base sm:text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 leading-relaxed italic filter blur-[0.1px] min-h-[120px] whitespace-pre-line tracking-wide mb-6">
                    {sceneTexts.scene2}
                    <span className="inline-block w-2.5 h-4 bg-amber-400/80 animate-[pulse_0.8s_infinite] ml-1.5 shadow-[0_0_10px_rgba(245,158,11,0.7)]" />
                  </div>

                  {sceneTexts.scene2.length >= fullTexts.scene2.length - 10 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 border-l-2 border-amber-500/50 bg-amber-500/5 backdrop-blur-md rounded-r-lg max-w-md"
                    >
                      <p className="font-serif italic text-amber-300 text-sm md:text-base leading-relaxed">
                        “{fullTexts.scene2Quote}”
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Visuals */}
                <div className="lg:col-span-6 flex justify-center items-center relative min-h-[350px] lg:min-h-[450px] w-full order-1 lg:order-2">
                  
                  {/* Her entering circle */}
                  <motion.div
                    initial={{ rotate: -8, scale: 0.9, opacity: 0 }}
                    animate={{ rotate: -5, scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.04, rotate: -1, zIndex: 12 }}
                    className="absolute left-2 sm:left-4 top-6 sm:top-10 w-28 sm:w-40 md:w-52 p-2.5 sm:p-3 bg-white/5 border border-white/10 rounded-lg shadow-2xl polaroid-card transform pointer-events-auto backdrop-blur-md"
                  >
                    <img
                      src={SCENE_ASSETS.scene2.images[0].url}
                      alt={SCENE_ASSETS.scene2.images[0].title}
                      className="w-full h-18 sm:h-24 md:h-32 object-cover rounded hover:brightness-110 duration-500"
                    />
                    <p className="font-handwritten text-lg text-center text-amber-300 mt-2">Bagi's quiet smile ✨</p>
                  </motion.div>

                  {/* Classroom Glance */}
                  <motion.div
                    initial={{ rotate: 10, scale: 0.9, opacity: 0 }}
                    animate={{ rotate: 8, scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.04, rotate: 2, zIndex: 12 }}
                    className="absolute right-2 sm:right-4 bottom-6 sm:bottom-10 w-28 sm:w-40 md:w-52 p-2.5 sm:p-3 bg-white/5 border border-white/10 rounded-lg shadow-2xl polaroid-card transform pointer-events-auto backdrop-blur-md"
                  >
                    <img
                      src={SCENE_ASSETS.scene2.images[1].url}
                      alt={SCENE_ASSETS.scene2.images[1].title}
                      className="w-full h-18 sm:h-24 md:h-32 object-cover rounded hover:brightness-110 duration-500"
                    />
                    <p className="font-handwritten text-lg text-center text-amber-300 mt-2">Waterfall adventure 🌊</p>
                  </motion.div>

                  {/* Tirumala hill fog */}
                  <motion.div
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: -30, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.04, rotate: -3, zIndex: 14 }}
                    className="absolute w-24 sm:w-32 md:w-44 p-2 bg-white/5 border border-white/10 rounded shadow-2xl polaroid-card transform pointer-events-auto backdrop-blur-md"
                  >
                    <img
                      src={SCENE_ASSETS.scene2.images[2].url}
                      alt={SCENE_ASSETS.scene2.images[2].title}
                      className="w-full h-14 sm:h-20 md:h-28 object-cover rounded hover:brightness-110 duration-500"
                    />
                    <p className="font-handwritten text-base text-center text-amber-300 mt-2">Tirumala Trip ⛰️</p>
                  </motion.div>

                  {/* Floating warm embers */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-amber-400/25"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`
                        }}
                        animate={{
                          y: [-15, 15],
                          opacity: [0.1, 0.7, 0.1],
                          scale: [0.7, 1.2, 0.7]
                        }}
                        transition={{
                          duration: 3 + Math.random() * 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: Math.random() * 2
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCENE 3: THE CHANGEOVER */}
            {activeScene === 2 && (
              <motion.div
                key="scene-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full min-h-[70vh]"
              >
                {/* Phone & texting simulator */}
                <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[400px] lg:min-h-[500px] w-full">
                  
                  {/* Heartbeat pulse rhythm path */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <svg className="w-80 h-40 text-luxury-red/20 opacity-60 animate-glow-pulse" viewBox="0 0 400 200">
                      <motion.path
                        d="M 10,100 L 120,100 L 135,70 L 150,130 L 165,100 L 200,100 L 210,40 L 225,160 L 240,100 L 255,115 L 265,100 L 390,100"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                      />
                    </svg>
                  </div>

                  {/* Call simulator */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full max-w-[280px] md:max-w-[310px] p-5 rounded-2xl glassmorphism-luxury border-luxury-red/35 flex flex-col items-center shadow-[0_20px_50px_rgba(0,0,0,0.95)] relative z-10 heartbeat-glow pointer-events-auto"
                  >
                    <div className="w-12 h-12 rounded-full border border-luxury-rose/30 flex items-center justify-center text-luxury-rose mb-3 animate-pulse bg-luxury-red/10 shadow-[0_0_15px_rgba(255,46,99,0.3)]">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] tracking-[0.2em] text-[#ffccd5] uppercase font-bold">Calling Her...</span>
                    <h4 className="text-lg font-serif font-bold text-white mt-1">Bagi 🌸</h4>
                    <span className="text-xs text-white/50 mt-1 font-mono font-medium tracking-wider">Connected</span>
                    
                    <div className="w-full flex items-center justify-center gap-1 mt-4 h-6">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-[2.5px] bg-luxury-rose rounded-full"
                          style={{ height: '30%' }}
                          animate={{ height: ['20%', '80%', '20%'] }}
                          transition={{
                            duration: 0.4 + Math.random() * 0.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.05
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Text simulator */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="w-full max-w-[260px] sm:max-w-[290px] p-4 rounded-xl glassmorphism border-white/10 relative lg:absolute lg:bottom-10 lg:right-10 z-20 flex flex-col gap-2.5 shadow-2xl max-h-[160px] sm:max-h-[220px] overflow-y-auto pr-1 pointer-events-auto custom-scrollbar mt-6 lg:mt-0"
                  >
                    <span className="text-[9px] uppercase tracking-wider text-white/30 font-semibold border-b border-white/5 pb-1">Texts with Bagi</span>
                    <div className="flex flex-col gap-2 text-[10px]">
                      {chatMessages.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex flex-col max-w-[85%] rounded-lg p-2.5 leading-snug font-sans tracking-wide ${msg.sender === 'him' ? 'self-end bg-luxury-red/20 text-[#ffccd5] border border-luxury-red/10 rounded-tr-none' : 'self-start bg-white/5 text-white/90 border border-white/5 rounded-tl-none'}`}
                        >
                          <p>{msg.text}</p>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="self-start bg-white/5 border border-white/5 rounded-lg rounded-tl-none p-2 flex items-center gap-1">
                          <div className="w-1.2 h-1.2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-1.2 h-1.2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-1.2 h-1.2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      )}
                    </div>
                  </motion.div>

                </div>

                {/* Narration */}
                <div className="lg:col-span-6 flex flex-col justify-center px-4 md:px-8">
                  <span className="text-xs uppercase tracking-widest text-luxury-rose font-semibold mb-3">Scene 03 • The Change</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 leading-tight">
                    The Changeover ❤️
                  </h2>
                  
                  <div className="font-serif text-base sm:text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 leading-relaxed italic filter blur-[0.1px] min-h-[220px] whitespace-pre-line tracking-wide">
                    {sceneTexts.scene3}
                    <span className="inline-block w-2.5 h-4 bg-rose-500/80 animate-[pulse_0.8s_infinite] ml-1.5 shadow-[0_0_10px_rgba(244,63,94,0.7)]" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCENE 4: THEIR CONNECTION */}
            {activeScene === 3 && (
              <motion.div
                key="scene-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full min-h-[70vh]"
              >
                {/* Narration */}
                <div className="lg:col-span-5 flex flex-col justify-center px-4 md:px-8 order-2 lg:order-1">
                  <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-3">Scene 04 • Forever Wish</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 leading-tight">
                    Their Comfort Connection
                  </h2>
                  
                  <div className="font-serif text-base sm:text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 leading-relaxed italic filter blur-[0.1px] min-h-[120px] whitespace-pre-line tracking-wide mb-6">
                    {sceneTexts.scene4}
                    <span className="inline-block w-2.5 h-4 bg-purple-400/80 animate-[pulse_0.8s_infinite] ml-1.5 shadow-[0_0_10px_rgba(168,85,247,0.7)]" />
                  </div>

                  {sceneTexts.scene4.length >= fullTexts.scene4.length - 10 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 border-l-2 border-purple-400/50 bg-purple-400/5 backdrop-blur-md rounded-r-lg max-w-md shadow-lg"
                    >
                      <p className="font-serif italic text-purple-200 text-sm md:text-base leading-relaxed">
                        “{fullTexts.scene4Quote}”
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* 3D Scrapbook Polaroid deck */}
                <div className="lg:col-span-7 flex justify-center items-center py-6 order-1 lg:order-2 w-full">
                  <div className="grid grid-cols-2 gap-4 max-w-md w-full relative z-10 pointer-events-auto">
                    
                    {/* Photo 1 */}
                    <div
                      ref={cardRefs[0]}
                      onMouseMove={(e) => handleMouseMoveTilt(e, cardRefs[0])}
                      onMouseLeave={() => handleMouseLeaveTilt(cardRefs[0])}
                      className="p-2.5 bg-white/5 border border-white/10 rounded-lg shadow-xl polaroid-card flex flex-col justify-between backdrop-blur-md transition-all duration-200 ease-out cursor-pointer"
                    >
                      <img
                        src={SCENE_ASSETS.scene4.images[0].url}
                        alt={SCENE_ASSETS.scene4.images[0].title}
                        className="w-full h-24 md:h-28 object-cover rounded hover:contrast-110"
                      />
                      <p className="font-handwritten text-lg text-center text-purple-300 mt-2">Endless walks 🚶‍♂️🚶‍♀️</p>
                    </div>

                    {/* Photo 2 */}
                    <div
                      ref={cardRefs[1]}
                      onMouseMove={(e) => handleMouseMoveTilt(e, cardRefs[1])}
                      onMouseLeave={() => handleMouseLeaveTilt(cardRefs[1])}
                      className="p-2.5 bg-white/5 border border-white/10 rounded-lg shadow-xl polaroid-card flex flex-col justify-between backdrop-blur-md transition-all duration-200 ease-out cursor-pointer"
                    >
                      <img
                        src={SCENE_ASSETS.scene4.images[1].url}
                        alt={SCENE_ASSETS.scene4.images[1].title}
                        className="w-full h-24 md:h-28 object-cover rounded hover:contrast-110"
                      />
                      <p className="font-handwritten text-lg text-center text-purple-300 mt-2">Stealing fries 🍟</p>
                    </div>

                    {/* Photo 3 */}
                    <div
                      ref={cardRefs[2]}
                      onMouseMove={(e) => handleMouseMoveTilt(e, cardRefs[2])}
                      onMouseLeave={() => handleMouseLeaveTilt(cardRefs[2])}
                      className="p-2.5 bg-white/5 border border-white/10 rounded-lg shadow-xl polaroid-card flex flex-col justify-between backdrop-blur-md transition-all duration-200 ease-out cursor-pointer"
                    >
                      <img
                        src="/latenight_call.jpg"
                        alt="Phone text glowing at night"
                        className="w-full h-24 md:h-28 object-cover rounded hover:contrast-110"
                      />
                      <p className="font-handwritten text-lg text-center text-purple-300 mt-2">Endless calls 📞</p>
                    </div>

                    {/* Photo 4 */}
                    <div
                      ref={cardRefs[3]}
                      onMouseMove={(e) => handleMouseMoveTilt(e, cardRefs[3])}
                      onMouseLeave={() => handleMouseLeaveTilt(cardRefs[3])}
                      className="p-2.5 bg-white/5 border border-white/10 rounded-lg shadow-xl polaroid-card flex flex-col justify-between backdrop-blur-md transition-all duration-200 ease-out cursor-pointer"
                    >
                      <img
                        src={SCENE_ASSETS.scene4.images[2].url}
                        alt={SCENE_ASSETS.scene4.images[2].title}
                        className="w-full h-24 md:h-28 object-cover rounded hover:contrast-110"
                      />
                      <p className="font-handwritten text-lg text-center text-purple-300 mt-2">Simple comfort 😊</p>
                    </div>

                  </div>

                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-purple-400/20"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`
                        }}
                        animate={{
                          y: [-20, 20],
                          opacity: [0.1, 0.8, 0.1],
                          scale: [0.7, 1.3, 0.7]
                        }}
                        transition={{
                          duration: 3.5 + Math.random() * 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: Math.random() * 2
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCENE 5: THE UNSPOKEN PROMISE */}
            {activeScene === 4 && (
              <motion.div
                key="scene-5"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full min-h-[70vh] relative"
              >
                {/* Narration */}
                <div className="lg:col-span-5 flex flex-col justify-center px-4 md:px-8 z-10">
                  <span className="text-xs uppercase tracking-widest text-[#ff8fa3] font-semibold mb-3">Scene 05 • Silent Promise</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 leading-tight">
                    The Unspoken Promise
                  </h2>
                  
                  <div className="font-serif text-base sm:text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 leading-relaxed italic filter blur-[0.1px] min-h-[160px] whitespace-pre-line tracking-wide mb-6">
                    {sceneTexts.scene5}
                    <span className="inline-block w-2.5 h-4 bg-rose-400/80 animate-[pulse_0.8s_infinite] ml-1.5 shadow-[0_0_10px_rgba(244,63,94,0.7)]" />
                  </div>
                </div>

                {/* 3D Scrapbook Polaroid deck */}
                <div className="lg:col-span-7 flex justify-center items-center py-6 w-full relative">
                  <div className="grid grid-cols-3 gap-4 max-w-lg w-full relative z-10 pointer-events-auto">
                    {SCENE_ASSETS.scene5.images.map((img, i) => {
                      const rot = i === 0 ? -3 : i === 1 ? 4 : -2;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9, y: 20, rotate: rot }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          whileHover={{ 
                            scale: 1.08, 
                            rotate: 0, 
                            zIndex: 30,
                            boxShadow: "0 20px 40px rgba(0,0,0,0.6)" 
                          }}
                          transition={{ type: "spring", stiffness: 260, damping: 20 }}
                          className="p-2.5 bg-white/5 border border-white/10 rounded-lg shadow-xl polaroid-card flex flex-col justify-between backdrop-blur-md cursor-pointer"
                        >
                          <div className="aspect-[3/4] w-full rounded overflow-hidden bg-black/40 flex items-center justify-center border border-white/5">
                            <img
                              src={img.url}
                              alt={img.title}
                              className="w-full h-full object-contain hover:contrast-115 transition-all duration-300"
                            />
                          </div>
                          <p className="font-handwritten text-xs text-center text-rose-300 mt-3 block truncate">{img.title}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-rose-400/20"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`
                        }}
                        animate={{
                          y: [-20, 20],
                          opacity: [0.1, 0.8, 0.1],
                          scale: [0.7, 1.3, 0.7]
                        }}
                        transition={{
                          duration: 3.5 + Math.random() * 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: Math.random() * 2
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCENE 6: DUDU'S PRAYER */}
            {activeScene === 5 && (
              <motion.div
                key="scene-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-col items-center w-full min-h-[75vh] relative py-4"
              >
                {/* Interactive Diyas */}
                <div className="absolute inset-0 pointer-events-auto overflow-hidden z-0 select-none">
                  {diyas.map((diya) => (
                    <motion.div
                      key={diya.id}
                      onMouseEnter={() => handleDiyaHover(diya.id)}
                      className="absolute cursor-pointer flex flex-col items-center pointer-events-auto"
                      style={{ left: `${diya.x}%`, top: `${diya.y}%` }}
                      animate={{
                        y: [-120 - Math.random() * 80, -20],
                        x: [0, diya.sway, 0],
                        scale: diya.hovered ? diya.scale * 1.5 : diya.scale,
                        filter: diya.hovered 
                          ? 'drop-shadow(0 0 15px rgba(255,200,100,0.95))' 
                          : 'drop-shadow(0 0 4px rgba(230,57,70,0.5))'
                      }}
                      transition={{
                        y: { duration: 8 + Math.random() * 5, repeat: Infinity, ease: "linear", delay: diya.delay },
                        x: { duration: 4 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" },
                        scale: { duration: 0.3 }
                      }}
                    >
                      <div className={`w-3 h-5 rounded-full bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-100 mb-[1px] ${diya.hovered ? 'animate-bounce' : 'animate-candle-flicker'}`} />
                      <div className="w-6 h-3 rounded-b-full bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 border-t border-amber-600 shadow-md" />
                    </motion.div>
                  ))}
                </div>

                {/* Glowing Temple Backdrop */}
                <div className="absolute bottom-0 inset-x-0 h-40 w-full pointer-events-none opacity-10 flex justify-center items-end z-0">
                  <svg className="w-96 h-40 text-orange-600/30" viewBox="0 0 400 200">
                    <path d="M 0,200 L 140,200 L 150,150 L 180,150 L 185,120 L 195,120 L 200,60 L 205,120 L 215,120 L 220,150 L 250,150 L 260,200 L 400,200" fill="currentColor" />
                  </svg>
                </div>

                <div className="w-full max-w-2xl flex flex-col items-center relative z-10">
                  
                  {/* Vintage Parchment */}
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full p-6 md:p-8 rounded-2xl border border-orange-500/20 bg-black/60 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden"
                  >
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.25em] text-amber-400 font-bold flex items-center gap-1 select-none">
                      <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                      Dudu’s Divine Prayer
                      <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                    </div>

                    <div className="text-center font-serif text-base sm:text-lg md:text-xl leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-100 to-amber-200 whitespace-pre-line tracking-wide mt-4 italic max-h-[320px] overflow-y-auto pr-2 select-text custom-scrollbar filter blur-[0.1px] w-full">
                      {sceneTexts.scene6}
                      <span className="inline-block w-2.5 h-4.5 bg-amber-400/80 animate-[pulse_0.8s_infinite] ml-1.5 shadow-[0_0_10px_rgba(245,158,11,0.7)]" />
                    </div>
                  </motion.div>

                  {/* Destiny Ending */}
                  {sceneTexts.scene6.length >= fullTexts.scene6.length - 10 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="w-full text-center mt-10 px-4"
                    >
                      <h3 className="text-xl md:text-3xl lg:text-4xl font-serif font-semibold text-rose-gradient tracking-wide leading-relaxed filter drop-shadow-[0_0_15px_rgba(230,57,70,0.4)]">
                        “She was never part of Dudu’s plan…
                        <br className="md:hidden" /> but now Bagi feels like his destiny. ❤️”
                      </h3>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        className="mt-8 px-6 py-2.5 rounded-full bg-gradient-to-r from-luxury-red via-[#800f14] to-luxury-red text-white text-xs tracking-[0.2em] uppercase font-bold border border-luxury-rose/30 shadow-[0_0_20px_rgba(230,57,70,0.5)] cursor-pointer"
                      >
                        Return to Portals 🌌
                      </motion.button>
                    </motion.div>
                  )}

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        )}

      </div>

      {/* Bottom Progress Controls (only in cinematic mode) */}
      {viewMode === 'cinematic' && (
        <div className="w-full py-6 relative z-30 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 border-t border-white/5 gap-4">
          
          <button
            onClick={() => {
              handlePrev();
            }}
            disabled={activeScene === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs tracking-wider uppercase font-semibold transition-all duration-300 ${activeScene === 0 ? 'border-white/5 text-white/10 cursor-not-allowed' : 'border-white/10 text-white/70 hover:text-white hover:border-white/30 cursor-pointer'}`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Prev Scene
          </button>

          {/* 6 Dots indicators */}
          <div className="flex items-center gap-4">
            {Array.from({ length: 6 }).map((_, i) => {
              const titles = ["Before Bagi", "Bagi's Entry", "The Changeover", "Connection", "Our Promise", "His Prayer"];
              return (
                <button
                  key={i}
                  onClick={() => {
                    setActiveScene(i);
                  }}
                  className="group flex items-center justify-center relative py-2"
                  title={`Jump to ${titles[i]}`}
                >
                  <div className={`h-2 rounded-full transition-all duration-500 ${activeScene === i ? 'w-8 bg-luxury-red shadow-[0_0_8px_rgba(230,57,70,0.6)]' : 'w-2 bg-white/20 group-hover:bg-white/40'}`} />
                  <span className="absolute bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[8px] uppercase tracking-widest text-[#ffccd5] bg-luxury-darker border border-white/10 px-2 py-0.5 rounded pointer-events-none whitespace-nowrap z-30">
                    {titles[i]}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              handleNext();
            }}
            disabled={activeScene === 5}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs tracking-wider uppercase font-semibold transition-all duration-300 ${activeScene === 5 ? 'border-white/5 text-white/10 cursor-not-allowed' : 'border-white/10 text-white/70 hover:text-white hover:border-white/30 cursor-pointer'}`}
          >
            Next Scene
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

        </div>
      )}

      {/* Embedded style */}
      <style>{`
        @keyframes flicker {
          0%, 100% {
            transform: scale(1) rotate(-1deg);
            filter: drop-shadow(0 0 3px rgba(251,146,60,0.85));
          }
          50% {
            transform: scale(1.08) rotate(1.5deg) translateY(-1px);
            filter: drop-shadow(0 0 8px rgba(253,224,71,0.95));
          }
        }
        .animate-candle-flicker {
          animation: flicker 0.8s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}
