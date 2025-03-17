import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import SessionWrapper from "@/components/session-wrapper";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The HIT Times",
  description: "The official website of the The HIT Times.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
      <body className={inter.className + " bg-slate-200 dark:bg-gray-800 text-gray-900 dark:text-white"}>
          <div className="bg-slate-200 dark:bg-gray-700">
            <div className="max-w-screen-2.5xl 2.5xl:mx-auto mx-4">
              <Header />
            </div>
          </div>

          <div className="max-w-screen-2.5xl 2.5xl:mx-auto  sm:mx-4 overflow-x-hidden sm:overflow-x-visible overflow-y-visible scroll-smooth">
              {children}
          </div>

          <div className="bg-black dark:bg-gray-950">
            <div className="max-w-screen-2.5xl 2.5xl:mx-auto mx-4 py-10">
              <Footer />
            </div>
          </div>

          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </SessionWrapper>
  );
}
