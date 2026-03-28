"use client";
import React, { useState } from "react";
import { TagSelector } from "./TagSelector";
import { TagDetail } from "./TagDetail";
import { MasonryGrid } from "./MasonryGrid";
import { useGetTags } from "@/hooks";

export function ExploreSection() {
  const { data: tags, isLoading, error } = useGetTags();
  const [selectedTag, setSelectedTag] = useState(0);

  return (
    <div className="px-10 min-h-screen max-w-8xl mx-auto">
      <TagSelector
        tags={tags}
        loading={isLoading}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <TagDetail tags={tags} selectedTag={selectedTag} loading={isLoading} />

      <MasonryGrid tags={tags} selectedTag={selectedTag} />
    </div>
  );
}
