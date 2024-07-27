import { FunnelIcon } from "@heroicons/react/24/outline";
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

interface AlumniCardProps {
  name: string;
  position: string;
  imgSrc: string;
}

const AlumniCard: React.FC<AlumniCardProps> = ({ name, position, imgSrc }) => {
  return (
    <div className="flex w-full flex-col items-center">
      <Image
        src={imgSrc}
        alt={`${name} Profile Image`}
        width={80}
        height={80}
        className="w-full rounded-full object-cover"
      />
      <h4 className="text-base mt-2 mx-auto leading-6 text-black font-bold">
        {name}
      </h4>
      <p className="text-base font-normal text-gray-900">{position}</p>
    </div>
  );
};

interface AlumniData {
  year: string;
  alumni: {
    name: string;
    position: string;
    imgSrc: string;
  }[];
}

const alumniData: AlumniData[] = [
  {
    year: "2024",
    alumni: [
      {
        name: "Alumni Name 1",
        position: "Position 1",
        imgSrc: "/profile-vector.jpg",
      },
      {
        name: "Alumni Name 2",
        position: "Position 2",
        imgSrc: "/profile-vector.jpg",
      },
      // Add more alumni as needed
    ],
  },
  {
    year: "2023",
    alumni: [
      {
        name: "Alumni Name 3",
        position: "Position 3",
        imgSrc: "/profile-vector.jpg",
      },
      {
        name: "Alumni Name 4",
        position: "Position 4",
        imgSrc: "/profile-vector.jpg",
      },
      // Add more alumni as needed
    ],
  },
  // Add more years as needed
];

const Alumni: React.FC = () => {
  return (
    <div className="">
      <div className="">
        <div className="flex flex-col gap-4">
          <div className="mr-2 flex items-center justify-center lg:mr-0 md:mr-0">
            <h1
              className={
                ibmPlexSerif.className + " text-5xl font-semibold my-8"
              }
            >
              Our Alumnus
            </h1>
            <div className="flex flex-1 items-center justify-end gap-4">
              <h2 className="text-xl font-bold">2021-2024</h2>
              <FunnelIcon className="w-6 h-6" />
            </div>
          </div>

          {alumniData.map(({ year, alumni }) => (
            <div key={year} className="flex flex-col gap-8">
              <div className="mr-1 flex flex-col items-start gap-5 lg:mr-0 md:mr-0">
                <h3 className="text-lg font-bold">{year}</h3>
                <div className="mb-4 mr-3.5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-5 lg:mr-0 md:mr-0">
                  {alumni.map((alumniMember, index) => (
                    <AlumniCard key={index} {...alumniMember} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alumni;
