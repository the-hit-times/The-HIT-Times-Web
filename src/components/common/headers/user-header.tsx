"use client";
import {
  Bars3Icon,
  ArrowLeftIcon,
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
  ChevronUpIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { Nunito_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
//import { Session } from "next-auth";
//import Home from "@/components/sign-in";

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
    title: "Gazette",
    href: "/posts/category/09",
  },
  {
    title: "Tabloids",
    href: "/tabloids",
  },
  {
    title: "My Bookmarks",
    href: "/my-bookmarks",
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
    title: "Tabloids",
    href: "/tabloids",
  },
  {
    title: "Reportopolis",
    href: "/posts/category/10",
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
];
/*export const UserProfile = (session: Session) => {
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
}; */
/*
  <><div className="flex flex-col">
            
            <p className=" text-sm mb-1">
              Welcome <span className="font-bold">{session.user?.name}</span>
            </p>
            <p className="text-sm ">
              Signed In As <span className="font-bold">{session.user?.email}</span>
            </p>
          </div>
          <button
            className="bg-red-600  ml-2 py-1 px-2 rounded-md"
            onClick={() => signOut()}
          >
              Sign out
            </button></>*/

export default function SignUpButton() {
  // extracting data from usesession as session
  const { data: session } = useSession(); 
  const [isOpen, setIsOpen] = useState(false);
  console.log("session: ", session);

  // checking if sessions exists
  if (session) {
    // rendering components for logged in users
    return (
      <div className=" relative flex flex-row items-center justify-center ">
        <div>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex flex-row w-auto md:w-36 items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-1 text-sm md:text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <div className="sm:flex  w-9 h-8 relative hidden   ">
              <Image
                src={session.user?.image as string}
                fill
                alt=""
                className="object-cover rounded-full "
              />
            </div>
            Account
            {!isOpen ? (
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 h-5 w-5 text-gray-400"
              />
            ) : (
              <ChevronUpIcon
                aria-hidden="true"
                className="-mr-1 h-5 w-5 text-gray-400"
              />
            )}
          </button>
        </div>
        {isOpen && (
          <div className=" absolute flex flex-col top-16 h-auto w-auto right-1 p-2 z-50 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5  ">
            <div className="  w-20 h-20 relative mb-1">
              <Image
                src={session.user?.image as string}
                fill
                alt=""
                className="object-cover rounded-full "
              />
            </div>
            <p className=" text-sm  hover:bg-slate-300 rounded-md p-2  ">
              Welcome <span className="font-bold">{session.user?.name}</span>
            </p>
            <p className="text-sm hover:bg-slate-300 rounded-md p-2 mb-2 ">
              Signed In As{" "}
              <span className="font-bold">{session.user?.email}</span>
            </p>
            <button
              className="relative ml-2 px-2 py-1 overflow-hidden font-medium text-zinc-800 bg-gray-100 border border-gray-200 rounded-lg shadow-inner group"
              onClick={() => signOut()}
            >
              <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-red-400 group-hover:w-full"></span>
              <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-red-400 group-hover:w-full"></span>
              <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-red-400 group-hover:h-full"></span>
              <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-red-400 group-hover:h-full"></span>
              <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-red-600 opacity-0 group-hover:opacity-100"></span>
              <span className="relative transition-colors duration-300 delay-200 group-hover:text-white font-semibold text-base ">
                Sign Out
              </span>
            </button>
          </div>
        )}
      </div>
    );
  }
  // rendering components for not logged in users
  return (
    /* 
    <div className='flex flex-row items-end justify-end w-auto h-9  '>
	    <button className=' w-16 md:w-20 h-7 md:h-8 m-1 bg-blue-500 rounded-lg cursor-pointer select-none
      active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
      active:border-b-[0px]
      transition-all duration-150 [box-shadow:0_4px_0_0_#1b6ff8,0_8px_0_0_#1b70f841]
      border-b-[1px] border-blue-400'
      onClick={()=>signIn()}
    >
		  <span className='flex flex-col justify-center items-center h-full text-white font-medium text-base'>Sign In</span>
	  </button>
  </div>*/
    <div className="flex justify-center">
      <button
        className="relative px-2 md:px-4 py-1 overflow-hidden font-medium text-zinc-800 bg-gray-100 border border-gray-200 rounded-lg shadow-inner group"
        onClick={() => signIn()}
      >
        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full"></span>
        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full"></span>
        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full"></span>
        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full"></span>
        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white font-semibold text-base ">
          Sign In
        </span>
      </button>
    </div>
  );
}

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

// User Header
// -------------------
//
// This component is used to display the header for all the default users.
export const UserHeader = () => {
  //const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header>
      <nav className="flex flex-row items-center justify-between py-2 min-h-16">
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
                  " text-zinc-800 text-base font-semibold hover:text-violet-700 "
                }
                href={link.href}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className=" flex justify-end" /*md:hidden */>
          <SignUpButton />
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-zinc-800 text-2xl ml-2"
          >
            <Bars3Icon className="size-10 hover:rounded-full hover:bg-gray-100 p-1" />
          </button>
        </div>
      </nav>
      {showDropdown && (
        <div
          className=" fixed top-0 right-0 animate-fade-left bg-gradient-to-b from-slate-400 via-slate-200 to-slate-400 w-1/5 h-screen z-50 min-w-72 scroll-smooth " /*md:hidden */
        >
          <div className="flex relative w-auto mt-4 flex-row ">
            <Link href={"/"}>
              <Image
                src="/header/hit_logo_black.webp"
                alt="The HIT Times"
                className="sm:w-fit w-40 p-2 ml-4 border border-black "
                width={100}
                height={50}
              />
            </Link>
            <button
              onClick={() =>
                setShowDropdown(
                  !showDropdown && <div className="animate-fade-right"></div>
                )
              }
              className="ml-20 "
            >
              <ArrowRightIcon className="size-10 rounded-full bg-gray-100 p-2 mr-2 " />
            </button>
          </div>
          <ul className="grid grid-flow-row gap-4 py-4 px-2">
            <li>
              <Link
                className={
                  nunitoSans.className +
                  " text-zinc-800 text-xl hover:text-white font-semibold hover:py-1 hover:px-2 hover:border hover:border-black rounded-lg ml-4 hover:bg-gradient-to-r from-slate-600 to to-violet-600"
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
                    " text-zinc-800 text-xl hover:text-white font-semibold  rounded-lg ml-4 hover:py-1 hover:px-2 hover:border hover:border-black hover:bg-gradient-to-r from-slate-600 to to-violet-600"
                  }
                  onClick={() => setShowDropdown(false)}
                  href={link.href}
                >
                  {link.title}
                </Link>
              </li>
            ))}
            <hr />
          </ul>
        </div>
      )}
    </header>
  );
};
