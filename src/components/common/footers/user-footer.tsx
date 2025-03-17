"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
// Footer
// -------------------
//
// This component is used to display the footer for all the default users.
export const UserFooter = () => {
  const { data: session } = useSession();
  return (
    <footer className="text-white-300 grid md:grid-flow-col grid-flow-row gap-8 items-start">
      <div className="flex flex-col">
        <Image
          src="/tht_logo_white.png"
          width={200}
          height={40}
          alt="Play Store App Icon"
        />
        <div className="text-slate-600 text-xs">
          copyright &copy; 2024 | THE HIT TIMES
        </div>
      </div>

      <div className="text-white-300 flex flex-col ">
        <Link
          href={"/privacy-policy"}
          className="text-white hover:underline text-sm"
        >
          Privacy Policy
        </Link>

        <Link
          href={"/terms-of-service"}
          className="text-white hover:underline text-sm"
        >
          Terms Of Service
        </Link>
      </div>

      <div className="text-white-300 flex flex-col">
        <Link href={"/about-us"} className="text-white hover:underline text-sm">
          About
        </Link>

        <Link
          href={"/about-us#contact-us"}
          className="text-white hover:underline text-sm"
        >
          Contact
        </Link>

        <Link href={"/alumni"} className="text-white hover:underline text-sm">
          Alumni
        </Link>
      </div>

      <div className="flex flex-col ">
        <div className="text-white">Follow Us</div>
        <div className="flex flex-row gap-4 my-2 ">
          <Link href="https://www.facebook.com/the.hit.times/">
            <Image
              src="/socials/facebook.png"
              width={25}
              height={25}
              alt="Facebook Icon"
            />
          </Link>
          <Link href="https://www.instagram.com/thehittimes/">
            <Image
              src="/socials/instagram.png"
              width={25}
              height={25}
              alt="Instagram Icon"
            />
          </Link>
          <Link href="https://www.linkedin.com/company/the-hit-times/mycompany/">
            <Image
              src="/socials/linkedin.png"
              width={25}
              height={25}
              alt="LinkedIn Icon"
            />
          </Link>
          <Link href="https://www.youtube.com/@thehittimes_">
            <Image
              src="/socials/youtube.png"
              width={25}
              height={25}
              alt="Youtube Icon"
            />
          </Link>
        </div>
      </div>

      <div className="text-white flex flex-col">
        <h1>Install our app!</h1>
        <Link href="https://play.google.com/store/apps/details?id=com.thehittimes.tht">
          <Image
            src="/google-play-badge.png"
            width={150}
            height={30}
            alt="Play Store App Icon"
            className="-translate-x-2.5 -translate-y-1"
          />
        </Link>
      </div>
    </footer>
  );
};
