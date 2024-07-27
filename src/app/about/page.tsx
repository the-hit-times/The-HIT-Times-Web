import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    // main content section
     <div className=" mt-7 lg:p-5 md:p-5">
        <img src="tht_logo.png" alt="THT Image" className="h-20 mr-2 mb-5"/>
         <div className="gap-[34px] flex flex-col">
             <div className="md:gap-[54px] lg:gap-[35px] gap-[72px] mr-1 flex flex-col items-start lg:mr-0 md:mr-0 sm:gap-9">
                 <h1
                     className="sm:text-[26px] md:text-[32px] lg:text-[40px] text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-pink-500"
                 >
                     About Us
                 </h1>
                 <div className="flex flex-col gap-4 self-stretch">
                     <img
                         src="/aboutusImage.jpg"
                         alt="Aboutus Icon"
                         className="h-[350px] object-covershadow-none"
                     />
                     <p
                         className="lg:text-[15px] size-text2xl text ui leading-[27px] text-justify !font-nunitosans10 text-lg font-normal !text-gray-900_01"
                     >
                         Founded in the year of 2013, The HIT Times is only the second student run tabloid in the Eastern zone of
                         India. A progressive induction into a world full of semesters, assignments, placements, and an unending
                         voyage through the premises of 
                         <Link
                                href="https://hithaldia.ac.in/"
                                    className="lg:text-[17px] size-text3xl text ui text-[20px] font-normal text-blue-600 hover:text-blue-900">
                                  Haldia Institute of Technology
                         </Link> 
                          
                          , we aim at being your eyes and ears on the
                         campus. Hailing as the official media group of the Institution, we are set to bring forth the events and
                         the affairs while providing an impulse to your conscience. with technology running the game heavily
                         these days, this Android app is a part of our expansion to newer, tech-friendly avenues. So, stay tuned
                         and never miss out on a notification.
                     </p>
                 </div>
             </div>
             <div className="gap-[26px] mr-1 flex flex-col items-start md:mr-0">
                 <a href="#" className="sm:text-[24px] md:text-[26px] lg:text-[27px]">
                     <h2 className="size-headinglg heading ui text-[32px] font-semibold bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-500 ">
                         Contact Us
                     </h2>
                 </a>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-80 gap-y-16">
                     <div className="flex items-center justify-center w-full">
                         <img src="/favicon.ico" alt="THT Image" className="h-7 mr-2  hover:scale-150 duration-300"/>
                         <div className="flex flex-1 flex-col items-start justify-center">
                             <h3 className="lg:text-[15px] size-headingmd heading ui text-[18px] font-semibold !text-gray-900_01">
                                 Email us
                             </h3>
                             <Link
                                href="thehittimes@gmail.com"
                                className="lg:text-[17px] size-text3xl text ui text-[20px] font-normal text-blue-600 hover:text-blue-900 underline">
                                 thehittimes@gmail.com
                             </Link>
                         </div>
                     </div>
                         <div className="flex items-center justify-center w-full">
                             <img
                                 src="/socials/instagram.png"
                                 alt="Instagram"
                                 className="w-[24px] h-[24px] p-[2px] bg-gradient-to-r from-pink-500 to-violet-500 mr-2 rounded-md hover:scale-150 duration-300 "
                             />
                             <div className="flex flex-1 flex-col items-start justify-center">
                                 <h4 className="lg: text-[15px,18px] size-headingmd heading ui font-semibold">
                                     Instagram
                                 </h4>
                                 <Link
                                    href="https://www.instagram.com/thehittimes/"
                                    className="lg:text-[17px] size-text3xl text ui text-[20px] font-normal text-blue-600 hover:text-blue-900 underline">
                                     thehittimes
                                 </Link>
                             </div>
                         </div>
                         <div className="flex items-center justify-center w-full">
                             <img src="/socials/linkedin.png" alt="Linkedin Icon" className="w-[24px] h-[24px] bg-blue-600 mr-2 rounded-md hover:scale-150 duration-300" />
                             <div className="flex flex-1 flex-col items-start justify-center">
                                 <h5 className="lg:text-[15px] size-headingmd heading ui text-[18px] font-semibold !text-gray-900_01">
                                     LinkedIn
                                 </h5>
                                 <Link 
                                    href="https://www.linkedin.com/company/the-hit-times/mycompany/"
                                    className="lg:text-[17px] size-text3xl text ui text-[20px] font-normal text-blue-600 hover:text-blue-900 underline">
                                     the-hit-times
                                 </Link>
                             </div>
                         </div>
                         <div className="flex items-center justify-center w-full">
                             <img src="/socials/facebook.png" alt="Facebook Icon" className="w-[24px] h-[24px] bg-sky-600 rounded-md mr-2 hover:scale-150 duration-300" />
                             <div className="flex flex-1 flex-col items-start justify-center">
                                 <h5 className="lg:text-[15px] size-headingmd heading ui text-[18px] font-semibold !text-gray-900_01">
                                     Facebook
                                 </h5>
                                 <Link 
                                    href="https://www.facebook.com/the.hit.times/"
                                    className="lg:text-[17px] size-text3xl text ui text-[20px] font-normal text-blue-600 hover:text-blue-900 underline">
                                     The HIT Times
                                 </Link>
                             </div>
                         </div>
                 </div>
             </div>
         </div>
     </div>
  )
}

export default page