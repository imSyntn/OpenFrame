"use client";

import React, { useMemo } from "react";
import { ErrorOccured, MasonryLayout, NotFound } from "../common";
import { GalleryPhoto } from "@/@types";
import { useGlobalStateStore } from "@/store";
import { useGetExplorePictures } from "@/hooks";
import { Button } from "@workspace/ui/components/button";
import { CameraOff, Loader2 } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@workspace/ui/lib/utils";
import { ImageSkeleton } from "./ImageSkeleton";

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
    error,
    refetch,
  } = useGetExplorePictures(tag);

  const pictures = data?.pages.flatMap((page) => page.data) ?? [];

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
          // user: pic.user,
          key: pic.id,
          onClick: () => {
            setOpen(true, pic);
          },
        };
      }),
    [pictures],
  );

  if (!isLoading && pictures.length == 0) {
    return (
      <NotFound
        Icon={CameraOff}
        title="No pictures found"
        description={
          (error as any)?.response?.data?.message ||
          "No pictures found matching your criteria."
        }
      />
    );
  }

  if (isError) {
    return (
      <ErrorOccured
        title={(error as any)?.response?.data?.message}
        description="Failed to load pictures. Please try again."
        onClick={() => refetch()}
      />
    );
  }

  const handleLoadMore = () => {
    if (pathname === "/explore") {
      fetchNextPage();
    } else {
      router.push("/explore");
    }
  };

  return (
    <div className={cn("w-full", isLoading && "opacity-50")}>
      {isLoading ? <ImageSkeleton /> : <MasonryLayout photos={photos} />}
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
