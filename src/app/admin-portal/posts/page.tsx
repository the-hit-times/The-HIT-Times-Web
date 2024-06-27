"use client";
import { Posts } from "@/models/Post";
import { useEffect, useState } from "react";

 

export default function PostsPage() {
  
  const [data, setData] = useState<Posts[]>([]); 

  const getData = async () => {
    const response = await fetch("/api/v1/posts");
    const data = await response.json();
    setData(data);
    console.log(data);
  }

  useEffect(() => {
    getData();

  }, []);
  
  return (
    <div>
      <h1>Posts Page</h1>
      {data.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          </div>
      ))}
    </div>
  );
};
