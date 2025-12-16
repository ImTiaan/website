import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://imtiaan.com"),
  title: {
    default: "Imtiaan Wolmarans | Financial OS Architect",
    template: "%s | Imtiaan Wolmarans",
  },
  description: "Personal portfolio and operating system of Imtiaan Wolmarans. Exploring the future of fintech, programmable money, and sovereign digital infrastructure.",
  keywords: [
    "Fintech",
    "Product Manager",
    "COO",
    "Blockchain",
    "Stablecoins",
    "Fintra",
    "Operating System",
    "Next.js",
    "React",
    "Imtiaan Wolmarans",
  ],
  authors: [{ name: "Imtiaan Wolmarans", url: "https://imtiaan.com" }],
  creator: "Imtiaan Wolmarans",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://imtiaan.com",
    title: "Imtiaan Wolmarans | Financial OS Architect",
    description: "Personal portfolio and operating system of Imtiaan Wolmarans. Exploring the future of fintech, programmable money, and sovereign digital infrastructure.",
    siteName: "tOS",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Imtiaan Wolmarans - Financial OS Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imtiaan Wolmarans | Financial OS Architect",
    description: "Building the future of sovereign financial infrastructure. Explore the OS.",
    creator: "@t333btc", // Assuming this handle based on user path, or placeholder
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white overflow-hidden selection:bg-emerald-500/30">
        {children}
      </body>
    </html>
  );
}
