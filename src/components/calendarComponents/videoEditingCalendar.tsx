"use client";
import BaseCalendar, { HighlightGroup } from "./BaseCalendar";

const highlightedGroups: Record<string, HighlightGroup> = {
  group2: { days: [3, 4, 5, 6], dotClass: "bg-[#2e6900] dark:bg-[#3d8f00] border-2 border-[#1a4500] dark:border-[#55ff55]", labelClass: "text-[#2e6900] dark:text-[#55ff55]", description: "Online Training" },
  group3: { days: [1, 2, 8, 9],       dotClass: "bg-[#006e8c] dark:bg-[#007fa3] border-2 border-[#003d4d] dark:border-[#55ffff]", labelClass: "text-[#006e8c] dark:text-[#55ffff]", description: "Offline Training" },
};

const videoEditingCalendar: React.FC = () => {
  return (
    <BaseCalendar
      month={7}
      year={2026}
      title="TSP · Video Editing"
      highlightedGroups={highlightedGroups}
    />
  );
};

export default videoEditingCalendar;
