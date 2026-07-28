"use client";

import NotLoggedIn from "@/components/common/NotLoggedIn";
import { useUserStore } from "@/store";

export default function KeysPage() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <NotLoggedIn />;
  }

  return <h1>keys</h1>;
}
