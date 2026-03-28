import { tagsType } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";

export function TagDetail({
  tags,
  selectedTag,
  loading,
}: {
  tags: tagsType[];
  selectedTag: number;
  loading: boolean;
}) {
  return (
    <div className="relative flex h-72  flex-col items-center justify-center overflow-hidden rounded-xl border bg-muted/30 px-8 py-6 mb-10">
      {loading ? (
        <Skeleton className="absolute inset-0 h-full w-full object-cover opacity-20 blur-md" />
      ) : (
        <img
          src={tags[selectedTag]?.url || ""}
          alt="tag details"
          className="absolute inset-0 h-full w-full object-cover opacity-20 blur-md"
        />
      )}
      {loading ? (
        <Skeleton className="w-40 h-10" />
      ) : (
        <h2 className="text-3xl font-extrabold tracking-tight">
          {tags[selectedTag]?.name.toUpperCase() || "Explore"}
        </h2>
      )}

      <p className="mt-2 text-muted-foreground">
        Explore over <span className="font-semibold">1000+</span> beautiful
        photos.
      </p>

      <Button className="mt-4 rounded-full px-6 bg-chart-2">
        Submit your picture
      </Button>
    </div>
  );
}
