import { CreateCollection } from "@/components/collection";
import { useAddCollectionItems, useGetUserCollections } from "@/hooks";
import { useGlobalStateStore, useUserStore } from "@/store";
import { SrcType } from "@workspace/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { FolderX, Lock, LockOpen, Plus } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function CollectionItem({
  id,
  coverImage,
  name,
  src,
  error,
  visibility,
}: {
  id?: string;
  coverImage?: string;
  name?: string;
  src?: SrcType[];
  error?: boolean;
  visibility?: "PUBLIC" | "PRIVATE";
}) {
  const { mutate: addItemToCollection } = useAddCollectionItems();
  const image = useGlobalStateStore((state) => state.image);
  const cover = src?.find((s) => s.resolution == "THUMBNAIL")?.url;

  const { id: imageId } = image || {};

  const addItem = () => {
    if (!id) {
      toast.error("Failed to get collection id.");
      return;
    }
    if (!imageId) {
      toast.error("Failed to get image id.");
      return;
    }
    addItemToCollection({ id, pic_ids: [imageId] });
  };

  return (
    <DropdownMenuItem
      className="flex items-center justify-between gap-2 hover:bg-muted"
      onClick={addItem}
    >
      {coverImage ? (
        <Avatar className="rounded-md">
          <AvatarImage src={cover || coverImage} className="rounded-md" />
          <AvatarFallback>{name?.[0]?.toUpperCase().charAt(0)}</AvatarFallback>
        </Avatar>
      ) : error ? (
        <div className="w-8 h-8 rounded-md flex justify-center items-center border">
          <FolderX />
        </div>
      ) : (
        <Skeleton className="w-8 h-8 rounded-md" />
      )}
      {visibility == "PRIVATE" && <Lock className="h-3 w-3 text-destructive" />}
      {visibility == "PUBLIC" && <LockOpen className="h-3 w-3 text-success" />}
      {name ? (
        <h2 className="flex-1 text-center line-clamp-1">{name}</h2>
      ) : error ? (
        <p className="flex-1 text-center text-destructive">Error</p>
      ) : (
        <Skeleton className="flex-1 h-4 rounded-md" />
      )}
    </DropdownMenuItem>
  );
}

function DropdownContent() {
  const userId = useUserStore((state) => state.id);
  const {
    data: collections,
    isLoading,
    isError,
  } = useGetUserCollections(userId);
  const { mutate: addItemToCollection } = useAddCollectionItems();
  const image = useGlobalStateStore((state) => state.image);

  const { id: imageId } = image || {};

  const onCreated = (id: string) => {
    if (!imageId) {
      toast.error("Failed to get image id.");
      return;
    }
    if (!id) {
      toast.error("Failed to get created collection id.");
      return;
    }
    addItemToCollection({ id, pic_ids: [imageId] });
  };

  return (
    <DropdownMenuContent className="w-52 max-h-[60vh]">
      <DropdownMenuGroup>
        <DropdownMenuLabel className="text-center">
          Choose collection
        </DropdownMenuLabel>
        <ScrollArea className="h-60 pr-4">
          {isLoading && (
            <>
              <CollectionItem />
              <CollectionItem />
              <CollectionItem />
            </>
          )}
          {isError && <CollectionItem error />}
          {collections?.data.map((collection) => (
            <CollectionItem
              key={collection.id}
              id={collection.id}
              visibility={collection.visibility}
              name={collection.title}
              coverImage={collection.cover_image}
              src={collection.items?.[0]?.picture?.src}
            />
          ))}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <CreateCollection className="mb-0" onCreated={onCreated} />
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
}

export function AddToCollection() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
          <Plus />
        </Button>
      </DropdownMenuTrigger>
      <DropdownContent />
    </DropdownMenu>
  );
}
