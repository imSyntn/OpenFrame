import { NotFound } from "@/components/common";
import { StickyNote } from "lucide-react";
import React from "react";

export default function ReportStatusWithoutIdPage() {
  return (
    <NotFound
      Icon={StickyNote}
      title="Report not found"
      description="The report you are looking for does not exist."
    />
  );
}
