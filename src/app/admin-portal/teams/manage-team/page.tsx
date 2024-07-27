"use client";
import { Suspense } from "react";
import TeamForm from "@/components/admin-portal/teams/TeamForm";
import { getAllTeamsCode, getTeamName } from "@/lib/codeToTeamName";
import { IBM_Plex_Serif } from "next/font/google";
import { useSearchParams, notFound } from "next/navigation";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function ManageTeamPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const teamsCode = getAllTeamsCode();

  if (code === null || !teamsCode.includes(code)) {
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

export default function CreateTeamPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ManageTeamPage />
    </Suspense>
  );
}
