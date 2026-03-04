import { LoaderIcon } from "lucide-react";
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New room</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-zinc-400">
          Create a new room with a shared code editor, output, video call, and chat. Invite someone with the link.
        </p>

        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button variant="secondary" onClick={onCreateRoom} disabled={isCreating}>
            {isCreating ? (
              <LoaderIcon className="size-4 animate-spin" />
            ) : null}
            {isCreating ? "Creating…" : "Create room"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default CreateSessionModal;
