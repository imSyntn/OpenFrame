"use client";
import React, { useState } from "react";
import { TagSelector } from "./TagSelector";
import { TagDetail } from "./TagDetail";
import { MasonryGrid } from "./MasonryGrid";
import { useGetTags } from "@/hooks";

export function ExploreSection() {
  const { data: tags, isLoading, isError } = useGetTags();

  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-destructive">Something went wrong</p>
      </div>
    );
  }

  return (
    <div className="px-10 min-h-screen max-w-8xl mx-auto">
      <TagSelector tags={tags} loading={isLoading} />
      <TagDetail tags={tags} loading={isLoading} />

      <MasonryGrid />
    </div>
  );
}
