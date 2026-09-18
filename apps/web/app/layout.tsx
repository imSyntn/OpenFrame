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
  "The modern platform for images. Generate, upload, process, manage, share and download high-resolution images with AI in one place.";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "OpenFrame - Free AI Image Generator, Hosting & Image Platform",
    template: "%s | OpenFrame",
  },
  description: DESCRIPTION,
  keywords: [
    "AI image generator",
    "free image hosting",
    "image management platform",
    "stock photos",
    "AI art creation",
    "text to image",
    "open source image platform",
    "digital asset management",
    "photo gallery",
    "OpenFrame",
  ],
  authors: [{ name: "OpenFrame Team", url: APP_URL }],
  creator: "OpenFrame",
  publisher: "OpenFrame",
  category: "technology",
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "OpenFrame - Free AI Image Generator, Hosting & Image Platform",
    description: DESCRIPTION,
    url: APP_URL,
    siteName: "OpenFrame",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "OpenFrame - The Modern Platform for Images",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenFrame - Free AI Image Generator, Hosting & Image Platform",
    description: DESCRIPTION,
    site: "@imSyntn",
    creator: "@imSyntn",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "OpenFrame - The Modern Platform for Images",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
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
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "OpenFrame",
      alternateName: ["Open Frame", "OpenFrame Platform"],
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
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "OpenFrame",
      url: APP_URL,
      logo: `${APP_URL}/og.png`,
      sameAs: [
        "https://twitter.com/imSyntn",
        "https://github.com/imSyntn/OpenFrame",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "OpenFrame",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description: DESCRIPTION,
    },
  ];

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
            title="Developer API"
            description="The OpenFrame API is now available. You can use your API key to access the API."
          />
          <Feature
            storageKey="notice:ai-image-generation-added"
            title="AI Image Generation"
            description="Create stunning images with AI using simple text prompts. Choose a style, generate your image, and share it with the community gallery."
          />
          <Feature
            storageKey="notice:image-editing-added"
            title="Image Editing"
            description="Crop, resize, add filters, text, and more to your images with our built-in editor. AI-powered background removal and layer-based editing included."
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
