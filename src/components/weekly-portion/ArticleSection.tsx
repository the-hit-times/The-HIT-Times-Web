import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { Posts } from "@/models/Post";
import Link from "next/link";
import Article from "./Article";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
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
    <div className="article-section  scroll-smooth flex flex-col gap-4">
      <motion.div
        variants={fadeIn("right", 0.05)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.1 }}
        className="flex justify-between items-center section-header  rounded-xl scroll-smooth mx-2"
      >
        <h2
          className={
            poppins.className +
            " text-xl text-black font-bold animate-fade-right animate-once animate-duration-500 animate-delay-500 dark:text-white"
          }
        >
          {heading}
        </h2>
        <Link
          href={showAllLink ?? ""}
          className={
            poppins.className + " text-red-700 font-bold hover:underline"
          }
        >
          Show All
        </Link>
      </motion.div>
      <motion.div
        variants={fadeIn("left", 0.05)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.1 }}
        className={`grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4 section-content scroll-smooth`}
      >
        {articles.map((article, idx) => (
          <Article key={idx} article={article} />
        ))}
      </motion.div>
    </div>
  );
};

export default ArticleSection;
