import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/session-wrapper";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

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
          <div className="bg-white">
            <div className="max-w-screen-2.5xl 2.5xl:mx-auto mx-4">
              <Header />
            </div>
          </div>

          <div className="max-w-screen-2.5xl 2.5xl:mx-auto mx-4">
            {children}
          </div>

          <div className="bg-black">
            <div className="max-w-screen-2.5xl 2.5xl:mx-auto mx-4 py-10">
              <Footer/>
            </div>
          </div>
          
        </body>
      </html>
    </SessionWrapper>
  );
}
