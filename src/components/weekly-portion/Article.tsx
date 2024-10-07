import { Posts } from "@/models/Post";
import Image from "next/image";
import { IBM_Plex_Serif, Nunito_Sans } from "next/font/google";
import Link from "next/link";
import ArticleImage from "./ArticleImage";

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
    <Link href={"/posts/" + article._id}>
      <div className="group/item hover:scale-105 hover:duration-300 hover:delay-200 scroll-smooth">
      <div className="h-full mt-1 hover:bg-gradient-to-r from-slate-100 to-violet-200 hover:duration-300 hover:delay-150 hover:shadow-2xl rounded-xl  animate-flip-up animate-duration-500 animate-delay-300 ">
        <ArticleImage
          src={article.link}
          alt={article.title}
          className="w-full aspect-video rounded-lg object-cover group-hover/item:scale-95 group-hover/item:duration-300"
          width={500}
          height={500}
        />
        <h3 className={ibmPlexSerif.className + " text-lg font-bold mt-2 text-ellipsis line-clamp-2 ml-3 mr-3 animate-fade-down animate delay-500 animate-duration-700 "}>
          {article.title}
        </h3>
        <p className={nunitoSans.className + " text-gray-700 font-mono mt-1 text-ellipsis line-clamp-2 ml-3 mr-3 animate-fade-up animate delay-500 animate-duration-700 "}>
          {article.description}
        </p>
      </div>
      </div>
    </Link>
  );
}
