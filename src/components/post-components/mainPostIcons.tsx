"use client";
import RelatedPostIcons from "./realtedPostIcons";
import { Posts } from "@/models/Post";

interface MainPostIconsProps {
  post: Posts;
}

const MainPostIcons = ({post}: MainPostIconsProps) => {
  return <RelatedPostIcons post={post} direction="flex-col" />;
};

export default MainPostIcons;
