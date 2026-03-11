"use client";
import React, { useState } from "react";
import { TagSelector } from "./TagSelector";
import { TagDetail } from "./TagDetail";
import { MasonryGrid } from "./MasonryGrid";

export function ExploreSection() {
  const [tags, setTags] = useState<string[]>([
    "Trending",
    "Nature",
    "Architecture",
    "Minimal",
    "Travel",
    "Street",
    "Portrait",
    "Abstract",
    "Technology",
    "Food",
    "Animals",
    "Nature-2",
    "Architecture-2",
    "Minimal-2",
    "Travel-2",
    "Street-2",
    "Portrait-2",
    "Abstract-2",
    "Technology-2",
    "Food-2",
    "Animals-2",
  ]);
  const [selectedTag, setSelectedTag] = useState("Trending");

  return (
    <div className="px-10 min-h-screen max-w-8xl mx-auto">
      <TagSelector
        tags={tags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <TagDetail
        tag={selectedTag}
        src={
          "https://image.lexica.art/full_jpg/7b334c62-d5bc-4fa4-9eaa-db2232c57fd6"
        }
      />

      <MasonryGrid tag={selectedTag} />
    </div>
  );
}
