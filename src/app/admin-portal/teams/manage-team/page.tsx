"use client";
import TeamForm from "@/components/admin-portal/teams/TeamForm";
import { getAllTeamsCode, getTeamName } from "@/lib/codeToTeamName";
import { Player, Teams } from "@/models/Team";
import { IBM_Plex_Serif } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default function CreateTeamPage() {
  const searchParamas = useSearchParams();
  const code = searchParamas.get("code");
  const teamsCode = getAllTeamsCode();
  if (code === null || !teamsCode.includes(code)) {
    // redirect to page not found if code is not valid
    notFound();
  }
  const teamName = getTeamName(code) ?? "Team Not Found";

  return (
    <div>
      <h1
        className={
          ibmPlexSerif.className + " text-zinc-800 text-5xl font-semibold py-8"
        }
      >
        Manage Team {teamName}
      </h1>
      <div className="my-2">
        <TeamForm teamCode={code} deptName={teamName} />
      </div>
    </div>
  );
}
