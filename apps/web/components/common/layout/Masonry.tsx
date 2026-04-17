"use client";

import { PhotoWithBlurHash } from "../image/BlurhashCanvas";
import { GalleryPhoto } from "@/@types";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export function MasonryLayout({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 640: 2, 1024: 3, 1280: 4 }}
      gutterBreakPoints={{
        350: 8,
        640: 12,
        1024: 17,
        1280: 34,
      }}
    >
      <Masonry>
        {photos.map((photo) => (
          <PhotoWithBlurHash key={photo.key} photo={photo} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
