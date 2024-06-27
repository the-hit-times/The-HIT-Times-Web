"use client";

import { usePathname } from "next/navigation";
import { AdminHeader } from "./headers/admin-header";
import { UserHeader } from "./headers/user-header";

const Header = () => {
  const pathName = usePathname();

  if (pathName.startsWith("/admin-portal")) {
    return <AdminHeader />;
  }

  return <UserHeader />;
};

export default Header;
