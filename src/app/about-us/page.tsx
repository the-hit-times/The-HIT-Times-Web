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
    title: "Email",
    icon: <EnvelopeIcon className="w-6 h-6" />,
    handle: "thehittimes@gmail.com",
    link: "mailto:thehittimes@gmail.com",
  },

  {
    title: "Instagram",
    icon: (
      <Image
        src="/socials/instagram.png"
        className="invert"
        width={25}
        height={25}
        alt="LinkedIn Icon"
      />
    ),
    handle: "@thehittimes",
    link: "https://www.instagram.com/thehittimes/",
  },

  {
    title: "LinkedIn",
    icon: (
      <Image
        src="/socials/linkedin.png"
        width={25}
        height={25}
        alt="LinkedIn Icon"
        className="invert"
      />
    ),
    handle: "@The_HIT_Times",
    link: "https://www.linkedin.com/company/the-hit-times/mycompany/",
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
    <div className="flex flex-row ">
      <div className="flex items-center justify-center w-12 h-12 rounded-full">
        {icon}
      </div>
      <Link href={link} className="flex flex-col gap-0">
        <p className={poppins.className + " font-semibold"}>{title}</p>
        <p className={poppins.className + " text-gray-600"}>{handle}</p>
      </Link>
    </div>
  );
};

const AboutUs = () => {
  return (
    // main content section
    <div className="my-2">
      <div className="gap-8 flex flex-col">
        <div className="grid grid-flow-row gap-4 ">
          <h1
            className={ibmPlexSerif.className + " text-5xl font-semibold my-8 animate-fade-right animate duration-500 animate-delay-200"}
          >
            About Us
          </h1>
          <div className="flex flex-col gap-4 self-stretch">

            <Image
              src="/aboutusImage.jpg"
              alt="Aboutus Icon"
              height={314}
              width={1280}
              quality={100}
              className="w-full object-cover animate-fade-down animate duration-500 animate-delay-200"
            />
            <p
              className={
                nunitoSans.className +
                " text-justify text-lg font-normal text-gray-900 animate-fade-up animate duration-500 animate-delay-200"
              }
            >
              Founded in the year of 2013, The HIT Times is only the second
              student run tabloid in the Eastern zone of India. A progressive
              induction into a world full of semesters, assignments, placements,
              and an unending voyage through the premises of{" "}
              <Link
                href="https://hithaldia.ac.in/"
                className="underline text-blue-600 hover:text-blue-900"
              >
                Haldia Institute of Technology
              </Link>
              , we aim at being your eyes and ears on the campus. Hailing as the
              official media group of the Institution, we are set to bring forth
              the events and the affairs while providing an impulse to your
              conscience. with technology running the game heavily these days,
              this Android app is a part of our expansion to newer,
              tech-friendly avenues. So, stay tuned and never miss out on a
              notification.
            </p>
          </div>
        </div>
        <div className="">
          <h2
            className={ibmPlexSerif.className + " font-semibold text-2xl animate-fade-right animate duration-500 animate-delay-200"}
            id="contact-us"
          >
            Contact Us
          </h2>
          <div className="grid sm:grid-flow-col grid-flow-row my-4 animate-flip-up animate duration-500 animate-delay-200">
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

export default AboutUs;
          /*<div id="default-carousel" className="relative w-full" data-carousel="slide">
    
    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">

        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <Image src="/aboutusImage.jpg"
              alt="Aboutus Icon"
              height={314}
              width={1280}
              quality={100}
              className="w-full object-cover"></Image>
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <Image src="/aboutusImage.jpg"
              alt="Aboutus Icon"
              height={314}
              width={1280}
              quality={100}
              className="w-full object-cover"></Image>
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <Image src="/aboutusImage.jpg"
              alt="Aboutus Icon"
              height={314}
              width={1280}
              quality={100}
              className="w-full object-cover"></Image>
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <Image src="/aboutusImage.jpg"
              alt="Aboutus Icon"
              height={314}
              width={1280}
              quality={100}
              className="w-full object-cover"></Image>
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <Image src="/aboutusImage.jpg"
              alt="Aboutus Icon"
              height={314}
              width={1280}
              quality={100}
              className="w-full object-cover"></Image>
        </div>
    </div>
  
    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
    </div>
    
    <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
        </span>
    </button>
</div>*/