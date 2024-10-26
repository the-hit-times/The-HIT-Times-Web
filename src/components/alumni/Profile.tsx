import { Alumni } from "@/models/Alumnus";
import Image from "next/image";
import Link from "next/link";
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

const AlumniCard: React.FC<Alumni> = ({ name, profile_image, position, linkedin }) => {
  return (
    <Link href={linkedin ?? ""}>
      <div className="flex flex-col items-center w-32 animate-fade-up animate-duration-500 animate-delay-200">
        <Image
          src={extractImageUrl(profile_image)}
          alt={`${name} Profile Image`}
          width={80}
          height={80}
          className="rounded-full object-cover w-20 h-20  transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-700 hover:scale-125 "  
        />
        <h4 className="w-full text-base mt-2  leading-6 text-black font-bold text-center text-ellipsis line-clamp-2  animate-fade-left animate-duration-500 animate-delay-500">
          {name}
        </h4>
        <p className="text-sm font-normal text-gray-600 animate-fade-right animate-duration-500 animate-delay-500">{position}</p>
      </div>
    </Link>
  );
};

export default AlumniCard;
