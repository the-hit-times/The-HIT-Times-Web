"use client";

import { IBM_Plex_Serif } from "next/font/google";
import EditLivePostForm from "@/components/admin-portal/matches/EditLivePost";
import { Suspense, useEffect, useState } from "react";
import { MatchPosts } from "@/models/Match";
import { notFound } from "next/navigation";
import { CircularLoader } from "@/components/common/loader/Loaders";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default function EditMatchPost({
  params,
}: {
  params: { matchId: string };
}) {
  const matchId = params.matchId;
  const [matchData, setMatchData] = useState<MatchPosts | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadMatchData = async () => {
    try {
      const response = await fetch(`/api/v1/live/match/${matchId}`);
      const data = await response.json();
      if (response.ok) {
        setMatchData(data.data);
      } else {
        throw new Error("Failed to fetch match data");
      }
    } catch (error) {
      console.error("Error loading match data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatchData();
  }, [matchId]);

  if (!loading && !matchData) {
    notFound();
  }

  return (
    <div>
      <h1
        className={
          ibmPlexSerif.className + " text-zinc-800 text-5xl font-semibold py-8"
        }
      >
        Edit Match
      </h1>
      <Suspense fallback={<CircularLoader />}>
        {matchData && <EditLivePostForm match={matchData} />}
      </Suspense>
    </div>
  );
}