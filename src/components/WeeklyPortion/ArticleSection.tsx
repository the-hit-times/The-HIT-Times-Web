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
      <div className="flex justify-between items-center mb-4 section-header">
        <h2 className={poppins.className + " text-xl text-black font-bold"}>
          {heading}
        </h2>
        <Link
          href={showAllLink ?? ""}
          className={poppins.className + " text-red-700 font-bold underline"}
        >
          Show All
        </Link>
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
