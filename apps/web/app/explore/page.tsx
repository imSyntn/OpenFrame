"use client";
import { TagsSection, MasonryGrid } from "@/components/home";

export default function ExplorePage() {
  return (
    <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 min-h-screen max-w-8xl mx-auto mb-4">
      <TagsSection />
      <MasonryGrid />
    </div>
  );
}
