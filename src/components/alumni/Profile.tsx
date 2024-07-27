import { Alumni } from "@/models/Alumnus";
import Image from "next/image";

const AlumniCard: React.FC<Alumni> = ({ name, profile_image, position }) => {
  return (
    <div className="flex flex-col items-center w-32">
      <Image
        src={profile_image}
        alt={`${name} Profile Image`}
        width={80}
        height={80}
        className="rounded-full object-cover w-20 h-20"
      />
      <h4 className="w-full text-base mt-2  leading-6 text-black font-bold text-center">
        {name}
      </h4>
      <p className="text-base font-normal text-gray-600">{position}</p> 
    </div>
  );
};

export default AlumniCard;
