import Link from "next/link";
import React from "react";
import { IBM_Plex_Serif, Nunito_Sans, Poppins } from "next/font/google";
import Image from "next/image";
import { EnvelopeIcon } from "@heroicons/react/24/solid";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800"],
});

const contactData = [

  {
    title: "Instagram",
    icon: (
      <Image
        src="/socials/3d-instagram.png"
        className=""
        width={35}
        height={25}
        alt="LinkedIn Icon"
      />
    ),
    handle: "@thehittimes",
    link: "https://www.instagram.com/thehittimes/",
  },

  {
    title: "Facebook",
    icon: (
      <Image
        src="/socials/3d-facebook.png"
        className=""
        width={35}
        height={25}
        alt="LinkedIn Icon"
      />
    ),
    handle: "The HIT Times",
    link: "https://www.facebook.com/the.hit.times/",
  },

  {
    title: "LinkedIn",
    icon: (
      <Image
        src="/socials/3d-linkedin.png"
        width={35}
        height={25}
        alt="LinkedIn Icon"
        className=""
      />
    ),
    handle: "@The_HIT_Times",
    link: "https://www.linkedin.com/company/the-hit-times/mycompany/",
  },
  {
    title: "YouTube",
    icon: (
      <Image
        src="/socials/3d-youtube.png"
        width={35}
        height={25}
        alt="LinkedIn Icon"
        className=""
      />
    ),
    handle: "The HIT Times",
    link: "https://www.youtube.com/@thehittimes_",
  },
  
];

const ContactCard = ({
  title,
  icon,
  handle,
  link,
}: {
  title: string;
  icon: React.ReactNode;
  handle: string;
  link: string;
}) => {
  return (
    
    <div className="relative ml-20 mr-20">
        <Link href={link}>
        <button className="relative hover:scale-105 hover:duration-500 inline-flex h-12 mb-10 w-full overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] xl:animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer  rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  {icon}
                  <div className="grid w-full h-full items-center justify-center">
                    <p className={poppins.className + " font-semibold"}>{title}</p>
                    <p className={poppins.className + " text-gray-200"}>{handle}</p>
                  </div>
               </span>
        </button>
        </Link>
    </div>
  );
};

const THT_Links = () => {
  return (
    <div className=" bg-[url('/tht-background.jpg')]  md:outline md:outline-8 md:outline-indigo-400 rounded-xl ">
        <div className="flex flex-row w-full items-center justify-center h-auto pt-5">
            <Image
                src="/The-HIT-Times1.png"
                width={150}
                height={150}
                alt="LinkedIn Icon"
                className="rounded-full  ml-3 mt-3 "
            />
            <div className="flex flex-col">
                <div className="text-white font-bold text-2xl ml-4">The HIT Times</div>
                <div className="text-white font-thin text-lg ml-4">An impulse to your conscience!</div>
            </div>
        </div>
        <div className="flex flex-col md:flex-row w-auto h-auto items-center justify-center pt-5">
            <div className="md:text-white text-violet-500 px-2 md:bg-gradient-to-tr from-slate-500 to via-violet-600 rounded-lg font-black text-xl ml-4 mr-2 mt-5 ">Get The THT Khabri App NOW!  Click Here </div> 
            <Link href="https://play.google.com/store/apps/details?id=com.thehittimes.tht">
            <Image
              src="/google-play-badge.png"
              width={200}
              height={100}
              alt="Play Store App Icon"
              className="hover:scale-110 hover:duration-500 mr-3 mt-5"
            />
          </Link> 
        </div>
        <div className="flex flex-col md:flex-row w-auto h-auto items-center justify-center py-5">
            <div className="md:text-white text-violet-500 px-2 md:bg-gradient-to-tr  from-slate-500 to via-violet-600  rounded-lg font-black text-xl ml-4 mr-2 mt-5 ">Visit Our Official Website!  Click Here </div> 
            <Link href="/">
            <Image
              src="/header/hit_logo_black.webp"
              width={200}
              height={100}
              alt="Play Store App Icon"
              className="hover:scale-110  hover:duration-500 mr-3 mt-5 ml-4 px-1 py-1 bg-gradient-to-r from-slate-400 to-violet-400 rounded-md border border-spacing-2 border-black"
            />
          </Link> 
        </div>

      <div className="gap-8 flex flex-col mt-5">
        <div className="">
          <h2
            className={ibmPlexSerif.className +" font-semibold  ml-12 md:ml-20  text-2xl animate-fade-right animate duration-500 animate-delay-200 text-violet-100 w-60 px-2 bg-gradient-to-r from-slate-800 to-neutral-700 rounded-full "}
            id="tht-links"
          >
            Our Social handles 
          </h2>
          <div className="flex flex-col justify-center my-4 animate-flip-up animate duration-500 animate-delay-200">
            {contactData.map((contact) => (
              <ContactCard key={contact.handle} {...contact} />
            ))}
          </div>

        </div>
      </div>

      <div className="h-[10vh]"></div>
    </div>
  );
};

export default THT_Links;
/*<button className="relative w-full  mt-8 justify-center bg-slate-400  rounded-lg ring-2 ring-black">
        {icon}
      <Link href={link} className="flex flex-col gap-0">
        <p className={poppins.className + " font-semibold"}>{title}</p>
        <p className={poppins.className + " text-gray-600"}>{handle}</p>
      </Link>
    </button> */

      