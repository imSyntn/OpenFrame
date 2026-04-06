import { VisibilityBadge } from "../../common";
import { TooltipButton } from "../../common";
import { Loader2, Share2, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { UpdateCollection } from "../UpdateCollection";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { toast } from "sonner";
import { Collection } from "@workspace/types";
import { useGlobalStateStore, useUserStore } from "@/store";
import { useDeleteCollection } from "@/hooks";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";

export function CollectionHeader({
  as,
  children,
  className,
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) {
  const Header = as || "div";
  return (
    <Header className={cn("pr-8", className)}>
      <div className="flex items-start justify-between gap-4">{children}</div>
    </Header>
  );
}

export function HeaderLeft({ children }: { children: React.ReactElement }) {
  return <div className="flex flex-col gap-1">{children}</div>;
}

export function HeaderTitle({
  as,
  collection,
  isLoading,
}: {
  as?: React.ElementType;
  collection?: Collection;
  isLoading?: boolean;
}) {
  const Title = as || "div";

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Title className="text-xl font-semibold">{collection?.title}</Title>
      {collection?.visibility && (
        <VisibilityBadge visibility={collection.visibility} />
      )}
    </div>
  );
}

export function HeaderDescription({
  as,
  collection,
  isLoading,
}: {
  as?: React.ElementType;
  collection?: Collection;
  isLoading?: boolean;
}) {
  const Description = as || "div";

  if (isLoading) {
    return (
      <div className="space-y-2 max-w-xl">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  return (
    <Description className="text-sm text-muted-foreground max-w-xl">
      {collection?.description}
    </Description>
  );
}

export function HeaderRight({
  collection,
  isOwner,
  isLoading,
  showUpdationButton = true,
}: {
  collection?: Collection;
  isOwner?: boolean;
  isLoading?: boolean;
  showUpdationButton?: boolean;
}) {
  const { mutateAsync: deleteCollection, isPending } = useDeleteCollection();
  const setOpenCollectionModal = useGlobalStateStore(
    (state) => state.setOpenCollectionModal,
  );

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
    );
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/collections/${collection?.id}`,
      );
      toast.success("Link copied to clipboard.");
    } catch (error) {
      toast.error("Failed to copy link.");
    }
  };

  const removeCollection = async () => {
    try {
      await deleteCollection(collection?.id as string);
      setOpenCollectionModal(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {collection?.visibility === "PUBLIC" && (
        <TooltipButton
          value={<Share2 className="h-4 w-4" />}
          size="icon"
          variant="ghost"
          onClick={handleShare}
          content="Share"
        />
      )}

      {isOwner && showUpdationButton && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <UpdateCollection />
            </div>
          </TooltipTrigger>
          <TooltipContent>Update</TooltipContent>
        </Tooltip>
      )}

      {isOwner && showUpdationButton && (
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
  );
}

export function ContentBody({ children }: { children: React.ReactElement }) {
  return <ScrollArea className="max-h-[70vh] pr-4">{children}</ScrollArea>;
}

export function CollectionCardWrapper({
  children,
  isLoading,
}: {
  children?: React.ReactElement;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {children}
    </div>
  );
}
