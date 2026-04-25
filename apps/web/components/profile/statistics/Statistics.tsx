"use client";

import { useProfileStore } from "@/store";
import { StatCard } from "../StatCard";

export function Statistics() {
  const metrics = useProfileStore((state) => state.metrics);
  const counts = useProfileStore((state) => state._count);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[60dvh]">
      <StatCard
        value={counts?.pictures}
        label="Photos"
        showGradient
        className="h-20"
      />
      <StatCard
        value={metrics?.total_downloads}
        label="Downloads"
        showGradient
        className="h-20"
      />
      <StatCard
        value={metrics?.total_likes}
        label="Likes"
        showGradient
        className="h-20"
      />
      {/* <StatCard value={metrics?.follower} label="Followers" showGradient />
      <StatCard value={metrics?.following} label="Following" showGradient /> */}
    </div>
  );
}
