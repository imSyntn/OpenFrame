"use client";

import { cn } from "@workspace/ui/lib/utils";
import { decode } from "blurhash";
import { memo, useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
    <div className="absolute inset-0 flex items-center justify-center">
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

function PhotoWithBlurHashComponent({ photo }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center"
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
          "w-full h-full object-contain rounded-xl! transition-all duration-500",
          loaded ? "scale-100 opacity-100" : "scale-95 opacity-0",
        )}
        onClick={photo.onClick}
      />
    </div>
  );
}

export const PhotoWithBlurHash = memo(PhotoWithBlurHashComponent);
