import { Header } from "@/components/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "API",
  description: "OpenFrame API documentation",
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
