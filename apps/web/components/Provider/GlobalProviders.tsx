"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@workspace/ui/components/tooltip";
import { useUserStore } from "@/store";
import * as Sentry from "@sentry/nextjs";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export function GlobalProviders({ children }: { children: React.ReactNode }) {
  const userId = useUserStore((state) => state.id);

  useEffect(() => {
    if (userId) {
      Sentry.setUser({
        id: userId,
      });
    } else {
      Sentry.setUser(null);
    }
  }, [userId]);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
