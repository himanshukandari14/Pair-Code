import { SignInButton } from "@clerk/clerk-react";
import {
  ArrowRightIcon,
  VideoIcon,
  CodeXmlIcon,
  UsersIcon,
  PhoneCallIcon,
  MicOffIcon,
  CheckIcon,
  ZapIcon,
  StarIcon,
  ShieldCheckIcon,
  TimerIcon,
  TrendingUpIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

/* ─── Mock data ─── */
const featureCards = [
  {
    icon: VideoIcon,
    title: "HD Video Interviews",
    desc: "Crystal-clear 1080p video calls with ultra-low latency. See every expression, every reaction — just like being in the same room.",
    gradient: "from-orange-500 to-red-600",
    delay: "delay-100",
  },
  {
    icon: CodeXmlIcon,
    title: "Live Code Editor",
    desc: "Collaborative coding with real-time sync, syntax highlighting, and support for 40+ languages. No lag, no limits.",
    gradient: "from-amber-500 to-orange-600",
    delay: "delay-200",
  },
  {
    icon: UsersIcon,
    title: "Smart Pair Matching",
    desc: "AI-powered matchmaking pairs you with interviewers or peers by skill level, stack, and availability.",
    gradient: "from-red-600 to-rose-500",
    delay: "delay-300",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure & Private",
    desc: "End-to-end encrypted sessions. Your code, your conversations, your ideas — stay completely private.",
    gradient: "from-orange-600 to-amber-500",
    delay: "delay-400",
  },
  {
    icon: TimerIcon,
    title: "Timed Challenges",
    desc: "Simulate real interview pressure with built-in countdown timers, hints system, and difficulty tiers.",
    gradient: "from-rose-500 to-orange-600",
    delay: "delay-500",
  },
  {
    icon: TrendingUpIcon,
    title: "Progress Analytics",
    desc: "Detailed post-session analytics, AI feedback on your solutions, and a personal growth dashboard.",
    gradient: "from-amber-600 to-red-500",
    delay: "delay-600",
  },
];

const stats = [
  { value: "12K+", label: "Active Users", icon: UsersIcon },
  { value: "60K+", label: "Sessions Run", icon: VideoIcon },
  { value: "4.9★", label: "User Rating", icon: StarIcon },
  { value: "99.9%", label: "Uptime", icon: ZapIcon },
];

const testimonials = [
  {
    quote: "peer-code made our technical interviews 3× faster. The real-time code sync is flawless.",
    author: "Sarah K.",
    role: "Engineering Lead @ Stripe",
    avatar: "SK",
    color: "from-orange-500 to-red-500",
  },
  {
    quote: "Finally an interview platform that doesn't feel like it's from 2010. The UX is gorgeous.",
    author: "Rajan M.",
    role: "SWE @ Google",
    avatar: "RM",
    color: "from-amber-500 to-orange-600",
  },
  {
    quote: "I landed my dream job after 3 weeks of practice sessions on peer-code. Worth every minute.",
    author: "Priya D.",
    role: "Frontend Dev @ Figma",
    avatar: "PD",
    color: "from-rose-500 to-orange-500",
  },
];

/* ─── Main Page ─── */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 overflow-x-hidden">
      {/* ── Background orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[400px] bg-zinc-800/20 blur-[100px] rounded-full" />
      </div>

      {/* ═══════════════════════════════
          NAVBAR
      ═══════════════════════════════ */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src='./logo.svg' />
            <div>
              <span className="text-base font-semibold tracking-tight text-white">peer-code</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
          </div>

          {/* CTA */}
          <SignInButton mode="modal">
            <Button size="sm" variant="default">
              Get Started <ArrowRightIcon className="size-3.5" />
            </Button>
          </SignInButton>
        </div>
      </nav>

      {/* ═══════════════════════════════
          HERO
      ═══════════════════════════════ */}
      <section className="relative max-w-7xl mx-auto px-5 pt-32 pb-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div className="space-y-8">
            <div className="animate-fade-up">
              <Badge variant="outline" className="border-zinc-800 text-zinc-300">
                <ZapIcon className="size-3 mr-1" />
                Real-Time Interviews
              </Badge>
            </div>

            <h1 className="text-5xl lg:text-7xl font-semibold leading-[1.05] tracking-tight animate-fade-up delay-100 text-white">
              Code Live.
              <br />
              <span className="text-zinc-400">Hire Smart.</span>
              <br />
              <span className="text-zinc-600">Grow Fast.</span>
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed max-w-xl animate-fade-up delay-200">
              The next-generation platform for technical interviews. HD video, real-time collaborative coding, and AI-powered feedback.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 animate-fade-up delay-300">
              {["Live Video Chat", "40+ Languages", "AI Feedback", "Timed Rounds"].map((f) => (
                <Badge key={f} variant="secondary" className="bg-zinc-900 border-zinc-800 text-zinc-300">
                  <CheckIcon className="size-3 mr-1" />
                  {f}
                </Badge>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 animate-fade-up delay-400">
              <SignInButton mode="modal">
                <Button size="lg" variant="default">
                  Start Coding Now
                  <ArrowRightIcon className="size-4" />
                </Button>
              </SignInButton>
              <Button size="lg" variant="secondary">
                Watch Demo
              </Button>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 animate-fade-up delay-500">
              {stats.map(({ value, label }) => (
                <div key={label} className="rounded-lg p-4 text-center border border-zinc-800 bg-[#0A0A0A] hover:bg-zinc-900/50 transition-colors group">
                  <div className="text-2xl font-semibold text-white tracking-tight">{value}</div>
                  <div className="text-xs text-zinc-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Mockup UI */}
          <div className="relative flex flex-col items-center gap-6 lg:items-end animate-fade-up delay-300">
            {/* Minimal mockup box */}
            <div className="w-full max-w-sm border border-zinc-800 rounded-xl bg-[#0A0A0A] shadow-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-800 via-white/20 to-zinc-800" />
              <div className="flex items-center gap-4 mb-8">
                <div className="size-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                  <VideoIcon className="size-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Live Session</div>
                  <div className="text-xs text-zinc-500">Connecting...</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-zinc-800/50 rounded w-3/4" />
                <div className="h-4 bg-zinc-800/50 rounded w-full" />
                <div className="h-4 bg-zinc-800/50 rounded w-5/6" />
              </div>
              <div className="mt-8 flex justify-center gap-3">
                <div className="size-10 rounded-full bg-zinc-800 flex items-center justify-center">
                  <MicOffIcon className="size-4 text-zinc-400" />
                </div>
                <div className="size-10 rounded-full bg-white text-black flex items-center justify-center font-medium shadow-sm">
                  <PhoneCallIcon className="size-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTIION*/}
      <section id="features" className="relative py-28 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-semibold text-white tracking-tight">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Powerful tools crafted for engineers, by engineers — designed to make every coding session feel effortless.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featureCards.map(({ icon: Icon, title, desc, delay }) => (
              <Card
                key={title}
                className={`group cursor-pointer border border-zinc-800 bg-[#0A0A0A] hover:bg-zinc-900/50 transition-colors animate-fade-up ${delay}`}
              >
                <CardContent className="p-6 space-y-4">
                  <div className={`size-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors`}>
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════ */}
      <section id="how-it-works" className="relative py-28 border-t border-zinc-800 bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-semibold text-white tracking-tight">
              From Sign-up to Interview
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px bg-zinc-800" />

            {[
              { step: "01", title: "Create Your Profile", desc: "Sign up in 30 seconds. Set your stack, level, and availability.", icon: UsersIcon },
              { step: "02", title: "Match & Schedule", desc: "Our AI finds the perfect match. One click to schedule your session.", icon: ZapIcon },
              { step: "03", title: "Code & Conquer", desc: "Jump into a video call with a live code editor. Get real feedback instantly.", icon: CodeXmlIcon },
            ].map(({ step, title, desc, icon: Icon }, i) => (
              <div key={i} className={`text-center space-y-4 animate-fade-up delay-${(i + 1) * 200}`}>
                <div className="relative inline-flex items-center justify-center bg-black rounded-full z-10 p-2">
                  <div className="size-16 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-white">
                    <Icon className="size-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">{step}. {title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════ */}
      <section id="testimonials" className="relative py-28 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-semibold text-white tracking-tight">
              What Our Users Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ quote, author, role, avatar }, i) => (
              <Card key={i} className={`animate-fade-up delay-${(i + 1) * 200} border border-zinc-800 bg-[#0A0A0A] hover:bg-zinc-900/50 transition-colors`}>
                <CardContent className="p-6 space-y-5">
                  <p className="text-zinc-300 text-sm leading-relaxed">"{quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`size-10 rounded-full bg-zinc-800 flex items-center justify-center text-white text-xs font-semibold shrink-0 border border-zinc-700`}>
                      {avatar}
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{author}</div>
                      <div className="text-zinc-500 text-xs">{role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          CTA BANNER
      ═══════════════════════════════ */}
      <section className="relative py-24 border-t border-zinc-800 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 to-black pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-5 text-center space-y-8">
          <h2 className="text-4xl lg:text-6xl font-semibold text-white tracking-tight">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-lg text-zinc-400">
            Join 12,000+ engineers already practicing on peer-code. No credit card needed.
          </p>
          <SignInButton mode="modal">
            <Button size="xl" variant="default" className="mx-auto">
              Launch Your First Session
              <ArrowRightIcon className="size-4" />
            </Button>
          </SignInButton>
        </div>
      </section>

      {/* ═══════════════════════════════
          FOOTER
      ═══════════════════════════════ */}
      <footer className="border-t border-zinc-800 py-10 bg-black">
        <div className="max-w-7xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <svg className="size-4" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#71717A" /></svg>
            <span className="font-semibold text-zinc-300">peer-code</span>
          </div>
          <span>© 2026 peer-code. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}