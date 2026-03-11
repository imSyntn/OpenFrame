import { GalleryPhoto, PictureType } from "@/@types";
import { useProfileStore } from "@/store";
import React from "react";
import { Button } from "@workspace/ui/components/button";
import { Masonry } from "@/components/common";

export function GalleryPhotosContainer() {
  const pictures = useProfileStore((state) => state.pictures) as PictureType[];

  const photos: GalleryPhoto[] = pictures.map((pic) => ({
    src: pic.src[0]?.url!,
    width: pic.src[0]?.width!,
    height: pic.src[0]?.height!,
    blurhash: pic.metadata.blurhash,
    user: pic.user,
    key: pic.id,
  }));

  return (
    <>
      <Masonry photos={photos} showUser={false} />
      <div className="flex-1 flex justify-center">
        <Button>Load more</Button>
      </div>
    </>
  );
}
