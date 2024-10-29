"use client";
import { UseFormRegister } from "react-hook-form";
import { Poppins } from 'next/font/google';


const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});


interface FileUploaderProps {
    title?: string;
    subtitle?: string;
    instruction?: string;
    id?: any;
    register?: UseFormRegister<any>
  }

const FileUploader = ({ title, subtitle, instruction, id, register }: FileUploaderProps) => {
    
    if(register)
  return (
    <div>
                <div className='flex flex-row bg-white rounded-lg pt-3 mb-4 shadow-md'>
                    {/* <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div> */}
                    <div className="px-6 lg:px-8 flex flex-col">
                        <label htmlFor="name" className={poppins.className + " text-gray-900 text-md mb-2"}>
                            {title}
                        </label>
                        { subtitle &&
                        <p className={poppins.className + " text-gray-900 text-sm mb-4"}>
                            {subtitle}
                        </p>
                        }
                        
                        <div className='flex justify-center items-center flex-col' >
                          <div className="mb-4 mx-auto">
                              <label
                                className="block mb-2 text-sm font-medium text-black"
                                htmlFor="file_input"
                              >
                                Upload file
                              </label>
                              <input {...register(id)}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" /* dark:text-gray-400  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400*/
                                aria-describedby="file_input_help"
                                id="file_input"
                                type="file"
                              />
                              <p
                                className="mt-1 text-sm text-gray-500 "
                                id="file_input_help"
                              >
                                {instruction ? instruction : 'SVG, PNG, JPG ,MS Word or GIF (MAX. 5 Mb ).'}
                              </p>
                            <div/>
                          <div/>
                        </div>
                      </div>
                    </div>
                </div>
    </div>
  )
}

export default FileUploader
