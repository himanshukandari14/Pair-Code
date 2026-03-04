import { Loader, CalendarIcon } from "lucide-react";
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
    <div className="mt-10">
      <h2 className="text-lg font-semibold text-zinc-100 tracking-tight mb-4">Past rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center py-12 gap-2 text-zinc-500">
            <Loader className="w-4 h-4 animate-spin" />
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session: Session) => (
            <Link key={session._id} to={`/session/${session._id}`}>
              <Card className="p-5 bg-[#121214] border-white/5 hover:border-white/10 hover:bg-white/[0.02] rounded-[24px] shadow-none transition-all cursor-pointer group">
                <CardContent className="p-0 flex flex-col gap-3">
                  <div className="size-10 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                    <CalendarIcon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[15px] text-zinc-100 group-hover:text-white transition-colors">{session.host?.name || "Anonymous"}'s Room</h3>
                    <p className="text-[13px] text-zinc-500 mt-1 flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-zinc-700"></span>
                      {formatDistanceToNow(new Date(session.createdAt ?? Date.now()), { addSuffix: true })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-12 border border-zinc-800 border-dashed rounded-lg bg-black text-center">
            <p className="text-sm text-zinc-500">No past rooms.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentSessions;