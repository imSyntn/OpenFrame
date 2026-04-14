import { Header } from "@/components/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenFrame",
  description:
    "The internet's source of freely usable images. Powered by creators everywhere.",
};

export default function MainLayout({
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
