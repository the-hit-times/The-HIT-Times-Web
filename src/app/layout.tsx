import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/session-wrapper";
import Header from "@/components/common/header";

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
        <body className={inter.className + " bg-body"}>
          {
            // TODO: Add a header component here
          }
          <div className="bg-white">
            <div className="max-w-screen-2.5xl 2.5xl:mx-auto mx-4">
              <Header />
            </div>
          </div>
          <div className="max-w-screen-2.5xl 2.5xl:mx-auto mx-4">
            {children}
          </div>
          {
            // TODO: Add a footer component here
          }
          <footer className="bg-black">Footer</footer>
        </body>
      </html>
    </SessionWrapper>
  );
}
