import React from "react";
import Image from "next/image";
import { Poppins, IBM_Plex_Serif, Nunito_Sans } from "next/font/google";
import { Posts } from "@/models/Post";
import Link from "next/link";

// Define the props for the ArticleSection component
interface ArticleSectionProps {
  heading: string;
  articles: Posts[];
}

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

const ArticleSection: React.FC<ArticleSectionProps> = ({
  heading,
  articles,
}) => {
  return (
    <div className="article-section">
      <div className="flex justify-between items-center mb-4 section-header">
        <h2 className={poppins.className + " text-xl text-black font-bold"}>
          {heading}
        </h2>
        <button
          className={poppins.className + " text-red-700 font-bold underline"}
        >
          Show All
        </button>
      </div>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 section-content`}
      >
        {articles.map((article, idx) => (
          <Link href={"/posts/" + article._id}>
          <div key={idx} className="article-container">
            <Image
              src={article.link}
              alt={article.title}
              className="w-full aspect-video rounded-md object-cover"
              width={500}
              height={500}
            />
            <h3 className={ibmPlexSerif.className + " text-lg font-bold mt-4 "}>
              {article.title}
            </h3>
            <p className={nunitoSans.className + " text-gray-700 mt-2"}>
              {article.description}
            </p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticleSection;
