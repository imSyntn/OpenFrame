"use client";

import { useGetReportById } from "@/hooks";
import { StatusLoading } from "./StatusLoading";
import { ErrorOccured } from "./ErrorOccured";
import { StatusCard } from "./StatusCard";

export function ReportStatusContent({ reportId }: { reportId: string }) {
  const { data, isLoading, error } = useGetReportById(reportId);

  const report = data?.data;

  if (isLoading) {
    return <StatusLoading />;
  }

  if (error || !report) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <ErrorOccured error={(error as any)?.response?.data?.message} />;
  }

  return <StatusCard report={report} />;
}
