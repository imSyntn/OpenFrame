"use client";

import { useUserStore } from "@/store";
import React from "react";
import { Content } from "@/components/submit";

export default function SubmitPage() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <Content />
    </>
  );
}
