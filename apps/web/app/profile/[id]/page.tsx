import { Header } from "@/components/common";
import { Content, HeroSection } from "@/components/profile";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <Header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60" />
      <HeroSection id={id} />
      <Content />
    </>
  );
}
