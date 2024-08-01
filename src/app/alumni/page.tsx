"use client";

import { FunnelIcon } from "@heroicons/react/24/outline";
import React, { Profiler, useEffect, useState } from "react";

import { IBM_Plex_Serif, Nunito_Sans, Poppins } from "next/font/google";
import Image from "next/image";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { Alumni } from "@/models/Alumnus";
import { CircularLoader } from "@/components/common/loader/Loaders";
import AlumniCard from "@/components/alumni/Profile";
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

interface AlumniData {
  year: string;
  alumni: Alumni[];
}

const AlumniPage: React.FC = () => {
  const [alumniData, setAlumniData] = useState<AlumniData[]>([]);
  const [filter, setFilter] = useState({
    startSession: new Date().getFullYear() - 4,
    endSession: new Date().getFullYear(),
  });
  const [loading, setLoading] = useState(true);

  const fetchAlumniData = async () => {
    const start = filter.startSession;
    const end = filter.endSession;

    const response = await fetch(
      `/api/v1/alumnus?startSession=${start}&endSession=${end}`
    );
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

    const alumniDataArray = Object.entries(alumniData)
      .map(([year, alumni]) => ({
        year,
        alumni,
      }))
      .sort((a, b) => parseInt(b.year) - parseInt(a.year));

    setAlumniData(alumniDataArray);
    setLoading(false);
  };

  useEffect(() => {
    fetchAlumniData();
  }, [filter]);

  if (loading) {
    return <CircularLoader />;
  }

  const FilterMenu = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2013;

    const generateYearOptions = () => {
      const options = [];
      for (let year = currentYear; year >= startYear; year--) {
        const start = year - 4;
        const end = year;

        options.push(
          <option
            key={year}
            value={`${start}-${end}`}
            data-label-start={start}
            data-label-end={end}
          >
            {`${start}-${end}`}
          </option>
        );
      }
      return options;
    };

    return (
      <div className="flex items-center">
        <select
          className="p-2 rounded-lg bg-gray-100 text-black font-bold focus:outline-none appearance-none"
          value={`${filter.startSession}-${filter.endSession}`}
          onChange={(e) => {
            const [start, end] = e.target.value.split("-");
            setFilter({
              startSession: parseInt(start),
              endSession: parseInt(end),
            });
          }}
        >
          {generateYearOptions()}
        </select>
        <FunnelIcon className="w-6 h-6" />
      </div>
    );
  };

  return (
    <div className="">
      <div className="">
        <div className="flex flex-col gap-4">
          <div className="flex sm:flex-row flex-col justify-between">
            <h1
              className={
                ibmPlexSerif.className + " text-5xl font-semibold my-8"
              }
            >
              Our Alumnus
            </h1>
            <FilterMenu />
          </div>
          <div className="min-h-screen">
            <div className="my-4 grid grid-flow-row gap-4">
              {alumniData.length === 0 && (
                <div>
                  {"No Data."} <br />
                  {"Can't find who you are looking for? "}
                  <Link
                    className="text-blue-900 font-bold"
                    href={"/about-us#contact-us"}
                  >
                    Contact us.
                  </Link>
                </div>
              )}
              {alumniData.length > 0 &&
                alumniData.map(({ year, alumni }) => (
                  <div key={year} className="flex flex-col gap-8">
                    <div className="mr-1 flex flex-col items-start gap-5 lg:mr-0 md:mr-0">
                      <h3 className="text-lg font-bold">{year}</h3>
                      <div className="flex flex-wrap gap-4">
                        {alumni.map((alumniMember, index) => (
                          <AlumniCard key={index} {...alumniMember} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {alumniData.length > 0 && (
            <div className="my-8">
              {"Can't find who you are looking for? "}
              <Link
                className="text-blue-900 font-bold"
                href={"/about-us#contact-us"}
              >
                Contact us.
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlumniPage;
