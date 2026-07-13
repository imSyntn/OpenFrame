import { Header } from "@/components/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile",
};

export default function ProfileLayout({
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
