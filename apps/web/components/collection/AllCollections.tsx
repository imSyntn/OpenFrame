import React from "react";
import { CollectionCard, CollecTionCardSkeleton } from "./CollectionCard";
import { useGetCollections } from "@/hooks";
import { Button } from "@workspace/ui/components/button";

export function AllCollections() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCollections();

  if (error) {
    return (
      <div className="text-destructive text-center">Something went wrong</div>
    );
  }
  const collections = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <CollecTionCardSkeleton key={i} />
          ))}

        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
      <div className="w-full flex justify-center my-4">
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </Button>
      </div>
    </>
  );
}
