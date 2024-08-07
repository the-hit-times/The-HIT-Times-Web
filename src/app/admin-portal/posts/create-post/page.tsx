"use client";

import PostForm from "@/components/admin-portal/posts/PostForm";
import { IBM_Plex_Serif } from "next/font/google";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const CreatePostPage = () => {
  return (
    <div>
      <h1
        className={
          ibmPlexSerif.className + " text-zinc-800 text-5xl font-semibold py-8"
        }
      >
        Create a Post
      </h1>
      <PostForm />
    </div>
  );
};

export default CreatePostPage;
