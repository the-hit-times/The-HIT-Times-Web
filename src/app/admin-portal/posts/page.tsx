"use client";
import { Posts } from "@/models/Post";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PostsPage() {
  const PAGE_LIMIT = 10;
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadmore, setLoadmore] = useState(true);
  const [page, setPage] = useState(1);

  const getData = async () => {
    const response = await fetch(
      `/api/v1/posts?limit=${PAGE_LIMIT}&page=${page}`
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

  return (
    <div>
      <h1>Posts Page</h1>

      <div className="grid grid-flow-row md:grid-cols-2 gap-2">
        {posts.map((post) => (
          <div key={post._id} className="p-2 bg-white rounded-md">
            <Image src={post.link} alt={post.title} width={200} height={200} />
            <h2 className="font-bold text-lg">{post.title}</h2>
            <p className="text-sm text-gray-800">{post.description}</p>
          </div>
        ))}
      </div>

      {loading && <p>Loading...</p>}
    </div>
  );
}
