import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/Toaster";
import { Footer, ImageModal } from "@/components/common";
import { ViewCollectionModal } from "@/components/collection";
import { Metadata } from "next";
import { Feature } from "@/components/common/notice";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  title: {
    default: "OpenFrame",
    template: "%s | OpenFrame",
  },
  description:
    "The internet's source of freely usable images. Powered by creators everywhere.",
  openGraph: {
    title: "OpenFrame",
    description:
      "The internet's source of freely usable images. Powered by creators everywhere.",
    url: "/",
    images: [
      {
        url: "/og.png",
        alt: "OpenFrame",
      },
    ],
    siteName: "OpenFrame",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    images: [
      {
        url: "/og.png",
        alt: "OpenFrame",
      },
    ],
    card: "summary_large_image",
    title: "OpenFrame",
    description:
      "The internet's source of freely usable images. Powered by creators everywhere.",
  },
};

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OpenFrame",
    description:
      "The internet's source of freely usable images. Powered by creators everywhere.",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link
          rel="preconnect"
          href="https://open-frame.t3.tigrisfiles.io"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <Feature
            storageKey="notice:api-added"
            title="API Added"
            description="The OpenFrame API is now available. You can use your API key to access the API."
          />

          {children}
          <Toaster richColors />
          <ImageModal />
          <ViewCollectionModal />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
