import HeroSection from "@/components/heroSection/heroSection";
import WeeklyPortion from "@/components/weekly-portion/WeeklyPortion";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16">
      <HeroSection />

      {/* temporary banner hai  */}
      <Link href="/game" className="block relative w-full h-[150px] sm:h-[220px] md:h-[300px] lg:h-[350px] rounded-xl overflow-hidden shadow-lg hover:opacity-95 transition-opacity cursor-pointer">
        <Image
          src="/banner-fresher.png" 
          alt="Homepage Banner"
          fill
          className="object-cover"
          priority
        />
      </Link>
      {/* Banner khatam */}

      <WeeklyPortion />
    </div>
  );
}

