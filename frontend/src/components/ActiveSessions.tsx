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
    <Card className="lg:col-span-2 h-full bg-[#121214] border-white/5 rounded-[24px] shadow-none flex flex-col">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4 pt-6 px-6 border-b border-white/5 flex-shrink-0">
        <h2 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Live rooms ({sessions.length})</h2>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12 gap-2 text-zinc-500 h-full">
              <LoaderIcon className="size-4 animate-spin" />
            </div>
          ) : sessions.length > 0 ? (
            <div className="flex flex-col py-2">
              {sessions.map((session: Session) => (
                <div
                  key={session._id}
                  className="flex items-center justify-between gap-4 px-6 py-3 hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium shadow-inner flex-shrink-0">
                      {(session.host?.name?.[0] || 'R').toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-[15px] text-zinc-100 truncate">{session.host?.name || "Anonymous"}'s Room</h3>
                        {session.participant && !isUserInSession(session) ? (
                          <span className="bg-red-500/10 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Full</span>
                        ) : (
                          <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Live</span>
                        )}
                        {isUserInSession(session) && (
                          <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">You</span>
                        )}
                      </div>
                      <p className="text-[13px] text-zinc-500 truncate mt-0.5">
                        {session.participant ? "2/2 participants" : "1/2 participants"}
                      </p>
                    </div>
                  </div>
                  {session.participant && !isUserInSession(session) ? (
                    <Button variant="ghost" size="sm" className="hidden shrink-0 cursor-default opacity-50" disabled>
                      Full
                    </Button>
                  ) : (
                    <Button variant="secondary" size="sm" asChild className="shrink-0 rounded-full bg-white/10 hover:bg-white/20 text-white h-8 px-4 text-xs font-medium border-0 transition-all opacity-0 group-hover:opacity-100">
                      <Link to={`/session/${session._id}`}>
                        {isUserInSession(session) ? "Rejoin" : "Join"}
                      </Link>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-zinc-500">No active rooms.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
export default ActiveSessions;