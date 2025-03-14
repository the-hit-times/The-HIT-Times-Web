"use client";

import Image from "next/image";
import Link from "next/link";
import { Posts } from "@/models/Post";
import { useEffect, useState, useCallback, useRef } from "react";
import { IBM_Plex_Serif, Nunito_Sans, Poppins } from "next/font/google";
import { dropdownsToSections } from "@/components/weekly-portion/WeeklyPortion";
import Article from "@/components/weekly-portion/Article";
import { CircularLoader } from "@/components/common/loader/Loaders";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";

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

export default function PostsPage({ params }: { params: { dropdown: string } }) {
  const PAGE_LIMIT = 30;
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(1);
  const isMounted = useRef(true);

  const fallbackImage = "https://placehold.co/600x400.png";

  const getData = async () => {
    if (!loadMore) return;
    
    setLoading(true);
    const response = await fetch(
      `/api/v1/posts?limit=${PAGE_LIMIT}&page=${page}&dropdown=${params.dropdown}`
    );

    if (!response.ok) {
      setLoading(false);
      return;
    }

    const data = await response.json();
    
    if (!isMounted.current) return;

    const formattedData = data.map((post: Posts) => ({
      ...post,
      link: post.link?.startsWith("http") ? post.link : fallbackImage,
    }));

    setPosts((prev) => [...prev, ...formattedData]);
    setLoading(false);

    if (data.length < PAGE_LIMIT) {
      setLoadMore(false);
    }
  };

  const handleScroll = useCallback(() => {
    if (
      loadMore &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
    ) {
      setPage((prev) => prev + 1);
    }
  }, [loadMore]);

  useEffect(() => {
    isMounted.current = true;
    getData();

    return () => {
      isMounted.current = false;
    };
  }, [page, params.dropdown]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const pageTitle = dropdownsToSections[params.dropdown] || "Posts";

  return (
    <div >
      <h1
        className={`${ibmPlexSerif.className} text-zinc-800 dark:text-gray-200 sm:text-5xl text-3xl font-semibold py-8 animate-fade-right animate-once animate-duration-500 animate-delay-500`}
      >
        {pageTitle}
      </h1>

      <div className="grid grid-flow-row md:grid-cols-3 gap-8 my-4 scroll-smooth">
        {posts.map((post) => (
          <Article key={post._id.toString()} article={post} />
        ))}
      </div>

      {loading && <CircularLoader />}
    </div>
  );
}
