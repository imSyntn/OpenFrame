import React from "react";
import { Collection, SrcType } from "@workspace/types";
import { Clock, RefreshCcw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardFooter } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { VisibilityBadge } from "../common";
import { useGlobalStateStore } from "@/store";

export function CollecTionCardSkeleton() {
  return (
    <Card className="overflow-hidden p-0 border border-muted h-fit">
      <Skeleton className="h-40 w-full" />
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </CardContent>
      <CardFooter className="flex items-center gap-3 p-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-3 w-24" />
      </CardFooter>
    </Card>
  );
}

export function CollectionCard({
  collection,
  // setOpen,
}: {
  collection: Collection;
  // setOpen: (open: Collection) => void;
}) {
  const setOpenCollectionModal = useGlobalStateStore(
    (state) => state.setOpenCollectionModal,
  );
  const previewImages = collection.items
    ?.map(
      (item) =>
        item.picture?.src?.find((img) => img.resolution == "THUMBNAIL")?.url,
    )
    .filter(Boolean);

  const cover = previewImages?.[0] || collection.cover_image;
  return (
    <Card
      key={collection.id}
      className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 pt-0 gap-2 border border-muted h-fit"
      onClick={() => setOpenCollectionModal(collection)}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={cover}
          alt={collection.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute bottom-2 right-2 flex items-center h-8 w-8">
          {previewImages.slice(0, 3).map((img, i) => (
            <img
              key={i}
              src={img}
              className="absolute h-full w-full rounded-md object-cover border border-white shadow-sm"
              style={{
                transform: `translate(${i * 4}px, ${i * 4}px) scale(${1 - i * 0.04})`,
                zIndex: 10 - i,
                opacity: 1 - i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
      <CardContent className="py-2 space-y-1 relative">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg line-clamp-1">
            {collection.title}
          </h3>
          <VisibilityBadge visibility={collection.visibility} />
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {collection.description}
        </p>

        <div className="text-xs text-muted-foreground space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 opacity-70" />
              <span>Created</span>
            </div>

            <Badge className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {formatDistanceToNow(new Date(collection.created_at), {
                addSuffix: true,
              })}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <RefreshCcw className="h-3.5 w-3.5 opacity-70" />
              <span>Updated</span>
            </div>

            <Badge className="text-[10px] px-2 py-0.5 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              {formatDistanceToNow(new Date(collection.updated_at), {
                addSuffix: true,
              })}
            </Badge>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={collection.creator.avatar} />
          <AvatarFallback>
            {collection.creator.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <span className="text-sm font-medium">{collection.creator.name}</span>
      </CardFooter>
    </Card>
  );
}
