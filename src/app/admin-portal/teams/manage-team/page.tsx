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
  const emptyTeamData: Teams = {
    _id: "",
    team_code: code,
    dept_name: teamName,
    football: {
      team_name: "",
      team_logo: "",
      players: [] as Player[],
    },
    cricket: {
      team_name: "",
      team_logo: "",
      players: [] as Player[],
    },
  };
  const [teamData, setTeamData] = useState<Teams>(emptyTeamData);
  const getTeamData = async (code: string) => {
    const res = await fetch(`/api/v1/team/${code}`);
    const data = await res.json();
    if (res.ok) {
      if (data.code === "success") {
        setTeamData(data.data);
      }
    } else {
      setTeamData(emptyTeamData);
    }
  };

  useEffect(() => {
    getTeamData(code);
  }, [code]);

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
        <TeamForm teamData={teamData} />
      </div>
    </div>
  );
}
