import Link from "next/link";
import React from "react";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="text-lg font-semibold flex flex-nowrap gap-2 items-center tracking-tight hover:opacity-80 transition"
    >
      <img
        src="https://res.cloudinary.com/dqn1hcl8c/image/upload/v1773148286/logo_ffzwjo.webp"
        alt="Logo"
        className="h-7 w-7 dark:invert-100"
      />
      <p className="text-nowrap hidden md:inline-block">Open Frame</p>
    </Link>
  );
};
