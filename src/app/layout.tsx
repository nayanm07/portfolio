import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ElasticCursor from "@/components/ui/ElasticCursor";
import Particles from "@/components/Particles";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header/header";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/footer/footer";
import Script from "next/script";
import EasterEggs from "@/components/easter-eggs";
import ContextMenu from "@/components/aw/context-menu";
import { config } from "@/data/config";
import SocketContextProvider from "@/contexts/socketio";
import RemoteCursors from "@/components/realtime/remote-cursors";

// Social preview images come from src/app/opengraph-image.tsx (picked up automatically)
export const metadata: Metadata = {
  metadataBase: new URL(config.site),
  title: config.title,
  description: config.description.long,
  keywords: config.keywords,
  authors: [{ name: config.author }],
  openGraph: {
    title: config.title,
    description: config.description.short,
    url: config.site,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Sans font: same stack as awrs.me ("Inter", system-ui, sans-serif — see globals.css),
// deliberately not downloaded, so it renders identically to awrs.me (Segoe UI on Windows).
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} font-sans dark`}
    >
      <head>
        <Script
          defer
          src={process.env.UMAMI_DOMAIN}
          data-website-id={process.env.UMAMI_SITE_ID}
        ></Script>
        {/* <Analytics /> */}
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {/* <Particles
            className="fixed inset-0 -z-10 animate-fade-in"
            quantity={100}
          /> */}
          {/* <SocketContextProvider> */}
          <RemoteCursors />
          <TooltipProvider>
            <Header />
            {children}
            <Footer />
          </TooltipProvider>
          {/* </SocketContextProvider> */}
          <Toaster />
          <EasterEggs />
          <ContextMenu />
          {/* <ElasticCursor /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
