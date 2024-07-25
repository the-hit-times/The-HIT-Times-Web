"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

// User Header
// -------------------
//
// This component is used to display the header for all the default users.
export const UserHeader = () => {
  const { data: session } = useSession();
  return (
    <header className="bg-white py-2">
      <nav>
        <ul className="flex justify-between">
          <li>
            <Image src="/tht_logo.png" width={150} height={30} alt="THT logo" />
          </li>
          <ul className="flex justify-between">
            <li className="content-center">
              <a className="hover:text-gray-400 px-5">Alumni</a>
            </li>
            <li className="content-center">
              <a className="hover:text-gray-400 px-5">Tabloids</a>
            </li>
            <li className="content-center">
              <a className="hover:text-gray-400 px-5">Notice</a>
            </li>
            <li className="content-center">
              <a className="hover:text-gray-400 px-5">Monday Hues</a>
            </li>
            <li className="content-center">
              <a className="hover:text-gray-400 px-5">Campus Raid</a>
            </li>
            <li className="content-center">
              <a className="hover:text-gray-400 px-5">Thursday Article</a>
            </li>
            <li className="content-center">
              <a className="hover:text-gray-400 px-5">Funny Friday</a>
            </li>
          </ul>
        </ul>
      </nav>
    </header>
  );
};
