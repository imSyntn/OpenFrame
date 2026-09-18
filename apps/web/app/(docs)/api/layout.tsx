import { Header } from "@/components/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer API Documentation",
  description:
    "Integrate image generation, hosting, processing, and retrieval capabilities into your applications using the OpenFrame REST API.",
  keywords: [
    "OpenFrame API",
    "image generation API",
    "image hosting API",
    "REST API documentation",
    "developer API",
  ],
  openGraph: {
    title: "Developer API Documentation | OpenFrame",
    description:
      "Integrate image generation, hosting, processing, and retrieval capabilities into your applications using the OpenFrame REST API.",
  },
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
