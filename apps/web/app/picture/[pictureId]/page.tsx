import { ShowContent } from "@/components/picture";
import { notFound } from "next/navigation";
import React from "react";

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
