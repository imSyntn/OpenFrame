import React from "react";

export function Footer() {
  return (
    <footer className="border-t bg-background mx-auto max-w-8xl px-6 pt-10 pb-4">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-lg font-semibold">OpenFrame</p>
          <p className="text-sm text-muted-foreground">
            Free high-resolution photos for creators.
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="/explore" className="hover:text-foreground transition">
            Explore
          </a>
          <a href="/collections" className="hover:text-foreground transition">
            Collections
          </a>
          <a href="/about" className="hover:text-foreground transition">
            About
          </a>
          <a
            href="https://www.sayantan.online/#contact"
            target="_blank"
            className="hover:text-foreground transition"
          >
            Contact
          </a>
        </div>
      </div>
      <div className="text-center text-sm text-muted-foreground mt-6">
        © {new Date().getFullYear()} OpenFrame. All rights reserved.
      </div>
    </footer>
  );
}
