"use client";

import React from "react";
import { MasonryGrid } from "./MasonryGrid";
import { TagsSection } from "./TagsSection";

export function ExploreSection() {
  return (
    <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 min-h-screen max-w-8xl mx-auto">
      <TagsSection />
      <MasonryGrid />
    </div>
  );
}
