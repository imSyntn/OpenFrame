import { GalleryPhoto, PictureType } from "@/@types";
import { useGlobalStateStore, useProfileStore } from "@/store";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Masonry } from "@/components/common";
import { useGetPictures } from "@/hooks";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function GalleryPhotosContainer() {
  const setOpen = useGlobalStateStore((state) => state.setOpen);
  const id = useProfileStore((state) => state.id);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetPictures(id);

  const pictures = data?.pages.flatMap((page) => page.data) || [];

  if (!isLoading && pictures.length == 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>No pictures found</p>
      </div>
    );
  }

  if (!isLoading && isError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-destructive">Something went wrong</p>
      </div>
    );
  }

  const photos: GalleryPhoto[] = useMemo(
    () =>
      pictures.map((pic) => {
        const ORIGINAL = pic.src?.find((s) => s.resolution === "ORIGINAL");
        const thumbnail = pic.src?.find(
          (src) => src.resolution === "THUMBNAIL",
        );
        return {
          src: thumbnail?.url || ORIGINAL?.url!,
          width: ORIGINAL?.width!,
          height: ORIGINAL?.height!,
          blurhash: pic.metadata?.blurhash,
          user: pic.user,
          key: pic.id,
          onClick: (e: React.MouseEvent<HTMLDivElement>) => {
            setOpen(true, pic);
          },
        };
      }),
    [pictures],
  );

  return (
    <>
      {isLoading && (
        <div className="flex w-full justify-center my-3">
          <Loader2 className="animate-spin" />
        </div>
      )}
      <Masonry photos={photos} showUser={false} />
      <div className="flex-1 flex justify-center mt-5">
        {isFetchingNextPage ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Button
            disabled={!hasNextPage || isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            Load more
          </Button>
        )}
      </div>
    </>
  );
}
