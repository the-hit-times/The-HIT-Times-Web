import { Alumni } from "@/models/Alumnus";
import Image from "next/image";

const AlumniCard: React.FC<Alumni> = ({ name, profile_image }) => {
  return (
    <div className="flex w-full flex-col items-center">
      <Image
        src={profile_image}
        alt={`${name} Profile Image`}
        width={80}
        height={80}
        className="w-full rounded-full object-cover"
      />
      <h4 className="text-base mt-2 mx-auto leading-6 text-black font-bold">
        {name}
      </h4>
      {/* <p className="text-base font-normal text-gray-900">{position}</p> */}
    </div>
  );
};

export default AlumniCard;