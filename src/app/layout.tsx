// app/layout.tsx (lub pages/_app.tsx w starszych projektach Next.js)
import "./globals.css";
import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";

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
        <script src="https://accounts.google.com/gsi/client" async></script>
      </head>
      <body className="flex flex-col min-h-screen">
        <Providers>
          {/*{devMode && (*/}
          {/*    <div*/}
          {/*        className="fixed top-8 right-0 bg-red-600 text-white px-10 py-2 text-sm font-bold z-[9999] rotate-45 translate-x-10 -translate-y-2 shadow-lg">*/}
          {/*        DEV*/}
          {/*    </div>*/}
          {/*)}*/}

          <div className="flex flex-col flex-1 px-4">
            {/* NAVBAR */}
            <Navbar />

            <main className="mx-auto container flex flex-col pt-4">
              {children}
            </main>
          </div>

          {/* Footer */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
