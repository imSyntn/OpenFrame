import { useGetReports } from "@/hooks";
import React from "react";
import { ReportCard } from "./ReportCard";

export function ReportContent() {
  const { data, isLoading, error } = useGetReports();

  const reports = data?.data;
  return (
    <div className="min-h-[60dvh] rounded-xl border p-6">
      {isLoading ? (
        <div className="flex min-h-[50dvh] items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      ) : error ? (
        <div className="flex min-h-[50dvh] items-center justify-center">
          <p className="text-sm text-destructive">Failed to load reports.</p>
        </div>
      ) : reports?.length === 0 ? (
        <div className="flex min-h-[50dvh] items-center justify-center">
          <p className="text-sm text-muted-foreground">No reports found.</p>
        </div>
      ) : (
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]">
          {reports?.map((item: any) => (
            <ReportCard key={item.id} report={item} />
          ))}
        </div>
      )}
    </div>
  );
}
