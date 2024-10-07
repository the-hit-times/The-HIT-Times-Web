import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { Posts } from "@/models/Post";
import Link from "next/link";
import Article from "./Article";

// Define the props for the ArticleSection component
export interface ArticleSectionProps {
  heading: string;
  showAllLink: string;
  articles: Posts[];
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});


const ArticleSection: React.FC<ArticleSectionProps> = ({
  heading,
  articles,
  showAllLink,
}) => {
  return (
    <div className="article-section">
      <div className="flex justify-between items-center mb-4 section-header  rounded-xl scroll-smooth">
        <h2 className={poppins.className + " text-xl text-black font-bold animate-fade-right animate-once animate-duration-500 animate-delay-500"}>
          {heading}
        </h2>
        <button className="group/item relative inline-flex  items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium rounded-lg group bg-gradient-to-br from-slate-500 to-violet-500 group-hover:from-slate-500 group-hover:to-violet-500 focus:ring-4 hover:scale-110  focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 ">
          <span className="relative px-2 py-1 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            <Link
              href={showAllLink ?? ""}
              className={poppins.className + " text-black font-extrabold group-hover/item:text-white font-mono h-max "}
            >
              Show All
            </Link>    
          </span>
        </button>
      </div>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 section-content`}
      >
        {articles.map((article, idx) => (
          <Article key={idx} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleSection;

