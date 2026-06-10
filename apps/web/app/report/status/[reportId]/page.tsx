import { ReportStatusContent } from "@/components/report/status";
import React from "react";

export default async function ReportStatusPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const reportId = (await params).reportId;

  return <ReportStatusContent reportId={reportId} />;
}
