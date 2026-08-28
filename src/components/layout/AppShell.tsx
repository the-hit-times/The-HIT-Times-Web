"use client";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import {
  MobileBottomNav,
  MobileBottomNavSpacer,
} from "@/components/layout/MobileBottomNav";
import { usePathname } from "next/navigation";
import { TopCategoryNav } from "./TopCategoryNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin-portal");
  const isGame = pathname.startsWith("/game");

  if (isGame) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <main className="flex-1 w-full h-full">
          {children}
        </main>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-border">
          <div className="mx-auto max-w-screen-2.5xl px-4">
            <Header />
          </div>
        </header>
        <main className="mx-auto w-full max-w-screen-2.5xl flex-1 px-4 py-8">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopCategoryNav />
      <main className="mx-auto w-full min-w-0 max-w-7xl flex-1 overflow-x-clip px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {children}
      </main>
      <footer className="mx-auto hidden w-full min-w-0 max-w-7xl overflow-x-clip border-t border-border px-6 pt-10 md:block md:px-8 lg:pb-10">
        <Footer />
      </footer>
      <MobileBottomNavSpacer />
      <MobileBottomNav />
    </div>
  );
}
