import CreateLivePostForm from "@/components/admin-portal/matches/CreateLivePost";
import { IBM_Plex_Serif } from "next/font/google";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default function CreateLivePost() {
  return (
    <div>
      <h1
        className={
          ibmPlexSerif.className + " text-zinc-800 text-5xl font-semibold py-8"
        }
      >
        Create a Live Match
      </h1>
      <CreateLivePostForm />
    </div>
  );
}
