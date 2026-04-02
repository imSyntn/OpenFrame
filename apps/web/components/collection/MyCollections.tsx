import React from "react";
import { CollectionCard, CollecTionCardSkeleton } from "./CollectionCard";
import { useGetUserCollections } from "@/hooks";
import { useUserStore } from "@/store";

function ShowUserCollections() {
  const userId = useUserStore((state) => state.id);
  const { data: collections, isLoading, error } = useGetUserCollections(userId);

  if (error) {
    return <div className="text-red-500">Something went wrong</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
          Please login to view your collections
        </h2>
      </div>
    );
  }

  return <ShowUserCollections />;
}
