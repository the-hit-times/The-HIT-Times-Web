"use client";

import Image from "next/image";
import Link from "next/link";
import { Posts } from "@/models/Post";
import { useEffect, useState } from "react";
import { IBM_Plex_Serif, Nunito_Sans, Poppins } from "next/font/google";
import { dropdownsToSections } from "@/components/WeeklyPortion/weeklyPortion";
import Article from "@/components/WeeklyPortion/Article";

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
  const PAGE_LIMIT = 10;
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadmore, setLoadmore] = useState(true);
  const [page, setPage] = useState(1);

  const getData = async () => {
    const dropdown = params.dropdown;

    const response = await fetch(
      `/api/v1/posts?limit=${PAGE_LIMIT}&page=${page}&dropdown=${dropdown}`
    );
    const data = await response.json();
    const testData = data.map((post: Posts) => {
      // check if link is a valid url
      if (post.link.startsWith("http")) {
        return post;
      } else {
        return {
          ...post,
          link: "https://placehold.co/600x400.png",
        };
      }
    });

    if (data.length < PAGE_LIMIT) {
      setLoadmore(false);
    }

    const updatedPosts = [...posts, ...testData];
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

  const pageTitle = dropdownsToSections[params.dropdown];

  return (
    <div>
      <h1
        className={
          ibmPlexSerif.className + " text-zinc-800 text-5xl font-semibold py-8"
        }
      >
        {pageTitle}
      </h1>

      <div className="grid grid-flow-row md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Article key={post._id.toString()} article={post} />
        ))}
      </div>

      {loading && <p>Loading...</p>}
    </div>
  );
}
