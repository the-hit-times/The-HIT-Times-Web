"use client";

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

  const invLinks = [];

  for (const char of params.interestsId) {
    invLinks.push(allInvLinks[Number(char)]);
  }

  // console.log(invLinks);

  return (
    <div className="mb-8 min-h-[74vh]">
      <div className={"my-4 text-2xl text-purple-700 " + poppins.className}>
        Your response has been submitted!🎉
      </div>
      <div className="my-2">
        <h2 className={"my-4 text-xl  text-purple-800 " + poppins.className}>
          Join the respective groups...
        </h2>
        <div className="grid grid-flow-row grid-cols-1 gap-4">
          {invLinks.map((inv) => (
            <Link
              key={inv.title}
              href={inv.url}
              className={
                nunitoSans.className +
                " bg-amber-200 rounded-lg py-8 text-3xl font-bold text-center shadow-md"
              }
            >
              <div className="flex flex-row pl-5 lg:pl-8 gap-2">
                <Image
                  src="/socials/whatsapp.png"
                  width={40}
                  height={40}
                  alt="Play Store App Icon"
                />
                <div className="pt-1">{inv.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {invLinks.length < 4 ? <div className="h-20 sm:h-64"></div> : <></>}
    </div>
  );
}

export default TSPsuccessPage;
