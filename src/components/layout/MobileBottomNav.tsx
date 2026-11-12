"use client";

import { dropdownsToSections } from "@/components/weekly-portion/WeeklyPortion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  BookOpen,
  Home,
  LogOut,
  MoreHorizontal,
  Radio,
  User,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MobileSheet } from "./MobileSheet";

const sectionLinks = Object.entries(dropdownsToSections).map(([code, name]) => ({
  label: name,
  href: `/posts/category/${code}`,
}));

const moreLinks = [
  { label: "Bookmarks", href: "/my-bookmarks", icon: Bookmark },
  { label: "Alumni", href: "/alumni", icon: User },
  { label: "Tabloids", href: "/tabloids", icon: BookOpen },
  { label: "Recruitment", href: "/recruitment", icon: User },
  { label: "About", href: "/about-us", icon: User },
  { label: "Subscribe", href: "/tht-links", icon: BookOpen },
];

type TabId = "home" | "read" | "matches" | "more";

function getActiveTab(pathname: string): TabId {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/posts")) return "read";
  if (pathname.startsWith("/matches")) return "matches";
  return "more";
}

function NavTab({
  active,
  label,
  href,
  onClick,
  children,
}: {
  active: boolean;
  label: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const className = cn(
    "relative flex h-full flex-1 flex-col items-center justify-center gap-0.5",
    "transition-colors active:opacity-70",
    active ? "text-foreground" : "text-muted-foreground"
  );

  const content = (
    <>
      {active && (
        <span
          className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-foreground"
          aria-hidden
        />
      )}
      {children}
      <span className="text-[11px] font-medium leading-none tracking-tight">{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} aria-current={active ? "page" : undefined}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className} aria-label={label}>
      {content}
    </button>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sectionsOpen, setSectionsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const active = getActiveTab(pathname);

  return (
    <>
      <nav
        className="mobile-bottom-nav fixed inset-x-0 bottom-0 z-40 lg:hidden"
        aria-label="Primary"
      >
        <div className="border-t border-border bg-background/98 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/90">
          <div className="mx-auto flex h-[var(--mobile-nav-height)] max-w-md items-stretch px-1">
            <NavTab active={active === "home"} label="Home" href="/">
              <Home className="h-[22px] w-[22px]" strokeWidth={active === "home" ? 2 : 1.5} />
            </NavTab>

            <NavTab
              active={active === "read"}
              label="Read"
              onClick={() => setSectionsOpen(true)}
            >
              <BookOpen className="h-[22px] w-[22px]" strokeWidth={active === "read" ? 2 : 1.5} />
            </NavTab>

            <NavTab active={active === "matches"} label="Matches" href="/matches">
              <Radio className="h-[22px] w-[22px]" strokeWidth={active === "matches" ? 2 : 1.5} />
            </NavTab>

            <NavTab active={active === "more"} label="More" onClick={() => setMoreOpen(true)}>
              <MoreHorizontal
                className="h-[22px] w-[22px]"
                strokeWidth={active === "more" ? 2 : 1.5}
              />
            </NavTab>
          </div>
        </div>
      </nav>

      <MobileSheet open={sectionsOpen} onOpenChange={setSectionsOpen} title="Sections">
        <p className="mb-4 text-sm text-muted-foreground">
          Browse stories by editorial section.
        </p>
        <ul className="divide-y divide-border border border-border">
          {sectionLinks.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setSectionsOpen(false)}
                  className={cn(
                    "flex min-h-[52px] items-center justify-between px-4 text-sm transition-colors active:bg-accent",
                    isActive ? "bg-accent font-medium text-foreground" : "text-foreground"
                  )}
                >
                  {item.label}
                  {isActive && <span className="text-xs text-muted-foreground">Current</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </MobileSheet>

      <MobileSheet open={moreOpen} onOpenChange={setMoreOpen} title="More">
        <ul className="divide-y divide-border border border-border">
          {moreLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMoreOpen(false)}
                className="flex min-h-[52px] items-center gap-3 px-4 text-sm active:bg-accent"
              >
                <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-4 border border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Appearance</span>
            <ThemeToggle />
          </div>
          {session ? (
            <button
              type="button"
              onClick={() => {
                setMoreOpen(false);
                signOut();
              }}
              className="flex min-h-[44px] w-full items-center gap-2 text-sm text-muted-foreground active:opacity-70"
            >
              <LogOut className="h-4 w-4" />
              Sign out ({session.user?.name?.split(" ")[0] ?? "Account"})
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMoreOpen(false);
                signIn(undefined, { callbackUrl: pathname });
              }}
              className="flex min-h-[44px] w-full items-center gap-2 text-sm font-medium active:opacity-70"
            >
              <User className="h-4 w-4" />
              Sign in
            </button>
          )}
        </div>

        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          © {new Date().getFullYear()} The HIT Times
        </p>
      </MobileSheet>
    </>
  );
}

/** In-flow spacer — reserves room for the fixed mobile bottom nav. */
export function MobileBottomNavSpacer() {
  return <div className="mobile-bottom-nav-spacer shrink-0 lg:hidden" aria-hidden="true" />;
}
