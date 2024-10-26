"use client";
import React, { Suspense, useEffect, useState } from "react";
import ArticleSection, { ArticleSectionProps } from "./ArticleSection"; // Ensure this import path is correct
import { Posts } from "@/models/Post";
import { CircularLoader } from "@/components/common/loader/Loaders";

export const dropdownsToSections: { [key: string]: string } = {
  "00": "Monday Hues",
  "01": "Campus Raid",
  "02": "Thursday Article",
  "03": "Funny Friday",
  "04": "Viral Corner",
  "05": "Word Worth Millions",
  "06": "College Heracles",
  "07": "Nanotips",
  "08": "Vernacular",
  "09": "Gazette",
  "10": "Reportopolis",
};

// Function to fetch mock articles
const fetchArticles = async (): Promise<ArticleSectionProps[]> => {
  // fetch articles from the API for each dropdown
  const dropdowns = Object.keys(dropdownsToSections);
  const sections = await Promise.all(
    dropdowns.map(async (dropdown) => {
      const response = await fetch(
        `/api/v1/posts?dropdown=${dropdown}&limit=3`
      );
      const articles: Posts[] = await response.json();

      // filter articles with no link or invalid link
      const validArticles = articles.filter(
        (article) => article.link && article.link.startsWith("http")
      );

      return {
        heading: dropdownsToSections[dropdown],
        articles: validArticles,
        showAllLink: `/posts/category/${dropdown}`,
      };
    })
  );

  console.log(sections);

  return sections;
};

// Main React component
const WeeklyPortion: React.FC = () => {
  const [sections, setSections] = useState<ArticleSectionProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles().then((sections) => {
      setSections(sections);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <Suspense fallback={<CircularLoader />}>
      <div className="grid grid-flow-row gap-8 ">
        {sections.map((section) => (
          <ArticleSection
            key={section.heading}
            heading={section.heading }
            articles={section.articles}
            showAllLink={section.showAllLink}
          />
        ))}
      </div>
    </Suspense>
  );
};

export default WeeklyPortion;
