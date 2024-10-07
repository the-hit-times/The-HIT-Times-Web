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
        <span className="relative flex  ">
          <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-red-400 opacity-75 "></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>     
            <Link
              href={showAllLink ?? ""}
              className={poppins.className + " text-red-700 font-bold bg-red-200 rounded-md"}
            >
              Show All
            </Link>
        </span>
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
