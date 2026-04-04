import { Header } from "@/components/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | OpenFrame",
  description: "Profile",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60" />
      {children}
    </>
  );
}
