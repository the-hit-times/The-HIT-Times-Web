"use client"
import { IBM_Plex_Serif, Nunito_Sans, Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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


  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)

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



  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-3xl mx-auto">
        <div className="relative mb-2 lg:mb-3 rounded-b-lg overflow-hidden">
          <Image
            src="/tsp-header.png"
            alt="Trainee Scholars Program Banner"
            width={1500}
            height={100}
          />
        </div>
        <div className='h-2 lg:h-3 w-full bg-amber-800'></div>
        <div className='flex flex-row bg-white shadow-md rounded-b-sm'>
          <div className='bg-blue-400 w-5 rounded-bl-3xl'></div>
          <div className="pt-3 px-4 sm:px-6 lg:px-8">
            <header>
              <div className={poppins.className + ' text-2xl font-medium text-black'}>
                Trainee Scholars Program
              </div>
            </header>
            <div className='h-0.5 lg:h-1 mt-2 bg-amber-800'></div>
            <div>
              <p className="my-4 text-xs sm:text-sm">
                <span className='font-bold'>The Trainee Scholars Program</span>
                , brought to you by
                <span className='font-bold'>The HIT Times</span>
                , presents the opportunity for young and
                enthusiastic minds to follow their passion and excel in something they truly want to do.
              </p>
              <p className="text-xs sm:text-sm">
                As a part of the college&apos;s official media and literary club, we promote a creative culture inside the campus and
                provide room for each and everyone to grow in the field they choose. The senior members of our team have
                had a variety of experiences. Ranging from creative creations to cracking placement drives, each one of their
                encounters has taught them a great deal. They are all here for you, if you have the zeal to learn, we will be your
                guiding post to success. Join us in this adventure and nurture your passion amongst like minds.
              </p>
              <p className="text-xs sm:text-sm">We wish you a successful journey ahead.</p>
            </div>
            <div className='my-4 text-xs sm:text-sm'>
              <p className="font-semibold mb-3">The HIT Times</p>
              <p>Brochure -
                <span className='text-blue-600 underline'>
                  <Link href={/* link of the TSP brochure -> */'https://www.instagram.com/thehittimes/'}>TSP 24-25</Link>
                </span>
              </p>
            </div>
          </div>
        </div>


        <form onSubmit={handleSubmit(onSubmit)}>

          <div className='flex flex-row bg-white shadow-md rounded-sm my-4'>
            <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div>
            <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
              <label htmlFor="name" className={poppins.className + " text-gray-900 text-md mb-2"}>
                Name
              </label>
              <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Short answer text" type='text' id="name" required {...register("name")} />
            </div>
          </div>

          <div className='flex flex-row bg-white shadow-md rounded-sm mb-4'>
            <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div>
            <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
              <label htmlFor="roll" className={poppins.className + " text-gray-900 text-md mb-2"}>
                Roll Number (In the format-24/ME/001)
              </label>
              <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Short answer text" type='text' id="roll" required {...register("roll")} />
            </div>
          </div>

          <div className='flex flex-row bg-white shadow-md rounded-sm my-4'>
            <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div>
            <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
              <label htmlFor="email" className={poppins.className + " text-gray-900 text-md mb-2"}>
                Email
              </label>
              <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Short answer text" type='text' id="email" required {...register("email")} />
            </div>
          </div>

          <div className='flex flex-row bg-white shadow-md rounded-sm mb-4'>
            <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div>
            <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
              <label htmlFor="phone" className={poppins.className + " text-gray-900 text-md mb-2"}>
                Contact Number
              </label>
              <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Short answer text" type='text' id="phone" required {...register("phone")} />
            </div>
          </div>

          <div className='flex flex-row bg-white shadow-md rounded-sm mb-4'>
            <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div>
            <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
              <label htmlFor="interest" className={poppins.className + " text-gray-900 text-md mb-4"}>
                What interests you most?
              </label>
              <div className='flex flex-row mb-3 text-sm'>
                <input className='' value="yes" type='checkbox' id="writing" {...register("writing")} /><span className='w-2'></span>Writing
              </div>
              <div className='flex flex-row mb-3 text-sm'>
                <input className='' value="yes" type='checkbox' id="drawing" {...register("drawing")} /><span className='w-2'></span>Drawing
              </div>
              <div className='flex flex-row mb-3 text-sm'>
                <input className='' value="yes" type='checkbox' id="designing" {...register("designing")} /><span className='w-2'></span>Designing
              </div>
              <div className='flex flex-row mb-3 text-sm'>
                <input className='' value="yes" type='checkbox' id="videoEditing" {...register("videoEditing")} /><span className='w-2'></span>Video Editing
              </div>
              <div className='flex flex-row mb-3 text-sm'>
                <input className='' value="yes" type='checkbox' id="technology" {...register("technology")} /><span className='w-2'></span>Technology
              </div>
              <div className='flex flex-row text-sm'>
                <input className='' value="yes" type='checkbox' id="photography" {...register("photography")} /><span className='w-2'></span>Photography
              </div>
            </div>
          </div>

          <div className='flex flex-row bg-white shadow-md rounded-sm mb-4'>
            <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div>
            <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
              <label htmlFor="dept" className={poppins.className + " text-gray-900 text-md mb-4"}>
                Depertment
              </label>
              <div className='flex flex-row mb-3 text-sm'>
                <input className='' value="AEIE" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>AEIE
              </div>
              <div className='flex flex-row mb-3 text-sm'>
                <input className='' value="Agriculture" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>Agriculture
              </div>
              <div className='flex flex-row mb-3 text-sm'>
                <input className='' value="BT" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>BT
              </div>
              <div className='flex flex-row mb-3 text-sm'>
                <input className='' value="CE" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>CE
              </div>
              <div className='flex flex-row mb-3 text-sm'>
                <input className='' value="CHE" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>CHE
              </div>
              <div className='flex flex-row mb-3 text-sm'>
                <input className='' value="CSE" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>CSE
              </div>
              <div className='flex flex-row mb-3 text-sm'>
                <input className='' value="CSE-AIML" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>CSE-AIML
              </div>
              <div className='flex flex-row mb-3 text-sm'>
                <input className='' value="CSE-CS" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>CSE-CS
              </div>
              <div className='flex flex-row mb-3 text-sm'>
                <input className='' value="CSE-DS" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>CSE-DS
              </div>
              <div className='flex flex-row mb-3 text-sm'>
                <input className='' value="ECE" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>ECE
              </div>
              <div className='flex flex-row mb-3 text-sm'>
                <input className='' value="EE" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>EE
              </div>
              <div className='flex flex-row mb-3 text-sm'>
                <input className='' value="FT" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>FT
              </div>
              <div className='flex flex-row mb-3 text-sm'>
                <input className='' value="IT" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>IT
              </div>
              <div className='flex flex-row text-sm'>
                <input className='' value="ME" type='radio' id="dept" {...register("dept")} /><span className='w-2'></span>ME
              </div>
            </div>
          </div>

          <div className='flex flex-row bg-white shadow-md rounded-sm mb-4'>
            <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div>
            <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
              <label htmlFor="year" className={poppins.className + " text-gray-900 text-md mb-1"}>
                Year
              </label>
              <p className={poppins.className + " text-gray-900 text-sm mb-4"}>
                Recruitment is only for 1st and 2nd year students.
              </p>
              <div className='flex flex-row mb-3 text-sm'>
                <input className='' value="1st Year" type='radio' id="year" {...register("year")} /><span className='w-2'></span>1st Year
              </div>
              <div className='flex flex-row text-sm'>
                <input className='' value="2nd Year" type='radio' id="year" {...register("year")} /><span className='w-2'></span>2nd Year
              </div>
            </div>
          </div>

          <div className='flex flex-row bg-white shadow-md rounded-sm my-4'>
            <div className='bg-blue-400 w-2 lg:w-2.5 rounded-l-3xl'></div>
            <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
              <p className={poppins.className + " text-gray-900 text-md mb-2"}>
                We would love to hear from you,
              </p>
              <div className='space-y-2'></div>
              <p className={poppins.className + " text-gray-900 text-md mb-2"}>
                So please tell us about your ideas regarding the program. (You can tell us about the ideas on how you would like the program to be scheduled, or what type of interactive events would be best from your POV.)
              </p>
              <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Long answer text" type='text' id="suggestion" required {...register("suggestion")} />
            </div>
          </div>

          {
            isSubmitted ?
              <div className='flex flex-row justify-center pb-4'>
                <div className="bg-purple-500 py-1 px-8 rounded-lg"/*flex gap-2*/>
                  <div role="status">
                    <svg aria-hidden="true" className="w-6 h-6 text-purple-400 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                  </div>
                </div>
              </div>
              :
              <div className='flex flex-row justify-center pb-4'>
                <button className="bg-purple-500 py-1 px-5 rounded-lg text-white">Submit</button>
              </div>
          }

        </form>

      </div>
    </div>
  )
}