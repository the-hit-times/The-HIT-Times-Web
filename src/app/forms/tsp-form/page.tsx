"use client"
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
import { IBM_Plex_Serif, Nunito_Sans, Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn, useSession } from 'next-auth/react';


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800"],
});


export default function TSPForm() {

  type SheetData = {
    name: string
    roll: string
    email: string
    phone: string
    dept: string
    year: string
    writing: string
    drawing: string
    designing: string
    videoEditing: string
    technology: string
    photography: string
    suggestion: string
  }

  const interestNo: String[] = ["writing", "drawing", "designing", "videoEditing", "technology", "photography"]

  const { data: session } = useSession();

  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [notice, setNotice] = useState<any>(null)
  const [noticeEmpty, setNoticeEmpty] = useState(false)

  const form = useForm<SheetData>();
  const { register, handleSubmit } = form;


  const getInterestsNo = (formData: SheetData) => {
    let interestParams: String = ""
    if (formData.writing === "yes") interestParams += "0"
    if (formData.drawing === "yes") interestParams += "1"
    if (formData.designing === "yes") interestParams += "2"
    if (formData.videoEditing === "yes") interestParams += "3"
    if (formData.technology === "yes") interestParams += "4"
    if (formData.photography === "yes") interestParams += "5"
    return interestParams;
  }


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res2 = await fetch("/api/v1/notice");
        let notice = await res2.json();
        notice = notice.reverse();

        if (notice.length > 0) {
          setNotice(notice[0]);
        } else {
          setNoticeEmpty(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  const onSubmit = async (formData: SheetData) => {
    setIsSubmitted(true)
    //  createGoogleSheet(formData)
    const isUploaded = await postSheet(formData)
    if (isUploaded) {
      console.log("form submitted", formData)
      let interestParams: String = getInterestsNo(formData)
      router.replace(`/forms/tsp-form/${interestParams}`)
    }else{
      console.log("Unable to submit", formData)
    }

  }

  const postSheet = async (formData: SheetData): Promise<boolean> => {
    const url = '/api/v1/tsps';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status != 201) {
        toast.error("Something went wrong");
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        toast.success("Submitted successfully")
      }

      const data: any = await response.json();
      console.log(data);
      return true;
    } catch (error) {
      setIsSubmitted(false)
      toast.error("Try submitting again");
      return false;
    }
  };



  /*
  
    const createGoogleSheet = async (formData: SheetData): Promise<void> => {
      const url = 'https://sheetdb.io/api/v1/srs2qf40a6fqa';
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: [
              formData
            ]
          }),
        });
  
        if (!response.ok) {
          toast.error("Something went wrong");
          throw new Error(`HTTP error! status: ${response.status}`);
        }else{
          toast.success("Submitted successfully")
        }
  
        const data: any = await response.json();
        console.log(data);
      } catch (error) {
        toast.error("Something went wrong");
      }
    }; */


  if(session){
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative h-24 sm:h-64">
          <Image src="/tsp-header.png" alt="Trainee Scholars Program Banner" layout="fill" objectFit="cover" />
        </div>
        <div className="p-8">
          <motion.h1 className={`${poppins.className} text-3xl font-bold text-purple-300 mb-6`} {...fadeInUp}>
            Trainee Scholars Program
          </motion.h1>
          <motion.div className="prose max-w-none mb-8 text-gray-300" {...fadeInUp}>
            <p>
              <span className="font-semibold text-purple-400">The Trainee Scholars Program</span>, brought to you by
              <span className="font-semibold text-purple-400"> The HIT Times</span>, presents the opportunity for young
              and enthusiastic minds to follow their passion and excel in something they truly want to do.
            </p>
            <p className="mt-4">
              As part of the college&apos;s official media and literary club, we promote a creative culture inside the campus
              and provide room for each and everyone to grow in the field they choose. Join us in this adventure and
              nurture your passion amongst like minds.
            </p>
            <p className="mt-4">We wish you a successful journey ahead.</p>
          </motion.div>
          <motion.div className="mb-8 text-gray-300" {...fadeInUp}>
            <p className="font-semibold text-purple-400">The HIT Times</p>
            <p>
              Brochure -{" "}
              <Link
                href="https://www.instagram.com/thehittimes/"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                TSP 24-25
              </Link>
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {[
              { name: "name", label: "Name", type: "text", placeholder: "Your full name" },
              { name: "roll", label: "Roll Number (In the format-24/ME/001)", type: "text", placeholder: "24/ME/001" },
              { name: "email", label: "Email", type: "email", placeholder: "your.email@example.com" },
              { name: "phone", label: "Contact Number", type: "tel", placeholder: "Your phone number" },
            ].map((field, index) => (
              <motion.div key={field.name} {...fadeInUp} transition={{ delay: index * 0.1 }}>
                <label
                  htmlFor={field.name}
                  className={`${poppins.className} block text-sm font-medium text-purple-300`}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  className="bg-gray-600 text-zinc-100 mt-2 font-sans ring-1 ring-zinc-400 focus:ring-2 focus:ring-violet-700 outline-none duration-300 placeholder:text-zinc-100 placeholder:opacity-50 rounded-full px-2 w-full md:w-72 py-1 shadow-md focus:shadow-lg focus:shadow-purple-500"
                  placeholder={field.placeholder}
                  required
                  {...register(field.name as "name" | "roll" | "email" | "phone")}
                />
              </motion.div>
            ))}

            <motion.div {...fadeInUp}>
              <label className={`${poppins.className} block text-sm font-medium text-purple-300 mb-2`}>
                What interests you most?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["writing", "drawing", "designing", "videoEditing", "technology", "photography"].map((interest) => (
                  <label key={interest} className="relative flex items-center cursor-pointer group">

                    {/* <label class="relative flex items-center cursor-pointer group">
                      <input class="peer sr-only" type="checkbox" />
                      <div
                        class="w-8 h-8 rounded-lg bg-white border-2 border-purple-500 transition-all duration-300 ease-in-out peer-checked:bg-gradient-to-br from-purple-500 to-pink-500 peer-checked:border-0 peer-checked:rotate-12 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-5 after:h-5 after:opacity-0 after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=')] after:bg-contain after:bg-no-repeat peer-checked:after:opacity-100 after:transition-opacity after:duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                      ></div>
                      <span class="ml-3 text-sm font-medium text-gray-900">Gradient Check</span>
                    </label> */}

                    <input
                      id={interest}
                      type="checkbox"
                      className="peer sr-only"
                      value="yes"
                      {...register(interest as "writing" | "drawing" | "designing" | "videoEditing" | "technology" | "photography")}
                    />
                    <div
                        className="w-8 h-8 rounded-lg bg-white border-2 border-purple-500 transition-all duration-300 ease-in-out peer-checked:bg-gradient-to-br from-purple-500 to-pink-500 peer-checked:border-0 peer-checked:rotate-12 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-5 after:h-5 after:opacity-0 after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=')] after:bg-contain after:bg-no-repeat peer-checked:after:opacity-100 after:transition-opacity after:duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                      ></div>
                    <label htmlFor={interest} className="ml-2 block text-sm text-gray-300">
                      {interest.charAt(0).toUpperCase() + interest.slice(1)}
                    </label>
                  </label>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeInUp}>
              <label className={`${poppins.className} block text-sm font-medium text-purple-300 mb-2`}>
                Department
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
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
                ].map((dept) => (
                  <div key={dept} className="flex items-center">
                    <input
                      id={`dept-${dept}`}
                      type="radio"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700"
                      value={dept}
                      {...register("dept")}
                    />
                    <label htmlFor={`dept-${dept}`} className="ml-2 block text-sm text-gray-300">
                      {dept}
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeInUp}>
              <label className={`${poppins.className} block text-sm font-medium text-purple-300 mb-2`}>Year</label>
              <p className="text-sm text-gray-400 mb-2">TSP is only for 1st and 2nd year students.</p>
              <div className="space-y-2">
                {["1st Year", "2nd Year"].map((year) => (
                  <div key={year} className="flex items-center">
                    <input
                      id={`year-${year}`}
                      type="radio"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700"
                      value={year}
                      {...register("year")}
                    />
                    <label htmlFor={`year-${year}`} className="ml-2 block text-sm text-gray-300">
                      {year}
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeInUp}>
              <label
                htmlFor="suggestion"
                className={`${poppins.className} block text-sm font-medium text-purple-300 mb-2`}
              >
                We would love to hear from you
              </label>
              <p className="text-sm text-gray-400 mb-2">
                Please tell us about your ideas regarding the program. (You can tell us about the ideas on how you would
                like the program to be scheduled, or what type of interactive events would be best from your POV.)
              </p>
              <textarea
                id="suggestion"
                rows={4}
                className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-white placeholder-gray-400"
                placeholder="Your suggestions and ideas"
                required
                {...register("suggestion")}
              ></textarea>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {isSubmitted ? (
                <div className="bg-purple-600 py-2 px-4 rounded-md flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-white">Submitting...</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md shadow-sm transition duration-150 ease-in-out transform hover:scale-105"
                >
                  Submit
                </button>
              )}
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>

  )
}else{return (
      <div className=" min-h-screen bg-[url('/tht-background.jpg')]  max-w-screen-2xl  md:rounded-2xl md:px-80 ">
        <div className="relative top-10 rounded-b-lg overflow-hidden justify-center p-2 w-screen md:max-w-4xl">
          <Image
            src="https://res.cloudinary.com/dvw5qhccb/image/upload/v1730133636/rec-header.png_reznpj.jpg"
            alt="Recruitment Form 2K25"
            width={800}
            height={100}
            className="border  border-white rounded-lg"
          />
        </div>
        <div
          className={
            "mt-12 text-2xl text-purple-400 px-28 md:pl-5 animate-fade-right font-bold" +
            poppins.className
          }
        >
          Welcome
        </div>
        <div className="my-2">
          <h2
            className={
              "my-4 text-xl  text-purple-100 pl-5 animate-fade-left  font-semibold " +
              poppins.className
            }
          >
            Please sign in to continue the TSP form
          </h2>
        </div>
        <div>
          <p
            className={
              nunitoSans.className +
              " text-gray-200 my-4 text-3xl  font-bold mt-12"
            }
          ></p>
          <button
            className="relative px-4 py-1  mx-32 md:ml-96  overflow-hidden font-medium text-zinc-800 bg-gray-100 border border-gray-200 rounded-lg shadow-inner group"
            onClick={() => signIn()}
          >
            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full"></span>
            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full"></span>
            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full"></span>
            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full"></span>
            <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white font-semibold text-base ">
              Sign In
            </span>
          </button>
        </div>
        <div className="h-20 sm:h-64"></div>
      </div>
    );
  }
}





//Old Form code

    // <div className="min-h-screen bg-gray-200">
    //   <div className="max-w-3xl mx-auto">
    //     <div className="relative mb-2 lg:mb-3 rounded-b-lg overflow-hidden">
    //       <Image
    //         src="/tsp-header.png"
    //         alt="Trainee Scholars Program Banner"
    //         width={1500}
    //         height={100}
    //       />
    //     </div>
    //     <div className='h-2 lg:h-3 w-full bg-amber-800'></div>
    //     <div className='flex flex-row bg-white shadow-md rounded-b-sm'>
    //       <div className='bg-blue-400 w-5 rounded-bl-3xl'></div>
    //       <div className="pt-3 px-4 sm:px-6 lg:px-8">
    //         <header>
    //           <div className={poppins.className + ' text-2xl font-medium text-black'}>
    //             Trainee Scholars Program
    //           </div>
    //         </header>
    //         <div className='h-0.5 lg:h-1 mt-2 bg-amber-800'></div>
    //         <div>
    //           <p className="my-4 text-xs sm:text-sm">
    //             <span className='font-bold'>The Trainee Scholars Program</span>
    //             , brought to you by
    //             <span className='font-bold'>The HIT Times</span>
    //             , presents the opportunity for young and
    //             enthusiastic minds to follow their passion and excel in something they truly want to do.
    //           </p>
    //           <p className="text-xs sm:text-sm">
    //             As a part of the college&apos;s official media and literary club, we promote a creative culture inside the campus and
    //             provide room for each and everyone to grow in the field they choose. The senior members of our team have
    //             had a variety of experiences. Ranging from creative creations to cracking placement drives, each one of their
    //             encounters has taught them a great deal. They are all here for you, if you have the zeal to learn, we will be your
    //             guiding post to success. Join us in this adventure and nurture your passion amongst like minds.
    //           </p>
    //           <p className="text-xs sm:text-sm">We wish you a successful journey ahead.</p>
    //         </div>
    //         <div className='my-4 text-xs sm:text-sm'>
    //           <p className="font-semibold mb-3">The HIT Times</p>
    //           <p>Brochure -
    //             <span className='text-blue-600 underline'>
    //               <Link href={/* link of the TSP brochure -> */'https://www.instagram.com/thehittimes/'}>TSP 24-25</Link>
    //             </span>
    //           </p>
    //         </div>
    //       </div>
    //     </div>


    //     <form onSubmit={handleSubmit(onSubmit)}>

    //       <div className='flex flex-row bg-white shadow-md rounded-sm my-4'>
    //         <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div>
    //         <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
    //           <label htmlFor="name" className={poppins.className + " text-gray-900 text-md mb-2"}>
    //             Name
    //           </label>
    //           <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Short answer text" type='text' id="name" required {...register("name")} />
    //         </div>
    //       </div>

    //       <div className='flex flex-row bg-white shadow-md rounded-sm mb-4'>
    //         <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div>
    //         <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
    //           <label htmlFor="roll" className={poppins.className + " text-gray-900 text-md mb-2"}>
    //             Roll Number (In the format-24/ME/001)
    //           </label>
    //           <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Short answer text" type='text' id="roll" required {...register("roll")} />
    //         </div>
    //       </div>

    //       <div className='flex flex-row bg-white shadow-md rounded-sm my-4'>
    //         <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div>
    //         <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
    //           <label htmlFor="email" className={poppins.className + " text-gray-900 text-md mb-2"}>
    //             Email
    //           </label>
    //           <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Short answer text" type='text' id="email" required {...register("email")} />
    //         </div>
    //       </div>

    //       <div className='flex flex-row bg-white shadow-md rounded-sm mb-4'>
    //         <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div>
    //         <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
    //           <label htmlFor="phone" className={poppins.className + " text-gray-900 text-md mb-2"}>
    //             Contact Number
    //           </label>
    //           <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Short answer text" type='text' id="phone" required {...register("phone")} />
    //         </div>
    //       </div>

    //       <div className='flex flex-row bg-white shadow-md rounded-sm mb-4'>
    //         <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div>
    //         <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
    //           <label htmlFor="interest" className={poppins.className + " text-gray-900 text-md mb-4"}>
    //             What interests you most?
    //           </label>
    //           <div className='flex flex-row mb-3 text-sm'>
    //             <input className='' value="yes" type='checkbox' id="writing" {...register("writing")} /><span className='w-2'></span>Writing
    //           </div>
    //           <div className='flex flex-row mb-3 text-sm'>
    //             <input className='' value="yes" type='checkbox' id="drawing" {...register("drawing")} /><span className='w-2'></span>Drawing
    //           </div>
    //           <div className='flex flex-row mb-3 text-sm'>
    //             <input className='' value="yes" type='checkbox' id="designing" {...register("designing")} /><span className='w-2'></span>Designing
    //           </div>
    //           <div className='flex flex-row mb-3 text-sm'>
    //             <input className='' value="yes" type='checkbox' id="videoEditing" {...register("videoEditing")} /><span className='w-2'></span>Video Editing
    //           </div>
    //           <div className='flex flex-row mb-3 text-sm'>
    //             <input className='' value="yes" type='checkbox' id="technology" {...register("technology")} /><span className='w-2'></span>Technology
    //           </div>
    //           <div className='flex flex-row text-sm'>
    //             <input className='' value="yes" type='checkbox' id="photography" {...register("photography")} /><span className='w-2'></span>Photography
    //           </div>
    //         </div>
    //       </div>

    //       <div className='flex flex-row bg-white shadow-md rounded-sm mb-4'>
    //         <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div>
    //         <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
    //           <label htmlFor="dept" className={poppins.className + " text-gray-900 text-md mb-4"}>
    //             Depertment
    //           </label>
    //           <div className='flex flex-row mb-3 text-sm'>
    //             <input className='' value="AEIE" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>AEIE
    //           </div>
    //           <div className='flex flex-row mb-3 text-sm'>
    //             <input className='' value="Agriculture" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>Agriculture
    //           </div>
    //           <div className='flex flex-row mb-3 text-sm'>
    //             <input className='' value="BT" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>BT
    //           </div>
    //           <div className='flex flex-row mb-3 text-sm'>
    //             <input className='' value="CE" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>CE
    //           </div>
    //           <div className='flex flex-row mb-3 text-sm'>
    //             <input className='' value="CHE" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>CHE
    //           </div>
    //           <div className='flex flex-row mb-3 text-sm'>
    //             <input className='' value="CSE" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>CSE
    //           </div>
    //           <div className='flex flex-row mb-3 text-sm'>
    //             <input className='' value="CSE-AIML" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>CSE-AIML
    //           </div>
    //           <div className='flex flex-row mb-3 text-sm'>
    //             <input className='' value="CSE-CS" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>CSE-CS
    //           </div>
    //           <div className='flex flex-row mb-3 text-sm'>
    //             <input className='' value="CSE-DS" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>CSE-DS
    //           </div>
    //           <div className='flex flex-row mb-3 text-sm'>
    //             <input className='' value="ECE" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>ECE
    //           </div>
    //           <div className='flex flex-row mb-3 text-sm'>
    //             <input className='' value="EE" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>EE
    //           </div>
    //           <div className='flex flex-row mb-3 text-sm'>
    //             <input className='' value="FT" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>FT
    //           </div>
    //           <div className='flex flex-row mb-3 text-sm'>
    //             <input className='' value="IT" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>IT
    //           </div>
    //           <div className='flex flex-row text-sm'>
    //             <input className='' value="ME" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>ME
    //           </div>
    //         </div>
    //       </div>

    //       <div className='flex flex-row bg-white shadow-md rounded-sm mb-4'>
    //         <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div>
    //         <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
    //           <label htmlFor="year" className={poppins.className + " text-gray-900 text-md mb-1"}>
    //             Year
    //           </label>
    //           <p className={poppins.className + " text-gray-900 text-sm mb-4"}>
    //             TSP is only for 1st and 2nd year students.
    //           </p>
    //           <div className='flex flex-row mb-3 text-sm'>
    //             <input className='' value="1st Year" type='radio' id="year" {...register("year")} /><span className='w-2'></span>1st Year
    //           </div>
    //           <div className='flex flex-row text-sm'>
    //             <input className='' value="2nd Year" type='radio' id="year" {...register("year")} /><span className='w-2'></span>2nd Year
    //           </div>
    //         </div>
    //       </div>

    //       <div className='flex flex-row bg-white shadow-md rounded-sm my-4'>
    //         <div className='bg-blue-400 w-2 lg:w-2.5 rounded-l-3xl'></div>
    //         <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
    //           <p className={poppins.className + " text-gray-900 text-md mb-2"}>
    //             We would love to hear from you,
    //           </p>
    //           <div className='space-y-2'></div>
    //           <p className={poppins.className + " text-gray-900 text-md mb-2"}>
    //             So please tell us about your ideas regarding the program. (You can tell us about the ideas on how you would like the program to be scheduled, or what type of interactive events would be best from your POV.)
    //           </p>
    //           <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Long answer text" type='text' id="suggestion" required {...register("suggestion")} />
    //         </div>
    //       </div>

    //       {
    //         isSubmitted ?
    //           <div className='flex flex-row justify-center pb-4'>
    //             <div className="bg-purple-500 py-1 px-8 rounded-lg"/*flex gap-2*/>
    //               <div role="status">
    //                 <svg aria-hidden="true" className="w-6 h-6 text-purple-400 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                   <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
    //                   <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    //                 </svg>
    //               </div>
    //             </div>
    //           </div>
    //           :
    //           <div className='flex flex-row justify-center pb-4'>
    //             <button className="bg-purple-500 py-1 px-5 rounded-lg text-white">Submit</button>
    //           </div>
    //       }

    //     </form>

    //   </div>
    // </div>