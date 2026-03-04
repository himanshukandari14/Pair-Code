import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface StatsCardsProps {
  activeSessionsCount: number;
  recentSessionsCount: number;
}

function StatsCards({ activeSessionsCount, recentSessionsCount }: StatsCardsProps) {
  return (
    <div className="lg:col-span-1 flex flex-col gap-4">
      <Card className="bg-[#121214] border-white/5 rounded-[24px] shadow-none">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2 pt-6 px-6">
          <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Active sessions</span>
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="text-4xl font-normal text-zinc-100 tracking-tight tabular-nums mt-1">{activeSessionsCount}</div>
        </CardContent>
      </Card>
      <Card className="bg-[#121214] border-white/5 rounded-[24px] shadow-none">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2 pt-6 px-6">
          <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Total sessions</span>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="text-4xl font-normal text-zinc-100 tracking-tight tabular-nums mt-1">{recentSessionsCount}</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StatsCards;