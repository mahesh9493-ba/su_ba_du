import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Compass, Star, Sparkles, MessageCircle, PhoneCall, ChevronRight, ChevronLeft, MapPin, Film, Image, Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

const SCENE_ASSETS = {
  scene1: {
    title: "Before Bagi",
    images: [
      { url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600", title: "Carefree boys gang laughter" },
      { url: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=600", title: "Riding bike alone at night" },
      { url: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=600", title: "Lonely street tea stall" }
    ]
  },
  scene2: {
    title: "Bagi’s Entry ❤️",
    images: [
      { url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=600", title: "Bagi entering Dudu's world" },
      { url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600", title: "Silent classroom glance" },
      { url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600", title: "Tirumala misty mountain roads" }
    ]
  },
  scene3: {
    title: "The Changeover ❤️",
    images: [
      { url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600", title: "Smiling at late night texts" },
      { url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600", title: "Deep emotional attachment" }
    ]
  },
  scene4: {
    title: "Their Connection ❤️",
    images: [
      { url: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&q=80&w=600", title: "Nostalgic walks together" },
      { url: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=600", title: "Stealing french fries at canteen" },
      { url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600", title: "Finding quiet comfort" }
    ]
  },
  scene5: {
    title: "Our Sacred Bucket List ❤️",
    destinations: [
      { name: "Somnath Linga", icon: "🔱", bg: "from-amber-950/30 to-yellow-950/30", fact: "Somnath, Gujarat • The shrine of eternal light..." },
      { name: "Mallikarjuna", icon: "🔱", bg: "from-orange-950/30 to-red-950/30", fact: "Srisailam, Andhra Pradesh • Consecrated on Nallamala hills..." },
      { name: "Mahakaleshwar", icon: "🔱", bg: "from-red-950/30 to-purple-950/30", fact: "Ujjain, Madhya Pradesh • The sacred Lord of Time..." },
      { name: "Omkareshwar", icon: "🔱", bg: "from-purple-950/30 to-indigo-950/30", fact: "Narmada River, Madhya Pradesh • On an island shaped like Om..." },
      { name: "Vaidyanath Linga", icon: "🔱", bg: "from-indigo-950/30 to-blue-950/30", fact: "Deoghar, Jharkhand • The divine Lord of Physicians..." },
      { name: "Bhimashankar", icon: "🔱", bg: "from-blue-950/30 to-cyan-950/30", fact: "Pune, Maharashtra • Surrounded by dense sacred forest..." },
      { name: "Kashi Vishwanath", icon: "🔱", bg: "from-cyan-950/30 to-teal-950/30", fact: "Varanasi, Uttar Pradesh • The golden heart of Shiva's city..." },
      { name: "Trimbakeshwar", icon: "🔱", bg: "from-teal-950/30 to-emerald-950/30", fact: "Nashik, Maharashtra • The source of Godavari river..." },
      { name: "Nageshwar Linga", icon: "🔱", bg: "from-emerald-950/30 to-green-950/30", fact: "Dwarka, Gujarat • The divine Lord of Serpents..." },
      { name: "Rameshwaram", icon: "🔱", bg: "from-[#4a080c]/30 to-[#1c0204]", fact: "Rameswaram, Tamil Nadu • Consecrated by Sri Rama himself..." }
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
    const sceneKey = sceneNum === 5 ? null : `scene${sceneNum === 6 ? 6 : sceneNum}`;
    
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
    "bg-gradient-to-b from-[#091b15] via-[#030d0a] to-luxury-darker", // Scene 5 - Magical Emerald Tree
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
    <div className={`min-h-screen w-full relative overflow-y-auto select-none transition-colors duration-1000 flex flex-col justify-between ${viewMode === 'cinematic' ? sceneBackgrounds[activeScene] : "bg-gradient-to-b from-[#120406] via-luxury-dark to-luxury-darker"}`}>
      
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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl flex flex-col items-center py-8"
          >
            {/* Header prompt */}
            <div className="text-center mb-12 max-w-xl">
              <Sparkles className="w-6 h-6 text-luxury-rose mx-auto mb-3 animate-pulse" />
              <p className="text-sm font-light text-white/70 leading-relaxed">
                Choose how you would like to witness Dudu & Bagi's magical connection. We highly recommend opening the **Complete Story Infographic** first to see their entire story beautifully captured in a single, high-resolution master frame.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              
              {/* Option A: Single Infographic Story Frame (User-uploaded High Fidelity Image) */}
              <motion.div
                whileHover={{ scale: 1.015, translateY: -4 }}
                onClick={() => {
                  setViewMode('infographic');
                }}
                className="p-6 rounded-2xl glassmorphism-luxury border-luxury-red/35 shadow-2xl flex flex-col justify-between items-center text-center cursor-pointer pointer-events-auto relative overflow-hidden group glassmorphism-hover border-pulse"
                style={{ animationDuration: '3s' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-luxury-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-12 h-12 rounded-full border border-luxury-rose/30 flex items-center justify-center text-luxury-rose mb-5 bg-luxury-red/10">
                  <Image className="w-6 h-6 animate-pulse" />
                </div>

                <div className="flex-1 flex flex-col items-center mb-6">
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-normal sm:tracking-[0.2em] text-luxury-rose font-bold mb-2 bg-luxury-red/20 border border-luxury-rose/30 px-2 sm:px-3 py-1 rounded-full animate-glow-pulse">
                    ✨ Recommended Path • Master Frame ✨
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white mt-3 mb-2">Complete Story Infographic 🖼️</h3>
                  <div className="text-[10px] text-emerald-400 font-semibold mb-3 select-none flex items-center gap-1.5 bg-emerald-950/20 border border-emerald-500/20 px-3 py-0.5 rounded-full">
                    <span>❤️</span> Gives the complete story in a single image
                  </div>
                  <p className="text-xs font-light text-white/60 leading-relaxed max-w-xs">
                    Witness the entire emotional narrative of Dudu & Bagi captured perfectly in one single, high-fidelity master image. Zoom in and pan to read their beautiful journey and their sacred 10 Jyotirlingas bucket list!
                  </p>

                  {/* Thumbnail Preview */}
                  <div className="w-full h-36 mt-5 rounded-lg overflow-hidden border border-white/10 relative group-hover:border-luxury-rose/30 transition-colors duration-300">
                    <img 
                      src="/story_infographic.jpg" 
                      alt="Story infographic Preview" 
                      className="w-full h-full object-cover grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/35 group-hover:bg-black/10 transition-colors duration-300">
                      <div className="p-2.5 rounded-full bg-black/60 border border-white/15 text-white/90">
                        <Maximize2 className="w-5 h-5 group-hover:scale-110 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </div>

                <button className="px-5 py-2 rounded-full bg-gradient-to-r from-luxury-red via-[#d00000] to-luxury-rose text-white text-xs tracking-wider uppercase font-bold shadow-lg pointer-events-none group-hover:scale-105 transition-transform duration-300">
                  Open Master Frame 🖼️
                </button>
              </motion.div>

              {/* Option B: Scene-by-Scene Cinematic Movie */}
              <motion.div
                whileHover={{ scale: 1.015, translateY: -4 }}
                onClick={() => {
                  setViewMode('cinematic');
                }}
                className="p-6 rounded-2xl glassmorphism-luxury border-purple-500/25 shadow-2xl flex flex-col justify-between items-center text-center cursor-pointer pointer-events-auto relative overflow-hidden group glassmorphism-hover"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-12 h-12 rounded-full border border-purple-400/30 flex items-center justify-center text-purple-300 mb-5 bg-purple-950/15">
                  <Film className="w-6 h-6" />
                </div>

                <div className="flex-1 flex flex-col items-center mb-6">
                  <span className="text-[9px] uppercase tracking-wider text-purple-300 font-bold mb-2">Interactive Journey</span>
                  <h3 className="text-xl font-serif font-bold text-white mb-3">Interactive Cinematic Movie 🎬</h3>
                  <p className="text-xs font-light text-white/50 leading-relaxed max-w-xs">
                    Embark on a scene-by-scene romantic narration. Complete with realistic texting simulators, active phone calls, 3D hover-tilt polaroid scrapbook, swinging bucket-list tree, and Dudu's prayer at Tirumala.
                  </p>

                  <div className="w-full h-36 mt-5 rounded-lg overflow-hidden border border-white/10 relative group-hover:border-purple-400/30 transition-colors duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=600" 
                      alt="Cinematic Preview" 
                      className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-500 scale-105 group-hover:scale-100" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Sparkles className="w-5 h-5 text-white/60 group-hover:text-white group-hover:scale-110 transition-all duration-300 animate-spin-slow" />
                    </div>
                  </div>
                </div>

                <button className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white text-xs tracking-wider uppercase font-bold shadow-lg pointer-events-none">
                  Start Cinematic Journey 🎬
                </button>
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
            className="w-full h-[78vh] flex flex-col justify-between items-center relative overflow-hidden"
          >
            {/* Control Bar Overlay */}
            <div className="absolute top-2 inset-x-0 mx-auto flex items-center justify-center gap-3 z-30 pointer-events-auto bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 max-w-sm shadow-xl">
              <button 
                onClick={zoomIn} 
                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button 
                onClick={zoomOut} 
                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button 
                onClick={resetZoom} 
                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <span className="text-[10px] text-white/50 border-l border-white/10 pl-2 select-none">
                {Math.round(zoomScale * 100)}%
              </span>
            </div>

            {/* Interactive Image Viewing Canvas */}
            <div 
              className="flex-1 w-full h-full rounded-2xl border border-luxury-red/25 bg-black/55 backdrop-blur-sm relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <motion.div
                ref={imgRef}
                className="relative select-none pointer-events-none max-w-full max-h-full flex items-center justify-center"
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
                  transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
              >
                <img 
                  src="/story_infographic.jpg" 
                  alt="Dudu & Bagi Complete Story Infographic" 
                  className="max-w-[95vw] max-h-[70vh] md:max-h-[72vh] object-contain rounded shadow-[0_20px_60px_rgba(0,0,0,0.95)]" 
                />
              </motion.div>
            </div>

            {/* Bottom Info Bar Overlay */}
            <div className="w-full max-w-2xl text-center py-3 relative z-30 select-none bg-black/45 backdrop-blur-md border border-white/5 rounded-xl px-4 mt-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-luxury-rose flex items-center justify-center gap-1.5 mb-1.5">
                <span>✨</span> The Complete Story in a Single Image <span>✨</span>
              </span>
              <p className="text-[10px] font-light text-white/60 leading-relaxed max-w-lg mx-auto">
                This beautiful masterpiece image tells the complete, heart-touching story of Dudu & Bagi in a single frame. It covers their carefree days, entry, deep changeover, late-night calls, sacred prayer, and their 10 Jyotirlingas bucket list!
              </p>
              <p className="text-[9px] font-semibold text-emerald-400/80 tracking-wide mt-2">
                Tip: Drag or swipe to pan around, or click the (+) and (-) zoom buttons to examine every beautiful detail in full resolution!
              </p>
            </div>

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
                    <p className="font-handwritten text-sm sm:text-lg text-center text-luxury-rose mt-1.5 sm:mt-2">Carefree college days 🎒</p>
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
                    <p className="font-handwritten text-sm sm:text-lg text-center text-luxury-rose mt-1.5 sm:mt-2">Riding alone in the dark 🏍️</p>
                  </motion.div>

                  {/* Fading Old Chat Box mockup */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.7 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ opacity: 1, scale: 1.02 }}
                    className="absolute w-36 sm:w-44 md:w-56 p-2 sm:p-3 rounded-lg border border-red-500/10 bg-black/50 backdrop-blur-md z-15 flex flex-col gap-1.5 sm:gap-2 shadow-2xl pointer-events-auto text-[8.5px] sm:text-[10px]"
                  >
                    <span className="text-[7.5px] sm:text-[8px] uppercase tracking-wider text-red-400 font-bold border-b border-red-500/10 pb-1">Unfinished past memory</span>
                    {oldChats.map((c, i) => (
                      <div key={i} className={`p-1 sm:p-1.5 rounded ${c.sender === 'him' ? 'self-end bg-white/5 text-white/50' : 'self-start bg-red-950/15 text-red-400/60'}`}>
                        {c.text}
                      </div>
                    ))}
                  </motion.div>
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
                    <p className="font-handwritten text-lg text-center text-amber-300 mt-2">Classroom eye contact 📚</p>
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
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600"
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

            {/* SCENE 5: THEIR SACRED BUCKET LIST */}
            {activeScene === 4 && (
              <motion.div
                key="scene-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full min-h-[70vh] relative"
              >
                {/* Description */}
                <div className="lg:col-span-5 flex flex-col justify-center px-4 md:px-8 z-10">
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3">Scene 05 • The Sacred List</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight flex items-center gap-2">
                    <Compass className="w-8 h-8 text-emerald-400 animate-spin-slow" />
                    Sacred Bucket List
                  </h2>
                  <p className="text-xs md:text-sm font-light text-white/60 leading-relaxed mb-6">
                    Hover over the dangling constellation boards to reveal the 10 Jyotirlingas Dudu and Bagi pray to visit together.
                  </p>

                  <div className="p-4 border-l-2 border-emerald-500/50 bg-emerald-500/5 backdrop-blur-md rounded-r-lg max-w-md min-h-[80px] flex items-center justify-center text-center">
                    <AnimatePresence mode="wait">
                      {hoveredDest ? (
                        <motion.p
                          key={hoveredDest.name}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="font-serif italic text-emerald-300 text-xs md:text-sm leading-relaxed"
                        >
                          “{hoveredDest.fact}”
                        </motion.p>
                      ) : (
                        <p className="font-serif italic text-emerald-300/40 text-xs md:text-sm">
                          “One day, hand in hand, we’ll seek blessings at all these sacred places and create memories for a lifetime. ❤️”
                        </p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Tree and hanging signs */}
                <div className="lg:col-span-7 flex flex-col justify-start relative min-h-[450px] w-full pointer-events-auto">
                  
                  {/* SVG branch */}
                  <div className="absolute top-0 right-0 w-full max-w-[420px] h-[60px] pointer-events-none opacity-40 z-0">
                    <svg className="w-full h-full text-emerald-400" viewBox="0 0 400 60" fill="none">
                      <path d="M 400,10 C 350,15 280,5 200,20 C 120,35 60,25 0,45" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" />
                      <path d="M 330,12 C 300,10 260,30 240,32" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M 180,21 C 150,15 120,40 90,42" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>

                  {/* 10 Hanging Destination boards */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-10 px-4 max-w-xl mx-auto relative z-10">
                    {SCENE_ASSETS.scene5.destinations.map((dest, i) => {
                      const isHovered = hoveredDest?.name === dest.name;
                      return (
                        <motion.div
                          key={dest.name}
                          onMouseEnter={() => {
                            setHoveredDest(dest);
                          }}
                          onMouseLeave={() => setHoveredDest(null)}
                          className={`px-3 py-2.5 rounded-lg border glassmorphism cursor-pointer flex items-center gap-2 shadow-lg backdrop-blur-md transform-gpu pointer-events-auto transition-all duration-300 ${isHovered ? 'border-emerald-400 bg-emerald-950/20 text-white shadow-[0_0_15px_rgba(52,211,153,0.35)] scale-105' : 'border-white/5 text-white/70 hover:text-white hover:border-white/20'}`}
                          animate={{
                            rotate: isHovered ? [0, -6, 5, -3, 2, 0] : [0, 1.5, -1.5, 0],
                          }}
                          transition={{
                            rotate: isHovered 
                              ? { duration: 1.2, ease: "easeOut" }
                              : { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }
                          }}
                        >
                          <span className="text-sm">{dest.icon}</span>
                          <span className="font-serif font-bold text-[10px] tracking-wider uppercase">{dest.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/30"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`
                        }}
                        animate={{
                          y: [-20, 20],
                          x: [-10, 10],
                          opacity: [0.1, 0.7, 0.1],
                          scale: [0.7, 1.2, 0.7]
                        }}
                        transition={{
                          duration: 3 + Math.random() * 4,
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
              const titles = ["Before Bagi", "Bagi's Entry", "The Changeover", "Connection", "Bucket List", "His Prayer"];
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
