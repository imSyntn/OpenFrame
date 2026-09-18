import { Header } from "@/components/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Image",
  description:
    "Edit and enhance your images with OpenFrame's powerful image editor. Crop, resize, remove backgrounds, apply filters and fine-tune your photos effortlessly.",
  keywords: [
    "image editor",
    "photo editing tool",
    "edit images online",
    "crop and resize photos",
    "background removal",
    "remove image background",
    "image filters",
  ],
  openGraph: {
    title: "Edit Image",
    description:
      "Edit and enhance your images with OpenFrame's powerful image editor. Crop, resize, remove backgrounds, apply filters, and fine-tune your photos effortlessly.",
  },
};

export default function EditLayout({
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
