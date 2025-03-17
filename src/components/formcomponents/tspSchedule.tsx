import { ChevronDown, ChevronUp, Globe, MapPin } from "lucide-react";
import { useState } from "react";
import cwCalendar from "../calendarComponents/cwCalendar";
import DevCalendar from "../calendarComponents/devCalendar";
import gdCalendar from "../calendarComponents/gdCalendar";
import photographyCalendar from "../calendarComponents/photographyCalendar";
import videoEditingCalendar from "../calendarComponents/videoEditingCalendar";
import digitalArtCalendar from "../calendarComponents/digitalArtCalendar";
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CourseDay {
  date: string
  title: string
  description?: string
  isOnline: boolean
}

interface Course {
  title: string
  description: string
  calendar: any
  days: CourseDay[]
}

const courses: Course[] = [
  {
    title: "Content Writing",
    description: "Master the art of writing compelling content across different formats",
    calendar: cwCalendar,
    days: [
      {
        date: "1st March 2025",
        title: "Sentence Structure and Composition",
        description:
          "Sentence elements, types of sentences, grammatical accuracy, common errors, clarity, paragraph division and flow.",
        isOnline: false,
      },
      {
        date: "2nd March 2025",
        title: "Research Writing",
        description: "Research paper structure, credible sources and presentation techniques.",
        isOnline: false,
      },
      {
        date: "3rd March 2025",
        title: "Outline & Storyline Development",
        description: "Plot structures, character arcs, engaging openings, conflict and resolution.",
        isOnline: true,
      },
      {
        date: "4th March 2025",
        title: "Technical Writing",
        description: "Professional emails, formal and business letters, report writing, formatting, tone, and clarity.",
        isOnline: true,
      },
      {
        date: "8th March 2025",
        title: "Character & Story Development",
        description:
          "Character creation, dialogue writing, world-building, themes, symbolism, and storytelling techniques.",
        isOnline: false,
      },
      {
        date: "9th March 2025",
        title: "Poetry Writing",
        description:
          "Poetic forms, rhythm and meter, imagery, symbolism, emotional expression, and creative exercises.",
        isOnline: false,
      },
    ],
  },
  {
    title: "Digital Art",
    description: "Learn digital art from basics to advanced techniques",
    calendar: digitalArtCalendar,
    days: [
      {
        date: "1st March 2025",
        title: "Strong Foundation",
        description: "Drawing fundamental shapes, understanding structure, and perspective.",
        isOnline: false,
      },
      {
        date: "2nd March 2025",
        title: "Software Introduction",
        description: "Learning the basics of digital drawing software.",
        isOnline: false,
      },
      {
        date: "3rd March 2025",
        title: "Human Anatomy in Art",
        description: "Proportions, skeletal structure, muscle groups, and capturing realistic poses.",
        isOnline: true,
      },
      {
        date: "4th March 2025",
        title: "Mastering the Tools",
        description: "Advanced tool usage and creating digital sketchbooks.",
        isOnline: true,
      },
      {
        date: "5th March 2025",
        title: "Colouring & Texture Basics",
        description: "Understanding colour theory and texture.",
        isOnline: true,
      },
      {
        date: "6th March 2025",
        title: "Lighting & Shading",
        description: "Genre Selection and advanced techniques.",
        isOnline: true,
      },
      {
        date: "8th March 2025",
        title: "Editing & Post-Processing",
        description: "Refining artwork and monetization strategies.",
        isOnline: false,
      },
      {
        date: "9th March 2025",
        title: "Storytelling in Art",
        description: "Basic Animation Fundamentals with planning.",
        isOnline: false,
      },
    ],
  },
  {
    title: "Video Editing",
    description: "Master video editing with industry-standard tools",
    calendar: videoEditingCalendar,
    days: [
      {
        date: "1st March 2025",
        title: "Installation & Setup",
        description: "Software installation and workspace setup.",
        isOnline: false,
      },
      {
        date: "2nd March 2025",
        title: "Introduction to Video Editing",
        description: "Basics of editing and interface.",
        isOnline: false,
      },
      {
        date: "3rd March 2025",
        title: "Keyframing & Transitions",
        description: "Smooth animations and creative edits.",
        isOnline: true,
      },
      {
        date: "4th March 2025",
        title: "Text & Colour Grading",
        description: "Text animation and visual enhancement.",
        isOnline: true,
      },
      {
        date: "5th March 2025",
        title: "Speed Ramping",
        description: "Cinematic motion and advanced tools.",
        isOnline: true,
      },
      {
        date: "6th March 2025",
        title: "Audio Designing",
        description: "Sound editing and project completion.",
        isOnline: true,
      },
    ],
  },
  {
    title: "Web Development",
    description: "Complete web development from basics to deployment",
    calendar: DevCalendar,
    days: [
      {
        date: "1st March 2025",
        title: "Setup & HTML",
        description: "Web structure, tags, and forms.",
        isOnline: false,
      },
      {
        date: "2nd March 2025",
        title: "CSS & Responsive Design",
        description: "Flexbox, Grid, and webpage styling.",
        isOnline: true,
      },
      {
        date: "3rd March 2025",
        title: "JavaScript",
        description: "JS fundamentals and React setup.",
        isOnline: true,
      },
      {
        date: "4th March 2025",
        title: "React Fundamentals",
        description: "Core concepts of React.",
        isOnline: true,
      },
      {
        date: "5th March 2025",
        title: "React Advanced",
        description: "Advanced React concepts.",
        isOnline: true,
      },
      {
        date: "6th March 2025",
        title: "Project Design",
        description: "Creating the design of the project.",
        isOnline: true,
      },
      {
        date: "8th March 2025",
        title: "API Integration",
        description: "Fetching and displaying data from APIs.",
        isOnline: false,
      },
      {
        date: "9th March 2025",
        title: "Deployment",
        description: "Final touches and deployment on Vercel.",
        isOnline: false,
      },
    ],
  },
  {
    title: "Photography",
    description: "Learn photography from basics to advanced techniques",
    calendar: photographyCalendar,
    days: [
      {
        date: "1st March 2025",
        title: "Photography Basics",
        description: "ISO triangle, composition, and various genres.",
        isOnline: false,
      },
      {
        date: "2nd March 2025",
        title: "Advanced Concepts",
        description: "Colour theory and communication skills.",
        isOnline: false,
      },
      {
        date: "8th March 2025",
        title: "Photo Walk Day 1",
        description: "Practical application and hands-on experience.",
        isOnline: false,
      },
      {
        date: "9th March 2025",
        title: "Photo Walk Day 2",
        description: "Continued practical shooting experience.",
        isOnline: false,
      },
    ],
  },
  {
    title: "Graphic Designing",
    description: "Master graphic design tools and techniques",
    calendar: gdCalendar,
    days: [
      {
        date: "1st March 2025",
        title: "Introduction to Graphic Design",
        description: "Types, software, careers, and freelancing.",
        isOnline: false,
      },
      {
        date: "2nd March 2025",
        title: "Design Basics",
        description: "Vector vs Raster art, Canva basics.",
        isOnline: false,
      },
      {
        date: "3rd March 2025",
        title: "Color Theory & Typography",
        description: "Full poster design in Canva.",
        isOnline: true,
      },
      {
        date: "4th March 2025",
        title: "Illustrator Basics",
        description: "Interface and brushes.",
        isOnline: true,
      },
      {
        date: "5th March 2025",
        title: "Image Tracing",
        description: "Advanced illustration techniques.",
        isOnline: true,
      },
      {
        date: "6th March 2025",
        title: "Photoshop Techniques",
        description: "Masking, selection, and blending.",
        isOnline: true,
      },
      {
        date: "8th March 2025",
        title: "Logo & T-Shirt Design",
        description: "Practical design projects.",
        isOnline: false,
      },
      {
        date: "9th March 2025",
        title: "Final Projects",
        description: "Assignments and final tasks.",
        isOnline: false,
      },
    ],
  },
]

export default function ScheduleComponent() {
  const [expandedCourses, setExpandedCourses] = useState<{ [key: string]: boolean }>({})

  const toggleCourse = (courseTitle: string) => {
    setExpandedCourses((prev) => ({
      ...prev,
      [courseTitle]: !prev[courseTitle],
    }))
  }

  return (
    <div className="bg-transparent p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-teal-400">Course Catalog</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div key={course.title} className="overflow-hidden  rounded-xl">
              <div className="bg-gradient-to-r flex flex-col items-center justify-center text-center rounded-xl h-28  from-teal-600 to-teal-500">
                <h1 className="text-amber-200 pt-2 items-center justify-center font-sans text-2xl font-bold">{course.title}</h1>
                <p className="text-teal-50 px-4 pt-2">{course.description}</p>
              </div>
              <div className="p-4   ">
                <button
                //   variant="ghost"
                  className=" w-full flex flex-row justify-between hover:bg-teal-500 hover:rounded-lg  px-2 "
                  onClick={() => toggleCourse(course.title)}
                >
                  <span className="font-mono">View Schedule</span>
                  {expandedCourses[course.title] ? (
                    <ChevronUp className="h-6 w-6" />
                  ) : (
                    <ChevronDown className="h-6 w-6" />
                  )}
                </button>
                {expandedCourses[course.title] && (
                  <div className="space-y-4">
                    {course.days.map((day, index) => (
                      <div
                        key={index}
                        className="rounded-lg border mt-4 border-orange-200 bg-orange-50 p-4 transition-all hover:border-orange-300"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-orange-900">{day.title}</h3>
                            <p className="text-sm text-orange-700">{day.date}</p>
                            {day.description && <p className="mt-1 text-sm text-orange-600">{day.description}</p>}
                          </div>
                          {day.isOnline ? (
                            <div title="Online" >
                                <Globe className="h-5 w-5 flex-shrink-0 text-teal-600" />
                            </div>
                          ) : (
                            <div title="Offline" >
                                <MapPin className="h-5 w-5 flex-shrink-0 text-orange-600" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {course.calendar && <course.calendar />}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
