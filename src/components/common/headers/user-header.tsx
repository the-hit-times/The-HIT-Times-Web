"use client";
import { Bars3Icon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { Nunito_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { UserProfile, SignOut } from "./admin-header";

const links = [
  {
    title: "Alumni",
    href: "/alumni",
  },
  // {
  //   title: "Tabloids",
  //   href: "/tabloids",
  // },
  // {
  //   title: "Notice",
  //   href: "/notice",
  // },
  {
    title: "Monday Hues",
    href: "/posts/category/00",
  },
  {
    title: "Campus Raid",
    href: "/posts/category/01",
  },
  {
    title: "Thursday Article",
    href: "/posts/category/02",
  },
  {
    title: "Funny Friday",
    href: "/posts/category/03",
  },
  {
    title: "Viral Corner",
    href: "/posts/category/04",
  },
  {
    title: "My Bookmarks", 
    href: "/my-bookmarks"
  }
];

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

// User Header
// -------------------
//
// This component is used to display the header for all the default users.
export const UserHeader = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header>
      <nav className="grid grid-flow-col items-center py-5">
        <Link href={"/"}>
          <Image
            src="/header/hit_logo_black.webp"
            alt="The HIT Times"
            className="sm:w-fit w-32"
            width={100}
            height={50}
          />
        </Link>
        <ul className="md:flex flex-row gap-8 justify-end hidden ">
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
            <ArrowLeftIcon className="size-8 rounded-full bg-gray-100 p-2 mt-2" />
          </button>
          <ul className="grid grid-flow-row gap-4 py-4 px-2">
            <li>
              <Link
                className={
                  nunitoSans.className +
                  " text-zinc-800 text-2xl font-semibold hover:underline"
                }
                href={"/"}
                onClick={() => setShowDropdown(false)}
              >
                Home
              </Link>
            </li>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  className={
                    nunitoSans.className +
                    " text-zinc-800 text-2xl font-semibold hover:underline"
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
