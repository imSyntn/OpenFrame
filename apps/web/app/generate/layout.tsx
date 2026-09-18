import { Header } from "@/components/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Image Generator — Create Images from Text Prompts",
  description:
    "Transform prompts into visual masterpieces with OpenFrame AI Image Generator. Create ultra-realistic artwork, photos, 3D renders, and digital illustrations for free.",
  keywords: [
    "AI image generator",
    "text to image AI",
    "free AI image creation",
    "prompt generator",
    "AI artwork creator",
    "digital art generator",
  ],
  openGraph: {
    title: "AI Image Generator — Create Images from Text Prompts | OpenFrame",
    description:
      "Transform prompts into visual masterpieces with OpenFrame AI Image Generator. Create ultra-realistic artwork, photos, 3D renders, and digital illustrations.",
  },
};

export default function GenerateLayout({
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
