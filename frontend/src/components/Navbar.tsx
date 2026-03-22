import { Link, useLocation } from "react-router";
import { Command } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

function Navbar() {
  const location = useLocation();
  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <nav className="bg-[#070707]/90 backdrop-blur-xl border-b border-zinc-900 sticky top-0 z-50">
      <div className="max-w-[90rem] mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="size-8 bg-yellow-400 flex items-center justify-center rounded-sm rotate-3 group-hover:-rotate-3 transition-transform duration-500 border border-black">
            <Command className="size-4 text-black" />
          </div>
          <span className="font-bebas tracking-widest text-white text-2xl mt-1">PAIR-CODE</span>
        </Link>

        <div className="flex items-center gap-6">
          <Button
            variant={isActive("/dashboard") ? "secondary" : "ghost"}
            size="sm"
            className={`rounded-none px-6 h-10 font-mono-space text-xs font-bold uppercase tracking-widest ${isActive("/dashboard") ? "bg-yellow-400 text-black border-2 border-transparent hover:bg-yellow-500" : "text-zinc-400 hover:text-white hover:bg-zinc-900 border-2 border-transparent"}`}
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