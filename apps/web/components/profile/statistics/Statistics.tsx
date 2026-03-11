"use client";

import { useProfileStore } from "@/store";
import { StatCard } from "../StatCard";

export function Statistics() {
  const metrics = useProfileStore((state) => state.metrics);
  const counts = useProfileStore((state) => state._count);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatCard value={counts?.pictures} label="Photos" />
        <StatCard value={metrics?.total_downloads} label="Downloads" />
        <StatCard value={metrics?.total_likes} label="Likes" />
        <StatCard value={metrics?.follower} label="Followers" />
        <StatCard value={metrics?.following} label="Following" />
      </div>

      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Engagement Overview</h3>

        <div className="flex items-center justify-center h-[200px] text-muted-foreground">
          Charts coming soon
        </div>
      </div>
    </div>
  );
}
