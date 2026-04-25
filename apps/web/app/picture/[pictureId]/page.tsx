import { ShowContent } from "@/components/picture";
import { notFound } from "next/navigation";
import React from "react";
import { Metadata } from "next";
import { PictureType } from "@/@types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pictureId: string }>;
}): Promise<Metadata> {
  const { pictureId } = await params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/picture/${pictureId}`,
    );
    if (!res.ok) return {};
    const { data } = (await res.json()) as { data: PictureType };

    const imageUrl = data?.src?.find(
      (s) => s.resolution === "SMALL" || s.resolution === "ORIGINAL",
    )?.url;

    return {
      title: data.title,
      description: data.description || `Check out ${data.title} on OpenFrame`,
      openGraph: {
        title: data.title,
        description: data.description || `Check out ${data.title} on OpenFrame`,
        images: imageUrl ? [{ url: imageUrl }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: data.title,
        description: data.description || `Check out ${data.title} on OpenFrame`,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: "Picture Not Found",
    };
  }
}

export default async function page({
  params,
}: {
  params: Promise<{ pictureId: string }>;
}) {
  const { pictureId } = await params;

  if (!pictureId) return notFound();
  return (
    <>
      <ShowContent pictureId={pictureId} />
    </>
  );
}
