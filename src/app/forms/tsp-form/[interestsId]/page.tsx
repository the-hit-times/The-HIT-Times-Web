"use client";

import { motion } from "framer-motion";
import { IBM_Plex_Serif, Nunito_Sans, Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import cwCalendar from "@/components/calendarComponents/cwCalendar";
import DevCalendar from "@/components/calendarComponents/devCalendar";
import gdCalendar from "@/components/calendarComponents/gdCalendar";
import photographyCalendar from "@/components/calendarComponents/photographyCalendar";
import videoEditingCalendar from "@/components/calendarComponents/videoEditingCalendar";
import digitalArtCalendar from "@/components/calendarComponents/digitalArtCalendar";
import { Calendar } from "lucide-react";

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

function TSPsuccessPage({ params }: { params: { interestsId: string } }) {
  // const interestNo: String[] = [
  //   "writing",
  //   "drawing",
  //   "designing",
  //   "videoEditing",
  //   "technology",
  //   "photography",
  // ];
  const allInvLinks = [
    {
      title: "Content Writing",
      url: "https://chat.whatsapp.com/HTaPtnggSRhA7IdkA57eWw",
      calendar: cwCalendar,
    },
    {
      title: "Digital Art",
      url: "https://chat.whatsapp.com/EDiA8khK1VIJjvRgdkH4FR",
      calendar:digitalArtCalendar,
    },
    {
      title: "Graphics Designing",
      url: "https://chat.whatsapp.com/CDksaUvAEgK0dp4Dtrl3Yy",
      calendar: gdCalendar,
    },
    {
      title: "Video Editing",
      url: "https://chat.whatsapp.com/BaY7smgaFq2IM32zno9a1w",
      calendar: videoEditingCalendar,
    },
    {
      title: "Web Development",
      url: "https://chat.whatsapp.com/EbMONu9UyElH6qvseXAdH0",
      calendar: DevCalendar,
    },
    {
      title: "Photography",
      url: "https://chat.whatsapp.com/Bz8GAjkdqlIA6wI2GBN6Uh",
      calendar: photographyCalendar,
    },
  ];

  const invLinks = [];

  for (const char of params.interestsId) {
    invLinks.push(allInvLinks[Number(char)]);
  }

  // console.log(invLinks);

  return (
    <>
    <div className="min-h-screen bg-gradient-to-r from-teal-900 to-orange-600 py-12 px-4 sm:px-6 lg:px-8">
    <div className="mb-8">
      <div className="flex justify-center items-center">
        <img src="/tsp-logo.png" alt="" className="h-72 w-auto rounded-2xl"/>
      </div>
      <div className={"my-4 text-2xl font-bold text-purple-200 " + poppins.className}>
        Your response has been submitted!🎉
        <br/>
        Thank you for taking the time to submit your TSP Form. 
        To keep up with the latest developments, make sure to join the relevant 
        domain-specific WhatsApp groups and keep an eye on them for updates. 
        Also, please ensure your contact number is active for any required communication.

      </div>
      <div className="my-2">
        <h2 className={"my-4 text-xl  text-purple-300 " + poppins.className}>
          Join the respective groups...
        </h2>
        <div className="grid grid-flow-row grid-cols-1 gap-4">
          {invLinks.map((inv) => (
            <Link
              key={inv.title}
              href={inv.url}
              className={nunitoSans.className +
                " bg-slate-300/25  text-white font-mono rounded-xl py-8 text-3xl text-center shadow-md"}
            >
              <div className="flex flex-row pl-5 lg:pl-8 gap-2">
                <Image
                  src="/socials/whatsapp.png"
                  width={40}
                  height={40}
                  alt="Play Store App Icon" />
                <div className="pt-1">{inv.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h2 className={"my-4 text-xl text-purple-300 " + poppins.className}>
          ...and mark your calendars!
        </h2>
        <div className="grid grid-flow-row sm:grid-cols-2 grid-cols-1 gap-4">
          {invLinks.map((inv) => (
            <div
              key={inv.title}
              className={nunitoSans.className +
                " text-white bg-slate-300/25 font-mono rounded-lg py-6 text-3xl text-center shadow-md"}
            >
              <div className="flex flex-row pl-5 lg:pl-8 gap-2">
                <Calendar size={40} />
                <div className="pt-1">{inv.title}</div>
              </div>
              <div className="p-2"><inv.calendar /></div>
            </div>
          ))}
        </div>
      </div>
      {invLinks.length < 4 ? <div className="h-20 sm:h-auto"></div> : <></>}
    </div>
    
        {/* <motion.div
          className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-8">
            <motion.h1
              className={`${poppins.className} text-3xl font-bold text-purple-300 mb-6 text-center`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Training Schedule
            </motion.h1>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {scheduleData.map((item, index) => (
                <motion.div
                  key={item.day}
                  className="bg-gray-700 p-4 rounded-lg shadow-md"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <h2 className={`${poppins.className} text-xl font-semibold text-purple-300 mb-2`}>{item.day}</h2>
                  <p className="text-gray-300">{item.activity}</p>
                  <p className="text-gray-300">{item.activity2}</p>
                  <p className="text-gray-300">{item.activity3}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <Link
                href="/"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md shadow-sm transition duration-150 ease-in-out transform hover:scale-105 inline-block"
              >
                Back to Home
              </Link>
            </motion.div>
          </div>
        </motion.div> */}
        <div className="items-center justify-center text-center">
        <Link
              href="/"
              className="bg-purple-600  hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-xl shadow-sm transition duration-150 ease-in-out transform hover:scale-105 inline-block"
            >
            Back to Home
        </Link>
        </div>
      </div></>
  );
}

export default TSPsuccessPage;
