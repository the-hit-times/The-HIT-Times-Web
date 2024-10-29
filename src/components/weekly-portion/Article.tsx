import { Posts } from "@/models/Post";
import Image from "next/image";
import { IBM_Plex_Serif, Nunito_Sans } from "next/font/google";
import Link from "next/link";
import ArticleImage from "./ArticleImage";
/*import {motion} from "framer-motion";
import {fadeIn} from "@/variants";*/
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800"],
});

export default function Article({ article }: { article: Posts }) {
  return (
    <Link
      href={"/posts/" + article._id}
      className="group/item sm:hover:scale-105 hover:scale-102 hover:delay-100 scroll-smooth h-full p-2 hover:bg-gray-200 hover:duration-300 hover:shadow-xl rounded-xl  animate-flip-up animate-duration-200 animate-delay-100 "
    >
      <ArticleImage
        src={article.link}
        alt={article.title}
        className="w-full aspect-video rounded-lg object-cover"
        width={500}
        height={500}
      />
      <h3
        className={
          ibmPlexSerif.className +
          " text-lg font-bold mt-2 text-ellipsis line-clamp-2 animate-fade-down animate delay-200 animate-duration-200 "
        }
      >
        {article.title}
      </h3>
      <p
        className={
          nunitoSans.className +
          " text-gray-700 font-mono mt-1 text-ellipsis line-clamp-2 animate-fade-up animate delay-500 animate-duration-700 "
        }
      >
        {article.description}
      </p>
    </Link>
  );
}
