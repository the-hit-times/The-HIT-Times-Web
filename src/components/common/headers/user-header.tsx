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
 //{
 //  title: "Tabloids",
 //  href: "/tabloids",
 //},
 //{
 //  title: "Notice",
 //  href: "/notice",
 // },
  {
    title: "Reportopolis",
    href: "/posts/category/10",
  },
  {
    title: "Monday Hues",
    href: "/posts/category/00",
  },
  {
    title: "Funny Friday",
    href: "/posts/category/03",
  },
  {
    title: "Gazette",
    href: "/posts/category/09",
  },
  {
    title: "My Bookmarks", 
    href: "/my-bookmarks"
  },

];
const links_2 = [
  {
    title: "Alumni",
    href: "/alumni",
  },
 //{
 //  title: "Tabloids",
 //  href: "/tabloids",
 //},
 //{
 //  title: "Notice",
 //  href: "/notice",
 // },
  {
    title: "My Bookmarks", 
    href: "/my-bookmarks",
  },
  {
    title: "Reportopolis",
    href: "/posts/category/10",
  },
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
    title: "Word Worth Millions",
    href: "/posts/category/05",
  },
  {
    title: "College Heracles",
    href: "/posts/category/06",
  },
  {
    title: "Nanotips",
    href: "/posts/category/07",
  },
  {
    title: "Vernacular",
    href: "/posts/category/08",
  },
  {
    title: "Gazette",
    href: "/posts/category/09",
  },
  
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
            className="sm:w-fit w-32 ml-4 "
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
                  " text-zinc-800 text-base font-semibold hover:text-violet-700 "
                  
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
        <div className=" flex justify-end"/*md:hidden */>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-zinc-800 text-2xl"
          > 
            <Bars3Icon className="size-10 hover:rounded-full hover:bg-gray-100 p-1" />
          </button>
        </div>
      </nav>
      {showDropdown && (
        <div className=" fixed insert-0 top-0 right-0 animate-fade-left bg-gradient-to-b from-slate-400 via-violet-200 to-slate-400 w-1/5 h-screen z-50 min-w-72 scroll-smooth "/*md:hidden */>
          <button
            onClick={() => setShowDropdown(!showDropdown &&
              <div className="animate-fade-right"></div>
            )
            }
            className="m-1 "
          >
            <ArrowLeftIcon className="size-8 rounded-full bg-gray-100 p-2 mt-2 rotate-180" />
          </button>
          <Link href={"/"}>
          <Image
            src="/header/hit_logo_black.webp"
            alt="The HIT Times"
            className="sm:w-fit w-32 ml-4 "
            width={100}
            height={50}
          />
          </Link>
          <ul className="grid grid-flow-row gap-4 py-4 px-2">
            <li>
              <Link
                className={
                  nunitoSans.className +
                  " text-zinc-800 text-xl font-semibold  hover:bg-slate-200 rounded-lg ml-4 hover:bg-gradient-to-r from-slate-400 to to-violet-400"
                }
                href={"/"}
                onClick={() => setShowDropdown(false)}
              >
                Home
              </Link>
            </li>
            {links_2.map((link) => (
              <li key={link.href}>
                <Link
                  className={
                    nunitoSans.className +
                    " text-zinc-800 text-xl font-semibold  rounded-lg ml-4 hover:bg-gradient-to-r from-slate-400 to to-violet-400"
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
