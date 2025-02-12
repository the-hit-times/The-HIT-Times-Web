"use client";

import { motion } from "framer-motion";
import { IBM_Plex_Serif, Nunito_Sans, Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

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
  const interestNo: String[] = [
    "writing",
    "drawing",
    "designing",
    "videoEditing",
    "technology",
    "photography",
  ];
  const allInvLinks = [
    {
      title: "Writing",
      url: "https://chat.whatsapp.com/GEE95DRfs8DDmFBzoIN2fm",
    },
    {
      title: "Drawing",
      url: "https://chat.whatsapp.com/JHGttWD2Pic2PTo5MzVmBW",
    },
    {
      title: "Designing",
      url: "https://chat.whatsapp.com/Bu6xtYTHjI9AyUVchTDZc1",
    },
    {
      title: "Video Editing",
      url: "https://chat.whatsapp.com/KP1IKArzmK022HcLYg60eq",
    },
    {
      title: "Technology",
      url: "https://chat.whatsapp.com/EMBGnkqbkRv3Y1GigW0cRI",
    },
    {
      title: "Photography",
      url: "https://chat.whatsapp.com/L3kWjEz5MtHFp8Df0RjhDM",
    },
  ];

  const scheduleData = [
    { day: "01-March-2025", activity: "* 1st Half- Photography, Cartoonist ", activity2: "* 2nd Half- GD, Development, Content Writing ", activity3:"* Video Editing Online Class  " },
    { day: "02-March-2025", activity: "* 1st Half- Photography, Cartoonist ", activity2: "* 2nd Half- GD, Video Editing, Content Writing", activity3:"* Development Online Class  " },
    { day: "03-March-2025 To 07-March-2025", activity: "All Teams will Conduct Online Classes , Time Table will be provided in respective whatsapp group" },
    { day: "08-March-2025", activity: "* 1st Half- Development, Cartoonist ", activity2: "* 2nd Half- GD, Video Editing, Content Writing", activity3:"* PhotoWalk Session "},
    { day: "09-March-2025", activity: "* 1st Half- Development, Cartoonist ", activity2: "* 2nd Half- GD, Video Editing, Content Writing", activity3:"* PhotoWalk Session " },
  ]

  const invLinks = [];

  for (const char of params.interestsId) {
    invLinks.push(allInvLinks[Number(char)]);
  }

  // console.log(invLinks);

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
    <div className="mb-8">
      <div className={"my-4 text-2xl text-purple-200 " + poppins.className}>
        Your response has been submitted!🎉
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
                " bg-gray-700 text-white font-mono rounded-lg py-8 text-3xl text-center shadow-md"}
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
      {invLinks.length < 4 ? <div className="h-20 sm:h-auto"></div> : <></>}
    </div>
    
        <motion.div
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
        </motion.div>
      </div></>
  );
}

export default TSPsuccessPage;
