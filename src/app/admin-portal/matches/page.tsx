"use client";
import { useEffect, useState } from "react";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { MatchPosts } from "@/models/Match";
import { IBM_Plex_Serif, Nunito_Sans, Poppins } from "next/font/google";
import { codeToTeamName } from "@/lib/codeToTeamName";
import { CircularLoader } from "@/components/common/loader/Loaders";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default function MangeMatchPostPage() {
  const PAGE_LIMIT = 100;
  const [posts, setPosts] = useState<MatchPosts[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadmore, setLoadmore] = useState(true);
  const [page, setPage] = useState(1);

  const getData = async () => {
    const response = await fetch(
      `/api/v1/live/match?limit=${PAGE_LIMIT}&page=${page}`
    );
    const data = await response.json();
    if (data.length < PAGE_LIMIT) {
      setLoadmore(false);
    }
    const updatedPosts = [...posts, ...data.data];
    setPosts(updatedPosts);
    setLoading(false);
  };

  const handleScroll = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    getData();
    window.addEventListener("scroll", () => {
      if (
        loadmore &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      ) {
        handleScroll();
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  const handleDeletePost = async (firebaseId: string) => {
    const response = await fetch(`/api/v1/live/match/${firebaseId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const updatedPosts = posts.filter(
        (post) => post.firebase_match_id !== firebaseId
      );
      setPosts(updatedPosts);
    }
  };

  return (
    <div>
      <div className="flex flex-row py-8 justify-between items-center">
        <h1
          className={
            ibmPlexSerif.className + " text-zinc-800 text-5xl font-semibold"
          }
        >
          Manage Matches
        </h1>

        <Link href="/admin-portal/matches/create-match">
          <button className="bg-blue-100 rounded-full text-blue-800 py-2 px-4 flex flex-row items-center gap-2">
            <PlusIcon width={18} height={18} />
            <span>Create Match</span>
          </button>
        </Link>
      </div>

      <div className="grid grid-flow-row md:grid-cols-3 gap-2 my-4">
        {posts.map((post) => (
          <div
            key={post._id.toString()}
            className="p-4 bg-white rounded-md grid grid-flow-row gap-2"
          >
            <div className="">
              <div className="flex flex-row justify-between">
                <h2 className="font-bold text-lg">
                  {codeToTeamName[post.team1.team_code]} vs{" "}
                  {codeToTeamName[post.team1.team_code]}
                </h2>
                <div className="flex flex-row gap-2">
                  <div className="bg-blue-50 rounded-3xl px-4 py-1 text-blue-900">
                    {post.match_type}
                  </div>
                  {post.is_live && (
                    <div className="bg-red-600 rounded-3xl px-4 py-1 text-white">
                      LIVE
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-800">
                {post.team1.team_score} vs {post.team2.team_score}
              </p>
            </div>
            <div>
              <span className="text-xs text-gray-500">
                {new Date(post.match_date).toLocaleDateString()}
              </span>
            </div>
            <div>
              <hr />
              <div className="flex flex-row justify-between pt-2">
                <button>
                  <Link
                    href={`/admin-portal/matches/edit/${post.firebase_match_id}`}
                    className="flex flex-row items-center gap-2 text-blue-800 hover:bg-slate-100 p-1 rounded-md"
                  >
                    <PencilIcon className="h-5 w-5" />
                    Edit
                  </Link>
                </button>
                <button
                  onClick={() => handleDeletePost(post.firebase_match_id)}
                  className="hover:bg-red-50 p-1 rounded-sm"
                >
                  <TrashIcon className="h-5 w-5 text-red-500 " />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && <CircularLoader />}
    </div>
  );
}
