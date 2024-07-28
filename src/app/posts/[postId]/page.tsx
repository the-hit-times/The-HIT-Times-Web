"use client";

import MainPostIcons from "@/components/post-components/mainPostIcons";
import RealtedPostIcons from "@/components/post-components/realtedPostIcons";
import Image from "next/image";
import Link from "next/link";
import { Posts } from "@/models/Post";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { IBM_Plex_Serif, Nunito_Sans, Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { CircularLoader } from "@/components/common/loader/Loaders";
import ArticleImage from "@/components/weekly-portion/ArticleImage";
import Article from "@/components/weekly-portion/Article";

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

const PostInfoPage = ({ params }: { params: { postId: string } }) => {
  const [postinfo, setPostinfo] = useState<Posts>();
  const [relatedPosts, setRelatedPosts] = useState<Posts[]>();
  const [loading, setLoading] = useState(true);

  const loadPost = async () => {
    const res = await fetch(`/api/v1/posts?_id=${params.postId}`);
    const data = await res.json();
    setPostinfo(data[0]);
    setLoading(false);
    if (data.length !== 1) {
      return;
    }
    loadRelatedPosts(data[0]);
  };

  const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const postDate = new Date(date);
    const diff = now.getTime() - postDate.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (years > 0) {
      return years + " years ago";
    } else if (months > 0) {
      return months + " months ago";
    } else if (days > 0) {
      return days + " days ago";
    } else if (hours > 0) {
      return hours + " hours ago";
    } else if (minutes > 0) {
      return minutes + " minutes ago";
    } else {
      return seconds + " seconds ago";
    }
  };

  const calculateReadTime = (htmlBody: string): string => {
    const words = htmlBody.split(" ");
    return Math.ceil(words.length / 200) + " min read";
  };

  const loadRelatedPosts = async (post: Posts) => {
    const res = await fetch(`/api/v1/posts?dropdown=${post.dropdown}&limit=6`);
    const data = await res.json();

    // Remove the current post from the related posts
    const filteredData = data.filter((x: Posts) => x._id !== post._id);
    setRelatedPosts(filteredData);
  };
  useEffect(() => {
    loadPost();
  }, []);

  if (loading) {
    return <CircularLoader />;
  }

  if (!postinfo) {
    notFound();
  }

  return (
    <div>
      <main>
        <div className="before:absolute before:bg-indigo-950 before:w-full before:h-1/3 before:-z-10 before:left-0">
          {/* <div className="absolute top-0 left-0 right-0 -z-10 w-full h-2/3  lg:h-1/2 bg-indigo-950"></div> */}
          <h1
            className={
              ibmPlexSerif.className +
              " text-2xl text-center text-white sm:text-4xl font-semibold py-8 w-fit mx-auto"
            }
          >
            {postinfo.title}
          </h1>
          <ArticleImage
            src={postinfo.link}
            alt="image"
            width={500}
            height={423}
            className="object-contain mx-auto w-full aspect-video "
          />
        </div>

        <div className="flex flex-row gap-8 mt-8 w-full">
          <div className="">
            <MainPostIcons />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <div
              className={poppins.className + " flex flex-row gap-8 text-sm "}
            >
              <p className="text-gray-800 font-medium">
                {getRelativeTime(postinfo.createdAt)}
              </p>
              <p className="text-gray-500">
                {calculateReadTime(postinfo.htmlBody ?? postinfo.body)}
              </p>
            </div>
            <div className={nunitoSans.className + " text-gray-700 text-lg prose-a:text-blue-800 text-justify"}>
              {parse(postinfo.htmlBody ?? postinfo.body)}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className={poppins.className + " font-medium"}>Related Topics</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 my-4">
            {relatedPosts?.map((post) => (
              <Article
                key={post._id.toString()}
                article={post}
               />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostInfoPage;
