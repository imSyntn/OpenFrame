"use client";

import { PhotoScreen } from "@/components/edit";
import { useSearchParams } from "next/navigation";

export default function EditPage() {
  const searchParams = useSearchParams();
  const image = searchParams.get("image");
  return <PhotoScreen image={image} />;
}
