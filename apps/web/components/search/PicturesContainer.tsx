"use client";

import React, { useMemo } from "react";
import { MasonryLayout } from "../common";
import { GalleryPhoto } from "@/@types";
import { PictureMatch } from "@workspace/types";
import { useRouter } from "next/navigation";

export function PicturesContainer({ pictures }: { pictures: PictureMatch[] }) {
  const router = useRouter();
  const photos: GalleryPhoto[] = useMemo(
    () =>
      pictures.map((pic) => ({
        src: pic.content.src,
        width: pic.content.width,
        height: pic.content.height,
        blurhash: pic.content.blurhash,
        // user: pic.user,
        key: pic.id.toString(),
        // onClick: () => {
        //   router.push(`/picture/${pic.id}`);
        // },
      })),
    [pictures],
  );

  const handleDelagation = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const element = target.closest<HTMLElement>("[data-id]");
    if (!element) return;
    const id = element?.dataset.id;
    if (!id) return;
    router.push(`/picture/${id}`);
  };

  return (
    <div onClick={handleDelagation}>
      <MasonryLayout photos={photos} />
    </div>
  );
}
