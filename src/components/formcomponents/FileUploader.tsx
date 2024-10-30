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
    id?: any;
    register?: UseFormRegister<any>
  }

const FileUploader = ({ title, subtitle, id, register }: FileUploaderProps) => {
    
    if(register)
  return (
    <div>


                <div className='flex flex-row bg-transparent bg-opacity-15'>
                    {/* <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div> */}
                    <div className="px-6 lg:px-8 flex flex-col">
                        <label htmlFor="name" className={poppins.className + " text-white text-md mb-2"}>
                            {title}
                        </label>
                        { subtitle &&
                        <p className={poppins.className + " text-slate-300 text-sm mb-4"}>
                            {subtitle}
                        </p>
                        }
                        
                        <div className='flex justify-center items-center flex-col' >
                          <div className="mb-4 mx-auto">
                              <label
                                className="block mb-2 text-sm font-medium text-white"
                                htmlFor="file_input"
                              >
                                Upload file
                              </label>
                              <input {...register(id)}
                                className="block w-full text-sm text-slate-300 border border-gray-300 rounded-lg cursor-pointer bg-transparent focus:outline-none" /* dark:text-gray-400  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400*/
                                aria-describedby="file_input_help"
                                id="file_input"
                                type="file"
                              />
                              <p
                                className="mt-1 text-sm text-gray-200 "
                                id="file_input_help"
                              >
                                SVG, PNG, JPG ,MS Word or GIF (MAX. 5 Mb ).
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
