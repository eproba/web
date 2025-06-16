// app/layout.tsx (lub pages/_app.tsx w starszych projektach Next.js)
import "./globals.css";
import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";
import { ThemedToastContainer } from "@/components/themed-toast-container";
import NextTopLoader from "nextjs-toploader";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Epróba",
  description:
    "Epróba – kompleksowy system zarządzania próbami na stopnie w drużynie harcerskiej.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const devMode = process.env.NODE_ENV !== 'production'

  return (
    <html lang="pl" suppressHydrationWarning={true}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="google-site-verification"
          content="Oa-8rANmBab3FrKyY44hIe4K1937-KdaX9UEZLJs9bg"
        />
        <link
          rel="icon"
          href="/images/icons/favicon.svg"
          type="image/svg+xml"
        />
        <GoogleTagManager gtmId="GTM-NN3D54WV" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <NextTopLoader color="#1abc9c" />
          {/*{devMode && (*/}
          {/*    <div*/}
          {/*        className="fixed top-8 right-0 bg-red-600 text-white px-10 py-2 text-sm font-bold z-[9999] rotate-45 translate-x-10 -translate-y-2 shadow-lg">*/}
          {/*        DEV*/}
          {/*    </div>*/}
          {/*)}*/}

          <div className="flex flex-col flex-1 p-2 md:p-4">
            {/* NAVBAR */}
            <Navbar />

            <main className="mx-auto container md:px-16 flex flex-col pt-4 mb-24">
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
