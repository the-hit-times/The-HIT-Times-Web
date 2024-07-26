import { IBM_Plex_Serif } from "next/font/google";
import EditLivePostForm from "@/components/admin-portal/matches/EditLivePost";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default function EditMatchPost({
  params,
}: {
  params: { matchId: string };
}) {
  return (
    <div>
      <h1
        className={
          ibmPlexSerif.className + " text-zinc-800 text-5xl font-semibold py-8"
        }
      >
        Edit Match
      </h1>
      <EditLivePostForm matchId={params.matchId} />
    </div>
  );
}
