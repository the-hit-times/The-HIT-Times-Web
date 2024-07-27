"use client";
import { Posts } from "@/models/Post";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Types } from "mongoose";
import Link from "next/link";
import { IBM_Plex_Serif, Nunito_Sans, Poppins } from "next/font/google";
import { PlusIcon } from "@heroicons/react/24/outline";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800"],
});

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

  const handleDeletePost = async (_id: Types.ObjectId) => {
    const response = await fetch(`/api/v1/post/${_id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const updatedPosts = posts.filter((post) => post._id !== _id);
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
          Posts Page
        </h1>

        <Link href="/admin-portal/posts/create-post">
          <button className="bg-blue-100 rounded-full text-blue-800 py-2 px-4 flex flex-row items-center gap-2">
            <PlusIcon width={18} height={18} />
            <span>Create Post</span>
          </button>
        </Link>
      </div>

      <div className="grid grid-flow-row md:grid-cols-3 gap-2">
        {posts.map((post) => (
          <div
            key={post._id.toString()}
            className="p-2 bg-white rounded-md gap-2 flex flex-col"
          >
            <div className="">
              <Image
                src={post.link}
                alt={post.title}
                className="w-full aspect-video rounded-md object-cover"
                width={500}
                height={500}
              />
              <h3
                className={ibmPlexSerif.className + " text-lg font-bold mt-4 "}
              >
                {post.title}
              </h3>
              <p className={nunitoSans.className + " text-gray-700"}>
                {post.description}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
            <hr />
            <div className="flex flex-row justify-between p-2">
              <button>
                <Link
                  href={`/admin-portal/posts/edit/${post._id}`}
                  className="flex flex-row items-center gap-2 text-blue-800 hover:bg-slate-100 p-1 rounded-md"
                >
                  <PencilIcon className="h-5 w-5" />
                  Edit
                </Link>
              </button>
              <button
                onClick={() => handleDeletePost(post._id)}
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
