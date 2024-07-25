import React from 'react';
import { Article } from './types'; // Import the Article interface
import Image from 'next/image';

// Define the props for the ArticleSection component
interface ArticleSectionProps {
  heading: string;
  articles: Article[];
  toggleSectionVisibility: () => void;
  isExpanded: boolean;
}

const ArticleSection: React.FC<ArticleSectionProps> = ({ heading, articles, toggleSectionVisibility, isExpanded }) => {
  return (
    <div className="article-section">
      <div className="flex justify-between items-center mb-4 section-header">
        <h2 className="text-xl text-black font-bold">{heading}</h2>
        <button onClick={toggleSectionVisibility} className="text-red-700 font-bold underline">
          {isExpanded ? "Show Less" : "Show All"}
        </button>
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 section-content`}>
        {articles.slice(0, isExpanded ? articles.length : 3).map((article, idx) => (
          <div key={idx} className="article-container">
            <Image src={article.image} alt={article.title} className="w-full aspect-video rounded-md" width={500} height={500} />
            <h3 className="text-lg font-semibold mt-4 text-articleText">{article.title}</h3>
            <p className="text-gray-600 mt-2">{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleSection;