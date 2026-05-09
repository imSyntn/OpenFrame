import { Share2, ThumbsUp, Trash } from "lucide-react";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { useGlobalStateStore, useUserStore } from "@/store";
import { useDeletePicture, useIncrementLikeCount } from "@/hooks";
import { toast } from "sonner";
import { cn } from "@workspace/ui/lib/utils";
import { TooltipButton } from "../../layout";
import { DownloadButton } from "./DownloadButton";
import { OwnerInfo } from "./OwnerInfo";
import { AddToCollection } from "./AddToCollection";
import { WarningModal } from "../../WarningModal";

export function ModalHeader() {
  const image = useGlobalStateStore((state) => state.image);
  const open = useGlobalStateStore((state) => state.open);
  const setOpen = useGlobalStateStore((state) => state.setOpen);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const { mutate: incrementLikeCount } = useIncrementLikeCount();
  const { mutateAsync: deletePicture } = useDeletePicture();
  if (!image) {
    return null;
  }

  const handleLike = () => {
    incrementLikeCount(image.id);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/picture/${image.id}`,
      );
      toast.success("Link copied to clipboard.");
    } catch (error) {
      toast.error("Failed to copy link.");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePicture({ id: image.id, userId: image.user_id });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const isModal = open == true && !!image?.id;

  const Header = isModal ? DialogHeader : "div";
  const isOwner = image.user_id === useUserStore((state) => state.id);

  return (
    <Header
      className={cn(
        "flex flex-col gap-4 px-4 sm:px-6 pt-4 sm:pt-6",
        "sm:flex-row sm:items-start sm:justify-between",
        !isModal && "mb-4",
      )}
    >
      {isModal && (
        <>
          <DialogTitle className="sr-only">{image.title}</DialogTitle>
          <DialogDescription className="sr-only">
            {image.description}
          </DialogDescription>
        </>
      )}
      <OwnerInfo id={image.user_id} />
      <div className="flex items-center gap-2 justify-end">
        <TooltipButton
          value={<Share2 />}
          size="icon"
          content="Share"
          variant="ghost"
          onClick={handleShare}
        />
        {isLoggedIn && (
          <TooltipButton
            value={<ThumbsUp />}
            size="icon"
            content="Like"
            onClick={handleLike}
          />
        )}
        {isLoggedIn && (
          <TooltipButton
            value={<AddToCollection />}
            size="icon"
            content="Add to collection"
            as="div"
          />
        )}
        {isLoggedIn && isOwner && (
          <WarningModal onClick={handleDelete}>
            <TooltipButton
              value={<Trash />}
              size="icon"
              content="Delete"
              variant="destructive"
            />
          </WarningModal>
        )}
        <DownloadButton />
      </div>
    </Header>
  );
}
