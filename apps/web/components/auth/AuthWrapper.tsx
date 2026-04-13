import { AUTH_PAGE_IMAGES } from "@workspace/constants";
import Image from "next/image";
import { Logo } from "../common";
import { ImageEffect } from "./ImageEffect";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const index = Math.floor(Math.random() * AUTH_PAGE_IMAGES.length);
  return (
    <div className="max-w-8xl mx-auto grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src={AUTH_PAGE_IMAGES[index]!}
          alt="Blurry background"
          fill
          className="object-cover blur-md opacity-20"
        />

        <div className="relative flex items-center justify-center h-full">
          <ImageEffect src={AUTH_PAGE_IMAGES[index]!} />
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
