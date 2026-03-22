import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type WelcomeSectionProps = {
  onCreateSession: () => void;
};

function WelcomeSection({ onCreateSession }: WelcomeSectionProps) {
  return (
    <section className="bg-transparent py-16 border-b border-white/5 relative z-10">
      <div className="max-w-[90rem] mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <h1 className="font-bodoni italic text-3xl sm:text-5xl lg:text-6xl text-zinc-500 mb-2">Welcome Back.</h1>
            <h2 className="font-bebas text-6xl sm:text-8xl tracking-tight text-white leading-none">COMMAND <span className="text-yellow-400 glow-yellow">CENTER</span></h2>
          </div>
          <Button onClick={onCreateSession} className="rounded-none bg-yellow-400 text-black hover:bg-white hover:text-black font-mono text-sm font-bold tracking-[0.2em] uppercase border-2 border-transparent px-8 h-14 transition-colors group shadow-[0_0_15px_rgba(250,204,21,0.2)] hover:shadow-[0_0_20px_rgba(250,204,21,0.4)]">
            <PlusIcon className="mr-3 size-5" />
            New Session
          </Button>
        </div>
      </div>
    </section>
  );
}

export default WelcomeSection;
