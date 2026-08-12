"use client";

import {
  ActiveKeys,
  KeyDetails,
  KeysHeroSection,
  NotEligible,
} from "@/components/profile";
import { useGetApiKeys } from "@/hooks";
import { useProfileStore, useUserStore } from "@/store";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function KeysPage() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const userId = useUserStore((state) => state.id);
  const userProfileLoading = useProfileStore((state) => state.isLoading);
  const pictures = useProfileStore((state) => state._count?.pictures);
  const { data, isLoading } = useGetApiKeys(
    isLoggedIn && !userProfileLoading && !!pictures,
  );

  useEffect(() => {
    if (!isLoggedIn) {
      redirect("/");
    }
    if (isLoggedIn && userProfileLoading && userId) {
      redirect(`/profile/${userId}`);
    }
  }, [isLoggedIn, userProfileLoading]);

  const keys = data?.data?.keys ?? [];

  return (
    <main className="w-full max-w-8xl mx-auto px-6 md:px-8 my-10 space-y-6">
      <KeysHeroSection loading={isLoading} keys={keys || []} />
      {!!pictures && pictures >= 5 ? (
        <>
          <KeyDetails loading={isLoading} keys={keys || []} />
          <ActiveKeys keys={keys} loading={isLoading} />
        </>
      ) : (
        <NotEligible pictures={pictures ?? 0} />
      )}
    </main>
  );
}
