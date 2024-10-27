
import { Poppins } from 'next/font/google';
import { UseFormRegister } from 'react-hook-form';


const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});


interface FormInputProps {
    title?: string;
    subtitle?: string;
    id?: any;
    isRequired?: boolean;
    register?: UseFormRegister<any>
  }

const FormInput = ({ title, subtitle, id, isRequired, register }: FormInputProps) =>{
    if(register && id){
        return <>
            {isRequired ?
                <div className='flex flex-row bg-white shadow-md rounded-lg mb-4'>
                    {/* <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div> */}
                    <div className="py-5 px-6 lg:px-8 flex flex-col">
                        <label htmlFor="name" className={poppins.className + " text-gray-900 text-md mb-2"}>
                            {title}
                            <span className='text-md text-red-600 pl-1'>*</span>
                        </label>
                        { subtitle &&
                        <p className={poppins.className + " text-gray-900 text-sm mb-4"}>
                            {subtitle}
                        </p>
                        }
                        <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Your Answer" type='text' id={id} required {...register(id)} />
                    </div>
                </div>
                :
                <div className='flex flex-row bg-white shadow-md rounded-lg mb-4'>
                    {/* <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div> */}
                    <div className="py-5 px-6 lg:px-8 flex flex-col">
                        <label htmlFor="name" className={poppins.className + " text-gray-900 text-md mb-2"}>
                            {title}
                        </label>
                        { subtitle &&
                        <p className={poppins.className + " text-gray-900 text-sm mb-4"}>
                            {subtitle}
                        </p>
                        }
                        <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Your Answer" type='text' id={id} {...register(id)} />
                    </div>
                </div>
            }
        </>
    }
}

export default FormInput
