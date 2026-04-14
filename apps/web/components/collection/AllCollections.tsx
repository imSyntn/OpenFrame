import React from "react";
import { CollectionCard, CollecTionCardSkeleton } from "./CollectionCard";
import { useGetCollections } from "@/hooks";
import { Button } from "@workspace/ui/components/button";
import { ErrorOccured, NotFound } from "../common";
import { FileX } from "lucide-react";

export function AllCollections() {
  const {
    data,
    isLoading,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetCollections();

  if (isError) {
    return (
      <ErrorOccured
        title={(error as any)?.response?.data?.message}
        className="min-h-[calc(100vh-200px)]"
        onClick={() => refetch()}
      />
    );
  }

  const collections = data?.pages.flatMap((page) => page.data) ?? [];

  if (!isLoading && collections.length == 0) {
    return (
      <NotFound
        Icon={FileX}
        title="No collections found"
        description="No collections found."
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] justify-items-center gap-6">
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
