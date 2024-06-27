"use client";
import { useSession } from "next-auth/react";

// User Header
// -------------------
//
// This component is used to display the header for all the default users.
export const UserHeader = () => {
  const { data: session } = useSession();
  return <header className="bg-white">Hello, {session?.user.name}</header>;
};
