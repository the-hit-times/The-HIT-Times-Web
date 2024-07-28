"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Nunito_Sans } from "next/font/google";
import Link from "next/link";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { ArrowLeftIcon, Bars3Icon } from "@heroicons/react/24/solid";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

const links = [
  {
    title: "Teams",
    href: "/admin-portal/teams",
  },
  {
    title: "Posts",
    href: "/admin-portal/posts",
  },
  {
    title: "Matches",
    href: "/admin-portal/matches",
  },
  {
    title: "Alumni",
    href: "/admin-portal/alumni",
  },
  {
    title: "Notify",
    href: "/admin-portal/notify",
  },
];

export const UserProfile = (session: Session) => {
  return (
    <li
      className={
        nunitoSans.className + " text-zinc-800 text-base font-semibold "
      }
    >
      Welcome, <span className="font-bold">{session.user.name}</span>
    </li>
  );
};

export const SignOut = (session: Session) => {
  if (session) {
    return (
      <li
        className={
          nunitoSans.className +
          " text-zinc-800 text-base font-semibold hover:underline cursor-pointer"
        }
        onClick={() => signOut()}
      >
        Sign Out
      </li>
    );
  }
};

// Admin Portal Header
// -------------------
//
// This component is used to display the header for the admin portal
// It will contain links to all the admin portal pages
// Don't modify this component
export const AdminHeader = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <header>
      <nav className="grid grid-flow-col items-center py-5">
        <Link href={"/admin-portal"}>
          <Image
            src="/header/hit_logo_black.webp"
            alt="The HIT Times"
            className="sm:w-fit w-32"
            width={100}
            height={50}
          />
        </Link>
        <ul className="md:flex flex-row gap-8 justify-end hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className={
                  nunitoSans.className +
                  " text-zinc-800 text-base font-semibold hover:underline"
                }
                href={link.href}
              >
                {link.title}
              </Link>
            </li>
          ))}
          {session && UserProfile(session)}
          {session && SignOut(session)}
        </ul>
        <div className="md:hidden flex justify-end">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-zinc-800 text-2xl"
          >
            <Bars3Icon className="size-8 hover:rounded-full hover:bg-gray-100 p-1" />
          </button>
        </div>
      </nav>
      {showDropdown && (
        <div className="md:hidden fixed insert-0 top-0 left-0 bg-white w-screen h-screen z-50">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="m-1"
          >
            <ArrowLeftIcon className="size-8 hover:rounded-full hover:bg-gray-100 p-1" />
          </button>
          <ul className="flex flex-col gap-4 py-4 px-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  className={
                    nunitoSans.className +
                    " text-zinc-800 text-base font-semibold hover:underline"
                  }
                  onClick={() => setShowDropdown(false)}
                  href={link.href}
                >
                  {link.title}
                </Link>
              </li>
            ))}
            <hr />
            {session && UserProfile(session)}
            {session && SignOut(session)}
          </ul>
        </div>
      )}
    </header>
  );
};
