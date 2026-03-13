"use client";
import { useRefreshToken } from "@/hooks";
import { useUserStore } from "@/store";
import React, { useEffect } from "react";

export function AutoLogin() {
  const setUser = useUserStore((state) => state.setUser);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const { data, isLoading, isError } = useRefreshToken();

  useEffect(() => {
    if (data && !isLoading && !isError && !isLoggedIn) {
      setUser({
        ...data,
        isLoggedIn: true,
      });
    }
  }, [data, isLoading, isError, isLoggedIn]);

  return null;
}
