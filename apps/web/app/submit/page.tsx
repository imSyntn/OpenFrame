"use client";

import { useUserStore } from "@/store";
import React from "react";
import { Content } from "@/components/submit";
import NotLoggedIn from "@/components/common/NotLoggedIn";

export default function SubmitPage() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <NotLoggedIn message="Please login to submit images" />;
  }

  return (
    <>
      <Content />
    </>
  );
}
