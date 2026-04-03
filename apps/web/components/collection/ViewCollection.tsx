import { Collection } from "@workspace/types";
import { Badge } from "@workspace/ui/components/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { UpdateCollection } from "./UpdateCollection";
import { Button } from "@workspace/ui/components/button";
import { CollectionImageCard } from "./CollectionImageCard";
import { useDeleteCollection } from "@/hooks";
import { Loader2, Share2, Trash2 } from "lucide-react";
import { useUserStore } from "@/store";
import { TooltipButton } from "../common";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { toast } from "sonner";

export function ViewCollection({
  open,
  setOpen,
}: {
  open: boolean | Collection;
  setOpen: (open: boolean) => void;
}) {
  const { mutateAsync: deleteCollection, isPending } = useDeleteCollection();
  const loggedInUserId = useUserStore((state) => state.id);
  if (typeof open === "boolean") return null;

  const removeCollection = async () => {
    try {
      await deleteCollection(open.id);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/collections/${open.id}`,
      );
      toast.success("Link copied to clipboard.");
    } catch (error) {
      toast.error("Failed to copy link.");
    }
  };

  const isOwner = open.creator_id === loggedInUserId;

  return (
    <Dialog open={true} onOpenChange={setOpen}>
      <DialogContent className="min-w-[95vw] max-h-[90vh] overflow-y-auto pr-0">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>{open.title}</DialogTitle>
            {open.visibility === "PRIVATE" ? (
              <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                Private
              </Badge>
            ) : (
              <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                Public
              </Badge>
            )}
            <TooltipButton
              value={<Share2 />}
              size="icon"
              onClick={handleShare}
              content="Share Collection"
            />
            {isOwner && (
              <Tooltip>
                <TooltipTrigger>
                  <div>
                    <UpdateCollection open={open} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Update Collection</p>
                </TooltipContent>
              </Tooltip>
            )}
            {isOwner && (
              <TooltipButton
                value={
                  isPending ? <Loader2 className="animate-spin" /> : <Trash2 />
                }
                size="icon"
                variant="destructive"
                onClick={removeCollection}
                disabled={isPending}
                content="Delete Collection"
              />
            )}
          </div>
          <DialogDescription>{open.description}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          {open.items.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {open.items.map((item) => (
                  <CollectionImageCard
                    key={item.pic_id}
                    item={item}
                    isOwner={isOwner}
                  />
                ))}
              </div>
              <div className="w-full my-4 flex justify-center">
                <Button>Load more</Button>
              </div>
            </>
          )}
          {open.items.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No items in this collection yet.
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
