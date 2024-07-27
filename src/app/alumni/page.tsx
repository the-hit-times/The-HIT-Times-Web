"use client";

import { FunnelIcon } from "@heroicons/react/24/outline";
import React, { Profiler, useEffect, useState } from "react";

import { IBM_Plex_Serif, Nunito_Sans, Poppins } from "next/font/google";
import Image from "next/image";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { Alumni } from "@/models/Alumnus";
import { CircularLoader } from "@/components/common/loader/Loaders";
import AlumniCard from "@/components/alumni/Profile";

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

interface AlumniData {
  year: string;
  alumni: Alumni[];
}

const AlumniPage: React.FC = () => {
  const [alumniData, setAlumniData] = useState<AlumniData[]>([]);
  const [loading, setLoading] = useState(true);

  const LIMIT = 20;

  const fetchAlumniData = async () => {
    const response = await fetch("/api/v1/alumnus");
    const data = await response.json();

    const alumni = data.data as Alumni[];

    const alumniData: { [year: string]: Alumni[] } = {};

    alumni.forEach((alumnus, index) => {
      if (alumnus.session_end in alumniData) {
        alumniData[alumnus.session_end].push(alumnus);
      } else {
        alumniData[alumnus.session_end] = [alumnus];
      }
    });

    const alumniDataArray = Object.entries(alumniData).map(
      ([year, alumni]) => ({
        year,
        alumni,
      })
    );

    setAlumniData(alumniDataArray);
    setLoading(false);
  };

  useEffect(() => {
    fetchAlumniData();
  }, []);

  if (loading) {
    return <CircularLoader />;
  }

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

export default AlumniPage;
