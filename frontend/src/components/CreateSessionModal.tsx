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
      <DialogContent className="sm:max-w-md bg-[#0a0a0a] border border-zinc-900 rounded-none shadow-2xl p-0 overflow-hidden">
        <div className="p-8 border-b border-zinc-900">
           <DialogHeader>
             <DialogTitle className="font-bebas text-4xl sm:text-5xl text-white tracking-widest">NEW SESSION</DialogTitle>
           </DialogHeader>

           <p className="font-mono-space text-xs text-zinc-400 uppercase tracking-widest leading-loose mt-4">
             Initialize a fresh coding environment with live editor, WebRTC video, and integrated chat.
           </p>
        </div>

        <DialogFooter className="p-8 bg-[#050505] flex gap-4 sm:gap-4 flex-col sm:flex-row">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-none border-2 w-full sm:w-auto border-zinc-800 bg-transparent text-white hover:bg-zinc-900 hover:text-white font-mono-space text-xs font-bold uppercase tracking-[0.2em] h-12 px-8 transition-colors">ABORT</Button>
          </DialogClose>
          <Button variant="default" onClick={onCreateRoom} disabled={isCreating} className="rounded-none w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-500 font-mono-space text-xs font-bold uppercase tracking-[0.2em] border-2 border-transparent h-12 px-8 transition-colors">
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
