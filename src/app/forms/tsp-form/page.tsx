"use client"
import { IBM_Plex_Serif, Nunito_Sans, Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';


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


  const form = useForm<SheetData>();
  const { register, handleSubmit } = form;

  const onSubmit = (formData: SheetData) => {
    createGoogleSheet(formData)
    console.log("form submitted", formData)
  }


  type SheetData = {
    id: string
    name: string
    roll: string
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
  var userId = 1;



  const createGoogleSheet = async (formData: SheetData): Promise<void> => {
    const url = 'https://sheetdb.io/api/v1/srs2qf40a6fqa';
    formData.id = userId.toString();

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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: any = await response.json();
      console.log(data);
      userId++;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-3xl mx-auto">
        <div className="relative mb-2 lg:mb-3 rounded-b-lg overflow-hidden">
          <Image
            src="/tsp-header.png"
            alt="Trainee Scholars Program Header"
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
                  <Link href={/* link of the instagram post -> */'https://www.instagram.com/thehittimes/'}>TSP 24-25</Link>
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

          <footer className='flex flex-row justify-center pb-4'>
            <button className="bg-purple-500 py-1 px-5 rounded-lg text-white">Submit</button>
          </footer>
        </form>

      </div>
    </div>
  )
}