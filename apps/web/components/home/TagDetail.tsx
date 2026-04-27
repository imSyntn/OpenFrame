"use client";
import { tagsType } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export function TagDetail({
  tags,
  loading,
}: {
  tags: tagsType[];
  loading: boolean;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const tag = params.get("tag");
  const tagData = tags?.find((t) => t.id === Number(tag));

  return (
    <div className="relative flex h-72  flex-col items-center justify-center overflow-hidden rounded-xl border bg-muted/30 px-8 py-6 mb-10">
      {loading ? (
        <Skeleton className="absolute inset-0 h-full w-full object-cover opacity-20 blur-md" />
      ) : (
        <img
          src={tagData?.url || undefined}
          alt="tag details"
          className="absolute inset-0 h-full w-full object-cover opacity-20 blur-md"
        />
      )}
      {loading ? (
        <Skeleton className="w-40 h-10" />
      ) : (
        <h2 className="text-3xl font-extrabold tracking-tight">
          {tagData?.name.toUpperCase() || "Explore"}
        </h2>
      )}

      <p className="mt-2 text-muted-foreground">
        Explore over <span className="font-semibold">1000+</span> beautiful
        photos.
      </p>

      <Button
        className="mt-4 rounded-full px-6 bg-chart-2"
        onClick={() => router.push("/submit")}
      >
        Submit your picture
      </Button>
    </div>
  );
}
