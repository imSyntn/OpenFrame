import React from "react";
import { useProfileStore } from "@/store";
import { StatCard } from "../StatCard";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { GalleryPhotosContainer } from "./GalleryPhotosContainer";

export function Gallery() {
  const count = useProfileStore((state) => state._count);
  const isLoading = useProfileStore((state) => state.isLoading);
  const metrics = useProfileStore((state) => state.metrics);

  return (
    <div className="flex flex-col md:flex-row gap-10 min-h-[60dvh]">
      <div className="flex flex-row md:flex-col gap-6 min-w-[200px]">
        <StatCard
          value={count?.pictures}
          label="Photos"
          isLoading={isLoading}
        />
        <StatCard
          value={metrics?.total_downloads}
          label="Downloads"
          headingClass="w-30"
          textClass="w-[100px]"
          isLoading={isLoading}
        />
        <StatCard
          value={metrics?.total_likes}
          label="Likes"
          headingClass="w-20"
          isLoading={isLoading}
        />
      </div>

      {isLoading ? (
        <Skeleton className="flex-1" />
      ) : (
        <div className="flex-1 border rounded-lg p-6">
          {count?.pictures === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p>No pictures available.</p>
            </div>
          ) : (
            <GalleryPhotosContainer />
          )}
        </div>
      )}
    </div>
  );
}
