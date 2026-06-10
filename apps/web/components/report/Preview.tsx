import { PictureType } from "@/@types";
import { ImageTags, PhotoWithBlurHash } from "../common";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@workspace/ui/components/badge";
import { tagsType } from "@workspace/types";
import { UploaderDetails } from "./UploaderDetails";

export function Preview({ image }: { image: PictureType }) {
  const original = image?.src?.find((s) => s.resolution === "ORIGINAL");

  const previewImage =
    image?.src?.find(
      (s) => s.resolution === "MEDIUM" || s.resolution === "LARGE",
    ) || original;

  const photo = {
    src: previewImage?.url,
    alt: image?.alt,
    width: original?.width,
    height: original?.height,
    blurhash: image?.metadata?.blurhash,
    user: image?.user,
  };

  const tags: tagsType[] = image.tags
    .filter((tag) => typeof tag !== "string")
    .map((tag) => tag.tag);

  return (
    <div className="w-full max-w-md shrink-0">
      <div className="overflow-hidden rounded-3xl border border-border/50 bg-card/40 p-3 shadow-2xl backdrop-blur-xl">
        <PhotoWithBlurHash
          photo={photo}
          hoverEffect={false}
          isPreview={false}
        />
      </div>

      <div className="mt-5 space-y-4 px-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="line-clamp-1 text-xl font-semibold text-foreground">
              {image.title}
            </h2>

            <Badge className="border-0 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {formatDistanceToNow(new Date(image.created_at), {
                addSuffix: true,
              })}
            </Badge>
          </div>

          {image.description && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {image.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border/50 bg-secondary/30 p-3">
            <p className="text-xs text-muted-foreground">Resolution</p>

            <p className="mt-1 text-sm font-medium text-foreground">
              {original?.width} × {original?.height}
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-secondary/30 p-3">
            <p className="text-xs text-muted-foreground">License</p>

            <p className="mt-1 line-clamp-1 text-sm font-medium text-foreground">
              {image.license.replaceAll("_", " ")}
            </p>
          </div>
        </div>

        <UploaderDetails userId={image.user_id} />

        {image.tags?.length > 0 && <ImageTags tags={tags} />}

        <p className="text-xs leading-relaxed text-muted-foreground">
          Please review the image carefully before submitting a report. False or
          abusive reports may be moderated.
        </p>
      </div>
    </div>
  );
}
