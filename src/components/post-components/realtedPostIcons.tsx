"use client";
import {
  BookmarkIcon as BookmarkIconOutlined,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Posts } from "@/models/Post";

interface RelatedPostIconsProps {
  post: Posts;
  direction?: "flex-row" | "flex-col";
}

const RelatedPostIcons = ({ post, direction }: RelatedPostIconsProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarkedPosts = JSON.parse(
      localStorage.getItem("bookmarkedPosts") || "[]"
    );
    setIsBookmarked(bookmarkedPosts.includes(post._id.toString()));
  }, [post._id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this post!",
          url: "https://thehittimes.com/posts/" + post._id.toString(),
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    }
  };

  const handleBookmark = () => {
    const bookmarkedPosts = JSON.parse(
      localStorage.getItem("bookmarkedPosts") || "[]"
    );

    if (bookmarkedPosts.includes(post._id.toString())) {
      const updatedBookmarkedPosts = bookmarkedPosts.filter(
        (id: string) => id !== post._id.toString()
      );
      localStorage.setItem(
        "bookmarkedPosts",
        JSON.stringify(updatedBookmarkedPosts)
      );
      setIsBookmarked(false);
    } else {
      const updatedBookmarkedPosts = [...bookmarkedPosts, post._id.toString()];
      localStorage.setItem(
        "bookmarkedPosts",
        JSON.stringify(updatedBookmarkedPosts)
      );
      setIsBookmarked(true);
    }
  };

  return (
    <div className={`flex gap-4 ${direction ?? "flex-row"}`}>
      <button
        className="p-2 rounded-full hover:bg-gray-200"
        onClick={handleShare}
      >
        <ShareIcon width={24} />
      </button>
      <button
        className="p-2 rounded-full hover:bg-gray-200"
        onClick={handleBookmark}
      >
        {isBookmarked ? (
          <BookmarkIconSolid width={24} />
        ) : (
          <BookmarkIconOutlined width={24} />
        )}
      </button>
    </div>
  );
};

export default RelatedPostIcons;