import Link from "next/link";
import React from "react";
import { Input } from "@workspace/ui/components/input";
import { Search } from "lucide-react";
import { Logo } from "../Logo";
import { cn } from "@workspace/ui/lib/utils";
import { HeaderRight } from "./HeaderRight";

export function Header({ className }: { className?: string }) {
  return (
    <header className={cn("h-14 w-full border-b", className)}>
      <div className="max-w-8xl mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 md:gap-6">
          <Logo />

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/explore"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Explore
            </Link>

            <Link
              href="/collections"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Collections
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative w-[160px] sm:w-[220px] md:w-[300px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search..."
              className="pl-9 rounded-xl bg-muted/40 focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <HeaderRight />
        </div>
      </div>
    </header>
  );
}
