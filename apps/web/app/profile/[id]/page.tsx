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
      <Header />
      <HeroSection id={id} />
      <Content />
    </>
  );
}
