import { Share2, ThumbsUp } from "lucide-react";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { useGlobalStateStore, useUserStore } from "@/store";
import { useIncrementLikeCount } from "@/hooks";
import { toast } from "sonner";
import { cn } from "@workspace/ui/lib/utils";
import { TooltipButton } from "../../layout";
import { DownloadButton } from "./DownloadButton";
import { OwnerInfo } from "./OwnerInfo";
import { AddToCollection } from "./AddToCollection";

export function ModalHeader() {
  const image = useGlobalStateStore((state) => state.image);
  const open = useGlobalStateStore((state) => state.open);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const { mutateAsync: incrementLikeCount } = useIncrementLikeCount();
  if (!image) {
    return null;
  }

  const handleLike = async () => {
    try {
      await incrementLikeCount(image.id);
      toast.success("Liked successfully.");
    } catch (error) {
      toast.error("Failed to like.");
    }
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

  const isModal = open == true && !!image?.id;

  const Header = isModal ? DialogHeader : "div";
  return (
    <Header
      className={cn(
        "h-fit! flex flex-row justify-between px-6 pt-6",
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
      <div className="flex items-center gap-2">
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
        <DownloadButton />
      </div>
    </Header>
  );
}
