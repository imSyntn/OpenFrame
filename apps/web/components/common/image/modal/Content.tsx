"use client";

import React, { useEffect, useState } from "react";
import { ModalHeader } from "./ModalHeader";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { PhotoWithBlurHash } from "../BlurhashCanvas";
import { tagsType } from "@workspace/types";
import { useGlobalStateStore } from "@/store";
import { Button } from "@workspace/ui/components/button";
import { ImageTags } from "./ImageTags";
import { useIncrementViewCount } from "@/hooks";

const TitleDesc = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      {description && (
        <>
          <p
            className={`mt-2 text-muted-foreground text-sm md:text-base ${
              show ? "" : "line-clamp-2"
            }`}
          >
            {description}
          </p>
          <Button
            variant="link"
            onClick={() => setShow(!show)}
            className="text-sm"
          >
            {show ? "Show less" : "Show more"}
          </Button>
        </>
      )}
    </div>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) => (
  <div className="flex justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value || "-"}</span>
  </div>
);

const formatKey = (key: string) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

export function Content() {
  const image = useGlobalStateStore((state) => state.image);
  const { mutateAsync: viewPicture } = useIncrementViewCount();

  useEffect(() => {
    if (image) {
      const incrementViewCount = async () => {
        try {
          await viewPicture({ id: image.id, ownerId: image.user_id });
        } catch (error) {
          console.log(error);
        }
      };
      incrementViewCount();
    }
  }, [image]);

  if (!image) return null;

  const tags: tagsType[] = image.tags
    .filter((tag) => typeof tag !== "string")
    .map((tag) => tag.tag);

  const original = image?.src?.find((s) => s.resolution === "ORIGINAL");
  const originalWidth = original?.width;
  const originalHeight = original?.height;
  const photo = {
    src: original?.url!,
    alt: image?.alt,
    width: originalWidth!,
    height: originalHeight!,
    blurhash: image?.metadata?.blurhash,
    user: image?.user,
  };
  return (
    <>
      <ModalHeader />

      <ScrollArea className="flex-1 min-h-0 px-6 pb-6">
        <div className="space-y-6">
          <div className="w-full flex justify-center rounded-xl overflow-hidden min-h-[60vh]">
            <PhotoWithBlurHash
              photo={photo}
              showUser={false}
              hoverEffect={false}
            />
          </div>

          <TitleDesc
            title={image.title}
            description={image.description || ""}
          />

          <div className="flex gap-10 text-sm">
            <div>
              <p className="text-muted-foreground">Likes</p>
              <p className="text-lg font-semibold">
                {image.engagement?.likes || 0}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Views</p>
              <p className="text-lg font-semibold">
                {image.engagement?.views || 0}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Downloads</p>
              <p className="text-lg font-semibold">
                {image.engagement?.downloads || 0}
              </p>
            </div>
          </div>

          <ImageTags tags={tags} showTitle={false} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border p-5">
              <h3 className="font-semibold text-base mb-4">Details</h3>
              <div className="space-y-2 text-sm">
                <InfoRow label="Width" value={`${original?.width}px`} />
                <InfoRow label="Height" value={`${original?.height}px`} />
                <InfoRow
                  label="Date"
                  value={new Date(image.created_at).toDateString()}
                />
              </div>
            </div>

            <div className="rounded-xl border p-5">
              <h3 className="font-semibold text-base mb-4">Visual</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Dominant</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded border"
                      style={{
                        backgroundColor: image?.metadata?.dominant_color,
                      }}
                    />
                    <span>{image.metadata?.dominant_color}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">BlurHash</span>
                  <p className="break-all text-xs">
                    {image.metadata?.blurhash}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4">EXIF</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(image.metadata?.others || {}).map(
                ([key, value]) =>
                  (typeof value === "string" || typeof value === "number") && (
                    <div
                      key={key}
                      className="border rounded-lg p-3 bg-muted/30 text-sm"
                    >
                      <p className="text-xs text-muted-foreground">
                        {formatKey(key)}
                      </p>
                      <p className="font-medium mt-1">{String(value)}</p>
                    </div>
                  ),
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
