"use client";

import NotLoggedIn from "@/components/common/NotLoggedIn";
import { HeroSection, GenerateWorkspace } from "@/components/generate";
import { ImageGenerationProvider } from "@/components/Provider";
import { useUserStore } from "@/store";

export default function GenerateImagePage() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <NotLoggedIn message="Please login to generate images" />;
  }
  return (
    <main className="min-h-screen pb-24 ">
      <ImageGenerationProvider>
        <HeroSection />

        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 space-y-8">
          <GenerateWorkspace />
        </div>
      </ImageGenerationProvider>
    </main>
  );
}
