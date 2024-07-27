import RealtedPostIcons from "@/components/post-components/realtedPostIcons";
import { Posts } from "@/models/Post";
import Link from "next/link";

interface HeroSectionProps {
  post: Posts;
  notice?: string;
  noticeLink?: string;
}

const HeroSection = ({ post, notice, noticeLink }: HeroSectionProps) => {
  return (
    <div className="mb-16">
      <div className="pb-4 lg:mb-2">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2 lg:p-12">
            <div className="flex justify-center">
              <img
                src={post.link}
                alt="image"
                className="rounded-md lg:rounded-2xl"
              />
            </div>
          </div>
          <div className="w-full p-2 lg:w-1/2 lg:p-12 my-auto">
            <div className="flex flex-col">
              <div className="flex flex-row items-center justify-between">
                <div className="pb-8 pt-8 font-extrabold text-md text-red-600 tracking-tight">
                  Featured
                </div>
                <div>
                  <RealtedPostIcons />
                </div>
              </div>
              <div className="text-4xl tracking-tight font-serif">
                {post.description}
              </div>
              <div className="my-2 max-w-xl py-6 font-light">
                {post.body.slice(0, 200)} ...
                <Link
                  href={"/posts/" + post._id.toString()}
                  className="underline text-blue-700"
                >
                  Read More
                </Link>
              </div>
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
              <Link href={noticeLink} className="underline text-sky-200">
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
