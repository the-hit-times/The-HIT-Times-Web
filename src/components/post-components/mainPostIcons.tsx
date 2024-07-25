"use client";
import { useState } from "react";

import { BookmarkIcon, ShareIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

const MainPostIcons = () => {
  let [hasLiked, setHasLiked] = useState(false);
  function onLikeButtonClick() {
    setHasLiked(!hasLiked);
  }

  return (
    <div className="flex flex-col gap-8 w-fit h-fit">
      <button onClick={onLikeButtonClick}>
        {hasLiked ? (
          <HeartIconSolid width={24} className="text-red-500" />
        ) : (
          <HeartIconOutline width={24} />
        )}
      </button>
      <ShareIcon width={24} />
      <BookmarkIcon width={24} />
    </div>
  );
};

export default MainPostIcons;
