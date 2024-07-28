"use client";
import { BookmarkIcon, ShareIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useState } from "react";

const RealtedPostIcons = () => {
  let [hasLiked, setHasLiked] = useState(false);
  function onLikeButtonClick() {
    setHasLiked(!hasLiked);
  }

  return (
    <div className="flex gap-4 p-4">
      <ShareIcon width={24} />
      <BookmarkIcon width={24} />
    </div>
  );
};

export default RealtedPostIcons;
