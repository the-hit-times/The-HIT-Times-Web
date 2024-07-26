"use client";
import { getAllTeamsCode, getTeamName } from "@/lib/codeToTeamName";
import { IBM_Plex_Serif } from "next/font/google";
import Link from "next/link";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default function CreateTeamPage() {
  const teamsCode = getAllTeamsCode();

  return (
    <div className="my-4">
      <h1
        className={
          ibmPlexSerif.className + " text-zinc-800 text-5xl font-semibold py-8"
        }
      >
        Teams
      </h1>
      <div className="grid grid-cols-2 grid-flow-row gap-4">
        {teamsCode.map((key) => (
          <Link
            href={"/admin-portal/teams/manage-team?code=" + key}
            key={key}
            className="p-2 bg-white rounded-md"
          >
            <h2 className="font-bold text-lg">{getTeamName(key)}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
