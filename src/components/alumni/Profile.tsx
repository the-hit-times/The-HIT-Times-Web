import { Alumni } from "@/models/Alumnus";
import Image from "next/image";
import Link from "next/link";

const AlumniCard: React.FC<Alumni> = ({ name, profile_image, position, linkedin }) => {
  return (
    <Link href={linkedin ?? ""}>
      <div className="flex flex-col items-center w-32">
        <Image
          src={profile_image}
          alt={`${name} Profile Image`}
          width={80}
          height={80}
          className="rounded-full object-cover w-20 h-20"
        />
        <h4 className="w-full text-base mt-2  leading-6 text-black font-bold text-center text-ellipsis line-clamp-2">
          {name}
        </h4>
        <p className="text-sm font-normal text-gray-600">{position}</p>
      </div>
    </Link>
  );
};

export default AlumniCard;
