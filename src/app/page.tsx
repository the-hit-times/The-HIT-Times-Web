import HeroSection from "@/components/heroSection/heroSection";
import WeeklyPortion from "@/components/weekly-portion/WeeklyPortion";

export default function MDXPage() {
  return (
    <div className="flex flex-col gap-4 my-8 mx-4">
      <HeroSection />
      <WeeklyPortion />
    </div>
  );
}
