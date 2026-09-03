"use client";

import React, { useState, useEffect, useRef } from "react";
import { LinkWithActiveState } from "./LinkWithActiveState";
import {
  Menu,
  X,
  Compass,
  FolderHeart,
  Search,
  Code,
  Info,
  LucideIcon,
  Home,
  Wand2,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { usePathname } from "next/navigation";

export interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon;
  badge?: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
  "/explore": Compass,
  "/collections": FolderHeart,
  "/search": Search,
  "/generate": Wand2,
  "/api": Code,
  "/about": Info,
};

export function MobileNav({ items }: { items: NavItem[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const navContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <div className="md:hidden" ref={navContainerRef}>
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0"
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? (
          <X className="h-5 w-5 transition-transform duration-200" />
        ) : (
          <Menu className="h-5 w-5 transition-transform duration-200" />
        )}
      </Button>

      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="fixed inset-x-0 top-14 z-60 flex flex-col gap-1 border-b bg-background/97 p-4"
        >
          <LinkWithActiveState
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Home className="h-4.5 w-4.5 text-muted-foreground" />
            <span>Home</span>
          </LinkWithActiveState>
          {items.map((item) => {
            const Icon = item.icon || ICON_MAP[item.href];
            return (
              <LinkWithActiveState
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                badge={item.badge}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {Icon && <Icon className="h-4.5 w-4.5 text-muted-foreground" />}
                <span>{item.label}</span>
              </LinkWithActiveState>
            );
          })}
        </nav>
      )}
    </div>
  );
}
