"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {} from "@heroicons/react/24/outline";
// Footer
// -------------------
//
// This component is used to display the footer for all the default users.
export const UserFooter = () => {
  const { data: session } = useSession();
  return (
    <footer className="text-white-300 flex flex-row items-center justify-between">
      <div className="iconAndCopyright flex flex-col">
        <a>
          <Image
            src="/tht_logo_white.png"
            width={200}
            height={40}
            alt="Play Store App Icon"
          />
        </a>
        <div className="text-slate-600 text-xs">
          copyright &copy; 2024 | THE HIT TIMES
        </div>
      </div>

      <div className="footerLegal text-white-300">
        <ul className="flex flex-col">
          <li>
            <a className="text-white px-5 hover:text-gray-400 text-sm">
              Privacy Policy
            </a>
          </li>
          <li>
            <a className="text-white px-5 hover:text-gray-400 text-sm">
              Do not sell my personal info
            </a>
          </li>
          <li>
            <a className="text-white px-5 hover:text-gray-400 text-sm">
              Terms Of Service
            </a>
          </li>
          <li>
            <a className="text-white px-5 hover:text-gray-400 text-sm">
              thehittimes.com Site Map
            </a>
          </li>
        </ul>
      </div>

      <div className="footerLinks text-white-300">
        <ul className="flex flex-col">
          <li>
            <a className="text-white px-5 hover:text-gray-400 text-sm">About</a>
          </li>
          <li>
            <a className="text-white px-5 hover:text-gray-400 text-sm">
              Contact
            </a>
          </li>
          <li>
            <a className="text-white px-5 hover:text-gray-400 text-sm">
              Alumni
            </a>
          </li>
        </ul>
      </div>

      <div className="footerSocials flex flex-col justify-around">
        <div className="text-white">Follow Us</div>
        <div className="iconWrapper flex flex-row my-2">
          <div className="flex pr-2">
            <a href="https://www.facebook.com/the.hit.times/">
              <Image
                src="/socials/facebook.png"
                width={25}
                height={25}
                alt="Facebook Icon"
              />
            </a>
          </div>
          <div className="flex pr-2">
            <a href="https://www.instagram.com/thehittimes/">
              <Image
                src="/socials/instagram.png"
                width={25}
                height={25}
                alt="Instagram Icon"
              />
            </a>
          </div>
          <div className="flex pr-2">
            <a href="https://www.linkedin.com/company/the-hit-times/mycompany/">
              <Image
                src="/socials/linkedin.png"
                width={25}
                height={25}
                alt="LinkedIn Icon"
              />
            </a>
          </div>
          <div className="flex pr-2">
            <a href="https://www.youtube.com/@thehittimes_">
              <Image
                src="/socials/youtube.png"
                width={25}
                height={25}
                alt="Youtube Icon"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="footerAppLink text-white">
        <ul className="flex flex-col items-center justify-center">
          <li className="pr-5">Install our app!</li>
          <a href="https://play.google.com/store/apps/details?id=com.thehittimes.tht">
            <Image
              src="/google-play-badge.png"
              width={150}
              height={30}
              alt="Play Store App Icon"
            />
          </a>
        </ul>
      </div>
    </footer>
  );
};
