import { LoaderIcon } from "lucide-react";
import { Link } from "react-router";
import type { Session } from "../types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ActiveSessionsProps {
  sessions: Session[];
  isLoading: boolean;
  isUserInSession: (session: Session) => boolean;
}

function ActiveSessions({ sessions, isLoading, isUserInSession }: ActiveSessionsProps) {
  return (
    <Card className="h-full bg-[#0c0c0c] border border-zinc-900 rounded-none shadow-none flex flex-col">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-6 pt-8 px-8 border-b border-zinc-900 flex-shrink-0">
        <h2 className="font-mono-space text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase">Live Rooms // {sessions.length}</h2>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-yellow-400 h-full">
              <LoaderIcon className="size-5 animate-spin" />
              <span className="font-mono-space text-[10px] font-bold uppercase tracking-widest">Loading...</span>
            </div>
          ) : sessions.length > 0 ? (
            <div className="flex flex-col">
              {sessions.map((session: Session) => (
                <div
                  key={session._id}
                  className="flex items-center justify-between gap-6 px-8 py-6 hover:bg-[#111] border-b border-zinc-900 transition-colors group"
                >
                  <div className="flex items-center gap-6 flex-1 min-w-0">
                    <div className="size-14 bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bebas text-2xl text-yellow-400 flex-shrink-0 group-hover:border-yellow-400 transition-colors">
                      {(session.host?.name?.[0] || 'R').toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-mono-space text-sm font-bold text-white truncate uppercase tracking-widest">{session.host?.name || "Anonymous"}'s Room</h3>
                        {session.participant && !isUserInSession(session) ? (
                          <span className="bg-red-500 text-black text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest rounded-none">Full</span>
                        ) : (
                          <span className="bg-yellow-400 text-black text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest rounded-none">Live</span>
                        )}
                        {isUserInSession(session) && (
                          <span className="bg-white text-black text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest rounded-none">You</span>
                        )}
                      </div>
                      <p className="font-mono-space text-[11px] text-zinc-500 truncate mt-2 tracking-[0.2em] uppercase">
                        {session.participant ? "2/2 participants" : "1/2 participants"}
                      </p>
                    </div>
                  </div>
                  {session.participant && !isUserInSession(session) ? (
                    <Button variant="ghost" size="sm" className="hidden shrink-0 cursor-default opacity-50 font-mono-space uppercase text-xs tracking-widest rounded-none border-2 border-transparent" disabled>
                      Full
                    </Button>
                  ) : (
                    <Button variant="secondary" size="sm" asChild className="shrink-0 rounded-none bg-yellow-400 hover:bg-white text-black h-10 px-8 font-mono-space text-[10px] font-bold uppercase tracking-[0.2em] border-2 border-transparent transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4">
                      <Link to={`/session/${session._id}`}>
                        {isUserInSession(session) ? "Rejoin" : "Join"}
                      </Link>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-mono-space text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">No active rooms discovered</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
export default ActiveSessions;