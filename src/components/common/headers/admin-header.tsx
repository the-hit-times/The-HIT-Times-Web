"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Nunito_Sans } from "next/font/google";
import Link from "next/link";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

const links = [
  {
    title: "Create a Post",
    href: "/admin-portal/posts/create-post",
  },
  {
    title: "Posts",
    href: "/admin-portal/posts",
  },
  {
    title: "Notify",
    href: "/admin-portal/notify",
  },
];

const UserProfile = (session: Session) => {
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

const SignOut = (session: Session) => {
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
  return (
    <header>
      <nav className="grid grid-flow-col py-5">
        <Image
          src="/header/hit_logo_black.png"
          alt="The HIT Times"
          width={200}
          height={50}
        />
        <ul className="flex flex-row gap-8 justify-end">
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
      </nav>
    </header>
  );
};
