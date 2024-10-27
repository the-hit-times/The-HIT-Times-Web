import { Poppins } from 'next/font/google';
import { UseFormRegister } from 'react-hook-form';


const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});


interface CommonFieldsProps {
    register?: UseFormRegister<any>
}


const CommonFields = ({register}:CommonFieldsProps) => {
    if(register)
  return (
    <div>
        <div className='flex flex-row bg-white shadow-md rounded-lg mb-4'>
                        {/* <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div> */}
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <label htmlFor="dept" className={poppins.className + " text-gray-900 text-md mb-4"}>
                                Department
                                <span className='text-md text-red-600 pl-1'>*</span>
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

                    <div className='flex flex-row bg-white shadow-md rounded-lg mb-4'>
                        {/* <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div> */}
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <label htmlFor="year" className={poppins.className + " text-gray-900 text-md mb-1"}>
                                Year
                                <span className='text-md text-red-600 pl-1'>*</span>
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
                    
                    <div className='flex flex-row bg-white shadow-md rounded-lg mb-4'>
                        {/* <div className='bg-blue-400 w-2 lg:w-2 rounded-l-3xl'></div> */}
                        <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
                            <label htmlFor="phone" className={poppins.className + " text-gray-900 text-md mb-2"}>
                                Contact Number
                                <span className='text-md text-red-600 pl-1'>*</span>
                            </label>
                            <p className={poppins.className + " text-gray-900 text-sm mb-4"}>
                                Please provide a number at which you can be reached, do not provide numbers which you do not use all the time. A number where you have both WhatsApp and calling facilities would be the best.
                            </p>
                            <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Short answer text" type='text' id="phone" required {...register("phone")} />
                        </div>
                    </div>

                    <div className='flex flex-row bg-white shadow-md rounded-lg my-4'>
                        {/* <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div> */}
                        <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
                            <label htmlFor="email" className={poppins.className + " text-gray-900 text-md mb-2"}>
                                Email
                                <span className='text-md text-red-600 pl-1'>*</span>
                            </label>
                            <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Short answer text" type='text' id="email" required {...register("email")} />
                        </div>
                    </div>

                    <div className='flex flex-row bg-white shadow-md rounded-lg my-4'>
                        {/* <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div> */}
                        <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
                            <p className={poppins.className + " text-gray-900 text-md mb-3"}>
                                What are your hobbies?
                                <span className='text-md text-red-600 pl-1'>*</span>
                            </p>
                            <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Short answer text" type='text' id="hobbies" required {...register("hobbies")} />
                        </div>
                    </div>

                    <div className='flex flex-row bg-white shadow-md rounded-lg my-4'>
                        {/* <div className='bg-blue-400 w-[3px] lg:w-1 rounded-l-3xl'></div> */}
                        <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
                            <p className={poppins.className + " text-gray-900 text-md mb-3"}>
                                What are the ideals or qualities you hold most dear in your own life?
                            </p>
                            <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Long answer text" type='text' id="qualities" {...register("qualities")} />
                        </div>
                    </div>

                    <div className='flex flex-row bg-white shadow-md rounded-lg my-4'>
                        {/* <div className='bg-blue-400 w-1 lg:w-[4.5px] rounded-l-3xl'></div> */}
                        <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
                            <p className={poppins.className + " text-gray-900 text-md mb-3"}>
                                What is your opinion on ragging? Do you think it should be ended soon? If so, then how?
                                <span className='text-md text-red-600 pl-1'>*</span>
                            </p>
                            <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Long answer text" type='text' id="ragging_opinion" required {...register("ragging_opinion")} />
                        </div>
                    </div>

                    <div className='flex flex-row bg-white shadow-md rounded-lg my-4'>
                        {/* <div className='bg-blue-400 w-[3px] lg:w-1 rounded-l-3xl'></div> */}
                        <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
                            <p className={poppins.className + " text-gray-900 text-md mb-3"}>
                                Why do you think you should be a part of The HIT Times?
                                <span className='text-md text-red-600 pl-1'>*</span>
                            </p>
                            <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Long answer text" type='text' id="why_join_THT" required {...register("why_join_THT")} />
                        </div>
                    </div>

                    {/* <div className='flex flex-row bg-white shadow-md rounded-md mb-4'>
                        <div className='bg-blue-400 w-[3px] lg:w-1 rounded-l-3xl'></div>
                        <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
                            <label htmlFor="year" className={poppins.className + " text-gray-900 text-md mb-4"}>
                                Had you attended Trainee Scholars Program (TSP) 23-24
                                <span className='text-md text-red-600 pl-1'>*</span>
                            </label>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="yes" type='radio' id="tsp_attendee" {...register("tsp_attendee")} /><span className='w-2'></span>yes
                            </div>
                            <div className='flex flex-row text-sm'>
                                <input className='' value="no" type='radio' id="tsp_attendee" {...register("tsp_attendee")} /><span className='w-2'></span>no
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-row bg-white shadow-md rounded-sm my-4'>
                        <div className='bg-blue-400 w-1 lg:w-1 rounded-l-3xl'></div>
                        <div className="py-5 px-4 sm:px-6 lg:px-8 flex flex-col">
                            <p className={poppins.className + " text-gray-900 text-md mb-3"}>
                                If you attended the Trainee Scholars Program event, please share your feedback.
                            </p>
                            <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Long answer text" type='text' id="tsp_feedback" {...register("tsp_feedback")} />
                        </div>
                    </div> */}
    </div>
  )
}

export default CommonFields