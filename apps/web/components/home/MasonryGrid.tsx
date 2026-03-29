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
  const nextCursor = useGlobalStateStore((state) => state.nextCursor);
  const pictures = useGlobalStateStore((state) => state.pictures);
  const loading = useGlobalStateStore((state) => state.picturesLoading);
  const { mutateAsync: getExplorePictures, isError } = useGetExplorePictures();
  const tagDiff = useRef(params.get("tag"));

  const tag = params.get("tag");

  useEffect(() => {
    if (tagDiff.current !== tag) {
      tagDiff.current = tag;
      getExplorePictures({ tag: tag || "", nextCursor: "" });
    } else {
      getExplorePictures({ tag: tag || "", nextCursor });
    }
  }, [tag]);

  if (!loading && pictures.length == 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>No pictures found</p>
      </div>
    );
  }

  if (!loading && isError) {
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
          src: thumbnail?.url! || original?.url!,
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
      getExplorePictures({ tag: tag || "", nextCursor });
    } else {
      router.push("/explore");
    }
  };

  return (
    <div className={cn("w-full", loading && "opacity-50")}>
      <Masonry photos={photos} />
      {loading && (
        <div className="flex w-full justify-center my-3">
          <Loader2 className="animate-spin" />
        </div>
      )}
      <div className="flex w-full justify-center my-3">
        <Button className="mx-auto" onClick={handleLoadMore} disabled={loading}>
          More
        </Button>
      </div>
    </div>
  );
}
