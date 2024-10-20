import EventSection from "@/components/eventSection/eventSection";
import HeroSection from "@/components/heroSection/heroSection";
import WeeklyPortion from "@/components/weekly-portion/WeeklyPortion";

export default function MDXPage() {
  return (
    <div className="my-4">
      <HeroSection notice="Join TSP 24-25" noticeLink="/forms/tsp-form"/>
      <WeeklyPortion />
    </div>
  );
}
