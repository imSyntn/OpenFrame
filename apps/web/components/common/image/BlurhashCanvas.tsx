"use client";

import { cn } from "@workspace/ui/lib/utils";
import { decode } from "blurhash";
import { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export function BlurHashCanvas({ hash }: { hash: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const width = 32;
    const height = 32;

    let pixels;

    try {
      pixels = decode(hash, width, height);
    } catch (error) {
      pixels = decode("LKO2?U%2Tw=w]~RBVZRi};RPxuwH", width, height);
    }

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
  hoverEffect?: boolean;
};

export function PhotoWithBlurHash({ photo, hoverEffect = true }: Props) {
  const [loaded, setLoaded] = useState(false);
  const user = photo?.user;

  return (
    <div
      className="group relative flex items-center justify-center rounded-lg overflow-hidden"
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
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
        onLoad={() => setLoaded(true)}
        className={cn(
          "max-w-full max-h-[80vh] object-contain transition-transform duration-500 cursor-pointer",
          hoverEffect && "group-hover:scale-105",
        )}
      />
    </div>
  );
}
