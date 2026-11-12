"use client";

import { dropdownsToSections } from "@/components/weekly-portion/WeeklyPortion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { ChevronDown, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { SiteLogo } from "@/components/common/SiteLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "Alumni", href: "/alumni" },
  { label: "Matches", href: "/matches" },
  { label: "Tabloids", href: "/tabloids" },
  { label: "Bookmarks", href: "/my-bookmarks" },
];

const moreLinks = [
  { label: "Recruitment", href: "/recruitment" },
  { label: "About", href: "/about-us" },
  { label: "Subscribe", href: "/tht-links" },
];

const sectionLinks = Object.entries(dropdownsToSections).map(([code, name]) => ({
  label: name,
  href: `/posts/category/${code}`,
}));

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={cn(
        "nav-editorial relative shrink-0 whitespace-nowrap pb-1",
        isActive && "nav-editorial-active"
      )}
    >
      {label}
      {isActive && <span className="nav-editorial-active-indicator" aria-hidden />}
    </Link>
  );
}

function AccountControl({ compact }: { compact?: boolean }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!session) {
    return (
      <button
        type="button"
        onClick={() => signIn(undefined, { callbackUrl: pathname })}
        className={cn(
          "rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors active:bg-accent",
          compact && "px-2.5 py-1"
        )}
      >
        Sign in
      </button>
    );
  }

  const initials = session.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Account menu"
      >
        <Avatar className={cn("h-8 w-8", compact && "h-7 w-7")}>
          <AvatarImage src={session.user?.image ?? undefined} />
          <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-none border-border bg-background">
        <DropdownMenuLabel className="font-normal">
          <p className="truncate text-sm">{session.user?.name}</p>
          <p className="truncate text-xs text-muted-foreground">{session.user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/my-bookmarks">Bookmarks</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-3.5 w-3.5" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function TopCategoryNav() {
  return (
    <header className="mobile-header sticky top-0 z-40 border-b-[1.5px] border-border-strong bg-background/98 backdrop-blur-xl supports-[backdrop-filter]:bg-background/90">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-16 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center transition-opacity active:opacity-70"
          aria-label="The HIT Times home"
        >
          <SiteLogo priority className="h-5 w-auto sm:h-6" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {mainLinks.map((link) => (
            <NavItem key={link.href} {...link} />
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="nav-editorial flex items-center gap-1 pb-1 focus:outline-none">
              Sections
              <ChevronDown className="h-3 w-3" strokeWidth={1.5} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="max-h-80 overflow-y-auto rounded-none border-border bg-background"
            >
              {sectionLinks.map((item) => (
                <DropdownMenuItem key={item.href} asChild className="rounded-none">
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="nav-editorial flex items-center gap-1 pb-1 focus:outline-none">
              More
              <ChevronDown className="h-3 w-3" strokeWidth={1.5} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="rounded-none border-border bg-background"
            >
              {moreLinks.map((item) => (
                <DropdownMenuItem key={item.href} asChild className="rounded-none">
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <AccountControl compact />
        </div>
      </div>
    </header>
  );
}
