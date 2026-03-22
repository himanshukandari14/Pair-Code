import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface StatsCardsProps {
  activeSessionsCount: number;
  recentSessionsCount: number;
}

function StatsCards({ activeSessionsCount, recentSessionsCount }: StatsCardsProps) {
  return (
    <div className="lg:col-span-1 flex flex-col gap-6">
      <Card className="bg-[#0c0c0c] border border-zinc-900 rounded-none shadow-none group hover:border-yellow-400 transition-colors">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2 pt-8 px-8">
          <span className="font-mono-space text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase group-hover:text-yellow-400 transition-colors">Active sessions</span>
          <div className="size-2 bg-yellow-400 animate-pulse" />
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="font-bebas text-7xl text-white tracking-tight mt-2">{activeSessionsCount}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#0c0c0c] border border-zinc-900 rounded-none shadow-none group hover:border-zinc-700 transition-colors">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2 pt-8 px-8">
          <span className="font-mono-space text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase group-hover:text-white transition-colors">Total sessions</span>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="font-bebas text-7xl text-zinc-400 tracking-tight mt-2">{recentSessionsCount}</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StatsCards;