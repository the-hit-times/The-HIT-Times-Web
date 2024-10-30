"use client";
import { IBM_Plex_Serif, Nunito_Sans, Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

function SuccessPage({ params }: { params: { successId: string } }) {
  const router = useRouter();

  const allInvLinks = [
    {
      title: "content-writer",
      url: "https://chat.whatsapp.com/GEE95DRfs8DDmFBzoIN2fm",
    },
    {
      title: "cartoonist",
      url: "https://chat.whatsapp.com/JHGttWD2Pic2PTo5MzVmBW",
    },
    {
      title: "graphic-designer",
      url: "https://chat.whatsapp.com/Bu6xtYTHjI9AyUVchTDZc1",
    },
    {
      title: "video-editor",
      url: "https://chat.whatsapp.com/KP1IKArzmK022HcLYg60eq",
    },
    {
      title: "developer",
      url: "https://chat.whatsapp.com/EMBGnkqbkRv3Y1GigW0cRI",
    },
    {
      title: "photographer",
      url: "https://chat.whatsapp.com/L3kWjEz5MtHFp8Df0RjhDM",
    },
    {
      title: "public-relations",
      url: "https://chat.whatsapp.com/CY7mqMaCH4zLc2QgbjXcLp",
    },
  ];

  let invLink: {
    title: string;
    url: string;
  };

  for (const obj of allInvLinks) {
    if (params.successId === obj.title) {
      invLink = obj;
    }
  }

  // console.log(invLinks);

  return (
    <div className=" min-h-screen bg-[url('/tht-background.jpg')]  md:rounded-2xl p-32">
      <div
        className={
          "my-4 text-2xl text-purple-400 animate-fade-right " +
          poppins.className
        }
      >
        Your response has been submitted!🎉
      </div>
      <div className="my-2">
        {invLink! && (
          <h2
            className={
              "my-4 text-xl  text-purple-100 animate-fade-left " +
              poppins.className
            }
          >
            Hello {invLink.title.toUpperCase()} Your Recruitment Form 2k25
            application for The HIT Times has been received. Thank you for
            taking the time to complete and successfully submit the Recruitment
            Form for our 2025 intake. you will receive a mail Shortly....
          </h2>
        )}
        {/*<div className="grid grid-flow-row grid-cols-1 gap-4">
            {invLink! &&
                <Link
                href={invLink.url}
                className={
                    nunitoSans.className +
                    " bg-amber-200 rounded-lg py-8 text-3xl font-bold text-center shadow-md"}
                >
                <div className="flex flex-row pl-5 lg:pl-8 gap-2">
                    <Image
                    src="/socials/whatsapp.png"
                    width={40}
                    height={40}
                    alt="Play Store App Icon"
                    />
                    <div className="pt-1">{invLink.title.toUpperCase()}</div>
                </div>
                </Link>
        }
            </div>*/}
      </div>
      <div>
        <p
          className={
            nunitoSans.className +
            " text-gray-200 my-4 text-3xl font-bold mt-12"
          }
        >
          Take A Tour to our website
        </p>
        <button
          onClick={(e) => router.push("/")}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-r hover:from-sky-500 hover:to-indigo-500 py-4 px-8 rounded-md text-white"
        >
          Take me
        </button>
      </div>
      <div className="h-20 sm:h-64"></div>
    </div>
  );
}

export default SuccessPage;
