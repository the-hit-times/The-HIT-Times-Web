"use client"
import CommonFields from '@/components/formcomponents/CommonFields';
import FileUploader from '@/components/formcomponents/FileUploader';
import FormInput from '@/components/formcomponents/FormInput';
import  uploadFile from '@/lib/uploadFile';
import { IBM_Plex_Serif, Nunito_Sans, Poppins } from 'next/font/google';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
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


export default function DevForm() {

    const searchParams = useSearchParams()

    console.log("got", searchParams.get('name') ," ",searchParams.get('roll')," ",searchParams.get('other'));
    

    type DevSheetData = {
        name: string              //1 ....from prev page
        roll: string              //2 ....from prev page
        position: string          //3 ....from prev page
        other_position: string    //4 ....from prev page
        dept: string              //5
        year: string              //6
        phone: string             //7
        email: string             //8
        hobbies: string           //9
        qualities: string         //10
        ragging_opinion: string   //11
        why_join_THT: string      //12 ....end of common fields

        Q1_tech: any              // programming languages
        Q2_tech: string           // other programming languages
        Q3_tech: any              // technologies
        Q4_tech: string           // other technologies
        Q5_tech: string           // familiar with Git and GitHub
        Q6_tech: string           // GitHub link
        Q7_tech: string           // opinions on best website/application
        Q8_tech: string           // competency at coding(1 to 5)
        Q9_tech: string           // a website is a better option for THT or an application
        Q10_tech: string          // why do you like to code
        Q11_tech: string          // link of any project
        Q12_tech: any             // Resume (ppt/pdf -> link)

    }


    const router = useRouter()
    const [isSubmitted, setIsSubmitted] = useState(false)

    const form = useForm<DevSheetData>();
    const { register, handleSubmit } = form;


    const onSubmit = async (formData: DevSheetData) => {
        setIsSubmitted(true)

        formData.name = searchParams.get('name')!
        formData.roll = searchParams.get('roll')!
        formData.position = "developer"
        formData.other_position = searchParams.get('other')!

        //array to string 
        let all="|";
        if(formData.Q1_tech){
            (formData.Q1_tech).forEach((str: string)=> all+=str+'|')
        }
        formData.Q1_tech = all;

        all="|";
        if(formData.Q3_tech){
            (formData.Q3_tech).forEach((str: string)=> all+=str+'|')
        }
        formData.Q3_tech = all;

        formData.Q12_tech = formData.Q12_tech ? await uploadFile(formData.Q12_tech) : ''; //generate link

        const isUploaded = await postSheet(formData)
        
        if(isUploaded) {
            router.push(`./success/${formData.position}`)
            console.log("form submitted", formData)
        }
        setIsSubmitted(false)
    }

    const postSheet = async (formData: DevSheetData): Promise<boolean> => {
        const url = '/api/v1/recruitment/dev';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        
            const data: any = await response.json();
            
            if (response.status != 201) {
                toast.error(data.msg || "Something went wrong");
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                toast.success("Submitted successfully")
            }
            
            console.log(data);
            return true;
        } catch (error) {
            setIsSubmitted(false)
            toast.error("Try submitting again");
            return false;
        }
    };


    function refreshPage(): void {
        router.push("/recruitment");
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
                <div className='flex flex-row bg-white shadow-md rounded-b-sm'>
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
                            <p className='pt-2 pb-3 text-sm font-semibold sm:text-sm text-red-600'>* Indicates required question</p>
                        </div>
                    </div>
                </div>

                <div className='bg-white shadow-md rounded-lg mt-4'>
                    <div className='bg-purple-800 rounded-t-lg py-3 px-8'>
                        <p className={poppins.className + ' text-lg font-normal text-white'}>
                            Developer Section
                        </p>
                    </div>
                    <div className="py-5 px-6 sm:px-6 lg:px-8 flex flex-col">
                        <div className={poppins.className + ' text-sm'}>
                            {"Answer all questions as truthfully as possible so that we can help you better. A developers ability to adapt to the needs of a project depends very much on their awareness of the world around them and their ability to understand what will work and if it won't, why it will not. We want to figure out what level you are at. "}
                        </div>
                    </div>
                </div>


                <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>

                    <CommonFields register = {register} />

                    <div className='flex flex-row bg-white shadow-md rounded-lg mb-4'>
                        {/* <div className='bg-blue-400 w-1 lg:w-1.5 rounded-l-3xl'></div> */}
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <label htmlFor="Q1_Q2_tech" className={poppins.className + " text-gray-900 text-md mb-4"}>
                                What programming languages do you know/ use extensively?
                                <span className='text-md text-red-600 pl-1'>*</span>
                            </label>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="JS/TS" type='checkbox' id="Q1_tech" {...register("Q1_tech")} /><span className='w-2'></span>JavaScript/TypeScript
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="Dart" type='checkbox' id="Q1_tech" {...register("Q1_tech")} /><span className='w-2'></span>Dart
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="Java/Kotlin" type='checkbox' id="Q1_tech" {...register("Q1_tech")} /><span className='w-2'></span>Java/Kotlin
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="Python" type='checkbox' id="Q1_tech" {...register("Q1_tech")} /><span className='w-2'></span>Python
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="HTML+CSS" type='checkbox' id="Q1_tech" {...register("Q1_tech")} /><span className='w-2'></span>HTML + CSS
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="Other" type='checkbox' id="Q1_tech" {...register("Q1_tech")} /><span className='w-2'></span>Other: (Fill Below)
                            </div>
                            <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Your Answer" type='text' id='Q2_tech' {...register("Q2_tech")} />
                        </div>
                    </div>

                    <div className='flex flex-row bg-white shadow-md rounded-lg mb-4'>
                        {/* <div className='bg-blue-400 w-1 lg:w-1.5 rounded-l-3xl'></div> */}
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <label htmlFor="Q3_Q4_tech" className={poppins.className + " text-gray-900 text-md mb-4"}>
                                Which technology are you familiar with?
                            <span className='text-md text-red-600 pl-1'>*</span>
                            </label>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="MongoDB" type='checkbox' id="Q3_tech" {...register("Q3_tech")} /><span className='w-2'></span>MongoDB
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="Flutter" type='checkbox' id="Q3_tech" {...register("Q3_tech")} /><span className='w-2'></span>Flutter
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="Firebase" type='checkbox' id="Q3_tech" {...register("Q3_tech")} /><span className='w-2'></span>Firebase
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="Node" type='checkbox' id="Q3_tech" {...register("Q3_tech")} /><span className='w-2'></span>Node
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="Express" type='checkbox' id="Q3_tech" {...register("Q3_tech")} /><span className='w-2'></span>Express
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="NextJS" type='checkbox' id="Q3_tech" {...register("Q3_tech")} /><span className='w-2'></span>Next JS
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="ReactJS" type='checkbox' id="Q3_tech" {...register("Q3_tech")} /><span className='w-2'></span>React JS
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="AI/ML" type='checkbox' id="Q3_tech" {...register("Q3_tech")} /><span className='w-2'></span>AI/ML
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="Other" type='checkbox' id="Q3_tech" {...register("Q3_tech")} /><span className='w-2'></span>Other: (Fill Below)
                            </div>
                            <input className='border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400' placeholder="Your Answer" type='text' id='Q4_tech' {...register("Q4_tech")} />
                        </div>
                    </div>

                    <div className='flex flex-row bg-white shadow-md rounded-lg mb-4'>
                        {/* <div className='bg-blue-400 w-0.5 lg:w-1 rounded-l-3xl'></div> */}
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <label htmlFor="Q5_tech" className={poppins.className + " text-gray-900 text-md mb-1"}>
                                Are you familiar with Git and GitHub?
                                <span className='text-md text-red-600 pl-1'>*</span>
                            </label>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="yes" type='radio' id="Q5_tech" {...register("Q5_tech")} /><span className='w-2'></span>Yes
                            </div>
                            <div className='flex flex-row text-sm'>
                                <input className='' value="no" type='radio' id="Q5_tech" {...register("Q5_tech")} /><span className='w-2'></span>No
                            </div>
                        </div>
                    </div>
                    
                    <FormInput title='Provide your GitHub link (if available)' id='Q6_tech' isRequired={false} register={register}/>

                    <FormInput 
                        title='Which websites/applications in your opinion are the best and why?' 
                        subtitle='By best, we mean using some criteria. Efficiency of code, UI, back end, ease of use etc. all may be considered as criiteria.'
                        id='Q7_tech' 
                        isRequired={false} 
                        register={register}/>

                    <div className='flex flex-row bg-white shadow-md rounded-lg mb-4'>
                        {/* <div className='bg-blue-400 w-4 lg:w-5 rounded-l-3xl'></div> */}
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <label htmlFor="Q8_tech" className={poppins.className + " text-gray-900 text-md mb-4"}>
                                Grade your competency at coding from a scale of 1 to 5.
                            <span className='text-md text-red-600 pl-1'>*</span>
                            </label>
                            <p className={poppins.className + " text-gray-900 text-md mb-1"}>
                                Basic
                            </p>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="1" type='radio' id="Q8_tech" {...register("Q8_tech")} /><span className='w-2'></span>1
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="2" type='radio' id="Q8_tech" {...register("Q8_tech")} /><span className='w-2'></span>2
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="3" type='radio' id="Q8_tech" {...register("Q8_tech")} /><span className='w-2'></span>3
                            </div>
                            <div className='flex flex-row mb-3 text-sm'>
                                <input className='' value="4" type='radio' id="Q8_tech" {...register("Q8_tech")} /><span className='w-2'></span>4
                            </div>
                            <div className='flex flex-row mb-1 text-sm'>
                                <input className='' value="5" type='radio' id="Q8_tech" {...register("Q8_tech")} /><span className='w-2'></span>5
                            </div>
                            <p className={poppins.className + " text-gray-900 text-md"}>
                                Hacker
                            </p>
                        </div>
                    </div>

                    <FormInput 
                        title='Given the demographic in HIT, would you say a website is a better option for The HIT Times or an application? Give us your reasons for leaning either way.' 
                        id='Q9_tech' 
                        isRequired={true} 
                        register={register}/>

                    <FormInput title='Why do you like to code?' id='Q10_tech' isRequired={false} register={register}/>

                    <FormInput title='Provide link of any project if you have made.' id='Q11_tech' isRequired={false} register={register}/>

                    <FileUploader title='Upload your Resume(optional)' instruction='PPt, PDF, PNG, JPG or MS Word(MAX. 5 Mb )' id='Q12_tech' register={register}/>

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
                                <button className="bg-purple-500 py-1 px-5 rounded-md text-white">Submit</button>
                                <div onClick={refreshPage} className={poppins.className +' text-purple-800 text-md hover:cursor-pointer'}>Clear form</div>
                            </div>
                    }
                </form>
            </div>
        </div>
    )
}