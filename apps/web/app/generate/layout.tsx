import { Header } from "@/components/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Image Generate",
  description:
    "Transform prompts into visual masterpieces with OpenFrame AI Image Generator. Create ultra-realistic artwork, photos, 3D renders, and digital illustrations.",
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
