import { Header } from "@/components/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curated Image Collections & Galleries",
  description:
    "Browse curated image collections, themed visual albums, and user-submitted galleries on OpenFrame.",
  keywords: [
    "image collections",
    "photo albums",
    "curated gallery",
    "themed stock photos",
    "visual collections",
  ],
  openGraph: {
    title: "Curated Image Collections & Galleries | OpenFrame",
    description:
      "Browse curated image collections, themed visual albums, and user-submitted galleries on OpenFrame.",
  },
};

export default function CollectionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="min-h-screen max-w-8xl mx-auto pt-4 mb-10 md:mb-0 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 overflow-y-auto">
        {children}
      </div>
    </>
  );
}
