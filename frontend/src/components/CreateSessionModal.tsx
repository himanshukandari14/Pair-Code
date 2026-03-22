import { LoaderIcon, PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRoom: () => void;
  isCreating: boolean;
}

function CreateSessionModal({
  isOpen,
  onClose,
  onCreateRoom,
  isCreating,
}: CreateSessionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md glass-panel border border-white/10 rounded-none shadow-[0_0_50px_rgba(250,204,21,0.1)] p-0 overflow-hidden">
        <div className="p-8 border-b border-white/5 bg-[#020202]">
           <DialogHeader>
             <DialogTitle className="font-bebas text-4xl sm:text-5xl text-white tracking-widest">NEW SESSION</DialogTitle>
           </DialogHeader>

           <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest leading-loose mt-4">
             Initialize a fresh coding environment with live editor, WebRTC video, and integrated chat.
           </p>
        </div>

        <DialogFooter className="p-8 bg-[#020202] flex gap-4 sm:gap-4 flex-col sm:flex-row relative">
          <div className="absolute inset-0 bg-yellow-400/5 pointer-events-none" />
          <DialogClose asChild>
            <Button variant="outline" className="rounded-none border border-white/10 bg-transparent text-white hover:bg-white/5 hover:text-white font-mono text-xs font-bold uppercase tracking-[0.2em] h-12 px-8 transition-colors relative z-10 w-full sm:w-auto">ABORT</Button>
          </DialogClose>
          <Button variant="default" onClick={onCreateRoom} disabled={isCreating} className="rounded-none w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-500 font-mono text-xs font-bold uppercase tracking-[0.2em] border-2 border-transparent h-12 px-8 shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-colors relative z-10">
            {isCreating ? (
              <LoaderIcon className="size-4 animate-spin mr-3" />
            ) : <PlusIcon className="size-4 mr-3" />}
            {isCreating ? "INITIALIZING..." : "EXECUTE"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default CreateSessionModal;
