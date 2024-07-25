"use client";
import React, { useEffect, useState } from 'react';
import './styles.css'; // Ensure this import is correct
import ArticleSection from './ArticleSection'; // Ensure this import path is correct
import { Article, DaySections } from './types'; // Import the interfaces

// Function to fetch mock articles
const fetchArticles = async (): Promise<DaySections> => {
  const mockArticle: Article = {
    title: "International Yoga Day Celebrated with Enthusiasm at Gymnasium Yoga Centre, Strengthening Community Spirit",
    description: "In celebration of International Yoga Day on 21st of June, a well-attended yoga event was observed at the Gymnasium Yoga Centre. The event began...",
    image: "https://picsum.photos/400/300",
  };
  //only for mock demonstration
  const articles: Article[] = [];
  for (let i = 0; i < 15; i++) {
    articles.push(mockArticle);
  }

  return {
    Section1: [{ heading: "Funny Friday", articles: articles.slice(0, 5) }],
    Section2: [{ heading: "Open Source", articles: articles.slice(3, 6) }],
    Wednesday: [{ heading: "Heritage Highligths", articles: articles.slice(6, 9) }],
    Thursday: [
      { heading: "Tech Byte", articles: articles.slice(9, 12) },
    ]
  };
};

// Main React component
const WeeklyPortion: React.FC = () => {
  const [sections, setSections] = useState<DaySections>({});
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [showAllSections, setShowAllSections] = useState<boolean>(false); // State to control visibility of sections

  // useEffect hook to fetch articles on component mount
  useEffect(() => {
    const getSections = async () => {
      const allSections = await fetchArticles();
      setSections(allSections);
    };

    getSections();
  }, []);

  // Function to toggle visibility of a section
  const toggleSectionVisibility = (key: string) => {
    setExpandedSections((prevExpandedSections) => ({
      ...prevExpandedSections,
      [key]: !prevExpandedSections[key],
    }));
  };

  // Function to toggle visibility of all sections
  const toggleAllSectionsVisibility = () => {
    setShowAllSections(!showAllSections);
  };

  const visibleSections = showAllSections
    ? Object.entries(sections)
    : Object.entries(sections).slice(0, 2); // Show only first two sections initially

  return (
    <div className="container mx-auto min-h-screen flex flex-col p-4 bg-white">
      {/* Render sections */}
      {visibleSections.map(([day, daySections]) => (
        <div key={day} className="day-section mb-8">
          {daySections.map((section, idx) => (
            <ArticleSection
              key={idx}
              heading={section.heading}
              articles={section.articles}
              toggleSectionVisibility={() => toggleSectionVisibility(`${day}-${idx}`)}
              isExpanded={expandedSections[`${day}-${idx}`]}
            />
          ))}
        </div>
      ))}

      {/* Button to toggle visibility of all sections */}
      <div className="flex justify-center mb-8">
        <button onClick={toggleAllSectionsVisibility} className="button-default">
          {showAllSections ? "Show Less Sections" : "Show More Sections"}
        </button>
      </div>
    </div>
  );
};

export default WeeklyPortion;