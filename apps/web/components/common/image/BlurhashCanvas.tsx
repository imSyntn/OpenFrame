"use client";

import { tagsType } from "@workspace/types";
import { cn } from "@workspace/ui/lib/utils";
import { decode } from "blurhash";
import { memo, useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { TransparentTag } from "./modal";
import { formatDistanceToNow } from "date-fns";
import { Lens } from "./Lens";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { copyToClipboard } from "@/utils";
import { Button } from "@workspace/ui/components/button";
import { Copy } from "lucide-react";

export function BlurHashCanvasComponent({
  hash,
  width,
  height,
  className,
}: {
  hash: string;
  width: number;
  height: number;
  className?: string;
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
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center pointer-events-none",
        className,
      )}
    >
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo: any;
  hoverEffect?: boolean;
  showLens?: boolean;
  isPreview?: boolean;
};

function PhotoWithBlurHashComponent({
  photo,
  hoverEffect = true,
  showLens = false,
  isPreview = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  const tags: tagsType[] = photo.tags?.map(
    (item: { tag: tagsType }) => item.tag,
  );

  return (
    <div
      className="relative flex items-center justify-center group overflow-hidden rounded-xl"
      style={{
        aspectRatio: `${photo.width} / ${photo.height}`,
        width: "100%",
        ...(isPreview
          ? {
              maxHeight: "60vh",
              maxWidth: `calc(60vh * (${photo.width} / ${photo.height}))`,
            }
          : {}),
      }}
    >
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500 pointer-events-none",
          loaded ? "opacity-0" : "opacity-100",
        )}
      >
        <BlurHashCanvas
          hash={photo.blurhash}
          width={photo.width}
          height={photo.height}
        />
      </div>

      <Lens show={showLens}>
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
      </Lens>
      {hoverEffect && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />

          <div className="absolute inset-x-0 bottom-0 flex translate-y-6 flex-col gap-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="space-y-1">
              {photo.title && (
                <h3 className="line-clamp-1 text-base font-semibold tracking-wide text-white drop-shadow-xl">
                  {photo.title}
                </h3>
              )}

              <div className="flex items-center gap-2">
                {photo.created_at && (
                  <p className="text-[11px] font-medium tracking-[0.15em] text-white/65 uppercase">
                    {formatDistanceToNow(new Date(photo.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                )}
                <div className="h-1 w-1 rounded-full bg-white/40" />

                <p className="text-[11px] tracking-[0.15em] text-white/50 uppercase">
                  OpenFrame
                </p>
              </div>
            </div>

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.slice(0, 3).map((tag) => (
                  <div key={tag.id} className="pointer-events-auto">
                    <TransparentTag tag={tag} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export const PhotoWithBlurHash = memo(PhotoWithBlurHashComponent);

export function ViewBlurhashModal({
  hash,
  aspectRatio,
  children,
}: {
  hash: string;
  aspectRatio: string;
  children: React.ReactNode;
}) {
  const copyBlurhash = () => {
    copyToClipboard(
      hash,
      "Blurhash copied to clipboard",
      "Error to copy blurhash",
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>BlurHash</DialogTitle>
          <DialogDescription className="flex items-center">
            {hash}
            <Button size="icon" variant="ghost" onClick={copyBlurhash}>
              <Copy />
            </Button>
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full justify-center">
          <div
            className="relative overflow-hidden rounded-xl"
            style={{
              aspectRatio,
              width: "min(100%, 70vh)",
              maxHeight: "70vh",
            }}
          >
            <BlurHashCanvas hash={hash || ""} width={300} height={300} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
