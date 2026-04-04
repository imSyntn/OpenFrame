"use client";

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
import { useGlobalStateStore, useUserStore } from "@/store";
import { TooltipButton, VisibilityBadge } from "../common";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { toast } from "sonner";

export function ViewCollectionModal() {
  const { mutateAsync: deleteCollection, isPending } = useDeleteCollection();
  const loggedInUserId = useUserStore((state) => state.id);

  const collection = useGlobalStateStore((state) => state.openCollectionModal);
  const setOpenCollectionModal = useGlobalStateStore(
    (state) => state.setOpenCollectionModal,
  );
  if (!collection) return null;

  const removeCollection = async () => {
    try {
      await deleteCollection(collection.id);
      setOpenCollectionModal(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/collections/${collection.id}`,
      );
      toast.success("Link copied to clipboard.");
    } catch (error) {
      toast.error("Failed to copy link.");
    }
  };

  const isOwner = collection.creator_id === loggedInUserId;

  return (
    <Dialog
      open={true}
      onOpenChange={(value) =>
        setOpenCollectionModal(value ? collection : null)
      }
    >
      <DialogContent className="min-w-[95vw] max-h-[90vh] overflow-y-auto pr-0">
        <DialogHeader className="pr-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <DialogTitle className="text-xl font-semibold">
                  {collection.title}
                </DialogTitle>
                <VisibilityBadge visibility={collection.visibility} />
              </div>

              {collection.description && (
                <DialogDescription className="text-sm text-muted-foreground max-w-xl">
                  {collection.description}
                </DialogDescription>
              )}
            </div>

            <div className="flex items-center gap-2">
              <TooltipButton
                value={<Share2 className="h-4 w-4" />}
                size="icon"
                variant="ghost"
                onClick={handleShare}
                content="Share"
              />

              {isOwner && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <UpdateCollection />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Update</TooltipContent>
                </Tooltip>
              )}

              {isOwner && (
                <TooltipButton
                  value={
                    isPending ? (
                      <Loader2 className="animate-spin h-4 w-4" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )
                  }
                  size="icon"
                  variant="destructive"
                  onClick={removeCollection}
                  disabled={isPending}
                  content="Delete"
                />
              )}
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          {collection.items.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {collection.items.map((item) => (
                  <CollectionImageCard
                    key={item.pic_id}
                    item={item}
                    isOwner={isOwner}
                  />
                ))}
              </div>
              {/* <div className="w-full my-4 flex justify-center">
                <Button>Load more</Button>
              </div> */}
            </>
          )}
          {collection.items.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No items in this collection yet.
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
