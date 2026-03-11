"use client";

import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";
import { PhotoWithBlurHash } from "./BlurhashCanvas";
import { GalleryPhoto } from "@/@types";

export function Masonry({
  photos,
  showUser = true,
}: {
  photos: GalleryPhoto[];
  showUser?: boolean;
}) {
  return (
    <MasonryPhotoAlbum<GalleryPhoto>
      photos={photos}
      spacing={16}
      columns={(width) => {
        if (width < 430) return 1;
        if (width < 640) return 2;
        if (width < 1024) return 3;
        return 4;
      }}
      render={{
        photo: ({ onClick }, { photo, width, height }) => (
          <div key={photo.key} onClick={onClick}>
            <PhotoWithBlurHash
              photo={photo}
              width={width}
              height={height}
              showUser={showUser}
            />
          </div>
        ),
      }}
    />
  );
}
