import { tagsType } from "@workspace/types";
import { Badge } from "@workspace/ui/components/badge";
import { Hash } from "lucide-react";

export function BaseTag({ tag }: { tag: tagsType }) {
  return (
    <Badge variant="secondary">
      <Hash data-icon="inline-start" />
      {tag.name}
    </Badge>
  );
}

export function TransparentTag({ tag }: { tag: tagsType }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-md">
      #{tag.name}
    </span>
  );
}

export function ImageTags({
  tags,
  showTitle = true,
}: {
  tags: tagsType[];
  showTitle?: boolean;
}) {
  return (
    <>
      {showTitle && (
        <p className="text-sm font-semibold text-muted-foreground mb-2">Tags</p>
      )}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <BaseTag key={tag.id} tag={tag} />
        ))}
      </div>
    </>
  );
}
