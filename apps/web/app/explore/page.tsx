"use client";
import { TagSelector, TagDetail, MasonryGrid } from "@/components/home";
import { useGetTags } from "@/hooks";

export default function ExplorePage() {
  const { data: tags, isLoading } = useGetTags();
  return (
    <div className="px-10 min-h-screen max-w-8xl mx-auto mb-4">
      <TagSelector tags={tags} loading={isLoading} />
      <TagDetail tags={tags} loading={isLoading} />
      <MasonryGrid />
    </div>
  );
}
