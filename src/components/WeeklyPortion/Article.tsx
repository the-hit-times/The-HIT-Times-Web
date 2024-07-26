import { Posts } from "@/models/Post";
import Image from "next/image";
import { IBM_Plex_Serif, Nunito_Sans } from "next/font/google";
import Link from "next/link";

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
      <div className="article-container">
        <Image
          src={article.link}
          alt={article.title}
          className="w-full aspect-video rounded-md object-cover"
          width={500}
          height={500}
        />
        <h3 className={ibmPlexSerif.className + " text-lg font-bold mt-4 "}>
          {article.title}
        </h3>
        <p className={nunitoSans.className + " text-gray-700 mt-2"}>
          {article.description}
        </p>
      </div>
    </Link>
  );
}
