"use client";

import { decode } from "blurhash";
import { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export function BlurHashCanvas({ hash }: { hash: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const width = 32;
    const height = 32;

    const pixels = decode(hash, width, height);

    const canvas = ref.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.createImageData(width, height);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
  }, [hash]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full scale-110 blur-lg"
    />
  );
}

type Props = {
  photo: any;
  width: number;
  height: number;
  showUser: boolean;
};

export function PhotoWithBlurHash({ photo, width, height, showUser }: Props) {
  const [loaded, setLoaded] = useState(false);
  const user = photo?.user;

  return (
    <div
      className="group relative overflow-hidden rounded-lg"
      style={{ maxWidth: `${width}px`, maxHeight: `${height}px` }}
      onClick={photo.onClick}
    >
      {!loaded && (
        <div className="absolute inset-0">
          <BlurHashCanvas hash={photo.blurhash} />
        </div>
      )}
      <LazyLoadImage
        src={photo.src}
        alt={photo.alt ?? ""}
        width={width}
        height={height}
        effect="opacity"
        afterLoad={() => setLoaded(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {showUser && user && (
        <div className="absolute inset-0 flex items-end p-3 bg-black/0 group-hover:bg-black/40 transition">
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition text-white">
            <img src={user.avatar} className="w-7 h-7 rounded-full" />
            <span className="text-sm font-medium">{user.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}
