"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Masonry } from "../common";
import { GalleryPhoto } from "@/@types";
import { useGlobalStateStore } from "@/store";
import { useGetExplorePictures } from "@/hooks";
import { Button } from "@workspace/ui/components/button";
import { Loader2 } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@workspace/ui/lib/utils";

export function MasonryGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const setOpen = useGlobalStateStore((state) => state.setOpen);

  const tag = params.get("tag") || undefined;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetExplorePictures(tag);

  const pictures = data?.pages.flatMap((page) => page.data) ?? [];

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
        const original = pic.src.find((src) => src.resolution === "ORIGINAL");
        const thumbnail = pic.src.find((src) => src.resolution === "THUMBNAIL");
        return {
          src: thumbnail?.url || original?.url!,
          width: original?.width!,
          height: original?.height!,
          blurhash: pic.metadata.blurhash,
          user: pic.user,
          key: pic.id,
          onClick: () => {
            setOpen(true, pic);
          },
        };
      }),
    [pictures],
  );

  const handleLoadMore = () => {
    if (pathname === "/explore") {
      fetchNextPage();
    } else {
      router.push("/explore");
    }
  };

  return (
    <div className={cn("w-full", isLoading && "opacity-50")}>
      {isLoading && (
        <div className="flex w-full justify-center my-3">
          <Loader2 className="animate-spin" />
        </div>
      )}
      <Masonry photos={photos} />
      {isFetchingNextPage && (
        <div className="flex w-full justify-center my-3">
          <Loader2 className="animate-spin" />
        </div>
      )}
      {hasNextPage && (
        <div className="flex w-full justify-center my-3">
          <Button onClick={handleLoadMore} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading..." : "More"}
          </Button>
        </div>
      )}
    </div>
  );
}
