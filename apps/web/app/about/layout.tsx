import { Header } from "@/components/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About OpenFrame",
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
