"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IBM_Plex_Serif, Nunito_Sans, Poppins } from "next/font/google";
import { PlusIcon } from "@heroicons/react/24/outline";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
});

const quickActions = [
  {
    title: "Create a Post",
    url: "/admin-portal/posts/create-post",
  },
  {
    title: "See all posts",
    url: "/admin-portal/posts",
  },
  {
    title: "Create a Match",
    url: "/admin-portal/matches/create-match",
  },
  {
    title: "See all matches",
    url: "/admin-portal/matches",
  },
  {
    title: "Add Alumni",
    url: "/admin-portal/alumni/create-alumni",
  },
  {
    title: "See all Alumni",
    url: "/admin-portal/alumni",
  },
  {
    title: "Send a Notification",
    url: "/admin-portal/notify",
  },
  {
    title: "All Events",
    url: "/admin-portal/events",
  },
];

export default function AdminPortal() {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <div className="my-2">
      <h1
        className={
          ibmPlexSerif.className + " text-zinc-800 text-5xl font-semibold my-8"
        }
      >
        Welcome!, {user?.name}
      </h1>
      <div className="my-2">
        <h2 className={"my-4 text-xl " + poppins.className}>Quick Actions</h2>
        <div className="grid grid-flow-row grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.url}
              className={
                nunitoSans.className +
                " bg-white rounded-lg py-8 text-3xl font-bold text-center"
              }
            >
              {action.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
