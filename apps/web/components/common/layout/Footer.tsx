import { Heart } from "lucide-react";
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
        <p className="text-muted-foreground mt-3 flex items-center gap-1.5">
          built with
          <span>
            <Heart className="text-red-500" size={20} />
          </span>
          by
          <a
            href="https://sayantan.online"
            target="_blank"
            className="relative font-semibold text-foreground group ml-1"
            rel="noreferrer"
          >
            @imsyntn
            <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
        </p>
      </div>
      <div className="text-center text-sm text-muted-foreground mt-6">
        &copy; {new Date().getFullYear()} OpenFrame. All rights reserved.
      </div>
    </footer>
  );
}
