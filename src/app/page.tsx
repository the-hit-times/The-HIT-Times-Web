import EventSection from "@/components/eventSection/eventSection";
import HeroSection from "@/components/heroSection/heroSection";
import WeeklyPortion from "@/components/weekly-portion/WeeklyPortion";

export default function MDXPage() {
  return (
    <div className="flex flex-col gap-4 my-8">
      <HeroSection notice="Join TSP 24-25" noticeLink="/forms/tsp-form"/>
      <WeeklyPortion />
    </div>
  );
}
