"use client";
import React, { useEffect, useState } from "react";
import ArticleSection from "./ArticleSection"; // Ensure this import path is correct
import { Posts } from "@/models/Post";
import { Section } from "./types";
import { set } from "mongoose";

// Function to fetch mock articles
const fetchArticles = async (): Promise<Section[]> => {
  const res = await fetch("https://tht-admin.onrender.com/api/posts", {
    next: { revalidate: 60 },
  });
  const posts: Posts[] = await res.json();
  const dropdownsToSections: { [key: string]: string } = {
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

  const filteredPosts: Posts[] = posts.map((post: Posts) => {
    // check if link is a valid url
    if (post.link.startsWith("http")) {
      return post;
    } else {
      return {
        ...post,
        link: "https://placehold.co/600x400.png",
      } as Posts;
    }
  });

  const sections: Section[] = Object.keys(dropdownsToSections).map((key) => {
    return {
      heading: dropdownsToSections[key],
      articles: filteredPosts
        .filter((post) => post.dropdown === key)
        .slice(0, 3),
    };
  });

  console.log(sections);

  return sections;
};

// Main React component
const WeeklyPortion: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    fetchArticles().then((sections) => {
      setSections(sections);
    });
  }, []);

  return (
    <div className="grid grid-flow-row gap-8">
      {sections.map((section) => (
        <ArticleSection
          key={section.heading}
          heading={section.heading}
          articles={section.articles}
        />
      ))}
    </div>
  );
};

export default WeeklyPortion;
