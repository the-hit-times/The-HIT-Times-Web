"use client";

import MainPostIcons from "@/components/post-components/mainPostIcons";
import RealtedPostIcons from "@/components/post-components/realtedPostIcons";
import Image from "next/image";
import Link from "next/link";
import { Posts } from "@/models/Post";
import { useEffect, useState } from "react";
import parse from "html-react-parser";

const PostInfoPage = ({ params }: { params: { postId: string } }) => {
  const [postinfo, setPostinfo] = useState<Posts>();
  const [relatedPosts, setRelatedPosts] = useState<Posts[]>();

  const loadPost = async () => {
    const res = await fetch(`/api/v1/posts?_id=${params.postId}`);
    const data = await res.json();
    setPostinfo(data[0]);
    loadRelatedPosts(data[0].dropdown);
  };

  const loadRelatedPosts = async (dropdown: string) => {
    const res = await fetch(`/api/v1/posts?dropdown=${dropdown}&limit=5`);
    const data = await res.json();
    setRelatedPosts(data);
  };
  useEffect(() => {
    loadPost();
  }, []);

  if (!postinfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="absolute -z-10 w-full h-40 bg-indigo-950 sm:h-44 md:h-48 lg:h-52"></div>
      <main className="mx-4 py-8 px-4 sm:px-10 md:px-20 lg:px-32 lg:py-12">
        <h1 className="bg-transparent font-mono text-2xl text-center text-white sm:text-4xl pb-2">
          {postinfo.description}
        </h1>
        <div className="bg-white shadow overflow-hidden lg:mx-16">
          {
            <Image
              src={postinfo.link}
              alt="image"
              width={1200}
              height={675}
              className="max-h-[65vh]"
            />
          }
        </div>
        <div className="lg:flex lg:items-center">
          <div className="">
            <MainPostIcons />
          </div>
          <div className="">
            <div className="px-4 py-5 sm:px-6 text-3xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                {postinfo.title}
              </span>
            </div>
            <div className="px-4 py-5 sm:px-6 text-gray-500">
              {parse(postinfo.htmlBody)}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-sm underline font-medium leading-6 text-red-600">
            Related posts
          </h3>
        </div>
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {relatedPosts?.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow overflow-hidden sm:rounded-lg"
              >
                <Link href={post._id}>
                  <div className="px-4 py-5 sm:px-2 sm:py-2">
                    <div className="overflow-hidden rounded-md ">
                      <Image
                        src={post.link}
                        alt="loading image"
                        width={500}
                        height={150}
                        className="hover:scale-125 hover:opacity-85 duration-1000"
                      />
                    </div>
                    <h5 className="text-md font-medium leading-6 text-gray-600">
                      {post.description}
                    </h5>
                  </div>
                </Link>
                <div className="sticky top-full">
                  <hr />
                  <RealtedPostIcons />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostInfoPage;
