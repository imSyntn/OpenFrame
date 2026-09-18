import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/logo-full.svg"
        alt="Logo"
        width={140}
        height={40}
        className="block md:hidden lg:block"
      />
      <Image
        src="/logo-small.png"
        alt="Logo"
        width={40}
        height={40}
        className="hidden md:block lg:hidden"
      />
    </Link>
  );
};
