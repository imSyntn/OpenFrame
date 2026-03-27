import { tagsType } from "@workspace/types";
import { Badge } from "@workspace/ui/components/badge";
import { Hash } from "lucide-react";

export function ImageTags({ tags }: { tags: tagsType[] }) {
  return (
    <>
      <p className="text-sm font-semibold text-muted-foreground mb-2">Tags</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag.id} variant="secondary">
            <Hash data-icon="inline-start" />
            {tag.name}
          </Badge>
        ))}
      </div>
    </>
  );
}
