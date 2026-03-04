import { Link, useLocation } from "react-router";
import { LayoutDashboardIcon } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

function Navbar() {
  const location = useLocation();
  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <nav className="bg-black/60 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-zinc-100 hover:text-white transition-colors">
          <img src="/logo.svg" alt="pair-code logo" className="w-7 h-7" />
          <span className="font-semibold text-sm tracking-tight">pair-code</span>
        </Link>

        <div className="flex items-center gap-1">
          <Button
            variant={isActive("/dashboard") ? "secondary" : "ghost"}
            size="sm"
            className={`rounded-full px-4 ${isActive("/dashboard") ? "bg-white/10 hover:bg-white/20 text-white border-0" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
            asChild
          >
            <Link to="/dashboard" className="flex items-center gap-2">
              <LayoutDashboardIcon className="size-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </Button>
          <div className="ml-2">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;