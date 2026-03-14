"use client";

import { AUTH_PAGE_IMAGES } from "@workspace/constants";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@workspace/ui/lib/utils";
import { toast } from "sonner";
import { Logo } from "../common";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  useEffect(() => {
    const random = Math.floor(Math.random() * AUTH_PAGE_IMAGES.length);
    setIndex(random);
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => toast.error(error), 50);
    }
  }, [error]);

  // if (index === null) return null;

  return (
    <div className="max-w-8xl mx-auto grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden lg:block">
        {!!index && (
          <Image
            src={AUTH_PAGE_IMAGES[index]!}
            alt="Blurry background"
            fill
            loading="lazy"
            className="object-cover blur-md opacity-20"
          />
        )}
        <div className="relative flex items-center justify-center h-full">
          {!!index && (
            <Image
              src={AUTH_PAGE_IMAGES[index]!}
              alt="Side image"
              width={420}
              height={750}
              priority
              onLoadingComplete={() => setVisible(true)}
              className={cn(
                "rounded-xl transition-all duration-500",
                visible ? "opacity-100 shadow-2xl" : "opacity-0 shadow-none",
              )}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <Logo />
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
    </div>
  );
}
