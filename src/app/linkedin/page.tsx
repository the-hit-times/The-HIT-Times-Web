"use client";
import { useEffect } from "react";
// import { useRouter } from "next/router";

const LinkedIn = () => {
//   const router = useRouter();

  useEffect(() => {
    window.location.href = "https://www.linkedin.com/company/the-hit-times/";
  }, []);

  return (
    <div className="h-screen flex items-center justify-center text-xl font-bold animate-pulse">
      Redirecting to LinkedIn...
    </div>
  );
};

export default LinkedIn;
