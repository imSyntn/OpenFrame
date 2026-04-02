"use client";

import {
  CollectionCard,
  CollecTionCardSkeleton,
} from "@/components/collection/CollectionCard";
import { useGetCollections } from "@/hooks";

export default function CollectionsGrid() {
  const { data: collections, isLoading, error } = useGetCollections();

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
