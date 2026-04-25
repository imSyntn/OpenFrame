import { Content, HeroSection } from "@/components/profile";
import React from "react";
import { Metadata } from "next";
import { ProfileType } from "@/@types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${id}`,
    );
    if (!res.ok) return {};
    const { data } = (await res.json()) as { data: ProfileType };

    return {
      title: `${data.name}`,
      description: data.bio || `Checkout ${data.name}'s profile on OpenFrame`,
      openGraph: {
        title: `${data.name}`,
        description: data.bio || `Checkout ${data.name}'s profile on OpenFrame`,
        images: data.avatar ? [{ url: data.avatar }] : [],
      },
      twitter: {
        card: "summary",
        title: `${data.name}`,
        description: data.bio || `Checkout ${data.name}'s profile on OpenFrame`,
        images: data.avatar ? [data.avatar] : [],
      },
    };
  } catch (error) {
    return {
      title: "User Profile",
    };
  }
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <HeroSection id={id} />
      <Content />
    </>
  );
}
