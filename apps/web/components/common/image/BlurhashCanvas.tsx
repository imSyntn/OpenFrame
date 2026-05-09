"use client";

import { tagsType } from "@workspace/types";
import { cn } from "@workspace/ui/lib/utils";
import { decode } from "blurhash";
import { memo, useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ImageTags } from "./modal";
import { formatDistanceToNow } from "date-fns";

export function BlurHashCanvasComponent({
  hash,
  width,
  height,
}: {
  hash: string;
  width: number;
  height: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const decodeWidth = 32;
    const decodeHeight = Math.round((height / width) * 32);

    let pixels;

    try {
      pixels = decode(hash, decodeWidth, decodeHeight);
    } catch {
      pixels = decode(
        "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
        decodeWidth,
        decodeHeight,
      );
    }

    const canvas = ref.current;
    if (!canvas) return;

    canvas.width = decodeWidth;
    canvas.height = decodeHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.createImageData(decodeWidth, decodeHeight);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
  }, [hash, width, height]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <canvas
        ref={ref}
        className="w-full h-full max-w-full max-h-full scale-100 rounded-xl"
        style={{
          aspectRatio: `${width} / ${height}`,
        }}
      />
    </div>
  );
}

export const BlurHashCanvas = memo(BlurHashCanvasComponent);

type Props = {
  photo: any;
  hoverEffect?: boolean;
};

function PhotoWithBlurHashComponent({ photo, hoverEffect = true }: Props) {
  const [loaded, setLoaded] = useState(false);

  const tags = photo.tags?.map((item: { tag: tagsType }) => item.tag);

  return (
    <div
      className="relative flex items-center justify-center group overflow-hidden rounded-xl"
      style={{
        aspectRatio: `${photo.width} / ${photo.height}`,
        width: "100%",
        maxHeight: "60vh",
      }}
    >
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          loaded ? "opacity-0" : "opacity-100",
        )}
      >
        <BlurHashCanvas
          hash={photo.blurhash}
          width={photo.width}
          height={photo.height}
        />
      </div>

      <LazyLoadImage
        src={photo.src}
        alt={photo.alt ?? ""}
        onLoad={() => setLoaded(true)}
        className={cn(
          "w-full h-full object-contain  transition-all duration-500",
          loaded ? "opacity-100 cursor-pointer" : "opacity-0",
          hoverEffect && "group-hover:scale-105",
        )}
        onClick={photo.onClick}
      />
      {hoverEffect && (
        <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 bg-black/50 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
          {photo.title && (
            <p className="text-white text-sm font-semibold leading-tight truncate">
              {photo.title}
            </p>
          )}
          {photo.created_at && (
            <p className="text-white text-xs mb-1">
              {formatDistanceToNow(new Date(photo.created_at), {
                addSuffix: true,
              })}
            </p>
          )}
          {tags && tags.length > 0 && (
            <ImageTags tags={tags.slice(0, 3)} showTitle={false} />
          )}
        </div>
      )}
    </div>
  );
}

export const PhotoWithBlurHash = memo(PhotoWithBlurHashComponent);
