"use client";

import RealtedPostIcons from "@/components/post-components/realtedPostIcons";
import { Posts } from "@/models/Post";
import Link from "next/link";
import { useEffect, useState } from "react";
import ArticleImage from "../weekly-portion/ArticleImage";
import parse, { attributesToProps } from "html-react-parser";

interface HeroSectionProps {
  notice?: string;
  noticeLink?: string;
}

const HeroSection = () => {
  const [post, setPost] = useState<Posts | null>(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState({ noticeTitle: "", noticeLink: "" });
  const [isNoticeEmpty, setNoticeEmpty] = useState(false);
  const { noticeTitle, noticeLink } = notice;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("/api/v1/posts/featured");
        const data = await res.json();
        setPost(data);
        const res2 = await fetch("/api/v1/notice");
        let notice = await res2.json();
        notice = notice.reverse();

        if (notice.length > 0) {
          setNotice(notice[0]);
        } else {
          setNoticeEmpty(true);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  if (loading || !post) {
    return;
  }

  return (
    <div>
    <div className="pb-4 lg:mb-2 scroll-smooth focus:scroll-auto md:scroll-auto group/item relative">
      <div className="relative flex flex-wrap rounded-2xl animate-flip-down animate-delay-700">
        <div className="w-full lg:w-1/2 lg:pr-12">
          <div className="flex justify-center">
            <Link href={"/posts/" + post._id.toString()}>
              <ArticleImage
                height={900}
                width={1600}
                quality={100}
                src={post.link}
                alt="image"
                className="group/edit rounded-2xl w-auto object-contain aspect-video bg-gray-200 dark:bg-gray-800"
              />
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/2 my-auto">
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between">
              <div className="py-4 font-extrabold text-md text-red-600 dark:text-red-400 ml-2 mr-2 tracking-tight animate-fade-left animate-once animate-duration-200 animate-delay-200">
                Featured
              </div>
              <div>
                <RealtedPostIcons post={post} />
              </div>
            </div>
            <Link href={"/posts/" + post._id.toString()}>
              <div className="text-4xl tracking-tight font-serif line-clamp-3 ml-2 mr-2 text-ellipsis animate-flip-up animate-once animate-duration-200 animate-delay-200 dark:text-gray-100">
                {post.title}
              </div>
              <div className="my-2 font-light text-ellipsis line-clamp-2 ml-2 mr-2 animate-fade-up animate-duration-200 animate-delay-200 dark:text-gray-300">
                {post.description}
                {". "}
                <Link
                  href={"/posts/" + post._id.toString()}
                  className="underline text-blue-700 dark:text-blue-400"
                >
                  Read More
                </Link>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
    {!isNoticeEmpty && (
      <div className="py-3 px-3 w-full bg-gradient-to-b from-red-600 via-red-500 to-red-700 flex items-center justify-center rounded-xl">
        <h1 className="bg-white dark:bg-gray-900 text-center text-red-600 dark:text-red-400 font-semibold py-3 px-5 rounded-md">
          Latest Notice
        </h1>
        <p className="text-white dark:text-gray-300 font-sans ml-3 lg:ml-6">
          {noticeTitle}
          {noticeLink && (
            <button className="bg-transparent px-2 py-2 text-sky-100 dark:text-blue-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-lg hover:shadow-xl sm:ml-2">
              <Link href={noticeLink} className="font-sans font-bold text ml-2 underline">
                Click Here
              </Link>
            </button>
          )}
        </p>
      </div>
    )}
  </div>
  );
};

export default HeroSection;
