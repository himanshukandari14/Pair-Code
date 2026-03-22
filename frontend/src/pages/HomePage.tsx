import { SignInButton } from "@clerk/clerk-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Video, Code2, Shield, MessageSquare, ChevronRight,
  Zap, Mic, Target, Command
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

const features = [
  { icon: Code2, title: "Collaborative Editor", desc: "Real-time sync powered by Liveblocks & Yjs with Monaco. Execute JavaScript, Python, and Java instantly via Judge0." },
  { icon: Video, title: "HD Video & Audio", desc: "Crystal clear video via Stream SDK. Includes screen share, reactions, full recording, and live camera toggles." },
  { icon: MessageSquare, title: "Integrated Chat", desc: "In-session messaging powered by Stream Chat with real-time participation updates and join/leave sounds." },
  { icon: Shield, title: "Secure Sessions", desc: "1-on-1 private rooms with 1 host and 1 participant. Protected by JWT auth and Clerk user synchronization." },
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-100 font-inter selection:bg-yellow-400 selection:text-black overflow-hidden relative">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Bodoni+Moda:ital,opsz,wght@1,6..122,400;1,6..122,700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
          
          .font-bebas { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
          .font-anton { font-family: 'Anton', sans-serif; letter-spacing: 0.02em; }
          .font-bodoni { font-family: 'Bodoni Moda', serif; }
          .font-inter { font-family: 'Inter', sans-serif; }
          .font-mono { font-family: 'JetBrains Mono', monospace; }
          
          .bg-dots {
            background-size: 32px 32px;
            background-image: radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          }
          
          .glass-panel {
            background: rgba(10, 10, 10, 0.4);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
          
          .text-stroke-yellow {
            -webkit-text-stroke: 1.5px #facc15;
            color: transparent;
          }

          .text-stroke-white {
            -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.1);
            color: transparent;
          }

          .glow-yellow {
            text-shadow: 0 0 30px rgba(250, 204, 21, 0.4);
          }
          
          .box-glow {
            box-shadow: 0 0 50px -15px rgba(250, 204, 21, 0.2);
          }

          .marquee-content {
            display: inline-flex;
            animation: marquee 40s linear infinite;
          }
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-yellow-400 transform origin-left z-[100] mix-blend-difference" style={{ scaleX }} />

      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-dots" 
           style={{ maskImage: 'radial-gradient(circle at 50% 10%, black, transparent 80%)', WebkitMaskImage: 'radial-gradient(circle at 50% 10%, black, transparent 80%)' }} />

      {/* Ambient Flare */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-yellow-400/5 blur-[150px] pointer-events-none z-0 mix-blend-screen" />

      {/* Nav */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-panel border-b border-white/5 py-4" : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="size-10 bg-yellow-400 flex items-center justify-center rotate-3 group-hover:-rotate-3 transition-transform duration-500">
              <Command className="size-5 text-black" />
            </div>
            <span className="font-bebas text-2xl tracking-widest text-white mt-1">TALENT_HUNT</span>
          </div>

          <div className="hidden md:flex items-center gap-12 text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
            <a href="#platform" className="hover:text-yellow-400 transition-colors">Platform</a>
            <a href="#process" className="hover:text-yellow-400 transition-colors">Process</a>
            <a href="#metrics" className="hover:text-yellow-400 transition-colors">Metrics</a>
          </div>

          <div className="flex items-center gap-6">
            <SignInButton mode="modal">
              <button className="hidden sm:block text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Log In</button>
            </SignInButton>
          </div>
        </div>
      </motion.nav>

      {/* ════════════════ HERO EXTREME ════════════════ */}
      <main className="relative z-10 min-h-screen flex items-center pt-24 pb-20" ref={containerRef}>
        <div className="absolute top-[20%] left-0 w-[200%] -rotate-3 opacity-[0.02] pointer-events-none z-0 hidden lg:block">
          <div className="flex whitespace-nowrap marquee-content">
            <span className="text-[18rem] leading-none font-bebas text-white mx-10">EVALUATE // EXECUTE //</span>
            <span className="text-[18rem] leading-none font-bebas text-white mx-10">EVALUATE // EXECUTE //</span>
          </div>
        </div>

        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 w-full">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8"
          >
            {/* ─ Left: Typography Mastery ─ */}
            <div className="flex-1 w-full relative z-20">
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col"
              >
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="size-2 bg-yellow-400 animate-pulse rounded-full" />
                  <span className="font-mono text-[10px] text-yellow-400 uppercase tracking-[0.3em] font-bold">
                    [ REC ] System Online
                  </span>
                </div>

                {/* Massive Typography Stack */}
                <div className="flex flex-col leading-[0.85] mb-8">
                  <h1 className="font-bebas text-[6rem] sm:text-[9rem] lg:text-[11xl] xl:text-[12rem] text-white tracking-normal">
                    TESTING
                  </h1>
                  <div className="flex items-center gap-6 -mt-2 sm:-mt-6 lg:-mt-8">
                    <span className="font-bodoni italic text-5xl sm:text-7xl lg:text-8xl xl:text-[8rem] text-yellow-400 glow-yellow lowercase">
                      true
                    </span>
                    <h1 className="font-bebas text-[5.5rem] sm:text-[8rem] lg:text-[10rem] xl:text-[11rem] text-stroke-white opacity-40">
                      SKILLS.
                    </h1>
                  </div>
                </div>

                <p className="font-inter text-base sm:text-lg text-zinc-400 max-w-xl font-light leading-relaxed mb-12 pl-4 border-l border-zinc-800">
                  Stop asking algorithmic riddles on a whiteboard. Watch them build, debug, and communicate in a live zero-latency coding environment powered by Stream, Judge0, and Liveblocks. <strong className="text-zinc-200 font-medium">The new standard for elite engineering teams.</strong>
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <SignInButton mode="modal">
                    <button className="h-16 w-full sm:w-auto px-10 bg-yellow-400 hover:bg-white text-black text-sm font-mono font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-4 group">
                      Initialize Session
                      <div className="size-6 bg-black flex items-center justify-center transition-transform group-hover:translate-x-1">
                        <ChevronRight className="size-4 text-yellow-400 group-hover:text-white" />
                      </div>
                    </button>
                  </SignInButton>
                </div>
                
                <div className="mt-12 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${i+30}`} className="size-8 rounded-full border border-[#020202] grayscale" alt="user" />
                    ))}
                  </div>
                  <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                    Joined by <span className="text-white font-bold">12,000+</span> engineers.
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ─ Right: Dramatic Floating Composition ─ */}
            <div className="flex-1 w-full relative h-[600px] lg:h-[800px] hidden md:block perspective-[2000px]">
              <motion.div 
                initial={{ opacity: 0, rotateY: 15, rotateX: 5, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, rotateY: -10, rotateX: 10, x: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] transform-style-3d z-10"
              >
                {/* 1. Main Editor Window */}
                <div className="absolute top-0 right-10 w-[600px] h-[500px] bg-[#0c0c0c] border border-zinc-800 shadow-2xl overflow-hidden box-glow" style={{ transform: "translateZ(-50px)" }}>
                   {/* Header */}
                   <div className="h-10 border-b border-zinc-800 bg-[#070707] flex items-center px-4 justify-between">
                     <div className="flex gap-2">
                       <div className="size-2.5 bg-zinc-700" />
                       <div className="size-2.5 bg-zinc-700" />
                       <div className="size-2.5 bg-zinc-700" />
                     </div>
                     <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">candidate_env.ts</span>
                     <Target className="size-3 text-zinc-600" />
                   </div>
                   {/* Code Base */}
                   <div className="p-6 font-mono text-[13px] leading-[1.8] text-zinc-400">
                     <div><span className="text-yellow-400">#</span> Real-time execution environment</div>
                     <br/>
                     <div><span className="text-purple-400">import</span> {'{'} <span className="text-white">evaluate</span> {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">'@core/metrics'</span>;</div>
                     <br/>
                     <div><span className="text-blue-400">const</span> <span className="text-yellow-200">sessionStatus</span> = <span className="text-purple-400">await</span> <span className="text-blue-200">evaluate</span>({'{'}</div>
                     <div className="pl-6 hover:translate-x-1 transition-transform cursor-crosshair">candidateId: <span className="text-green-400">'uuid_9831'</span>,</div>
                     <div className="pl-6 hover:translate-x-1 transition-transform cursor-crosshair">mode: <span className="text-green-400">'strict_execution'</span>,</div>
                     <div className="pl-6">video_enabled: <span className="text-yellow-400">true</span></div>
                     <div>{'}'});</div>
                     <br/>
                     <div className="border-l-2 border-yellow-400 pl-4 bg-yellow-400/5 py-3">
                       <span className="text-pink-400">if</span> (sessionStatus === <span className="text-green-400">'SUCCESS'</span>) {'{'}
                       <div className="pl-4">console.<span className="text-blue-200">log</span>(<span className="text-green-400">'HIRE.'</span>);</div>
                       {'}'}
                       <div className="w-2 h-4 bg-yellow-400 mt-2 animate-pulse" />
                     </div>
                   </div>
                </div>

                {/* 2. Floating Video Widget */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-10 left-[-40px] w-[260px] bg-[#070707] border border-zinc-800 p-2 shadow-2xl z-30"
                  style={{ transform: "translateZ(80px)" }}
                >
                  <div className="aspect-[4/5] relative bg-zinc-900 overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
                    {/* UI Overlay */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                       <div className="bg-red-500 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-widest flex items-center gap-1">
                         <div className="size-1 bg-white rounded-full animate-pulse" /> Live
                       </div>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                      <div className="bg-black/60 backdrop-blur-md px-2 py-1 flex items-center gap-2 border border-white/10">
                        <span className="font-mono text-[9px] text-white uppercase tracking-wider">Candidate</span>
                        <Mic className="size-3 text-green-400" />
                      </div>
                      <div className="size-8 bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center p-1.5">
                        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center border border-white/20" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 3. Floating Stats Badge */}
                <motion.div 
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-10 right-[-30px] bg-yellow-400 border border-black p-4 shadow-xl z-20"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <div className="flex items-center gap-3">
                    <Zap className="size-6 text-black" />
                    <div>
                      <div className="font-bebas text-3xl text-black leading-none">46ms</div>
                      <div className="font-mono text-[8px] text-black font-bold uppercase tracking-widest mt-0.5">Execution Speed</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* ════════════════ FEATURES BENTO ════════════════ */}
      <section id="platform" className="py-32 relative z-10 border-t border-zinc-900 bg-[#020202]">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="mb-20 grid lg:grid-cols-2 gap-8 items-end">
             <div>
               <h2 className="font-bodoni italic text-4xl sm:text-6xl text-zinc-500 mb-2">Uncompromising</h2>
               <h2 className="font-bebas text-6xl sm:text-8xl tracking-normal text-white leading-none">
                 TECHNICAL <span className="text-yellow-400 glow-yellow">ARSENAL.</span>
               </h2>
             </div>
             <div className="flex justify-start lg:justify-end pb-2">
               <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest max-w-sm leading-relaxed border-l-2 border-yellow-400 pl-6">
                 Everything you need to orchestrate the perfect technical interview without breaking a sweat.
               </p>
             </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {features.map((feat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative h-full"
              >
                <div className="h-full bg-[#070707] border border-zinc-900 hover:border-yellow-400/50 p-8 transition-colors duration-500 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-bl-full" />
                  
                  <div className="size-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-8 group-hover:bg-yellow-400 group-hover:border-yellow-400 transition-all duration-300">
                    <feat.icon className="size-5 text-zinc-400 group-hover:text-black transition-colors" />
                  </div>
                  
                  <h3 className="font-bebas text-3xl text-white mb-4 group-hover:text-yellow-400 transition-colors">
                    {feat.title}
                  </h3>
                  
                  <p className="font-inter text-sm text-zinc-500 leading-relaxed font-light mt-auto">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ BIG STATS ════════════════ */}
      <section id="metrics" className="py-32 bg-[#000000] border-y border-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
           <span className="font-bebas text-[25rem] text-white whitespace-nowrap">METRICS</span>
        </div>
        
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 sm:gap-8 divide-x-0 sm:divide-x divide-zinc-900">
          {[ 
            { label: "Video Engine", value: "Stream" },
            { label: "Execution Engine", value: "Judge0" },
            { label: "Real-time Sync", value: "Liveblocks" },
            { label: "Supported Langs", value: "JS / PY / JAVA" }
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="font-bebas text-5xl md:text-6xl lg:text-7xl text-white group-hover:text-yellow-400 transition-colors mb-4">{stat.value}</div>
              <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════ CTA ════════════════ */}
      <section className="py-40 relative overflow-hidden bg-yellow-400">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-bebas text-6xl sm:text-[8rem] lg:text-[10rem] tracking-tight mb-4 text-black leading-[0.85]">
            READY TO <br/> <span className="font-bodoni italic text-5xl sm:text-[7rem] lg:text-[9rem] tracking-normal text-white">Execute?</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-black font-bold uppercase tracking-widest max-w-xl mx-auto mb-12 mt-8">
            Join thousands of elite engineering teams using TalentHunt to find and hire the best developers.
          </p>
          <SignInButton mode="modal">
            <button className="h-16 px-12 bg-black hover:bg-white text-white hover:text-black text-sm font-mono font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-4 mx-auto group border-2 border-black hover:scale-105">
              Launch Platform <ChevronRight className="size-5" />
            </button>
          </SignInButton>
        </div>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer className="py-12 bg-[#020202]">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="size-6 bg-zinc-900 flex items-center justify-center">
              <Command className="size-3 text-zinc-500" />
            </div>
            <span className="font-bebas text-lg tracking-widest text-zinc-400 mt-1">TALENT_HUNT</span>
          </div>
          
          <div className="flex items-center gap-8 font-mono text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-yellow-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
          
          <div className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">
            &copy; 2026 TALENT_HUNT INC.
          </div>
        </div>
      </footer>
    </div>
  );
}