import { Header } from "@/components/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pictures",
  description: "Pictures",
};

export default function PictureLayout({
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
