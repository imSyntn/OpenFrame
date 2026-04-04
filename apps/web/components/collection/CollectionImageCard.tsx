import { useDeleteCollectionItems } from "@/hooks";
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
    <div className="group relative rounded-xl overflow-hidden border bg-muted shadow-sm hover:shadow-lg transition-all duration-300">
      <Link href={`/picture/${item.pic_id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={img?.url}
            alt={item.picture.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
        </div>
      </Link>

      {isOwner && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 translate-y-[-6px] group-hover:translate-y-0 transition-all duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/80 hover:bg-white shadow-md"
            onClick={removeCollectionItem}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="animate-spin text-destructive" />
            ) : (
              <Trash2 className="text-destructive" />
            )}
          </Button>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 text-sm font-medium text-black bg-white/80 opacity-0 group-hover:opacity-100 transition duration-300">
        View full picture
      </div>
    </div>
  );
}
