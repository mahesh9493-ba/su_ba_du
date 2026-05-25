import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, MapPin, Heart, Sparkles, Smile, Users, BookOpen, 
  ArrowLeft, ArrowRight, Sun, Coffee, Dumbbell, 
  Map, Star, Award, Home, Trees, ShieldCheck, Flame, Compass as CompassIcon
} from 'lucide-react';



// 12 Jyotirlingas Data
const JYOTIRLINGAS = [
  { id: 1, name: "Somnath Jyotirlinga", location: "Gujarat", x: "12%", y: "65%", detail: "Where Lord Shiva appeared as a pillar of pure light. The first of the twelve sacred abodes." },
  { id: 2, name: "Mallikarjuna Jyotirlinga", location: "Andhra Pradesh", x: "32%", y: "82%", detail: "Nestled on Mount Srisailam. Reaching this peaceful temple together at sunrise, praying for a bond that lasts lifetimes." },
  { id: 3, name: "Mahakaleshwar Jyotirlinga", location: "Madhya Pradesh", x: "24%", y: "48%", detail: "The Lord of Time and Eternity. A reminder that their love will transcend all temporal boundaries." },
  { id: 4, name: "Omkareshwar Jyotirlinga", location: "Madhya Pradesh", x: "34%", y: "54%", detail: "Located on an island shaped like the sacred sound 'Om'. Finding deep quietude beside the sacred Narmada river." },
  { id: 5, name: "Vaidyanath Jyotirlinga", location: "Jharkhand", x: "64%", y: "45%", detail: "The Lord of Physicians and Healing. Seeking blessings for lifelong health, emotional care, and mutual strength." },
  { id: 6, name: "Bhimashankar Jyotirlinga", location: "Maharashtra", x: "20%", y: "76%", detail: "Surrounded by a dense green bird sanctuary. Hearing temple bells echoing through the mountain mist as they walk hand-in-hand." },
  { id: 7, name: "Kashi Vishwanath Jyotirlinga", location: "Uttar Pradesh", x: "55%", y: "38%", detail: "On the holy banks of the Ganges. Watching the evening Ganga Aarti, looking at the glowing oil lamps reflecting in Bagi's eyes." },
  { id: 8, name: "Trimbakeshwar Jyotirlinga", location: "Maharashtra", x: "18%", y: "70%", detail: "At the foothills of Brahmagiri mountains. Feeling the pure, cooling mountain breeze and a sense of absolute destiny." },
  { id: 9, name: "Nageshwar Jyotirlinga", location: "Gujarat", x: "8%", y: "55%", detail: "The divine Lord of Serpents, protecting from all negative energies. A sanctuary of safety, trust, and absolute protection." },
  { id: 10, name: "Rameshwaram Jyotirlinga", location: "Tamil Nadu", x: "30%", y: "94%", detail: "Consecrated by Sri Rama on the quiet sea shores. Walking down the massive corridors of stone pillars, hearing the ocean whisper." },
  { id: 11, name: "Grishneshwar Jyotirlinga", location: "Maharashtra", x: "23%", y: "68%", detail: "The final Jyotirlinga shrine. Bowing their heads in deep gratitude for the beautiful life they are building together." },
  { id: 12, name: "Kedarnath Jyotirlinga", location: "Uttarakhand", x: "48%", y: "18%", detail: "Majestically tucked amidst the massive snow-capped peaks of the Himalayas. The ultimate pilgrimage, walking the cold mountain path, sharing a single woolen shawl, and looking up at the towering temple in quiet awe." }
];

export default function FutureDreams({ onClose }) {
  const [activeScene, setActiveScene] = useState(0);
  const [selectedJyotirlinga, setSelectedJyotirlinga] = useState(JYOTIRLINGAS[0]);
  
  // Interactive Scene 7 (Tirumala Family Blessings) Sub-Step Progression
  const [tirumalaSubStep, setTirumalaSubStep] = useState(0);
  
  // Interactive Scene 5 (Their Marriage Dream) Sub-Step Progression
  const [marriageSubStep, setMarriageSubStep] = useState(0);
  
  // Typewriter text state
  const [typedText, setTypedText] = useState("");
  

  const currentSceneIndexRef = useRef(0);

  // Sync ref with scene state for arpeggiator callback
  useEffect(() => {
    currentSceneIndexRef.current = activeScene;
  }, [activeScene]);

  // Narratives for each scene (indexed 0 to 9)
  const STORY_SCENES = {
    0: `Some people enter our lives unexpectedly…\nbut slowly become part of every future dream we create.\n\nDudu no longer dreams only for himself…\n\nEvery future he imagines now…\nhas Bagi beside him. ❤️`,
    
    1: `One temple at a time…\none blessing at a time…\none lifetime together. ❤️\n\nAnd somewhere in every temple, amidst the misty incense and sacred bells,\nDudu silently prays for the same thing:\n\n“Let this beautiful journey never end… ❤️”`,
    
    2: `Dudu dreams of collecting memories with Bagi…\nnot expensive things.\n\nHe dreams of golden sunsets, snowy mountain valleys, rainy roads, ancient temple corridors, small roadside tea cups, and long peaceful road journeys beside her.\n\nTo him…\nhome is no longer a physical place.\nIt is wherever Bagi smiles beside him. 🏔️🌲`,
    
    3: `Dudu does not dream only about grand milestones…\nHe dreams about the small, quiet everyday details too.\n\nMotivating each other during early morning gym sessions, sharing a single set of headphones, grocery shopping together on lazy Sundays, laughing over movies under warm blankets, and sharing quiet evening chai.\n\nTo Dudu, love is not just passionate romance.\nIt is finding deep, unshakeable peace in everyday life with Bagi.\n\nHe is not dreaming of a perfect life…\nHe is simply dreaming of doing everything in life…\nwith Bagi beside him. ❤️`,
    
    4: `Dudu dreams of celebrating every phase of life with Bagi beside him.\n\nBeing that couple who dances in joy at friends’ weddings, plans unexpected weekend group road trips, takes silly candid group photos, shares late-night laughter, and builds memories that slowly become beautiful lifetime stories.\n\nGrowing together, hand-in-hand, through every season of life. ✨`,
    
    "5_0": `Dudu never wanted a love that separates families.\n\nHe dreams of a marriage filled with blessings,\nsmiles,\nhappy tears,\nand both families standing together.`,
    
    "5_1": `In that moment,\nDudu does not see a celebration…\n\nHe sees every prayer,\nevery dream,\nand every hope finally standing beside him as Bagi. ❤️`,
    
    6: `Dudu secretly dreams of a tiny world filled with soft laughter…\n\nA little princess holding his fingers, falling asleep on his chest, and a baby boy running in the garden beside them.\n\nHe dreams of becoming not just a husband… but the absolute best father possible. Playing silly games, protecting them like his whole universe, and teaching them prayers in front of home diyas.\n\nAnd in every future memory he imagines…\nBagi is always there beside him. 👶🍼`,
    
    // Scene 7: Tirumala Family Blessings (Multi-Stage Dialogues)
    "7_0": `Dudu never dreamed of a rich life.\n\nHe dreamed of a peaceful one.\n\n\nA life where love feels safe…\nwhere prayers feel answered…\nand where every blessing is shared with Bagi.\n\nHe often imagines one beautiful future moment…`,
    
    "7_1": `One day…\nafter years of prayers,\njourneys,\nmemories,\nand love…\n\nDudu imagines standing beside Bagi in Tirumala.\n\nNot as two people searching for love anymore…\nBut as a family blessed by it.`,
    
    "7_2": `With their little princess in his arms…\nand their baby boy resting safely beside Bagi…\n\nThey stand silently in front of Balaji,\nthanking Him for every unanswered prayer\nthat eventually became their life.\n\nIn that moment,\nDudu feels everything he once dreamed about…\nstanding right beside him.`,
    
    "7_3": `Tirumala was once the place where their story quietly began…\n\nAnd one day,\nDudu dreams it will become the place\nwhere they thank God for their beautiful little world. ❤️`,
    
    8: `More than temporary excitement… Dudu dreams of ultimate peace.\n\nA quiet, peaceful life. A happy, healthy family. Small road trips. Whispering temple bells. Steaming hot evening chai.\n\nAnd growing old together, holding Bagi’s beautiful wrinkled hands, wrapped in a warm blanket on a high mountain ridge, sharing hot steaming cups of chai next to a lit lantern as the sun sets over golden peaks.\n\nTo him…\nforever is not just a word anymore.\nIt is a beautiful, peaceful life he wants to live with her. ☕🍂`,
    
    9: `Dudu does not dream of a perfect life…\n\nHe simply dreams of every single imperfect moment…\n\nwith Bagi beside him forever. ❤️`
  };

  // Typewriter pacing hook
  useEffect(() => {
    let rawText = "";
    if (activeScene === 5) {
      rawText = STORY_SCENES[`5_${marriageSubStep}`] || "";
    } else if (activeScene === 7) {
      rawText = STORY_SCENES[`7_${tirumalaSubStep}`] || "";
    } else {
      rawText = STORY_SCENES[activeScene] || "";
    }
    
    setTypedText("");
    if (!rawText) return;

    let index = 0;
    let timer;
    const speed = 20; // 20ms base typing speed

    const type = () => {
      setTypedText(rawText.slice(0, index + 1));
      
      const char = rawText[index];
      let delay = speed;
      
      // Cinematic punctuation-aware pauses
      if (char === ',' || char === '—') {
        delay = speed * 12; 
      } else if (char === '.' || char === '!' || char === '?' || char === '❤️' || char === '🔱') {
        delay = speed * 22; 
      } else if (char === '\n') {
        delay = speed * 8; 
      } else if (char === '…') {
        delay = speed * 26; 
      }

      index++;
      if (index < rawText.length) {
        timer = setTimeout(type, delay);
      }
    };

    timer = setTimeout(type, 500);

    return () => clearTimeout(timer);
  }, [activeScene, tirumalaSubStep, marriageSubStep]);



  // Handle Jyotirlinga node tap
  const handleJyotirlingaSelect = (node) => {
    setSelectedJyotirlinga(node);
  };

  // Navigation handlers
  const handleNext = () => {
    // Stage 5 progression
    if (activeScene === 5 && marriageSubStep < 1) {
      setMarriageSubStep(prev => prev + 1);
      return;
    }

    // If we are in Tirumala Blessings (Scene 7), walk through substeps
    if (activeScene === 7 && tirumalaSubStep < 3) {
      setTirumalaSubStep(prev => prev + 1);
      return;
    }

    if (activeScene < 9) {
      if (activeScene === 4) {
        setMarriageSubStep(0);
      }
      if (activeScene === 6) {
        setTirumalaSubStep(0);
      }
      setActiveScene(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    // Stage 5 regression
    if (activeScene === 5 && marriageSubStep > 0) {
      setMarriageSubStep(prev => prev - 1);
      return;
    }

    // Walk back through substeps in Tirumala blessings
    if (activeScene === 7 && tirumalaSubStep > 0) {
      setTirumalaSubStep(prev => prev - 1);
      return;
    }

    if (activeScene > 0) {
      if (activeScene === 6) {
        setMarriageSubStep(1);
      } else {
        setMarriageSubStep(0);
      }

      if (activeScene === 8) {
        setTirumalaSubStep(3);
      } else {
        setTirumalaSubStep(0);
      }
      setActiveScene(prev => prev - 1);
    }
  };

  // Dynamic Scene Backgrounds
  const getSceneBackground = () => {
    switch (activeScene) {
      case 0: // Intro Golden Horizon (Tirumala Family Blessings Backdrop)
        return "/temple_blessings.jpg";
      case 1: // Temple steps at dawn / Sacred Route
        return "https://images.unsplash.com/photo-1600100397608-f010e42fa680?q=80&w=1200&auto=format&fit=crop";
      case 2: // Travel life landscape
        return "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200&auto=format&fit=crop";
      case 3: // Everyday comfy coffee/house (Sunset Chai Backdrop)
        return "/sunset_chai.jpg";
      case 4: // Candid wedding party
        return "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1200&auto=format&fit=crop";
      case 5: // Sacred Traditional Indian Wedding
        return "wedding-theme";
      case 6: // Parenting golden garden
        return "/parenthood.jpg";
      case 7: // Tirumala Family Blessings (Full screen temple golden theme)
        return "temple-theme";
      case 8: // Sunset old rocking chair chai
        return "/sunset_chai.jpg";
      case 9: // Final Cosmic Void
        return "cosmic";
      default:
        return "";
    }
  };

  const bgUrl = getSceneBackground();

  return (
    <div 
      className="relative min-h-screen w-full bg-luxury-darker overflow-hidden flex flex-col items-center justify-between text-white font-sans selection:bg-luxury-rose selection:text-white"
    >
      
      {/* Dynamic Background Image with subtle Ken Burns motion */}
      <AnimatePresence mode="wait">
        {bgUrl !== "cosmic" && bgUrl !== "temple-theme" ? (
          <motion.div
            key={bgUrl}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ 
              opacity: 0.38, 
              scale: 1.01,
              x: [0, 5, 0],
              y: [0, -5, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 1.2 },
              scale: { duration: 1.2 },
              x: { duration: 25, repeat: Infinity, ease: "linear" },
              y: { duration: 25, repeat: Infinity, ease: "linear" }
            }}
            className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none z-0"
            style={{ backgroundImage: `url(${bgUrl})` }}
          />
        ) : bgUrl === "temple-theme" ? (
          /* Scene 7: Fullscreen Golden Temple Atmosphere vignette overlay */
          <motion.div
            key="temple-golden-atmosphere"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-gradient-to-b from-[#2b1803] via-[#120700] to-[#241302]"
          />
        ) : bgUrl === "wedding-theme" ? (
          /* Scene 5: Fullscreen Warm Temple Wedding Lighting Atmosphere */
          <motion.div
            key="wedding-warm-atmosphere"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-gradient-to-b from-[#3a1b02] via-[#150600] to-[#2c1401]"
          />
        ) : (
          /* Scene 9 / Final Cosmic Void Particle Overlay */
          <motion.div
            key="cosmic-void"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-gradient-to-b from-black via-[#1c0205] to-black"
          />
        )}
      </AnimatePresence>

      {/* Elegant Overlay vignette shadows to keep elements premium */}
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-darker via-transparent to-luxury-darker/60 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_20%,rgba(10,5,8,0.85)_100%)] pointer-events-none z-0" />

      {/* Floating Golden/Rose Celestial Fireflies */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2.5px] h-[2.5px] rounded-full bg-luxury-rose"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px rgba(255, 143, 163, 0.8)'
            }}
            animate={{
              y: [0, -45, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.75, 0.1]
            }}
            transition={{
              duration: 8 + Math.random() * 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* TOP HEADER CONTROLS */}
      <header className="relative w-full max-w-6xl mx-auto px-6 pt-24 pb-5 md:py-5 flex items-center justify-between z-45">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex w-10 h-10 rounded-full border border-luxury-rose/25 bg-black/40 backdrop-blur-md items-center justify-center text-luxury-rose shadow-lg">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-luxury-rose/85 font-medium block">
              Our Future dreams
            </span>
            <h1 className="text-sm font-serif font-semibold tracking-wider text-luxury-gradient">
              The peaceful life Dudu dreams of building with Bagi
            </h1>
          </div>
        </div>


      </header>

      {/* MAIN CINEMATIC WORKSPACE FRAME */}
      <main className="relative w-full max-w-6xl mx-auto px-6 flex-1 flex flex-col justify-center items-center z-30">
        <AnimatePresence mode="wait">
          
          {/* ====================================================
              SCENE 0: INTRO HORIZON
              ==================================================== */}
          {activeScene === 0 && (
            <motion.div
              key="scene-intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-4xl flex flex-col items-center text-center mt-4"
            >
              <div className="w-12 h-12 rounded-full border border-luxury-rose/20 bg-luxury-darker/60 backdrop-blur-md flex items-center justify-center text-luxury-rose mb-4 shadow-xl relative">
                <Heart className="w-5 h-5 fill-current animate-pulse" />
                <span className="absolute inset-0 rounded-full border border-luxury-rose/40 animate-ping opacity-30" />
              </div>

              <span className="text-[9px] tracking-[0.3em] text-luxury-rose uppercase font-semibold mb-2">
                Dream Zero • The Horizon of Tomorrow
              </span>
              
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-luxury-gradient tracking-wide mb-6 leading-tight">
                Our Future Dreams ❤️
              </h2>

              {/* Split Widescreen Preview Milestone Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl mb-6 pointer-events-auto">
                {/* Card 1: The Wedding Mandap */}
                <motion.div
                  whileHover={{ scale: 1.02, rotate: -0.5 }}
                  className="relative aspect-[1.4] rounded-xl overflow-hidden border border-luxury-rose/25 shadow-lg group"
                >
                  <img 
                    src="/wedding_blessings.jpg" 
                    alt="The Wedding Dream" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-3.5 text-left">
                    <span className="text-[7.5px] uppercase tracking-widest text-luxury-rose font-bold">
                      The Union
                    </span>
                    <h4 className="text-[11px] font-serif font-bold text-white mt-0.5">
                      Their Sacred Marriage Dream 🌸
                    </h4>
                  </div>
                </motion.div>

                {/* Card 2: Tirumala Family Blessings */}
                <motion.div
                  whileHover={{ scale: 1.02, rotate: 0.5 }}
                  className="relative aspect-[1.4] rounded-xl overflow-hidden border border-[#e0a96d]/25 shadow-lg group"
                >
                  <img 
                    src="/temple_blessings.jpg" 
                    alt="Tirumala Family Blessings" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-3.5 text-left">
                    <span className="text-[7.5px] uppercase tracking-widest text-[#e0a96d] font-bold">
                      The Blessing
                    </span>
                    <h4 className="text-[11px] font-serif font-bold text-white mt-0.5">
                      Family Prayers in Tirumala 🕌
                    </h4>
                  </div>
                </motion.div>
              </div>

              <div className="w-full max-w-2xl bg-black/35 border border-white/5 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-2xl">
                <p className="font-serif text-sm md:text-md text-white/85 leading-relaxed font-light italic whitespace-pre-line filter blur-[0.05px]">
                  {typedText}
                </p>
              </div>
            </motion.div>
          )}

          {/* ====================================================
              SCENE 1: THE SPIRITUAL JOURNEY (12 JYOTIRLINGAS ROUTE MAP)
              ==================================================== */}
          {activeScene === 1 && (
            <motion.div
              key="scene-spiritual"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-2 max-w-5xl"
            >
              {/* Left Grid: Widescreen Constellation Map */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div className="relative w-full aspect-[4/3] bg-black/45 border border-luxury-rose/15 rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-center z-10 border-b border-white/5 pb-2">
                    <span className="text-[9px] uppercase tracking-widest text-[#e0a96d] font-semibold flex items-center gap-1.5">
                      <Map className="w-3.5 h-3.5" /> 12 Jyotirlingas Constellation Route Map
                    </span>
                    <span className="text-[8px] bg-[#e0a96d]/15 text-[#e0a96d] px-2 py-0.5 rounded border border-[#e0a96d]/20 uppercase tracking-widest">
                      Tirumala to Kedarnath
                    </span>
                  </div>

                  {/* Sacred India Constellation Star Connector */}
                  <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Connecting glow constellation path */}
                      <motion.path
                        d="M 12 65 L 8 55 L 18 70 L 20 76 L 23 68 L 32 82 L 30 94 L 34 54 L 24 48 L 55 38 L 64 45 L 48 18"
                        fill="none"
                        stroke="url(#templePathGradient)"
                        strokeWidth="1"
                        strokeDasharray="3, 3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                      
                      <defs>
                        <linearGradient id="templePathGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#e0a96d" />
                          <stop offset="50%" stopColor="#ff8fa3" />
                          <stop offset="100%" stopColor="#ff4d6d" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Interactive glowing temple stars */}
                    {JYOTIRLINGAS.map((node) => {
                      const isSelected = selectedJyotirlinga?.id === node.id;
                      return (
                        <button
                          key={node.id}
                          onClick={() => handleJyotirlingaSelect(node)}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group outline-none z-10"
                          style={{ left: node.x, top: node.y }}
                        >
                          <motion.div
                            className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${isSelected ? 'border-[#e0a96d] bg-[#e0a96d]/15 shadow-[0_0_15px_rgba(224,169,109,0.7)] scale-110' : 'border-white/20 bg-black/60 hover:border-white/50 hover:scale-105'}`}
                          >
                            <span className={`text-[8px] font-bold ${isSelected ? 'text-[#e0a96d]' : 'text-white/60'}`}>
                              {node.id}
                            </span>
                          </motion.div>
                          
                          {/* Inner pulsing aura */}
                          {isSelected && (
                            <span className="absolute inset-0 w-6 h-6 rounded-full border border-[#e0a96d] animate-ping opacity-45 pointer-events-none" />
                          )}
                          
                          {/* Tooltip Tag */}
                          <span className="absolute bottom-[115%] left-1/2 -translate-x-1/2 bg-black/90 border border-white/5 text-[7px] text-white font-medium uppercase tracking-wider py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md">
                            {node.name.split(' ')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="z-10 border-t border-white/5 pt-2 flex justify-between items-center text-[7px] text-white/40 tracking-widest uppercase">
                    <span>*Click star nodes to explore temples</span>
                    <span>Destiny connected route</span>
                  </div>
                </div>
              </div>

              {/* Right Grid: Sacred Pilgrimage Dialogue Cards */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <span className="text-[10px] tracking-[0.3em] text-[#e0a96d] uppercase font-semibold mb-2">
                  Dream One • The Pilgrimage Route
                </span>
                
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-luxury-gradient mb-4">
                  12 Sacred Jyotirlingas
                </h3>

                {/* Selected Temple Copper Highlight Box */}
                <div className="p-5 border border-[#e0a96d]/20 bg-gradient-to-br from-[#1a130c]/70 to-[#100b08]/75 backdrop-blur-md rounded-xl shadow-xl relative overflow-hidden mb-5">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#e0a96d]/5 rounded-bl-full pointer-events-none" />
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-[#e0a96d]/15 text-[#e0a96d] flex items-center justify-center text-[9px] font-bold">
                      {selectedJyotirlinga?.id}
                    </span>
                    <span className="text-[8px] tracking-widest uppercase text-white/50">
                      {selectedJyotirlinga?.location}
                    </span>
                  </div>

                  <h4 className="text-lg font-serif font-bold text-[#e0a96d] mb-2 leading-tight">
                    {selectedJyotirlinga?.name}
                  </h4>
                  
                  <p className="text-xs font-light text-white/80 leading-relaxed italic">
                    “{selectedJyotirlinga?.detail}”
                  </p>
                </div>

                <div className="bg-black/30 border border-white/5 p-4 rounded-xl shadow-md">
                  <p className="font-serif text-[12px] md:text-sm text-white/70 leading-relaxed whitespace-pre-line filter blur-[0.05px]">
                    {typedText}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ====================================================
              SCENE 2: DREAM TRAVEL LIFE (POLAROID SCRAPBOOK)
              ==================================================== */}
          {activeScene === 2 && (
            <motion.div
              key="scene-travel"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-2 max-w-5xl"
            >
              {/* Left Grid: Interactive Polaroid Scrapbook */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative py-4">
                
                {/* Ooty / Coorg Card */}
                <motion.div
                  whileHover={{ scale: 1.03, rotate: -2, zIndex: 10 }}
                  className="bg-white p-2 pb-6 shadow-2xl rounded transform rotate-[-3deg] border border-white/80 cursor-pointer pointer-events-auto"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=300&auto=format&fit=crop" 
                    alt="Green hills"
                    className="w-full aspect-square object-cover grayscale-[20%] contrast-110 rounded-sm mb-2"
                  />
                  <span className="font-handwritten text-xs text-[#2b2b2b] block text-center animate-pulse">
                    Misty Hills of Ooty 🌿
                  </span>
                </motion.div>

                {/* Kashmir / Manali Card */}
                <motion.div
                  whileHover={{ scale: 1.03, rotate: 3, zIndex: 10 }}
                  className="bg-white p-2 pb-6 shadow-2xl rounded transform rotate-[2deg] border border-white/80 cursor-pointer pointer-events-auto"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=300&auto=format&fit=crop" 
                    alt="Snow valley"
                    className="w-full aspect-square object-cover grayscale-[20%] contrast-110 rounded-sm mb-2"
                  />
                  <span className="font-handwritten text-xs text-[#2b2b2b] block text-center">
                    Snow Valleys of Kashmir ❄️
                  </span>
                </motion.div>

                {/* Kerala / Coorg Tea Fields */}
                <motion.div
                  whileHover={{ scale: 1.03, rotate: 2, zIndex: 10 }}
                  className="bg-white p-2 pb-6 shadow-2xl rounded transform rotate-[3deg] border border-white/80 cursor-pointer pointer-events-auto"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=300&auto=format&fit=crop" 
                    alt="Waterfall bridge"
                    className="w-full aspect-square object-cover grayscale-[20%] contrast-110 rounded-sm mb-2"
                  />
                  <span className="font-handwritten text-xs text-[#2b2b2b] block text-center">
                    Arunachal Misty Bridges 🌲
                  </span>
                </motion.div>

                {/* Ladakh Blue Lakes */}
                <motion.div
                  whileHover={{ scale: 1.03, rotate: -3, zIndex: 10 }}
                  className="bg-white p-2 pb-6 shadow-2xl rounded transform rotate-[-2deg] border border-white/80 cursor-pointer pointer-events-auto"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=300&auto=format&fit=crop" 
                    alt="Blue lake"
                    className="w-full aspect-square object-cover grayscale-[20%] contrast-110 rounded-sm mb-2"
                  />
                  <span className="font-handwritten text-xs text-[#2b2b2b] block text-center">
                    Serene Lakes of Ladakh 🛶
                  </span>
                </motion.div>

              </div>

              {/* Right Grid: Emotional narration */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <span className="text-[10px] tracking-[0.3em] text-luxury-rose uppercase font-semibold mb-2">
                  Dream Two • Collecting Memories
                </span>
                
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-luxury-gradient mb-5">
                  Collecting Moments, Not Things
                </h3>

                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
                  <p className="font-serif text-md text-white/85 leading-relaxed whitespace-pre-line filter blur-[0.05px]">
                    {typedText}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ====================================================
              SCENE 3: EVERYDAY LIFE (DAILY COMFORT & GYM GRID)
              ==================================================== */}
          {activeScene === 3 && (
            <motion.div
              key="scene-everyday"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-2 max-w-5xl"
            >
              {/* Left Grid: Visual Cozy Life Grid */}
              <div className="lg:col-span-6 grid grid-cols-12 gap-4 h-[380px] py-2 relative pointer-events-auto">
                {/* 1. Workout Gym Together */}
                <div className="col-span-7 h-full rounded-xl border border-white/10 relative overflow-hidden shadow-lg group animate-fade-in pointer-events-auto">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110" 
                    style={{ backgroundImage: `url('/gym_workout.jpg')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[10px] uppercase tracking-widest text-luxury-rose font-semibold flex items-center gap-1.5 drop-shadow-md">
                      <Dumbbell className="w-3.5 h-3.5" /> Shared Gym Sessions
                    </span>
                    <p className="text-[11px] text-white/80 font-light mt-1 leading-normal filter drop-shadow-md">Pushing each other, sharing curls, deadlifts, and sweet smiles.</p>
                  </div>
                </div>

                {/* 2. Cozy Coffee mornings */}
                <div className="col-span-5 h-[45%] rounded-xl border border-white/10 relative overflow-hidden shadow-lg group pointer-events-auto">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110" 
                    style={{ backgroundImage: `url('/sunset_chai.jpg')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-3">
                    <span className="text-[9px] uppercase tracking-widest text-[#ffbe0b] font-semibold flex items-center gap-1.5 drop-shadow-md">
                      <Coffee className="w-3 h-3" /> Morning Chai
                    </span>
                    <p className="text-[10px] text-white/80 font-light mt-0.5 leading-normal filter drop-shadow-md">Warm steaming cups, quiet morning talks, and a cozy start to our day.</p>
                  </div>
                </div>

                {/* 3. Watching Movies Cozy */}
                <div className="col-span-5 h-[50%] mt-auto rounded-xl border border-white/10 relative overflow-hidden shadow-lg group pointer-events-auto">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110" 
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-3">
                    <span className="text-[9px] uppercase tracking-widest text-luxury-rose font-semibold flex items-center gap-1.5 drop-shadow-md">
                      <Home className="w-3 h-3" /> Movie Nights
                    </span>
                    <p className="text-[10px] text-white/80 font-light mt-0.5 leading-normal filter drop-shadow-md">Wrapped in a warm blanket, sharing popcorn, and laughing under soft lights.</p>
                  </div>
                </div>
              </div>

              {/* Right Grid: Emotional Narration */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <span className="text-[10px] tracking-[0.3em] text-luxury-rose uppercase font-semibold mb-2">
                  Dream Three • Cozy Everyday Comfort
                </span>
                
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-luxury-gradient mb-5">
                  The Sanctuary of Small Moments
                </h3>

                <div className="bg-black/45 border border-white/5 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
                  <p className="font-serif text-xs md:text-sm text-white/80 leading-relaxed whitespace-pre-line filter blur-[0.05px]">
                    {typedText}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ====================================================
              SCENE 4: FRIENDS & CELEBRATIONS
              ==================================================== */}
          {activeScene === 4 && (
            <motion.div
              key="scene-friends"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-2 max-w-5xl"
            >
              {/* Left Grid: Landscape snapshots */}
              <div className="lg:col-span-6 flex flex-col gap-5 py-4 relative pointer-events-auto">
                <div className="relative w-full aspect-[16/10] bg-cover bg-center rounded-xl border border-white/10 shadow-2xl overflow-hidden group animate-fade-in"
                     style={{ backgroundImage: `url('https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=600&auto=format&fit=crop')` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[9px] uppercase tracking-widest text-luxury-rose font-semibold flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> Circle Laughter
                    </span>
                    <p className="text-[10px] text-white/60 font-light mt-1">Group road trips, campfire stories, and absolute joy.</p>
                  </div>
                </div>

                <div className="w-[85%] self-end relative aspect-[16/10] bg-cover bg-center rounded-xl border border-white/10 shadow-2xl overflow-hidden group"
                     style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop')` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[9px] uppercase tracking-widest text-[#9b5de5] font-semibold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Friends' Weddings
                    </span>
                    <p className="text-[10px] text-white/60 font-light mt-1">Dancing the night away together as the perfect pair.</p>
                  </div>
                </div>
              </div>

              {/* Right Grid: Emotional Narration */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <span className="text-[10px] tracking-[0.3em] text-luxury-rose uppercase font-semibold mb-2">
                  Dream Four • Circle of Joy
                </span>
                
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-luxury-gradient mb-5">
                  Laughter Shared With Friends
                </h3>

                <div className="bg-black/45 border border-white/5 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
                  <p className="font-serif text-md text-white/80 leading-relaxed whitespace-pre-line filter blur-[0.05px]">
                    {typedText}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ====================================================
              SCENE 5: THEIR MARRIAGE DREAM (FAMILY BLESSINGS)
              ==================================================== */}
          {activeScene === 5 && (
            <motion.div
              key="scene-marriage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
              className="w-full flex flex-col items-center mt-2 max-w-4xl relative"
            >
              {/* Dynamic Golden glow behind frame */}
              <div className="absolute top-0 left-1/4 w-32 h-[350px] bg-gradient-to-b from-[#d4af37]/15 to-transparent blur-3xl pointer-events-none transform rotate-[30deg] z-0 animate-pulse" />
              <div className="absolute top-0 right-1/4 w-24 h-[350px] bg-gradient-to-b from-[#ff8fa3]/10 to-transparent blur-3xl pointer-events-none transform rotate-[-20deg] z-0 animate-pulse" />

              {/* Floating flower petals (Exclusive to Scene 5 mandap sub-stage) */}
              {marriageSubStep === 1 && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none">
                  {Array.from({ length: 15 }).map((_, idx) => (
                    <motion.div
                      key={idx}
                      className="absolute text-lg select-none"
                      style={{
                        left: `${5 + idx * 7}%`,
                        top: "-30px"
                      }}
                      animate={{
                        y: [0, 600],
                        x: [0, Math.sin(idx) * 40, 0],
                        rotate: [0, 360 + idx * 45],
                        opacity: [0, 0.85, 0]
                      }}
                      transition={{
                        duration: 8 + idx * 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {idx % 3 === 0 ? "🌸" : idx % 3 === 1 ? "🌹" : "🌼"}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* STAGE A: Prelude before wedding image appears */}
              {marriageSubStep === 0 && (
                <motion.div
                  key="marriage-prelude"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6 }}
                  className="w-full max-w-2xl text-center py-10 bg-black/40 border border-luxury-rose/15 backdrop-blur-md rounded-2xl p-8 shadow-2xl relative overflow-hidden z-20"
                >
                  <div className="absolute -top-12 -left-12 w-28 h-28 bg-luxury-rose/5 rounded-full pointer-events-none" />
                  
                  <span className="text-[10px] tracking-[0.3em] text-luxury-rose uppercase font-semibold mb-3 block">
                    Dream Five • The Sacred Mandap
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-luxury-gradient tracking-wide mb-6">
                    A Union of Two Families
                  </h3>

                  <p className="font-serif text-md md:text-lg text-white/85 leading-relaxed font-light italic whitespace-pre-line filter blur-[0.05px] mb-8">
                    {typedText}
                  </p>

                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-luxury-red to-luxury-rose text-white font-semibold text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition-transform duration-300 pointer-events-auto mx-auto shadow-lg shadow-luxury-rose/15"
                  >
                    Witness Wedding Mandap 🌸
                  </button>
                </motion.div>
              )}

              {/* STAGE B: Fullscreen Cinematic Mandap image and narrative below */}
              {marriageSubStep === 1 && (
                <div className="w-full flex flex-col items-center z-20">
                  
                  {/* Majestic Fullscreen Widescreen Picture Frame with Cinematic Effects */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1.01, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative w-full aspect-[4/3] max-w-2xl rounded-2xl overflow-hidden border border-luxury-rose/25 shadow-[0_0_55px_rgba(255,143,163,0.35)] pointer-events-auto"
                  >
                    {/* Parallax Ken Burns Soft Zooming Image */}
                    <motion.img 
                      src="/wedding_blessings.jpg" 
                      alt="The Wedding Dudu Dreams About" 
                      className="w-full h-full object-cover"
                      animate={{
                        scale: [1, 1.06],
                        x: [0, -3],
                        y: [0, -3]
                      }}
                      transition={{
                        duration: 35,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />

                    {/* Deep Vignette Soft Blur Edges Overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_15%,rgba(20,5,0,0.85)_95%)] pointer-events-none" />

                    {/* Warm Temple Lighting Golden Glow Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-amber-950/10 to-amber-900/10 pointer-events-none blend-overlay opacity-80" />

                    {/* Floating divine sparkles inside frame */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {Array.from({ length: 8 }).map((_, sparkIdx) => (
                        <motion.div
                          key={sparkIdx}
                          className="absolute w-[2px] h-[2px] bg-[#fff3b0] rounded-full"
                          style={{
                            left: `${Math.random() * 80 + 10}%`,
                            top: `${Math.random() * 80 + 10}%`,
                            boxShadow: '0 0 8px #fff3b0'
                          }}
                          animate={{
                            opacity: [0.1, 0.95, 0.1],
                            scale: [0.8, 1.3, 0.8]
                          }}
                          transition={{
                            duration: 3 + sparkIdx,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>

                    {/* Suggested Overlay text on image */}
                    <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/35 backdrop-blur-[1px]">
                      <div className="text-center max-w-md mx-auto p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
                        <span className="text-[7.5px] uppercase tracking-[0.25em] text-[#e0a96d] font-bold block mb-1">
                          Our Sacred Union
                        </span>
                        <p className="font-serif text-xs md:text-sm text-white leading-relaxed italic font-semibold">
                          “Not just a wedding…<br />
                          A moment where two families,<br />
                          two hearts,<br />
                          and two lifetimes become one. ❤️”
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Narration Typewriter Card below frame */}
                  <motion.div
                    key={marriageSubStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-2xl mt-6 p-5 bg-black/55 border border-white/5 backdrop-blur-md rounded-xl shadow-lg text-center"
                  >
                    <div className="py-2">
                      <span className="w-7 h-7 rounded-full bg-luxury-rose/10 text-luxury-rose border border-luxury-rose/25 flex items-center justify-center text-[10px] font-bold mx-auto mb-2 animate-bounce">
                        🌸
                      </span>
                      <p className="font-serif text-xs md:text-sm text-white/90 leading-relaxed whitespace-pre-line filter blur-[0.05px] select-text">
                        {typedText}
                      </p>
                    </div>

                    {/* Progress dots inside Scene 5 */}
                    <div className="flex gap-1.5 justify-center mt-4">
                      {Array.from({ length: 2 }).map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setMarriageSubStep(dotIdx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${marriageSubStep === dotIdx ? 'bg-[#e0a96d] scale-125' : 'bg-white/15 hover:bg-white/30'}`}
                          title={`Sub-Step ${dotIdx}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}

            </motion.div>
          )}

          {/* ====================================================
              SCENE 6: FUTURE CHILDREN GARDEN
              ==================================================== */}
          {activeScene === 6 && (
            <motion.div
              key="scene-parenthood"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-2 max-w-5xl"
            >
              {/* Left Grid: Sunset Garden Silhouette playing with kids */}
              <div className="lg:col-span-6 flex flex-col gap-4 relative pointer-events-auto">
                <div className="relative w-full aspect-[16/10] bg-cover bg-center rounded-2xl border border-white/10 shadow-2xl overflow-hidden group animate-fade-in"
                     style={{ backgroundImage: `url('/parenthood.jpg')` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
                    <span className="text-[9px] uppercase tracking-widest text-[#ff8fa3] font-semibold flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5" /> A Home Filled with Love
                    </span>
                    <p className="text-[11px] text-white/75 font-light mt-1 leading-relaxed">Dudu lifting their little princess in absolute joy while Bagi smiles beside them holding their happy baby boy.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/45 border border-white/5 p-3.5 rounded-xl text-center shadow-lg">
                    <span className="text-xl block">👶📖</span>
                    <span className="text-[8.5px] uppercase tracking-widest text-white/60 font-semibold block mt-2">Bedtime Storybooks</span>
                  </div>
                  <div className="bg-black/45 border border-white/5 p-3.5 rounded-xl text-center shadow-lg">
                    <span className="text-xl block">🔱🕯️</span>
                    <span className="text-[8.5px] uppercase tracking-widest text-luxury-rose font-semibold block mt-2">Teaching Prayers</span>
                  </div>
                </div>
              </div>

              {/* Right Grid: Narrative */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <span className="text-[10px] tracking-[0.3em] text-luxury-rose uppercase font-semibold mb-2">
                  Dream Six • Tiny Laughing Worlds
                </span>
                
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-luxury-gradient mb-5">
                  A Home Filled with Children's Laughter
                </h3>

                <div className="bg-black/45 border border-white/5 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
                  <p className="font-serif text-xs md:text-sm text-white/80 leading-relaxed whitespace-pre-line filter blur-[0.05px]">
                    {typedText}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ====================================================
              SCENE 7: TIRUMALA FAMILY BLESSINGS (NEW STUNNING MASTER IMAGE SCENE)
              ==================================================== */}
          {activeScene === 7 && (
            <motion.div
              key="scene-tirumala-blessings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
              className="w-full flex flex-col items-center mt-2 max-w-4xl relative"
            >
              
              {/* Dynamic Sunlight Rays effect behind frame */}
              <div className="absolute top-0 left-1/4 w-32 h-[350px] bg-gradient-to-b from-[#e0a96d]/15 to-transparent blur-3xl pointer-events-none transform rotate-[30deg] z-0 animate-pulse" />
              <div className="absolute top-0 right-1/4 w-24 h-[350px] bg-gradient-to-b from-[#ff8fa3]/10 to-transparent blur-3xl pointer-events-none transform rotate-[-20deg] z-0 animate-pulse" />

              {/* Floating clay diyas floating slowly upward (Exclusive to this divine scene) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none">
                {Array.from({ length: 7 }).map((_, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute text-xl flex flex-col items-center"
                    style={{
                      left: `${15 + idx * 12}%`,
                      bottom: "-50px"
                    }}
                    animate={{
                      y: [0, -480],
                      x: [0, Math.sin(idx) * 20, 0],
                      opacity: [0, 0.85, 0]
                    }}
                    transition={{
                      duration: 9 + idx * 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Flame className="w-3.5 h-3.5 text-[#ff8e3c] fill-[#ffbe0b] filter drop-shadow-[0_0_5px_#ff8e3c] animate-pulse" />
                    <div className="w-2.5 h-1.5 bg-[#8d5b4c] rounded-b-full border-t border-[#f4a261]" />
                  </motion.div>
                ))}
              </div>

              {/* STAGE A: Narrating the prelude before image appears */}
              {tirumalaSubStep === 0 && (
                <motion.div
                  key="tirumala-prelude"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6 }}
                  className="w-full max-w-2xl text-center py-10 bg-black/40 border border-[#e0a96d]/15 backdrop-blur-md rounded-2xl p-8 shadow-2xl relative overflow-hidden z-20"
                >
                  <div className="absolute -top-12 -left-12 w-28 h-28 bg-[#e0a96d]/5 rounded-full pointer-events-none" />
                  
                  <span className="text-[10px] tracking-[0.3em] text-[#e0a96d] uppercase font-semibold mb-3 block">
                    Dream Seven • The Spiritual Completion
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-luxury-gradient tracking-wide mb-6">
                    A Simple & Peaceful Dream
                  </h3>

                  <p className="font-serif text-md md:text-lg text-white/85 leading-relaxed font-light italic whitespace-pre-line filter blur-[0.05px] mb-8">
                    {typedText}
                  </p>

                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] to-[#d4af37] text-black font-semibold text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition-transform duration-300 pointer-events-auto mx-auto shadow-lg shadow-[#e0a96d]/15"
                  >
                    Reveal Dream Vision ✨
                  </button>
                </motion.div>
              )}

              {/* STAGE B: Fullscreen Cinematic Family temple image with sub-stages */}
              {tirumalaSubStep > 0 && (
                <div className="w-full flex flex-col items-center z-20">
                  
                  {/* Majestic Fullscreen Widescreen Picture Frame */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1.01, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative w-full aspect-[4/3] max-w-2xl rounded-2xl overflow-hidden border border-[#e0a96d]/25 shadow-[0_0_55px_rgba(224,169,109,0.35)] pointer-events-auto"
                  >
                    {/* Parallax Ken Burns Soft Zooming Image */}
                    <motion.img 
                      src="/temple_blessings.jpg" 
                      alt="Tirumala Family Blessings" 
                      className="w-full h-full object-cover"
                      animate={{
                        scale: [1, 1.05],
                        x: [0, 3],
                        y: [0, -3]
                      }}
                      transition={{
                        duration: 35,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />

                    {/* Deep Vignette Soft Blur Edges Overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_15%,rgba(18,7,0,0.85)_95%)] pointer-events-none" />

                    {/* Floating divine sparkles inside frame */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {Array.from({ length: 8 }).map((_, sparkIdx) => (
                        <motion.div
                          key={sparkIdx}
                          className="absolute w-[2px] h-[2px] bg-[#fff3b0] rounded-full"
                          style={{
                            left: `${Math.random() * 80 + 10}%`,
                            top: `${Math.random() * 80 + 10}%`,
                            boxShadow: '0 0 8px #fff3b0'
                          }}
                          animate={{
                            opacity: [0.1, 0.95, 0.1],
                            scale: [0.8, 1.3, 0.8]
                          }}
                          transition={{
                            duration: 3 + sparkIdx,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>

                    {/* Glowing sub-caption tag based on step */}
                    <div className="absolute bottom-4 inset-x-4 bg-black/85 border border-[#e0a96d]/15 p-3 rounded-xl backdrop-blur-md text-center max-w-lg mx-auto">
                      <span className="text-[7.5px] uppercase tracking-[0.25em] text-[#e0a96d] font-bold block mb-1">
                        Dudu's Dream Vision
                      </span>
                      <p className="text-[10px] text-white/80 font-light leading-relaxed">
                        {tirumalaSubStep === 1 && "Standing beside Bagi in Tirumala as a family blessed by love."}
                        {tirumalaSubStep === 2 && "A princess in arms, a baby boy beside Bagi, standing silently before Balaji."}
                        {tirumalaSubStep === 3 && "Thanking God for every unanswered prayer that eventually became their life."}
                      </p>
                    </div>
                  </motion.div>

                  {/* Narration Typewriter Card below frame */}
                  <motion.div
                    key={tirumalaSubStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-2xl mt-6 p-5 bg-black/55 border border-white/5 backdrop-blur-md rounded-xl shadow-lg text-center"
                  >
                    {tirumalaSubStep === 3 ? (
                      /* Final Destiny Glowing message block */
                      <div className="py-2">
                        <span className="w-7 h-7 rounded-full bg-luxury-rose/10 text-luxury-rose border border-luxury-rose/25 flex items-center justify-center text-[10px] font-bold mx-auto mb-2 animate-bounce">
                          🔱
                        </span>
                        <p className="font-serif text-md md:text-lg text-luxury-rose font-bold italic tracking-wide leading-relaxed filter blur-[0.05px] select-text">
                          “{typedText}”
                        </p>
                      </div>
                    ) : (
                      /* Progressive Typewriter Narration */
                      <p className="font-serif text-xs md:text-sm text-white/85 leading-relaxed whitespace-pre-line filter blur-[0.05px] select-text">
                        {typedText}
                      </p>
                    )}

                    {/* Progress dots inside Scene 7 */}
                    <div className="flex gap-1.5 justify-center mt-4">
                      {Array.from({ length: 4 }).map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setTirumalaSubStep(dotIdx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${tirumalaSubStep === dotIdx ? 'bg-[#e0a96d] scale-125' : 'bg-white/15 hover:bg-white/30'}`}
                          title={`Sub-Step ${dotIdx}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}

            </motion.div>
          )}

          {/* ====================================================
              SCENE 8: GROWING OLD SUNSET TEA
              ==================================================== */}
          {activeScene === 8 && (
            <motion.div
              key="scene-oldage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-2 max-w-5xl"
            >
              {/* Left Grid: Older couple hand hold walking sunset */}
              <div className="lg:col-span-6 flex flex-col justify-center items-center pointer-events-auto">
                <div className="relative w-full aspect-[4/3] bg-cover bg-center rounded-2xl border border-[#ffb5a7]/20 shadow-2xl overflow-hidden animate-fade-in"
                     style={{ backgroundImage: `url('/sunset_chai.jpg')` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[9px] uppercase tracking-widest text-[#ffb5a7] font-semibold flex items-center gap-1.5 mb-1">
                      <Sun className="w-3.5 h-3.5" /> Sunset Evening Glow
                    </span>
                    <h4 className="text-xl font-serif font-bold text-[#ffb5a7]">Chai Stories & Sunsets</h4>
                    <p className="text-xs text-white/80 font-light mt-1.5 leading-relaxed">
                      Sitting together wrapped in a warm blanket on a high mountain ridge, holding steaming cups of hot chai next to a lit lantern and their wooden sign.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Grid: Narrative */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <span className="text-[10px] tracking-[0.3em] text-[#ffb5a7] uppercase font-semibold mb-2">
                  Dream Eight • Sunset of Life
                </span>
                
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-luxury-gradient mb-5">
                  Growing Old Beside Bagi
                </h3>

                <div className="bg-black/45 border border-white/5 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
                  <p className="font-serif text-md text-white/80 leading-relaxed whitespace-pre-line filter blur-[0.05px]">
                    {typedText}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ====================================================
              SCENE 9: THE FINAL EMOTIONAL REVEAL (FINALE)
              ==================================================== */}
          {activeScene === 9 && (
            <motion.div
              key="scene-reveal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.2 }}
              className="w-full max-w-3xl flex flex-col items-center text-center mt-4"
            >
              {/* Star-like core visual */}
              <div className="w-20 h-20 rounded-full border border-luxury-rose bg-gradient-to-r from-luxury-red/25 to-luxury-rose/25 flex items-center justify-center text-luxury-rose mb-8 shadow-[0_0_40px_rgba(255,143,163,0.65)] relative animate-pulse">
                <Compass className="w-9 h-9 animate-spin-slow" />
                <span className="absolute inset-0 rounded-full border border-luxury-rose animate-ping opacity-60 pointer-events-none" />
              </div>

              <span className="text-[11px] tracking-[0.4em] text-luxury-rose uppercase font-semibold mb-5">
                The Eternal Conclusion
              </span>

              <div className="w-full bg-black/45 border border-luxury-rose/20 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden mb-12">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-luxury-red via-luxury-rose to-luxury-red" />
                
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-luxury-rose leading-relaxed font-bold tracking-wide italic filter blur-[0.05px]">
                  “{typedText}”
                </h2>
              </div>

              {/* No center call to action button as requested */}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER TIMELINE DRAWERS / SLIDES INDEX & CONTROL BAR */}
      <footer className="relative w-full max-w-6xl mx-auto px-6 py-6 z-40 flex flex-col md:flex-row items-center justify-between gap-5 border-t border-white/5 bg-black/20 backdrop-blur-sm rounded-t-xl mt-6">
        
        {/* Previous Scene Button */}
        <button
          onClick={handlePrev}
          disabled={activeScene === 0 && tirumalaSubStep === 0}
          className={`w-12 h-12 rounded-full border glassmorphism flex items-center justify-center transition-all duration-300 pointer-events-auto outline-none hover:scale-105 active:scale-95 ${activeScene === 0 && tirumalaSubStep === 0 ? 'border-white/5 text-white/10 cursor-not-allowed' : 'border-luxury-rose/25 text-luxury-rose cursor-pointer hover:border-luxury-rose/50 shadow-md'}`}
          title="Previous Dream"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Dynamic slide progress bar indicators */}
        <div className="flex-1 flex flex-col items-center max-w-lg pointer-events-auto">
          <div className="flex justify-between items-center w-full text-[9px] text-white/40 uppercase tracking-widest font-semibold mb-2">
            <span>Dream {activeScene} of 9</span>
            <span>
              {activeScene === 0 && "Horizon Intro"}
              {activeScene === 1 && "Sacred Pilgrimage"}
              {activeScene === 2 && "Memory Scrapbook"}
              {activeScene === 3 && "Everyday Comforts"}
              {activeScene === 4 && "Circle Celebrations"}
              {activeScene === 5 && `Traditional Marriage (Stage ${marriageSubStep + 1}/2)`}
              {activeScene === 6 && "Parenthood Garden"}
              {activeScene === 7 && `Tirumala Family Blessings (Stage ${tirumalaSubStep + 1}/4)`}
              {activeScene === 8 && "Growing Old Tea"}
              {activeScene === 9 && "Forever Resolution"}
            </span>
          </div>

          {/* Elegant clickable segment indices */}
          <div className="flex justify-between items-center gap-2 w-full">
            {Array.from({ length: 10 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveScene(idx);
                  if (idx !== 5) setMarriageSubStep(0);
                  if (idx !== 7) setTirumalaSubStep(0);
                }}
                className={`h-[4px] rounded-full flex-1 transition-all duration-500 cursor-pointer relative ${activeScene === idx ? 'bg-luxury-rose shadow-[0_0_8px_rgba(255,143,163,0.8)] scale-y-125' : 'bg-white/15 hover:bg-white/30'}`}
                title={`Jump to Dream ${idx}`}
              >
                {/* Visual marker inside active/visited segments */}
                {activeScene > idx && (
                  <span className="absolute inset-0 bg-luxury-rose/60 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Next Scene / Complete Button */}
        {activeScene < 9 || (activeScene === 7 && tirumalaSubStep < 3) ? (
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-luxury-rose/25 glassmorphism text-luxury-rose flex items-center justify-center transition-all duration-300 pointer-events-auto outline-none hover:scale-105 active:scale-95 cursor-pointer hover:border-luxury-rose/50 shadow-md"
            title="Next Dream"
          >
            <ArrowRight className="w-5 h-5 animate-pulse" />
          </button>
        ) : (
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-luxury-red to-luxury-rose text-luxury-darker flex items-center justify-center transition-all duration-300 pointer-events-auto outline-none hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(255,143,163,0.5)] border border-luxury-rose/20"
            title="Return to Surprise Portals"
          >
            <Heart className="w-5 h-5 fill-current animate-bounce mt-0.5" />
          </button>
        )}

      </footer>

      {/* High-quality styles */}
      <style>{`
        .font-handwritten {
          font-family: 'Dancing Script', 'Caveat', cursive, sans-serif;
        }
        .animate-spin-slow {
          animation: spin 30s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
