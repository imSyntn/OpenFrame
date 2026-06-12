"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@workspace/ui/lib/utils";

export function ImageEffect({
  src,
  blurredImage,
}: {
  src: string;
  blurredImage: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <Image
      placeholder="blur"
      blurDataURL={blurredImage}
      src={src}
      alt="Side image"
      width={420}
      height={750}
      onLoad={() => setVisible(true)}
      className={cn(
        "rounded-xl transition-all duration-500",
        visible ? "opacity-100 shadow-2xl" : "opacity-0 shadow-none",
      )}
    />
  );
}
