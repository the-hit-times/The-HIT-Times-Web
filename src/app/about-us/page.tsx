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
    title: "Email",
    icon: (
      <Image
        src="/socials/linkedin.png"
        width={25}
        height={25}
        alt="LinkedIn Icon"
        className="invert"
      />
    ),
    handle: "@the-hit-times",
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
        <div className="grid grid-flow-row gap-4">
          <h1
            className={ibmPlexSerif.className + " text-5xl font-semibold my-8"}
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
              className="w-full object-cover"
            />
            <p
              className={
                nunitoSans.className +
                " text-justify text-lg font-normal text-gray-900"
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
            className={ibmPlexSerif.className + " font-semibold text-2xl"}
            id="contact-us"
          >
            Contact Us
          </h2>
          <div className="grid sm:grid-flow-col grid-flow-row my-4">
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
