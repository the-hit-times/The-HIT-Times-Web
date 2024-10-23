import Link from "next/link";
import React from "react";
import { IBM_Plex_Serif, Nunito_Sans, Poppins } from "next/font/google";
import Image from "next/image";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { exportTraceState } from "next/dist/trace";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800"],
});

function formatImageSrc(src: string): string {
    // Check if the src is empty or not a string
    if (!src || typeof src !== "string") {
      return "/no-image.png"; // Return a default image or an empty string
    }
  
    // Check if the src starts with a leading slash or is an absolute URL
    if (
      src.startsWith("/") ||
      src.startsWith("http://") ||
      src.startsWith("https://")
    ) {
      return src;
    }
  
    // Prepend a leading slash to relative URLs
    return `/${src}`;
  }
  
  const extractImageUrl = (url: string): string => {
    const googleDriveMatch = url.match(
      /https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)([^\/&]+)/
    );
  
    const extractedUrl = googleDriveMatch
      ? `https://drive.google.com/uc?export=view&id=${googleDriveMatch[1]}`
      : url;
  
    return formatImageSrc(extractedUrl);
  };

const tabloids =()=>{
    return(

      <>
      <div className="flex relative flex-col  w-auto h-auto ">
        <p className="text-4xl md:text-5xl font-bold py-4 md:py-10 mb-5 font-serif">
          Our Tabloids
        </p>
        <div className="flex flex-col justify-center mb-16 md:mx-10 items-center text-zinc-700 text-2xl md:text-3xl font-semibold font-mono border border-black border-solid  ">
            Tabloid Issue 10
          <iframe 
            src="https://drive.google.com/file/d/1aGkUuleaTzujKY6XwoL8HLLfVJCCZNaN/preview"width="100%" height="600" allow="autoplay"
            >
          </iframe>
        </div>
        <div className="flex flex-col justify-center mb-16 md:mx-10 items-center text-zinc-700 text-2xl md:text-3xl font-semibold font-mono border border-black border-solid  ">
            Tabloid Issue 9
          <iframe 
            src="https://drive.google.com/file/d/19R0ctZ-LhKZ1IeKrukeoh3UW41v-C6wK/preview" width="100%" height="600" allow="autoplay"
            >
          </iframe>
        </div>
        <div className="flex flex-col justify-center mb-16 md:mx-10 items-center text-zinc-700 text-2xl md:text-3xl font-semibold font-mono border border-black border-solid  ">
            Tabloid Issue 7
          <iframe 
            src="https://drive.google.com/file/d/10qmuUj5wjXc9hNwl2Ufti8ciPN61DRIt/preview" width="100%" height="600" allow="autoplay"
            >
          </iframe>
        </div>
        <div className="flex flex-col justify-center mb-16 md:mx-10 items-center text-zinc-700 text-2xl md:text-3xl font-semibold font-mono border border-black border-solid  ">
            Tabloid Issue 6
          <iframe 
            src="https://drive.google.com/file/d/1-bYArvJOkEIDpdXsiBNy0ytExBORAUIM/preview"width="100%" height="600" allow="autoplay"
            >
          </iframe>
        </div>
        <div className="flex flex-col justify-center mb-16 md:mx-10 items-center text-zinc-700 text-2xl md:text-3xl font-semibold font-mono border border-black border-solid  ">
            Tabloid Issue 5
          <iframe 
            src="https://drive.google.com/file/d/1mmXAH5GmZJ60P51dOtugnjmQMdJr5DyC/preview" width="100%" height="600" allow="autoplay"
            >
          </iframe>
        </div>
        <div className="flex flex-col justify-center mb-16 md:mx-10 items-center text-zinc-700 text-2xl md:text-3xl font-semibold font-mono border border-black border-solid  ">
            Tabloid Issue 4
          <iframe 
            src="https://drive.google.com/file/d/1Vb8aXIpXgdVlFrBL_q6u9_JvVlHvLQeq/preview" width="100%" height="600" allow="autoplay"
            >
          </iframe>
        </div>
        <div className="flex flex-col justify-center mb-16 md:mx-10 items-center text-zinc-700 text-2xl md:text-3xl font-semibold font-mono border border-black border-solid  ">
          Tabloid Issue 3
          <iframe 
            src="https://drive.google.com/file/d/1mYZm3aN7f4wc3a4kI4g0Ku8sTEsFewog/preview" width="100% " height="600" allow="autoplay">
          </iframe>
        </div>
        <div className="flex flex-col justify-center mb-16 md:mx-10  items-center text-zinc-700 text-2xl md:text-3xl font-semibold font-mono border border-black border-solid  ">
          Tabloid Issue 2
          <iframe 
            src="https://drive.google.com/file/d/1aUrkYqHeodrx9MrnjpaKqQSf1o9f_JxV/preview" width="100%" height="600" allow="autoplay">
          </iframe>
        </div>
        <div className="flex flex-col justify-center mb-16 md:mx-10 items-center text-zinc-700 text-2xl md:text-3xl font-semibold font-mono border border-black border-solid  ">
            Tabloid Issue 1
          <iframe 
            src="https://drive.google.com/file/d/1bh226035gJwsREEfF0BddWCdfajhsd-F/preview"width="100%" height="600" allow="autoplay"
            >
          </iframe>
        </div>
      </div>
      </>

    );
};
export default tabloids;