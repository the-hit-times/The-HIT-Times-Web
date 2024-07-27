"use client";
import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { MatchPosts } from "@/models/Match";

export default function MangeMatchPostPage() {
  const PAGE_LIMIT = 10;
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
    setPosts(data.data);
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
      <h1>Manage Matches</h1>

      <div className="grid grid-flow-row md:grid-cols-3 gap-2">
        {posts.map((post) => (
          <div key={post._id.toString()} className="p-2 bg-white rounded-md">
            <h2 className="font-bold text-lg">{post.team1.team_code}</h2>
            <p className="text-sm text-gray-800">{post.team2.team_code}</p>
            <div>
              <span className="text-sm text-gray-500">
                {new Date(post.match_date).toLocaleDateString()}
              </span>
            </div>
            <hr />
            <div className="flex flex-row justify-between p-2">
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
        ))}
      </div>

      {loading && <p>Loading...</p>}
    </div>
  );
}
