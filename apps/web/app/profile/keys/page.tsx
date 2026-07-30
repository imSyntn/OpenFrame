"use client";

import NotLoggedIn from "@/components/common/NotLoggedIn";
import { ActiveKeys, KeyDetails, KeysHeroSection } from "@/components/profile";
import { useGetApiKeys } from "@/hooks";
import { useUserStore } from "@/store";

export default function KeysPage() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const { data, isLoading } = useGetApiKeys(isLoggedIn);

  if (!isLoggedIn) {
    return <NotLoggedIn />;
  }

  const keys = data?.data?.keys ?? [];

  return (
    <main className="w-full max-w-8xl mx-auto px-6 md:px-8 my-10 space-y-6">
      <KeysHeroSection loading={isLoading} keys={keys || []} />
      <KeyDetails loading={isLoading} keys={keys || []} />
      <ActiveKeys keys={keys} loading={isLoading} />
    </main>
  );
}
