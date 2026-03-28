import React from "react";
import { MasonryPhotoAlbum, Photo } from "react-photo-album";
import { PhotoWithBlurHash } from "../common/image/BlurhashCanvas";
import { Masonry } from "../common";
import { GalleryPhoto } from "@/@types";

const ratios: number[][] = [
  [800, 600],
  [900, 1200],
  [1000, 700],
  [1200, 900],
  [800, 1100],
];

const pictures = Array.from({ length: 50 }).map((_, i) => {
  const id = i + 1;

  const [width, height] = ratios[i % ratios.length]!;

  return {
    id: `pic_${id}`,
    title: `Photo ${id}`,
    alt: `Beautiful photo ${id}`,
    description: `High quality photo ${id} for OpenFrame gallery.`,
    created_at: new Date(),

    user: {
      id: `user_${id}`,
      name: `Photographer ${id}`,
      avatar: `https://i.pravatar.cc/150?img=${(id % 70) + 1}`,
    },

    src: [
      {
        resolution: "SMALL",
        url: `https://picsum.photos/seed/openframe${id}/${width}/${height}`,
        type: "JPG",
        width,
        height,
        size: 300000 + id * 1000,
      },
      {
        resolution: "MEDIUM",
        url: `https://picsum.photos/seed/openframe${id}/${width! * 2}/${height! * 2}`,
        type: "JPG",
        size: 600000 + id * 2000,
      },
    ],

    metadata: {
      blurhash: "LKO2?U%2Tw=^]-5c,1J5@[or[Q6.",
      camera: "Sony A7 IV",
      lens: "24-70mm",
      iso: "100",
      shutter: "1/200",
      aperture: "f/5.6",
      focal_length: "35mm",
    },

    tags: ["nature", "travel", "photography"],
  };
});

export function MasonryGrid({ tag }: { tag: string }) {
  const photos: GalleryPhoto[] = pictures.map((pic) => ({
    src: pic.src[0]?.url!,
    width: pic.src[0]?.width!,
    height: pic.src[0]?.height!,
    blurhash: pic.metadata.blurhash,
    user: pic.user,
    key: pic.id,
  }));

  return (
    <div className="w-full">
      <Masonry photos={photos} />
    </div>
  );
}
