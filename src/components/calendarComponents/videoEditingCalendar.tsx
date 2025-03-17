"use client";
import { useState } from "react";
import dayjs from "dayjs";

const daysOfWeek: string[] = ["Su", "M", "T", "W", "Th", "F", "Sa"];

const highlightedGroups: Record<
  string,
  { days: number[]; color: string; description: string }
> = {
  group1: {
    days: [1],
    color: "bg-red-500",
    description: "Introductory Session",
  },
  group2: {
    days: [3, 4, 5, 6],
    color: "bg-green-500",
    description: "Online Training",
  },
  group3: {
    days: [2],
    color: "bg-blue-500",
    description: "Offline Training",
  },
  //   group4: { days: [1, 18, 25], color: "bg-yellow-500", description: "Concluding Session" },
};

const specificMonth = 2; // February (0-based index for JavaScript months) 0=Jan, 1=Feb, 2=Mar.....
const specificYear = 2025;

const videoEditingCalendar: React.FC = () => {
  const currentDate = dayjs().year(specificYear).month(specificMonth);

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const daysInMonth = endOfMonth.date();
  const firstDayOfWeek = startOfMonth.day();

  //   colors from theme
  //   orange rgba(250,104,55,255) #fa6837
  //   prussian(like)-blue rgba(12,45,88,255) #0c2d58
  // peach rgba(255,177,177,255) #ffb1b1
  // white rgba(255,255,255,255) #ffffff

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <div className="max-w-sm mx-auto px-5 pt-5 pb-4 bg-[rgb(12,45,88)] shadow-md rounded-xl border-[3px] border-[#fa6837] mb-3">
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            {currentDate.format("MMMM YYYY")}
          </h2>
        </div>
        <div className="grid grid-cols-7 text-center font-medium text-white">
          {daysOfWeek.map((day) => (
            <div key={day} className="p-0 bg-#0c2d58 rounded-md text-[15px]">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 text-center mt-2">
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={i} className="p-1"></div>
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const group = Object.values(highlightedGroups).find((g) =>
              g.days.includes(day)
            );
            return (
              <div
                key={i}
                className={`p-1.5 w-8 h-8 text-[13px] rounded-[20px] transition-all text-white font-semibold ${
                  group ? group.color : "hover:bg-[purple]"
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
        <div className="text-center font-semibold text-[15px] text-zinc-200">
          TSP - Video Editing
        </div>
      </div>
      <div className="w-[295px] mx-auto flex flex-col justify-center mt-2 gap-3 mb-5 pl-2">
        {Object.entries(highlightedGroups).map(([groupName, group]) => (
          <div
            key={groupName}
            className="max-w-sm flex justify-between items-center text-[#0c2d58] font-bold"
          >
            <div
              className={`w-7 h-7 rounded-[20px] ${group.color} text-white font-semibold border-[#00000050] border-[1px] rounded-[20px]`}
            ></div>
            <div>{group.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default videoEditingCalendar;
