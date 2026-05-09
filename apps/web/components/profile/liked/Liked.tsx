import { GalleryPhoto } from "@/@types";
import { MasonryLayout, NotFound } from "@/components/common";
import { useGetUserLikedPictures } from "@/hooks";
import { useGlobalStateStore, useUserStore } from "@/store";
import { Button } from "@workspace/ui/components/button";
import { CircleX, ImageOff, Loader2 } from "lucide-react";
import React, { useMemo } from "react";

export function Liked() {
  const setOpen = useGlobalStateStore((state) => state.setOpen);
  const userId = useUserStore((state) => state.id);
  const name = useUserStore((state) => state.name);
  const {
    data: picturesData,
    isLoading,
    error,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetUserLikedPictures(userId || "");

  const pictures = picturesData?.pages.flatMap((page) => page.data) || [];

  const photos: GalleryPhoto[] = useMemo(
    () =>
      pictures.map((pic) => {
        const ORIGINAL = pic.src?.find((s) => s.resolution === "ORIGINAL");
        const thumbnail = pic.src?.find(
          (src) => src.resolution === "THUMBNAIL" || src.resolution === "SMALL",
        );
        return {
          src: thumbnail?.url || ORIGINAL?.url!,
          width: ORIGINAL?.width!,
          height: ORIGINAL?.height!,
          blurhash: pic.metadata?.blurhash,
          // user: pic.user,
          key: pic.id,
          title: pic.title,
          created_at: pic.created_at,
          tags: pic.tags,
          onClick: (e: React.MouseEvent<HTMLDivElement>) => {
            setOpen(true, pic);
          },
        };
      }),
    [pictures],
  );

  if (isLoading) {
    return (
      <div className="flex w-full min-h-[50vh] justify-center my-3">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!isLoading && isError) {
    return (
      <NotFound
        Icon={CircleX}
        title="Error occured"
        className="min-h-fit"
        description={
          (error as any).response?.data?.message || "Something went wrong"
        }
      />
    );
  }

  if (!isLoading && pictures.length === 0) {
    return (
      <NotFound
        Icon={ImageOff}
        title="No Liked Images"
        className="min-h-[50vh]"
        description={`${name} hasn't liked any images yet.`}
      />
    );
  }

  return (
    <>
      <MasonryLayout photos={photos} />
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
