import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import { ThemedToastContainer } from "@/components/themed-toast-container";
import { GoogleTagManager } from "@next/third-parties/google";
import { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";

const APP_NAME = "Epróba";
const APP_DEFAULT_TITLE = "Epróba";
const APP_TITLE_TEMPLATE = "%s - Epróba";
const APP_DESCRIPTION =
  "Epróba – kompleksowy system zarządzania próbami na stopnie w drużynie harcerskiej.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: "https://eproba.zhr.pl/og-image.png",
        width: 1200,
        height: 630,
        alt: APP_DEFAULT_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: "https://eproba.zhr.pl/og-image.png",
        width: 1200,
        height: 630,
        alt: APP_DEFAULT_TITLE,
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "oklch(0.97 0 0)" },
    {
      media: "(prefers-color-scheme: dark)",
      color: "oklch(0.22 0.016 256.816)",
    },
  ],
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin-ext"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const devMode = process.env.NODE_ENV !== 'production'

  return (
    <html
      lang="pl"
      suppressHydrationWarning={true}
      className={spaceGrotesk.className}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="google-site-verification"
          content="Oa-8rANmBab3FrKyY44hIe4K1937-KdaX9UEZLJs9bg"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <GoogleTagManager gtmId="GTM-NN3D54WV" />
      </head>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <NextTopLoader color="#1abc9c" />
          {/*{devMode && (*/}
          {/*    <div*/}
          {/*        className="fixed top-8 right-0 bg-red-600 text-white px-10 py-2 text-sm font-bold z-[9999] rotate-45 translate-x-10 -translate-y-2 shadow-lg">*/}
          {/*        DEV*/}
          {/*    </div>*/}
          {/*)}*/}

          <div className="flex flex-1 flex-col p-2 md:p-4">
            {/* NAVBAR */}
            <Navbar />

            <main className="container mx-auto mb-24 flex flex-col pt-4 md:px-16">
              {children}
            </main>
          </div>

          <ThemedToastContainer />

          {/* Footer */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
