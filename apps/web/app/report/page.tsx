"use client";

import { NotFound } from "@/components/common";
import NotLoggedIn from "@/components/common/NotLoggedIn";
import { Content } from "@/components/report";
import { useUserStore } from "@/store";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function ReportPage() {
  const { isLoggedIn } = useUserStore();
  const params = useSearchParams();
  const imageId = params.get("imageId");

  if (!isLoggedIn) {
    return <NotLoggedIn message="Please login to report this image" />;
  }

  if (!imageId) {
    return (
      <NotFound
        Icon={AlertCircle}
        title="Invalid image id"
        description="Please provide a valid image id"
      />
    );
  }

  return <Content imageId={imageId} />;
}
