"use client";

import { FormClosedState } from "@/components/forms/FormClosedState";
import { FormSignInGate } from "@/components/forms/FormSignInGate";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, User, Phone, IdCard } from "lucide-react";

const domains = [
  { key: "writing", label: "Content Writing" },
  { key: "drawing", label: "Digital Art" },
  { key: "designing", label: "Graphic Designing" },
  { key: "videoEditingbasic", label: "Video Editing For Social media" },
  { key: "videoEditingadvanced", label: "Video Editing Advanced" },
  { key: "technology", label: "Web Development" },
  { key: "photography", label: "Photography" },
] as const;

const departments = [
  "AEIE",
  "Agriculture",
  "BT",
  "CE",
  "CHE",
  "CSE",
  "CSE-AIML",
  "CSE-CS",
  "CSE-DS",
  "ECE",
  "EE",
  "FT",
  "IT",
  "ME",
  "Masters",
  "SASH",
  "Others"
];

type SheetData = {
  name: string;
  roll: string;
  email: string;
  phone: string;
  dept: string;
  year: string;
  writing: string;
  drawing: string;
  designing: string;
  videoEditingbasic: string;
  videoEditingadvanced: string;
  technology: string;
  photography: string;
  suggestion: string;
};

// SVG Pixel Icons
const SteveIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 8 8" className={`shrink-0 ${className}`} style={{ imageRendering: "pixelated" }}>
    <rect x="0" y="0" width="8" height="8" fill="#aa7d62" />
    <rect x="0" y="0" width="8" height="2" fill="#3a2618" />
    <rect x="0" y="2" width="1" height="1" fill="#3a2618" />
    <rect x="7" y="2" width="1" height="1" fill="#3a2618" />
    <rect x="1" y="4" width="2" height="1" fill="#ffffff" />
    <rect x="2" y="4" width="1" height="1" fill="#4b4bd8" />
    <rect x="5" y="4" width="2" height="1" fill="#ffffff" />
    <rect x="5" y="4" width="1" height="1" fill="#4b4bd8" />
    <rect x="3" y="5" width="2" height="1" fill="#8b6045" />
    <rect x="2" y="6" width="4" height="1" fill="#5b3621" />
  </svg>
);

const AlexIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 8 8" className={`shrink-0 ${className}`} style={{ imageRendering: "pixelated" }}>
    <rect x="0" y="0" width="8" height="8" fill="#f3b194" />
    <rect x="0" y="0" width="8" height="3" fill="#d87f33" />
    <rect x="0" y="3" width="1" height="1" fill="#d87f33" />
    <rect x="7" y="3" width="1" height="1" fill="#d87f33" />
    <rect x="1" y="4" width="2" height="1" fill="#ffffff" />
    <rect x="2" y="4" width="1" height="1" fill="#3a8a3a" />
    <rect x="5" y="4" width="2" height="1" fill="#ffffff" />
    <rect x="5" y="4" width="1" height="1" fill="#3a8a3a" />
    <rect x="3" y="5" width="2" height="1" fill="#d08f75" />
    <rect x="3" y="6" width="2" height="1" fill="#a05450" />
    <rect x="0" y="4" width="1" height="4" fill="#d87f33" />
    <rect x="7" y="4" width="1" height="4" fill="#d87f33" />
  </svg>
);

const ChestIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 14 14" className={`shrink-0 ${className}`} style={{ imageRendering: "pixelated" }}>
    <rect x="0" y="0" width="14" height="14" fill="#2d1d0c" />
    <rect x="1" y="1" width="12" height="12" fill="#8c5828" />
    <rect x="1" y="1" width="12" height="1" fill="#b07b46" />
    <rect x="1" y="2" width="1" height="10" fill="#6d421d" />
    <rect x="12" y="2" width="1" height="10" fill="#6d421d" />
    <rect x="0" y="6" width="14" height="1" fill="#2d1d0c" />
    <rect x="6" y="5" width="2" height="3" fill="#ffffff" />
    <rect x="7" y="6" width="1" height="1" fill="#888888" />
  </svg>
);

const LeavesIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={`shrink-0 ${className}`} style={{ imageRendering: "pixelated" }}>
    <rect x="1" y="6" width="3" height="3" fill="#3a8a3a" />
    <rect x="2" y="7" width="3" height="3" fill="#236023" />
    <rect x="11" y="4" width="3" height="3" fill="#3a8a3a" />
    <rect x="9" y="8" width="5" height="5" fill="#236023" />
    <rect x="4" y="10" width="4" height="4" fill="#3a8a3a" />
    <rect x="2" y="11" width="3" height="3" fill="#1b4d1b" />
    <rect x="13" y="12" width="2" height="2" fill="#1b4d1b" />
  </svg>
);

// Form Reusable Components
const InputField = forwardRef(({ label, icon: Icon, required, ...props }: any, ref: any) => (
  <div className="flex flex-col space-y-1.5 w-full">
    <label className="text-emerald-700 dark:text-[#a3e635] text-sm font-semibold flex items-center gap-1 transition-colors">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-slate-400 dark:text-gray-400 transition-colors" />
      </div>
      <input
        ref={ref}
        className="w-full bg-white dark:bg-[#111] border border-slate-300 dark:border-[#333] rounded-md py-2.5 pl-10 pr-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:border-emerald-500 dark:focus:border-[#a3e635] focus:ring-1 focus:ring-emerald-500 dark:focus:ring-[#a3e635] transition-colors shadow-sm dark:shadow-none"
        required={required}
        {...props}
      />
    </div>
  </div>
));
InputField.displayName = "InputField";

const CheckboxGroup = ({ title, options, register, required }: any) => (
  <div className="flex flex-col space-y-3 w-full">
    <label className="text-emerald-700 dark:text-[#a3e635] text-sm font-semibold flex items-center gap-1 transition-colors">
      {title} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((opt: any) => (
        <label key={opt.key} className="flex items-center gap-3 p-3 bg-white dark:bg-[#111] border border-slate-300 dark:border-[#333] rounded-md cursor-pointer hover:border-emerald-500 dark:hover:border-[#a3e635] transition-colors group shadow-sm dark:shadow-none">
          <input
            type="checkbox"
            className="w-4 h-4 rounded-sm border-slate-300 dark:border-[#555] bg-slate-50 dark:bg-[#222] text-emerald-600 dark:text-[#a3e635] focus:ring-1 focus:ring-emerald-500 dark:focus:ring-[#a3e635] focus:ring-offset-white dark:focus:ring-offset-[#111] transition-colors"
            value="yes"
            {...register(opt.key)}
          />
          <span className="text-slate-700 dark:text-gray-300 text-sm group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{opt.label}</span>
        </label>
      ))}
    </div>
  </div>
);

const RadioGroup = ({ title, options, register, name, required }: any) => (
  <div className="flex flex-col space-y-3 w-full">
    <label className="text-emerald-700 dark:text-[#a3e635] text-sm font-semibold flex items-center gap-1 transition-colors">
      {title} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {options.map((opt: string) => (
        <label key={opt} className="flex items-center gap-3 p-3 bg-white dark:bg-[#111] border border-slate-300 dark:border-[#333] rounded-md cursor-pointer hover:border-emerald-500 dark:hover:border-[#a3e635] transition-colors group shadow-sm dark:shadow-none">
          <input
            type="radio"
            className="w-4 h-4 border-slate-300 dark:border-[#555] bg-slate-50 dark:bg-[#222] text-emerald-600 dark:text-[#a3e635] focus:ring-1 focus:ring-emerald-500 dark:focus:ring-[#a3e635] focus:ring-offset-white dark:focus:ring-offset-[#111] transition-colors"
            value={opt}
            required={required}
            {...register(name)}
          />
          <span className="text-slate-700 dark:text-gray-300 text-sm group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

export default function TSPForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNoticeEmpty, setNoticeEmpty] = useState(false);
  const form = useForm<SheetData>();
  const { register, handleSubmit, watch, setValue } = form;

  const selectedYear = watch("year");

  useEffect(() => {
    if (selectedYear === "Faculty") {
      setValue("roll", "N/A");
    }
  }, [selectedYear, setValue]);

  const getInterestsNo = (formData: SheetData) => {
    let interestParams = "";
    if (formData.writing === "yes") interestParams += "0";
    if (formData.drawing === "yes") interestParams += "1";
    if (formData.designing === "yes") interestParams += "2";
    if (formData.videoEditingbasic === "yes") interestParams += "3";
    if (formData.videoEditingadvanced === "yes") interestParams += "4";
    if (formData.technology === "yes") interestParams += "5";
    if (formData.photography === "yes") interestParams += "6";
    return interestParams;
  };

  const checkEmailAndRedirect = async (email: string) => {
    try {
      const response = await fetch("/api/v1/tsps/checkuser ", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      checkEmailAndRedirect(session.user.email);
    }
  }, [session]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res2 = await fetch("/api/v1/notice");
        let notice = await res2.json();
        notice = notice.reverse();
        if (notice.length === 0 || notice[0].noticeLink !== "/tsp") {
          setNoticeEmpty(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  const postSheet = async (formData: SheetData): Promise<boolean> => {
    try {
      const response = await fetch("/api/v1/tsps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status !== 201) {
        toast.error(data.msg || "Something went wrong");
        return false;
      }
      toast.success("Submitted successfully");
      return true;
    } catch {
      setIsSubmitted(false);
      toast.error("Try submitting again");
      return false;
    }
  };

  const onSubmit = async (formData: SheetData) => {
    setIsSubmitted(true);
    const isUploaded = await postSheet(formData);
    if (isUploaded) {
      router.replace(`/forms/tsp-form/${getInterestsNo(formData)}`);
    } else {
      setIsSubmitted(false);
    }
  };

  if (!session) {
    return (
      <FormSignInGate
        title="TSP Application"
        description="Please sign in to continue the Trainee Scholars Program form."
        bannerSrc="/image.png"
        bannerAlt="Trainee Scholars Program"
      />
    );
  }

  if (isNoticeEmpty) {
    return (
      <div className="animate-in-subtle mx-auto max-w-3xl space-y-8 pb-12">
        <div className="overflow-hidden border border-border rounded-xl mt-8">
          <Image
            src="/tsp-banner-2025.png"
            alt="Trainee Scholars Program"
            width={1200}
            height={320}
            className="h-auto w-full object-cover"
          />
        </div>
        <FormClosedState programName="TSP" />
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-hidden min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white font-sans animate-in-subtle selection:bg-emerald-200 dark:selection:bg-[#a3e635] selection:text-black transition-colors duration-300">

        {/* <div
          className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        /> */}
        {/* Banner Image */}
        <div className="w-full overflow-hidden border-b border-slate-200 dark:border-[#222] transition-colors">
          <Image
            src="/image.png"
            alt="Trainee Scholars Program"
            width={1920}
            height={400}
            className="h-auto w-full object-cover object-center max-h-[300px] sm:max-h-[400px]"
            priority
          />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12 sm:px-6 lg:px-8 space-y-12">
          {/* Top Content Row */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left: Text */}
            <div className="lg:col-span-3 space-y-8 p-6 md:p-8 bg-white/80 dark:bg-[#111]/50 border border-slate-200 dark:border-[#222] rounded-2xl relative overflow-hidden shadow-sm dark:shadow-none transition-colors">
              <LeavesIcon className="absolute top-2 right-2 w-12 h-12 opacity-[0.05] dark:opacity-10 transition-opacity" />
              <div className="inline-flex items-center gap-3 bg-emerald-50 dark:bg-[#1a1a1a] p-3 rounded-lg border border-emerald-100 dark:border-[#333] shadow-md transition-colors">
                <LeavesIcon className="w-6 h-6 md:w-8 md:h-8" />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-emerald-700 dark:text-[#a3e635] tracking-widest uppercase font-mono transition-colors [text-shadow:2px_2px_0px_rgba(16,185,129,0.2)] dark:[text-shadow:2px_2px_0px_#1b4d1b]">
                  Trainee Scholars Program
                </h1>
                <LeavesIcon className="w-6 h-6 md:w-8 md:h-8 scale-x-[-1]" />
              </div>
              <div className="space-y-5 text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed font-sans transition-colors">
                <p>
                  <span className="text-emerald-700 dark:text-[#a3e635] font-semibold transition-colors">The Trainee Scholars Program</span>, brought to you by <span className="text-emerald-700 dark:text-[#a3e635] font-semibold transition-colors">The HIT Times</span>, presents the opportunity for young and enthusiastic minds to follow their passion and excel in something they truly want to do.
                </p>
                <p>
                  The HIT Times invites you to the Trainee Scholars Program, a journey of growth, expression, and discovery. We are here to help you find yourself, to nurture your passion, and to turn ideas into impact. Whether you write, design, or capture moments, this is your chance to step into a world of possibilities. So, are you ready to push boundaries and explore yourself? Fill out the form and take the first step!
                </p>
                <p>We wish you a successful journey ahead.</p>
              </div>
              <div className="flex justify-end mt-4">
                <LeavesIcon className="w-6 h-6 opacity-60 text-emerald-700 dark:text-[#a3e635] transition-colors" />
                <LeavesIcon className="w-4 h-4 opacity-40 mt-2 text-emerald-700 dark:text-[#a3e635] transition-colors" />
              </div>
            </div>

            {/* Right: Contacts */}
            <div className="lg:col-span-2 flex">
              <div className="bg-white dark:bg-[#111] border border-slate-200 dark:border-[#2a2a2a] rounded-2xl p-6 md:p-8 space-y-8 shadow-xl relative overflow-hidden w-full h-fit transition-colors">
                {/* subtle decorative vines in corners */}
                <LeavesIcon className="absolute top-0 right-0 w-16 h-16 opacity-[0.02] dark:opacity-[0.03] transition-opacity" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <SteveIcon className="w-8 h-8 md:w-10 md:h-10" />
                    <h3 className="text-emerald-700 dark:text-[#a3e635] text-sm md:text-base font-bold transition-colors">For any Form related Query Contact :</h3>
                  </div>
                  <ul className="space-y-2 pl-12 md:pl-14 text-xs md:text-sm text-slate-700 dark:text-gray-300 font-mono transition-colors">
                    <li>• Priyanshi Kumari Thakur (+91 8800765176) [4th Year]</li>
                    <li>• Ekansh Kumar (+91 6203048525) [4th Year]</li>
                  </ul>
                </div>

                <div className="w-full h-px border-t border-dashed border-slate-300 dark:border-[#333] transition-colors" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <AlexIcon className="w-8 h-8 md:w-10 md:h-10" />
                    <h3 className="text-emerald-700 dark:text-[#a3e635] text-sm md:text-base font-bold transition-colors">For any Kind Of Technical Support Contact :</h3>
                  </div>
                  <ul className="space-y-2 pl-12 md:pl-14 text-xs md:text-sm text-slate-700 dark:text-gray-300 font-mono transition-colors">
                    <li>• Ishan Tiwari (+91 9073669191) [4th Year]</li>
                  </ul>
                </div>

                <div className="w-full h-px border-t border-dashed border-slate-300 dark:border-[#333] transition-colors" />

                <div className="flex items-center gap-3 pt-2">
                  <ChestIcon className="w-8 h-8 md:w-10 md:h-10" />
                  <h3 className="text-emerald-700 dark:text-[#a3e635] text-sm md:text-base font-bold transition-colors">The HIT Times</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pt-4 pb-12">
            {/* Grid of 4 main fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <InputField
                label="Email"
                type="email"
                icon={Mail}
                placeholder="mail@gmail.com"
                defaultValue={session.user?.email ?? ""}
                required
                {...register("email")}
              />
              <InputField
                label="Name"
                type="text"
                icon={User}
                placeholder="Your full name"
                required
                {...register("name")}
              />
              <InputField
                label="Roll Number(e.g.24/ME/001)"
                type="text"
                icon={IdCard}
                placeholder="24/ME/001"
                required
                {...register("roll")}
              />
              <InputField
                label="Contact Number"
                type="tel"
                icon={Phone}
                placeholder="Your phone number"
                required
                {...register("phone")}
              />
            </div>

            <CheckboxGroup
              title="What interests you most? (Select all that apply)"
              options={domains}
              register={register}
            />

            <RadioGroup
              title="Department"
              options={departments}
              register={register}
              name="dept"
              required
            />

            <RadioGroup
              title="Year"
              options={["Faculty","2nd Year", "3rd Year", "4th Year"]}
              register={register}
              name="year"
              required
            />

            <div className="flex flex-col space-y-1.5 w-full pt-2">
              <label className="text-emerald-700 dark:text-[#a3e635] text-sm font-semibold flex flex-col gap-0.5 transition-colors">
                We would love to hear from you
                <span className="text-xs text-slate-500 dark:text-gray-500 font-normal transition-colors">Share ideas on scheduling, events, or anything you&apos;d like from the program.</span>
              </label>
              <textarea
                rows={4}
                className="w-full bg-white dark:bg-[#111] border border-slate-300 dark:border-[#333] rounded-md py-3 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:border-emerald-500 dark:focus:border-[#a3e635] focus:ring-1 focus:ring-emerald-500 dark:focus:ring-[#a3e635] transition-colors mt-1 shadow-sm dark:shadow-none"
                placeholder="Your suggestions and ideas"
                {...register("suggestion")}
              />
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-200 dark:border-[#222] transition-colors">
              <Link href="/tsp" className="text-slate-500 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-[#a3e635] text-sm transition-colors hover:underline order-2 sm:order-1">
                Back to TSP overview
              </Link>
              <button
                type="submit"
                disabled={isSubmitted}
                className="order-1 sm:order-2 w-full sm:w-auto bg-emerald-600 dark:bg-[#3a8a3a] hover:bg-emerald-500 dark:hover:bg-[#4caf50] text-white font-bold py-3 px-10 rounded-md transition-all shadow-[inset_0_-4px_0_rgba(0,0,0,0.15)] dark:shadow-[inset_0_-4px_0_rgba(0,0,0,0.4)] hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)] dark:hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.4)] hover:translate-y-[2px] disabled:opacity-50 active:shadow-none active:translate-y-[4px]"
              >
                {isSubmitted ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
