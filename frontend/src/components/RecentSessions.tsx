import { LoaderIcon, CalendarIcon } from "lucide-react";
import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";
import type { Session } from "../types";
import { Card, CardContent } from "@/components/ui/card";

interface RecentSessionsProps {
  sessions: Session[];
  isLoading: boolean;
}

function RecentSessions({ sessions, isLoading }: RecentSessionsProps) {
  return (
    <div className="mt-16">
      <div className="flex items-center gap-6 mb-8">
         <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-widest">HISTORY</h2>
         <div className="h-[1px] flex-1 bg-zinc-900" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center py-20 gap-3 text-yellow-400">
            <LoaderIcon className="size-5 animate-spin" />
            <span className="font-mono-space text-[10px] font-bold uppercase tracking-widest">Loading records...</span>
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session: Session) => (
            <Link key={session._id} to={`/session/${session._id}`}>
              <Card className="p-8 bg-[#0c0c0c] border border-zinc-900 hover:border-yellow-400 rounded-none shadow-none transition-all cursor-pointer group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-400 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 rounded-bl-full" />
                
                <CardContent className="p-0 flex flex-col gap-6">
                  <div className="size-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:border-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                    <CalendarIcon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-mono-space text-sm font-bold text-zinc-100 group-hover:text-white transition-colors uppercase tracking-[0.2em]">{session.host?.name || "Anonymous"}'s Room</h3>
                    <p className="font-mono-space text-[10px] text-zinc-500 uppercase tracking-widest mt-3 flex items-center gap-2">
                      <span className="size-2 bg-zinc-800"></span>
                      {formatDistanceToNow(new Date(session.createdAt ?? Date.now()), { addSuffix: true })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 border border-zinc-900 border-dashed bg-[#0a0a0a] text-center">
            <p className="font-mono-space text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">No history recorded.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentSessions;