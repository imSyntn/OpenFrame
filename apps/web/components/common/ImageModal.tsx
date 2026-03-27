"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { useGlobalStateStore } from "@/store";
import { tagsType } from "@workspace/types";
import { PhotoWithBlurHash } from "./BlurhashCanvas";

export function ImageModal() {
  const open = useGlobalStateStore((state) => state.open);
  const image = useGlobalStateStore((state) => state.image);
  const setOpen = useGlobalStateStore((state) => state.setOpen);

  useEffect(() => {
    console.log(image);
  }, [image]);

  if (!image) return null;

  const tags: tagsType[] = image.tags
    .filter((tag) => typeof tag !== "string")
    .map((tag) => tag.tag);

  const original = image?.src?.find((s) => s.resolution === "ORIGINAL");
  const originalWidth = original?.width;
  const originalHeight = original?.height;
  const photo = {
    src: original?.url!,
    alt: image?.alt,
    width: originalWidth!,
    height: originalHeight!,
    blurhash: image?.metadata?.blurhash,
    user: image?.user,
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-[95vw] h-[90vh] overflow-y-auto  scrollbar-none">
        <DialogTitle className="sr-only">{image?.title}</DialogTitle>
        <DialogDescription className="sr-only">
          {image?.description}
        </DialogDescription>
        <ScrollArea className="h-full">
          <div className="flex items-center justify-center min-h-full w-full">
            <div className="overflow-hidden rounded-lg border w-full max-w-[90vw] flex items-center justify-center">
              <div className="w-full flex justify-center">
                <PhotoWithBlurHash
                  photo={photo}
                  showUser={false}
                  width={originalWidth as number}
                  height={originalHeight as number}
                />
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
