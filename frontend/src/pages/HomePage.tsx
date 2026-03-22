import { SignInButton } from "@clerk/clerk-react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight, Video, Code2, Users, Shield, Clock, LineChart, Target, Zap, Command
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

/* ─── Mock data ─── */
const featureCards = [
  { icon: Video, title: "HD Video Calls", desc: "No lag, zero friction. See every expression, every reaction instantly." },
  { icon: Code2, title: "Live Code Editor", desc: "Collaborate with real-time sync, syntax highlighting, and 40+ languages." },
  { icon: Users, title: "Smart Matching", desc: "Pair precisely with peers by skill level, stack, and availability." },
  { icon: Shield, title: "Secure Sessions", desc: "End-to-end encryption. Your code and ideas stay completely private." },
  { icon: Clock, title: "Timed Pressure", desc: "Simulate real interview conditions with built-in countdown timers." },
  { icon: LineChart, title: "Deep Analytics", desc: "Post-session insights, performance charts, and personal growth data." }
];

const stats = [
  { value: "12K+", label: "Engineers" },
  { value: "60K+", label: "Sessions" },
  { value: "4.9", label: "Rating" },
  { value: "99%", label: "Uptime" },
];

const steps = [
  { step: "01", title: "Create Profile", desc: "Set your stack, level, and availability in 30 seconds." },
  { step: "02", title: "Match & Prep", desc: "Our AI finds the perfect match. Connect instantly." },
  { step: "03", title: "Code & Conquer", desc: "Jump into a video call with a live code editor." },
];

const testimonials = [
  { quote: "It completely transformed how we evaluate engineers. Fast, reliable, and incredibly sharp.", author: "Sarah K.", role: "Engineering Lead @ Stripe", avatar: "SK" },
  { quote: "The interface is pure focus. No distractions, just you, the candidate, and the code.", author: "Rajan M.", role: "SWE @ Google", avatar: "RM" },
  { quote: "I landed my dream job after practicing here. The timed pressure is exactly like the real thing.", author: "Priya D.", role: "Frontend Dev @ Figma", avatar: "PD" },
];

// Reusable Variants
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Dynamic Font Styling injected locally for the mind blowing typographic effect */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

          .font-bebas { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
          .font-playfair { font-family: 'Playfair Display', serif; }
          .font-mono-space { font-family: 'Space Mono', monospace; }

          .marquee-content {
            display: inline-flex;
            animation: marquee 30s linear infinite;
          }
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          
          .animate-spin-slow {
            animation: spin 20s linear infinite;
          }
          @keyframes spin {
            100% { transform: rotate(360deg); }
          }

          .text-stroke-yellow {
            -webkit-text-stroke: 1.5px #facc15;
            color: transparent;
          }
        `}
      </style>

      <div className="min-h-screen bg-[#070707] text-zinc-100 font-sans selection:bg-yellow-400 selection:text-black overflow-hidden relative">
        {/* Scroll Progress */}
        <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-yellow-400 transform origin-left z-50 mix-blend-difference" style={{ scaleX }} />

        {/* Subtle Matte Background Pattern */}
        <div 
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] mix-blend-screen" 
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />

        {/* ════════════════ NAV ════════════════ */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-[#070707]/90 backdrop-blur-xl border-b border-zinc-900 py-4" : "bg-transparent py-8"}`}
        >
          <div className="max-w-[90rem] mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="size-10 bg-yellow-400 flex items-center justify-center rounded-sm rotate-3 group-hover:-rotate-3 transition-transform duration-500">
                <Command className="size-5 text-black" />
              </div>
              <span className="text-2xl font-bebas tracking-widest text-white mt-1">PAIR-CODE</span>
            </div>
            <div className="hidden md:flex items-center gap-12 font-mono-space text-xs font-bold text-zinc-400 uppercase tracking-widest">
              {["Platform", "Process", "Community"].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-yellow-400 transition-colors relative group">
                  {link}
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
            <SignInButton mode="modal">
              <Button className="bg-white text-black hover:bg-yellow-400 rounded-none px-8 h-12 font-mono-space text-xs font-bold uppercase tracking-widest border border-white hover:border-yellow-400 transition-all">
                Log In <ArrowRight className="ml-3 size-4" />
              </Button>
            </SignInButton>
          </div>
        </motion.nav>

        <main className="relative z-10">
          {/* ════════════════ HERO ════════════════ */}
          <section className="relative w-full min-h-[100vh] flex flex-col justify-center overflow-hidden border-b border-zinc-900 pt-20">
            {/* Background Marquee Ticker */}
            <div className="absolute top-[35%] left-0 w-[200%] -rotate-6 opacity-[0.03] pointer-events-none z-0">
              <div className="flex whitespace-nowrap marquee-content">
                <span className="text-[15rem] leading-none font-bebas text-white mx-10">PAIR-CODE // PAIR-CODE //</span>
                <span className="text-[15rem] leading-none font-bebas text-white mx-10">PAIR-CODE // PAIR-CODE //</span>
              </div>
            </div>
            
            <div className="max-w-[90rem] mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-12 relative z-10 py-20">
                
                {/* ─ Left: Editorial Typography ─ */}
                <div className="flex-1 flex flex-col w-full relative">
                  {/* Rotating Badge */}
                  <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }} className="absolute -top-12 -left-12 z-0 opacity-40 hidden md:block">
                      <svg viewBox="0 0 200 200" className="w-[300px] h-[300px] animate-spin-slow">
                        <path id="curve" fill="transparent" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                        <text className="font-mono-space text-[12px] font-bold fill-yellow-400 tracking-[0.25em]"><textPath href="#curve">THE NEXT GENERATION TECHNICAL INTERVIEW PLATFORM • </textPath></text>
                      </svg>
                  </motion.div>

                  <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative z-10 flex flex-col">
                      <motion.div variants={fadeUpVariants} className="flex items-center gap-4 mb-4">
                        <Zap className="size-5 text-yellow-400" />
                        <span className="font-mono-space text-xs font-bold tracking-[0.3em] text-zinc-400 uppercase">Elite Engineering</span>
                      </motion.div>

                      <motion.div variants={fadeUpVariants} className="flex flex-col mb-8">
                        {/* Word 1 + Snippet */}
                        <div className="flex items-end gap-6 h-[8rem] sm:h-[11rem] lg:h-[14rem]">
                          <h1 className="font-bebas text-[9rem] sm:text-[13rem] lg:text-[16rem] leading-[0.8] text-white">CODE</h1>
                          <span className="font-playfair italic font-medium text-6xl sm:text-8xl lg:text-9xl text-yellow-400 mb-6 sm:mb-10 lg:mb-14">Live.</span>
                        </div>
                        
                        {/* Word 2 + 3 */}
                        <div className="flex items-end gap-6 lg:ml-20 h-[7rem] sm:h-[10rem] lg:h-[12rem]">
                          <span className="font-playfair italic font-medium text-5xl sm:text-7xl lg:text-8xl text-white mb-6 sm:mb-8 lg:mb-10">Hire</span>
                          <h1 className="font-bebas text-[8rem] sm:text-[11rem] lg:text-[14rem] leading-[0.8] text-stroke-yellow">SMART.</h1>
                        </div>
                      </motion.div>

                      <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mt-4 lg:mt-8 pl-1">
                        <div className="hidden sm:block h-[2px] w-16 bg-yellow-400" />
                        <p className="font-mono-space text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md">
                          Stop whiteboarding. Evaluate true capabilities in a real-world coding environment designed for unparalleled precision.
                        </p>
                      </motion.div>

                      <motion.div variants={fadeUpVariants} className="mt-16 flex flex-wrap items-center gap-8">
                        <SignInButton mode="modal">
                            <Button size="lg" className="h-16 px-12 bg-yellow-400 text-black hover:bg-white rounded-none font-mono-space text-sm font-bold border-2 border-transparent transition-colors uppercase relative group">
                              Start Action
                              <ArrowRight className="ml-4 size-5 transform group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </SignInButton>
                        <div className="hidden sm:flex items-center gap-4">
                            <div className="flex -space-x-4">
                              {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-12 h-12 rounded-full border-2 border-[#070707] grayscale contrast-125" alt="user" />)}
                              <div className="w-12 h-12 rounded-full border-2 border-[#070707] bg-[#1a1a1a] flex items-center justify-center font-mono-space text-xs font-bold text-yellow-400">+12k</div>
                            </div>
                            <span className="font-mono-space text-xs text-zinc-500 uppercase font-bold tracking-widest">Peers</span>
                        </div>
                      </motion.div>
                  </motion.div>
                </div>

                {/* ─ Right: Deconstructed Abstract Editor ─ */}
                <div className="flex-1 w-full relative h-[500px] lg:h-[700px] hidden md:block" style={{ perspective: "1200px" }}>
                    <motion.div 
                      initial={{ rotateY: -15, rotateX: 10, opacity: 0, x: 100 }}
                      animate={{ rotateY: -5, rotateX: 5, opacity: 1, x: 0 }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                      className="absolute top-10 lg:top-24 right-0 lg:-right-10 w-[500px] lg:w-[550px] bg-[#0c0c0c] border border-zinc-900 p-6 shadow-2xl z-10"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Editor Chrome */}
                      <div className="flex items-center justify-between mb-8 border-b border-zinc-900 pb-4">
                          <div className="flex gap-2">
                            <div className="size-3 bg-zinc-800 rounded-none" />
                            <div className="size-3 bg-zinc-700 rounded-none" />
                            <div className="size-3 bg-yellow-400 rounded-none animate-pulse" />
                          </div>
                          <span className="font-mono-space text-[10px] text-zinc-500 tracking-widest uppercase">system_boot //</span>
                      </div>
                      
                      {/* Code Snippet */}
                      <div className="font-mono-space text-sm text-zinc-400 leading-loose space-y-1">
                          <div><span className="text-yellow-400">import</span> {'{'} <span className="text-white font-bold">evaluateCandidate</span> {'}'} <span className="text-yellow-400">from</span> <span className="text-zinc-500">'@pair/core'</span>;</div>
                          <br/>
                          <div><span className="text-yellow-400">const</span> session = <span className="text-yellow-400">await</span> evaluateCandidate({'{'}</div>
                          <div className="pl-6 group hover:translate-x-2 transition-transform cursor-crosshair">id: <span className="text-zinc-500">'cand_8891'</span>,</div>
                          <div className="pl-6 group hover:translate-x-2 transition-transform cursor-crosshair">mode: <span className="text-zinc-500">'real-time'</span>,</div>
                          <div className="pl-6 leading-loose">strictMode: <span className="text-yellow-400">true</span></div>
                          <div>{'}'});</div>
                          <br/>
                          <div className="border-l-[3px] border-yellow-400 pl-6 py-3 mt-4 bg-yellow-400/5">
                            <span className="text-white">console.log(</span>session.status<span className="text-white">);</span>
                            <br/>
                            <span className="text-white font-bold mt-2 block">{'>'} "VERIFIED_HIRE"</span>
                            <div className="w-3 h-4 bg-yellow-400 mt-2 animate-pulse" />
                          </div>
                      </div>

                      {/* Floating Video Overlay */}
                      <motion.div 
                        animate={{ y: [-15, 15, -15] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -left-20 -bottom-20 w-[300px] bg-[#070707] border border-zinc-900 p-3 shadow-2xl z-20"
                        style={{ transform: "translateZ(50px)" }}
                      >
                          <div className="relative aspect-video bg-zinc-900 border border-zinc-800 group">
                            <div className="absolute inset-0 bg-cover bg-center grayscale contrast-125 hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2688&auto=format&fit=crop')" }}></div>
                            <div className="absolute top-3 left-3 bg-yellow-400 text-black font-mono-space text-[9px] font-bold px-2 py-1 leading-none uppercase tracking-widest">
                                REC // LIVE
                            </div>
                            <div className="absolute bottom-3 right-3 flex gap-1">
                                <div className="size-6 border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center">
                                  <div className="size-2 bg-yellow-400 animate-pulse" />
                                </div>
                            </div>
                          </div>
                      </motion.div>

                      {/* Floating Data Badge Overlay */}
                      <motion.div 
                        animate={{ y: [10, -10, 10] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -top-10 -right-10 bg-yellow-400 p-4 border-2 border-[#070707] z-0 hidden lg:block shadow-2xl"
                        style={{ transform: "translateZ(-30px)" }}
                      >
                          <div className="font-bebas text-4xl text-black leading-none uppercase">99.9%</div>
                          <div className="font-mono-space text-[10px] text-black font-bold uppercase tracking-widest mt-1">Uptime SLA</div>
                      </motion.div>
                    </motion.div>
                </div>
            </div>
          </section>

          {/* ════════════════ STATS SOLID ════════════════ */}
          <section className="border-b border-zinc-900 bg-[#070707] relative z-10 overflow-hidden">
            {/* Massive typography behind stats */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
               <span className="font-bebas text-[20rem] text-white">METRICS</span>
            </div>
            <div className="max-w-[90rem] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y md:divide-y-0 divide-zinc-900 relative z-10">
                {stats.map((stat, i) => (
                  <div key={i} className="py-16 lg:py-20 text-center group cursor-default bg-[#070707] hover:bg-[#0c0c0c] transition-colors">
                    <h3 className="font-bebas text-6xl md:text-8xl text-zinc-100 group-hover:text-yellow-400 transition-colors">
                      {stat.value}
                    </h3>
                    <p className="font-mono-space text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] mt-2 group-hover:text-zinc-300">
                      {stat.label}
                    </p>
                  </div>
                ))}
            </div>
          </section>

          {/* ════════════════ FEATURES ════════════════ */}
          <section id="platform" className="py-32 bg-[#0c0c0c] border-b border-zinc-900">
            <div className="max-w-[90rem] mx-auto px-6">
              <div className="mb-24 lg:flex items-end justify-between border-b border-zinc-900 pb-10">
                <div>
                  <h2 className="font-playfair italic text-5xl md:text-7xl lg:text-8xl text-white mb-2">Architectural</h2>
                  <h2 className="font-bebas text-7xl md:text-9xl tracking-tight text-white leading-none">RAW <span className="text-yellow-400">POWER.</span></h2>
                </div>
                <div className="hidden lg:block pb-2 text-right">
                  <p className="font-mono-space text-sm text-zinc-400 max-w-sm leading-relaxed">
                    EVERYTHING YOU NEED TO ORCHESTRATE THE PERFECT TECHNICAL INTERVIEW WITHOUT BREAKING A SWEAT.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featureCards.map((feat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    <div className="group bg-[#070707] border border-zinc-900 p-10 h-full hover:border-yellow-400 transition-all cursor-default relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-bl-full" />
                      
                      <div className="size-14 bg-zinc-900 border border-zinc-800 group-hover:bg-yellow-400 group-hover:border-yellow-400 flex items-center justify-center mb-10 transition-colors duration-300">
                        <feat.icon className="size-6 text-zinc-400 group-hover:text-black transition-colors duration-300" />
                      </div>
                      
                      <h3 className="font-bebas text-4xl tracking-wide text-white mb-4 group-hover:text-yellow-400 transition-colors">
                        {feat.title}
                      </h3>
                      
                      <p className="font-mono-space text-xs tracking-wide text-zinc-500 leading-loose">
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════ HOW IT WORKS ════════════════ */}
          <section id="process" className="py-32 bg-[#070707] border-b border-zinc-900 relative">
            <div className="max-w-[90rem] mx-auto px-6">
              <div className="text-center mb-32">
                <span className="font-mono-space text-xs font-bold tracking-[0.3em] text-yellow-400 uppercase block mb-6">Workflow</span>
                <h2 className="font-bebas text-7xl md:text-9xl tracking-tight text-white">THE <span className="text-playfair italic font-medium text-yellow-400 lowercase text-[5rem] md:text-[7rem]">perfect</span> PROCESS</h2>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-16 lg:gap-8 max-w-[80rem] mx-auto relative">
                <div className="hidden lg:block absolute top-[4.5rem] left-[15%] right-[15%] h-[1px] bg-zinc-800 z-0" />
                {steps.map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.6 }}
                    className="relative z-10 flex flex-col items-center text-center"
                  >
                    <div className="bg-[#070707] px-6">
                      <div className="font-bebas text-8xl md:text-9xl text-zinc-900 group-hover:text-zinc-800 transition-colors mb-4">{step.step}</div>
                    </div>
                    <div className="h-2 w-16 bg-yellow-400 mb-8" />
                    <h3 className="font-bebas text-4xl tracking-wide text-white mb-4">{step.title}</h3>
                    <p className="font-mono-space text-xs tracking-wide text-zinc-500 leading-loose max-w-xs">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════ REVIEWS ════════════════ */}
          <section id="community" className="py-32 bg-[#0c0c0c]">
            <div className="max-w-[90rem] mx-auto px-6">
              <div className="mb-20">
                <h2 className="font-playfair italic text-6xl md:text-8xl text-white mb-4">What they say</h2>
                <div className="h-[2px] w-32 bg-yellow-400" />
              </div>
              <div className="grid lg:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    className="border border-zinc-900 bg-[#070707] p-10 flex flex-col justify-between hover:border-zinc-700 transition-colors"
                  >
                    <div className="mb-12">
                      <Target className="size-8 text-yellow-400 mb-8" />
                      <p className="font-playfair text-2xl md:text-3xl text-zinc-300 leading-relaxed italic">"{t.quote}"</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bebas text-xl text-yellow-400">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="font-mono-space text-sm font-bold text-white uppercase tracking-widest">{t.author}</div>
                        <div className="font-mono-space text-[10px] text-zinc-500 uppercase tracking-widest mt-1">{t.role}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════ CTA ════════════════ */}
          <section className="pt-40 pb-32 border-t border-zinc-900 bg-yellow-400 relative overflow-hidden">
            {/* Massive background text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.08]">
               <span className="font-bebas text-[30rem] text-black whitespace-nowrap">START NOW</span>
            </div>
            
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
              <h2 className="font-bebas text-8xl md:text-[10rem] leading-[0.85] tracking-tight text-black mb-10">
                READY TO <br/><span className="text-white font-playfair italic font-medium tracking-normal text-7xl md:text-[9rem]">Execute?</span>
              </h2>
              <p className="font-mono-space text-sm md:text-base font-bold mb-16 max-w-xl mx-auto text-zinc-900 leading-loose">
                Skip the whiteboard. Evaluate true engineering skills in a real-world environment.
              </p>
              <SignInButton mode="modal">
                <Button size="lg" className="h-[4.5rem] px-16 text-xs bg-black text-white hover:bg-white hover:text-black rounded-none uppercase font-mono-space font-bold tracking-[0.2em] border-2 border-black hover:scale-105 transition-all">
                  Launch Platform
                </Button>
              </SignInButton>
            </div>
          </section>
        </main>

        {/* ════════════════ FOOTER ════════════════ */}
        <footer className="border-t border-zinc-900 py-16 bg-[#070707]">
          <div className="max-w-[90rem] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-zinc-500">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-zinc-900 flex items-center justify-center border border-zinc-800">
                <Command className="size-4 text-zinc-400" />
              </div>
              <span className="font-bebas tracking-widest text-white text-xl mt-1">PAIR-CODE</span>
            </div>
            <div className="flex gap-10 font-mono-space text-[10px] font-bold uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-yellow-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">GitHub</a>
            </div>
            <div className="font-mono-space text-[10px] font-bold uppercase tracking-[0.2em]">
              © 2026 PAIR-CODE
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}