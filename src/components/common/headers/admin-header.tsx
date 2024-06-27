"use client";
import { useSession } from "next-auth/react";

// Admin Portal Header
// -------------------
// 
// This component is used to display the header for the admin portal
// It will contain links to all the admin portal pages
// Don't modify this component
export const AdminHeader = () => {
    const { data: session } = useSession();
    return <header className="bg-white">Welcome, {session?.user.name}</header>;
};
