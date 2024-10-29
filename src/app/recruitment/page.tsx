"use client"
import FormInput from '@/components/formcomponents/FormInput';
import { IBM_Plex_Serif, Nunito_Sans, Poppins } from 'next/font/google';
import Image from 'next/image';
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


export default function RecCommonForm() {

    type CommonSheetData = {
        name: string              //1
        roll: string              //2
        position: string          //3
        other_position: string[]  //4
    }

    

    const router = useRouter()
    const [isSubmitted, setIsSubmitted] = useState(false)

    const form = useForm<CommonSheetData>();
    const { register, handleSubmit } = form;



    const onSubmit = async (formData: CommonSheetData) => {
        setIsSubmitted(true)
        let others = "|";
        if(formData.other_position){
            (formData.other_position).forEach((str)=> others+=str+'|')
        }
        toast.success("Fill the next page")
        router.push(`./recruitment/${formData.position}`+'?name='+formData.name+'&'+'roll='+formData.roll+'&'+'other='+others)
        setIsSubmitted(false)
    }

    function refreshPage(): void {
        router.refresh()
        toast.success("Kindly Fill Again")
    }

    return (
        <div className="min-h-screen bg-gray-200">
            <div className="max-w-3xl mx-auto">
                <div className="relative mb-2 lg:mb-3 rounded-b-lg overflow-hidden">
                    <Image
                        src="https://res.cloudinary.com/dvw5qhccb/image/upload/v1730133636/rec-header.png_reznpj.jpg"
                        alt="Recruitment Form 2K25"
                        width={1500}
                        height={100}
                    />
                </div>
                <div className='h-2 lg:h-3 w-full bg-purple-950'></div>
                <div className='flex flex-row bg-white shadow-md rounded-b-lg'>
                    {/* <div className='bg-blue-400 w-5 rounded-bl-3xl'></div> */}
                    <div className="pt-3 px-4 sm:px-6 lg:px-8">
                        <header>
                            <div className={poppins.className + ' text-3xl lg:text-4xl font-medium text-black'}>
                                Recruitment Form 2K25
                            </div>
                        </header>
                        <div className='h-0.5 lg:h-1 mt-2 bg-purple-800'></div>
                        <div>
                            <p className="py-4 text-xs sm:text-sm">
                                Carefully read each and every description under the sections and take your time to tell us about yourself, it will help us know you better. Some sections have a lot of questions and not all of them are marked as required but we will be giving preference to the people who show the tenacity to answer all questions. Use of proper grammar and form is expected (Spelling mistakes will be pardoned but not SMS lingo). If your replies are abusive or do not meet minimum standards of acceptability, your entry is liable to be disqualified.
                            </p>
                            <hr/>
                            <p className="py-3 text-xs sm:text-sm">The name and photo associated with your Google account will be recorded when you upload files and submit this form. Only the email you enter is part of your response.</p>
                            <hr/>
                            <p className='pt-2 pb-3 text-sm font-semibold sm:text-sm text-red-600'>* Indicates required question</p>
                        </div>
                        {/* <div className='my-4 text-xs sm:text-sm'>
                            <p className="font-semibold mb-3">The HIT Times</p>
                            <p>Brochure -
                                <span className='text-blue-600 underline'>
                                    <Link href={ link of the TSP brochure -> 'https://www.instagram.com/thehittimes/'}>TSP 24-25</Link>
                                </span>
                            </p>
                        </div> */}
                    </div>
                </div>


                <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>

                    <FormInput title='Name' id='name' isRequired={true} register={register}/>
                    
                    <FormInput title='Roll Number (In the format-24/ME/001)' id='roll' isRequired={true} register={register}/>

                    <div className='flex flex-row bg-white shadow-md rounded-lg mb-4'>
                        {/* <div className='bg-blue-400 w-4 lg:w-5 rounded-l-3xl'></div> */}
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <label htmlFor="dept" className={poppins.className + " text-gray-900 text-md mb-2"}>
                                What is the primary position you wish to apply for?
                                <span className='text-md text-red-600 pl-1'>*</span>
                            </label>
                            <p className={poppins.className + " text-gray-900 text-sm mb-4"}>
                                Select the position describing what you do best. In case you are not sure of what you can or want to do, select what interests you most. We encourage you to approach us through our Instagram page and ask what any specific position will entail. If you can apply for more than one position, fill the others in on the next question. If you don't have any skills and want to apply as a Trainee Scholar, select the last option.
                            </p>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="content-writer" type='radio' id="position" {...register("position")} /><span className='w-2'></span>Content Writer/ Editor (Good english is a must)
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="cartoonist" type='radio' id="position" {...register("position")} /><span className='w-2'></span>Cartoonist/Digital Artist (Classical art knowledge is required)
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="developer" type='radio' id="position" {...register("position")} /><span className='w-2'></span>Developer
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="graphic-designer" type='radio' id="position" {...register("position")} /><span className='w-2'></span>Graphic Designer
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="photographer" type='radio' id="position" {...register("position")} /><span className='w-2'></span>Photographer (Applicants with DSLR cameras will be preferred)
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="public-relations" type='radio' id="position" {...register("position")} /><span className='w-2'></span>Public Relations and Management
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="video-editor" type='radio' id="position" {...register("position")} /><span className='w-2'></span>Video Editor
                            </div>
                        
                            {/* <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="none" type='radio' id="position" {...register("position")} /><span className='w-2'></span>Currently none, but eager to learn and join Trainee Scholars Program 2025. (You won't receive any screening or interview calls this year.)
                            </div> */}
                        </div>
                    </div>

                    <div className='flex flex-row bg-white shadow-md rounded-lg mb-4'>
                        {/* <div className='bg-blue-400 w-1 lg:w-1.5 rounded-l-3xl'></div> */}
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <label htmlFor="interest" className={poppins.className + " text-gray-900 text-md mb-2"}>
                                What other positions do you believe you can fill for us?
                            </label>
                            <p className={poppins.className + " text-gray-900 text-sm mb-4"}>
                                If you are capable in multiple fields and can fulfil any other role, apart from your primary choice, please select them.
                            </p>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="Content-Writer" type='checkbox' id="other_position" {...register("other_position")} /><span className='w-2'></span>Content Writer/ Editor
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="Reporter" type='checkbox' id="other_position" {...register("other_position")} /><span className='w-2'></span>Reporter (Requires good communication skills and will involve field work)
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="Photographer" type='checkbox' id="other_position" {...register("other_position")} /><span className='w-2'></span>Photographer (Applicants with DSLR cameras will be preferred)
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="Graphic-Designer" type='checkbox' id="other_position" {...register("other_position")} /><span className='w-2'></span>Graphic Designer
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="Video-Editor" type='checkbox' id="other_position" {...register("other_position")} /><span className='w-2'></span>Video Editor
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="Cartoonist" type='checkbox' id="other_position" {...register("other_position")} /><span className='w-2'></span>Cartoonist/Digital Artist
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="Web-Developer" type='checkbox' id="other_position" {...register("other_position")} /><span className='w-2'></span>Web Developer
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="App-Developer" type='checkbox' id="other_position" {...register("other_position")} /><span className='w-2'></span>App Developer
                            </div>
                            <div className='flex flex-row text-sm'>
                                <input className='' value="Public-Relations" type='checkbox' id="other_position" {...register("other_position")} /><span className='w-2'></span>Public Relations and Management
                            </div>
                        </div>
                    </div>

                    {
                        isSubmitted ?
                            <div className='flex flex-row justify-start pb-6'>
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
                            <div className='flex flex-row justify-between pb-6'>
                                <button className="bg-purple-500 py-1 px-5 rounded-md text-white">Next</button>
                                <div onClick={refreshPage} className={poppins.className +' text-purple-800 text-md hover:cursor-pointer'}>Clear form</div>
                            </div>
                    }
                </form>
            </div>
        </div>
    )
    /*else{
        return(
            <div className='flex flex-col h-screen w-full bg-slate-50 items-center justify-center'>
                Please Kindly signIn 
                <button className='bg-emerald-900 px-4 py-2 rounded-lg shadow-lg text-xl font-serif text-white' onClick={signIn()} >
                    Sign In
                </button>
            </div>
        )
    }*/
}