"use client";

import Image from "next/image";
import Link from "next/link";
import { Posts } from "@/models/Post";
import { useEffect, useState } from "react";
import { IBM_Plex_Serif, Nunito_Sans, Poppins } from "next/font/google";
import { dropdownsToSections } from "@/components/weekly-portion/WeeklyPortion";
import Article from "@/components/weekly-portion/Article";
import { CircularLoader } from "@/components/common/loader/Loaders";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800"],
});

export default function PostsPage({
  params,
}: {
  params: { dropdown: string };
}) {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const bookmarkedPosts = JSON.parse(
      localStorage.getItem("bookmarkedPosts") || "[]"
    ).reverse();
    const newPosts = await Promise.all(
      bookmarkedPosts.map(async (postId: string) => {
        const res = await fetch(`/api/v1/post/${postId}`);
        const data = await res.json();
        return data.data;
      })
    );
    const updatedPosts = [...posts, ...newPosts];
    setPosts(updatedPosts);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1
        className={
          ibmPlexSerif.className +
          " text-zinc-800 sm:text-5xl text-3xl font-semibold py-8"
        }
      >
        My Bookmarks
      </h1>

      {posts.length === 0 && (
        <div>
          No Bookmarks found. Get started my bookmarking your favorite posts.
        </div>
      )}
      <div className="grid grid-flow-row md:grid-cols-3 gap-8 my-4 min-h-screen">
        {posts.map((post) => (
          <Article key={post._id.toString()} article={post} />
        ))}
      </div>

      {loading && <CircularLoader />}
    </div>
  );
}
