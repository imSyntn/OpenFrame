import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/Toaster";
import { Footer, ImageModal } from "@/components/common";
import { ViewCollectionModal } from "@/components/collection";
import type { Metadata, Viewport } from "next";
import { Feature } from "@/components/common/notice";
import { GlobalProviders } from "@/components/Provider";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://openframe.page";

const DESCRIPTION =
  "The modern platform for images. Generate, upload, process, manage, share and download images in one place.";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "The Modern Platform for Images",
    template: "%s | OpenFrame",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "The Modern Platform for Images",
    description: DESCRIPTION,
    url: "/",
    siteName: "OpenFrame",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "OpenFrame — The Modern Platform for Images",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Modern Platform for Images",
    description: DESCRIPTION,
    site: "@imSyntn",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "OpenFrame — The Modern Platform for Images",
      },
    ],
  },
  icons: { icon: "/favicon.ico" },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
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
    description: DESCRIPTION,
    url: APP_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${APP_URL}/search?q={search_term_string}`,
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
        <GlobalProviders>
          <Feature
            storageKey="notice:api-added"
            title="API Added"
            description="The OpenFrame API is now available. You can use your API key to access the API."
          />
          <Feature
            storageKey="notice:ai-image-generation-added"
            title="AI Image Generation Added"
            description="Create stunning images with AI using simple text prompts. Choose a style, generate your image, and share it with the community gallery."
          />

          {children}
          <Toaster richColors />
          <ImageModal />
          <ViewCollectionModal />
          <Footer />
        </GlobalProviders>
      </body>
    </html>
  );
}
