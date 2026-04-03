import { useDeleteCollection, useDeleteCollectionItems } from "@/hooks";
import { CollectionItem } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import { Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export function CollectionImageCard({
  item,
  isOwner,
}: {
  item: CollectionItem;
  isOwner: boolean;
}) {
  const { mutateAsync: deleteCollectionItems, isPending } =
    useDeleteCollectionItems();
  const img =
    item.picture.src.find((s) => s.resolution === "THUMBNAIL") ||
    item.picture.src.find((s) => s.resolution === "SMALL") ||
    item.picture.src.find((s) => s.resolution === "MEDIUM") ||
    item.picture.src[0];

  const removeCollectionItem = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    try {
      e.preventDefault();
      await deleteCollectionItems({
        id: item.collection_id,
        pic_ids: [item.pic_id],
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-muted cursor-pointer">
      <Link href={`/picture/${item.pic_id}`}>
        <img
          src={img?.url}
          alt={item.picture.title}
          className="h-full w-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />

      {isOwner && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
          <Button
            size="icon"
            onClick={removeCollectionItem}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="text-destructive animate-spin" />
            ) : (
              <Trash2 className="text-destructive" />
            )}
          </Button>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 text-center opacity-0 group-hover:opacity-100 bg-primary text-primary-foreground transition">
        View full picture
      </div>
    </div>
  );
}
