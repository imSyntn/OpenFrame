import { Header } from "@/components/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About OpenFrame — Open-Source Image Platform",
  description:
    "Learn about OpenFrame, an open-source platform designed for generating, hosting, processing, and sharing images.",
  keywords: [
    "about OpenFrame",
    "open source image platform",
    "AI image platform mission",
    "image management software",
  ],
  openGraph: {
    title: "About OpenFrame — Open-Source Image Platform",
    description:
      "Learn about OpenFrame, an open-source platform designed for generating, hosting, processing, and sharing images.",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
