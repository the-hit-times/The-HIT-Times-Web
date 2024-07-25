"use client";

import { usePathname } from "next/navigation";
import { UserFooter } from "./footers/user-footer";

const Footer = () => {
  const pathName = usePathname();
  return <UserFooter />;
};

export default Footer;
