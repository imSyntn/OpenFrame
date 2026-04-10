import { useGetTags } from "@/hooks";
import React from "react";
import { ErrorOccured } from "../common";
import { TagSelector } from "./TagSelector";
import { TagDetail } from "./TagDetail";

export function TagsSection() {
  const { data: tags, isLoading, isError, error, refetch } = useGetTags();

  if (isError) {
    return (
      <ErrorOccured
        title={(error as any)?.response?.data?.message}
        description="Failed to load tags. Please try again."
        onClick={() => refetch()}
      />
    );
  }

  return (
    <>
      <TagSelector tags={tags} loading={isLoading} />
      <TagDetail tags={tags} loading={isLoading} />
    </>
  );
}
