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

const HeroSection = ({ notice, noticeLink }: HeroSectionProps) => {
  const [post, setPost] = useState<Posts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("/api/v1/posts/featured");
        const data = await res.json();
        setPost(data);
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
      <div className="pb-4 lg:mb-2 scroll-smooth focus:scroll-auto md:scroll-auto group/item relative hover:scale-95 hover:duration-300 hover:delay-300 ">
        <div className="relative flex flex-wrap  rounded-2xl  group-hover/item:hover:bg-gradient-to-r from-slate-200 via-slate-300 to-slate-600 hover:delay-300 group-hover/item:shadow-2xl animate-flip-down animate-delay-700">
          <div className="w-full lg:w-1/2 lg:pr-12">
            <div className="flex justify-center">
              <Link href={"/posts/" + post._id.toString()}>
                <ArticleImage
                  height={900}
                  width={1600}
                  quality={100}
                  src={post.link}
                  alt="image"
                  className="group/edit rounded-2xl w-auto object-contain aspect-video bg-gray-200 group-hover/item:bg-gradient-to-r from-slate-200 to-slate-300 hover:delay-200 animate-fade-right animate-delay-1000"
                />
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2  my-auto">
            <div className="flex flex-col">
              <div className="flex flex-row items-center justify-between">
                <div className="py-4 font-extrabold text-md text-red-600 ml-2 mr-2 tracking-tight animate-fade-left animate-once animate-duration-1000 animate-delay-1000 ">
                  Featured
                </div>
                <div>
                  <RealtedPostIcons post={post} />
                </div>
              </div>
              <Link href={"/posts/" + post._id.toString()}>
                <div className="text-4xl tracking-tight font-serif line-clamp-3 ml-2 mr-2 text-ellipsis animate-flip-up animate-once animate-duration-1000 animate-delay-1000">
                  {post.title}
                </div>
                <div className=" my-2 font-light text-ellipsis line-clamp-2 ml-2 mr-2 animate-fade-up animate-duration-1000 animate-delay-1000">
                  {post.description}
                  {". "}
                  <Link
                    href={"/posts/" + post._id.toString()}
                    className="group/edit invisible  text-black fon font-semibold group-hover/item:visible group-hover/item:animate-pulse group-hover/item:animate-iteration-infinite"
                  ><span className="">
                      Read More...
                    </span>
                  </Link>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {notice && (
        <div className="py-3 px-3 w-full bg-red-600 flex items-center justify-center">
          <h1 className="bg-white text-center text-red-600 font-semibold py-3 px-5 rounded-md">
            Latest Notice
          </h1>
          <p className="text-white font-sans ml-3 lg:ml-6">
            {notice}
            {noticeLink && (
              <Link href={noticeLink} className="underline text-sky-200 ml-2">
                Learn More
              </Link>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
