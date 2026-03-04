import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type WelcomeSectionProps = {
  onCreateSession: () => void;
};

function WelcomeSection({ onCreateSession }: WelcomeSectionProps) {
  return (
    <section className="bg-black py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-zinc-100 tracking-tight">Dashboard</h1>
            <p className="text-zinc-500 text-sm mt-1">Manage your active and past rooms</p>
          </div>
          <Button variant="default" className="rounded-full px-6 flex items-center gap-2 h-11" onClick={onCreateSession}>
            <PlusIcon className="size-4" />
            New room
          </Button>
        </div>
      </div>
    </section>
  );
}

export default WelcomeSection;
