"use client";

import { Header } from "@/components/common";
import { useUserStore } from "@/store";
import React from "react";
import { useRouter } from "next/navigation";
import { Content } from "@/components/submit";

export default function SubmitPage() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const router = useRouter();

  if (!isLoggedIn) {
    router.push("/login");
    return null;
  }

  return (
    <>
      <Header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60" />
      <Content />
    </>
  );
}
