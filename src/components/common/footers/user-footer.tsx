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
    <footer className="text-white-300 grid md:grid-flow-col grid-flow-row gap-8">
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

      <div className="text-white-300">
        <ul className="flex flex-col">
          <li>
            <Link
              href={"/privacy-policy"}
              className="text-white px-5 hover:text-gray-400 text-sm"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href={"/terms-of-service"}
              className="text-white px-5 hover:text-gray-400 text-sm"
            >
              Terms Of Service
            </Link>
          </li>
        </ul>
      </div>

      <div className="text-white-300">
        <ul className="flex flex-col">
          <li>
            <Link
              href={"/about-us"}
              className="text-white px-5 hover:text-gray-400 text-sm"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href={"/about-us#contact-us"}
              className="text-white px-5 hover:text-gray-400 text-sm"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href={"/alumni"}
              className="text-white px-5 hover:text-gray-400 text-sm"
            >
              Alumni
            </Link>
          </li>
        </ul>
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

      <div className="text-white">
        <ul className="flex flex-col">
          <li>Install our app!</li>
          <Link href="https://play.google.com/store/apps/details?id=com.thehittimes.tht">
            <Image
              src="/google-play-badge.png"
              width={150}
              height={30}
              alt="Play Store App Icon"
            />
          </Link>
        </ul>
      </div>
    </footer>
  );
};
