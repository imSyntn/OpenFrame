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
      <Header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60" />
      <div className="pl-10 pr-7 min-h-screen max-w-8xl mx-auto pt-4">
        {children}
      </div>
    </>
  );
}
