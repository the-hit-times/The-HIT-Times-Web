import { Alumni } from "@/models/Alumnus";
import Image from "next/image";
import Link from "next/link";

const AlumniCard: React.FC<Alumni> = ({ name, profile_image, position, linkedin }) => {
  return (
    <Link href={linkedin ?? ""}>
      <div className="flex flex-col items-center w-32 animate-fade-up animate-duration-500 animate-delay-200">
        <Image
          src={profile_image}
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
