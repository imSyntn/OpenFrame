import React from "react";
import { CollectionCard, CollecTionCardSkeleton } from "./CollectionCard";
import { useGetUserCollections } from "@/hooks";
import { useUserStore } from "@/store";
import { ErrorOccured, NotFound } from "../common";
import { FileX } from "lucide-react";

export function ShowUserCollections({ id }: { id?: string }) {
  const userId = useUserStore((state) => state.id);
  const {
    data: collections,
    isLoading,
    error,
    isError,
    refetch,
  } = useGetUserCollections(id || userId);

  if (isError) {
    return (
      <ErrorOccured
        title={(error as any)?.response?.data?.message}
        className="min-h-[calc(100vh-200px)]"
        onClick={() => refetch()}
      />
    );
  }

  if (!isLoading && collections?.data.length == 0) {
    return (
      <NotFound
        Icon={FileX}
        className="min-h-[calc(100vh-200px)]"
        title="No collections found"
        description="You haven't created any collections yet."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
      {isLoading &&
        Array.from({ length: 8 }).map((_, i) => (
          <CollecTionCardSkeleton key={i} />
        ))}

      {collections?.data.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
}

export function MyCollections() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-semibold">
          Please login to view/create your collections
        </h2>
      </div>
    );
  }

  return <ShowUserCollections />;
}
