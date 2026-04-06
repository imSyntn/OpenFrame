import { Header } from "@/components/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections | OpenFrame",
  description: "Collections",
};

export default function CollectionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="pl-10 pr-7 h-screen max-w-8xl mx-auto pt-4 mb-10 md:mb-0">
        {children}
      </div>
    </>
  );
}
