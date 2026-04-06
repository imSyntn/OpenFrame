import { CollectionPageContent } from "@/components/collection/viewCollection/CollectionPageContent";
import React from "react";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collectionId: string }>;
}) {
  const { collectionId } = await params;
  return <CollectionPageContent collectionId={collectionId} />;
}
