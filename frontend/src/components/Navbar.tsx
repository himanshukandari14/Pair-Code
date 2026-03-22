import { Link, useLocation } from "react-router";
import { Command } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

function Navbar() {
  const location = useLocation();
  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <nav className="glass-panel border-b border-white/5 sticky top-0 z-50 bg-[#0A0A0A]/40">
      <div className="max-w-[90rem] mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="size-8 bg-yellow-400 flex items-center justify-center rotate-3 group-hover:-rotate-3 transition-transform duration-500 border border-black shadow-[0_0_10px_rgba(250,204,21,0.2)]">
            <Command className="size-4 text-black" />
          </div>
          <span className="font-bebas tracking-widest text-white text-2xl mt-1">TALENT_HUNT</span>
        </Link>

        <div className="flex items-center gap-6">
          <Button
            variant={isActive("/dashboard") ? "secondary" : "ghost"}
            size="sm"
            className={`rounded-none px-6 h-10 font-mono text-xs font-bold uppercase tracking-widest ${isActive("/dashboard") ? "bg-yellow-400 text-black border-2 border-transparent hover:bg-yellow-500 shadow-[0_0_15px_rgba(250,204,21,0.3)]" : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"}`}
            asChild
          >
            <Link to="/dashboard" className="flex items-center gap-2">
              <span className="hidden sm:inline">DASHBOARD</span>
            </Link>
          </Button>
          <div className="ml-2 scale-110">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;