import { Header } from "@/components/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore High-Resolution Stock Photos & AI Art",
  description:
    "Explore thousands of freely usable, high-resolution photos, illustrations, and AI-generated artwork on OpenFrame.",
  keywords: [
    "explore stock photos",
    "free high resolution images",
    "AI generated gallery",
    "royalty free images",
    "community photos",
  ],
  openGraph: {
    title: "Explore High-Resolution Stock Photos & AI Art | OpenFrame",
    description:
      "Explore thousands of freely usable, high-resolution photos, illustrations, and AI-generated artwork on OpenFrame.",
  },
};

export default function ExploreLayout({
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
