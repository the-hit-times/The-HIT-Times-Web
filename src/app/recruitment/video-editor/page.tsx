// File: src/app/recruitment/video-editor/page.tsx

"use client";
import CommonFields from '@/components/formcomponents/CommonFields';
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

type VeSheetData = {
    name: string;
    roll: string;
    position: string;
    other_position: string;
    dept: string;
    year: string;
    phone: string;
    email: string;

    Q5_ve: any;           // What software do you use?
    Q5_ve_other: string;  //other softwares
    Q6_ve: string;        // What is your favourite editing style/effect in video editing?
    Q7_ve: string;        // What are your favourite movie scenes and why?
    Q8_ve: string;        // What videos do you suggest we can start creating to put up on our Instagram page?
    Q9_ve: string;        // Who is your favourite YouTuber or YouTube channel and why?
    Q10_ve: string;       // Do you hold any experience in short film making or video making? If yes, specify the software you use for final editing and production.
    Q11_ve: string;       // If you want to share any of your original works, feel free to share the link here
};

// type VeSheetDataToSend = Omit<VeSheetData, 'Q5_ve'> & {
//     Q5_ve: string; // Convert array to string
// };

export default function VeForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<VeSheetData>({
        defaultValues: {
            Q5_ve: [],
        }
    });

    // const watchedQ5_ve = watch("Q5_ve");

    const onSubmit = async (formData: VeSheetData) => {
        setIsSubmitted(true);

        // Set common fields
        formData.name = searchParams.get('name') || '';
        formData.roll = searchParams.get('roll') || '';
        formData.position = "video-editor";
        formData.other_position = searchParams.get('other') || '';

        // Convert Q5_ve array to string
        let all="|";
        if(formData.Q5_ve){
            (formData.Q5_ve).forEach((str: string)=> all+=str+'|')
        }
        formData.Q5_ve = all;

        // Prepare data to send to backend
        // const dataToSend: VeSheetDataToSend = {
        //     ...formData,
        //     Q5_ve: Q5_ve_string,
        //     Q11_ve: formData.Q11_ve || '',
        // };

        console.log("Data to send to backend:", formData);

        // Post form data
        const isUploaded = await postSheet(formData);

        if (isUploaded) {
            console.log("Form submitted", formData);
        }
        setIsSubmitted(false);
    };

    const postSheet = async (formData: VeSheetData): Promise<boolean> => {
        const url = '/api/v1/recruitment/video-editor';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (!response.ok) {
                toast.error(responseData.msg || "Something went wrong");
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                toast.success("Submitted successfully");
            }

            console.log("Response from backend:", responseData);
            return true;
        } catch (error: any) {
            setIsSubmitted(false);
            toast.error(error.message || "Try submitting again");
            return false;
        }
    };

    const refreshPage = (): void => {
        router.push("/recruitment");
        // router.push("./common");
        toast.success("Kindly Fill Again");
    };

    // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = event.target.value;
    //     const currentValues = getValues("Q5_ve") || [];
    //     const updatedValues = event.target.checked
    //         ? [...currentValues, value]
    //         : currentValues.filter((item) => item !== value);

    //     setValue("Q5_ve", updatedValues, { shouldValidate: true });
    // };

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
                <div className="h-2 lg:h-3 w-full bg-purple-950"></div>
                <div className="flex flex-row bg-white shadow-md rounded-b-sm">
                    <div className="pt-3 px-4 sm:px-6 lg:px-8">
                        <header>
                            <div className={poppins.className + ' text-3xl lg:text-4xl font-medium text-black'}>
                                Recruitment Form 2K25
                            </div>
                        </header>
                        <div className="h-0.5 lg:h-1 mt-2 bg-purple-800"></div>
                        <div>
                            <p className="py-4 text-xs sm:text-sm">
                                Carefully read each and every description under the sections and take your time to tell us about yourself, it will help us know you better. Some sections have a lot of questions and not all of them are marked as required but we will be giving preference to the people who show the tenacity to answer all questions. Use of proper grammar and form is expected (Spelling mistakes will be pardoned but not SMS lingo). If your replies are abusive or do not meet minimum standards of acceptability, your entry is liable to be disqualified.
                            </p>
                            <hr />
                            <p className="pt-2 pb-3 text-sm font-semibold sm:text-sm text-red-600">* Indicates required question</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg mt-4">
                    <div className="bg-purple-800 rounded-t-lg py-3 px-8">
                        <p className={poppins.className + ' text-lg font-normal text-white'}>
                            Video Editor Section
                        </p>
                    </div>
                    <div className="py-5 px-6 sm:px-6 lg:px-8 flex flex-col">
                        <p className={poppins.className + ' text-sm'}>
                            {"Answer all questions as truthfully as possible so that we can help you better. A video editor's ability to adapt to the needs of a project depends very much on their awareness of the world around them and their ability to understand what will work and if it won't, why it will not. We want to figure out what level you are at."}
                        </p>
                    </div>
                </div>

                <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <CommonFields register={register} />

                    {/* Q5: What software do you use? */}
                    <div className="flex flex-row bg-white shadow-md rounded-lg mb-4">
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <span className={poppins.className + " text-gray-900 text-md mb-4"}>
                                What software do you use?
                                <span className="text-md text-red-600 pl-1">*</span>
                            </span>
                            {["Adobe Premiere Pro", "Filmora Video Editor", "Adobe After Effects", "Da Vinci Resolve", "Other"].map((software, index) => (
                                <label key={index} htmlFor={`Q5_ve`} className="flex items-center mb-3 text-sm">
                                    <input
                                        className="form-checkbox h-4 w-4 text-purple-600"
                                        value={software}
                                        type="checkbox"
                                        id={`Q5_ve_${index}`}
                                        {...register("Q5_ve")}
                                    />
                                    <span className="ml-2">{software}</span>
                                </label>
                            ))}
                            <label htmlFor="Q5_ve_other" className="text-gray-700 text-sm mb-1">
                                Other: (Please specify)
                            </label>
                            <input
                                className="border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400"
                                placeholder="Your Answer"
                                type="text"
                                id="Q5_ve_other"
                                {...register("Q5_ve_other")}
                            />
                            {errors.Q5_ve && <span className="text-red-500 text-xs">Please select at least one software.</span>}
                        </div>
                    </div>

                    {/* Q6: Favourite editing style/effect */}
                    <div className="flex flex-row bg-white shadow-md rounded-lg mb-4">
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <label htmlFor="Q6_ve" className={poppins.className + " text-gray-900 text-md mb-4"}>
                                What is your favourite editing style/effect in video editing?
                                <span className="text-md text-red-600 pl-1">*</span>
                            </label>
                            <input
                                className="border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400"
                                placeholder="Your Answer"
                                type="text"
                                id="Q6_ve"
                                {...register("Q6_ve", { required: true })}
                            />
                            {errors.Q6_ve && <span className="text-red-500 text-xs">This field is required.</span>}
                        </div>
                    </div>

                    {/* Q7: Favourite movie scenes */}
                    <div className="flex flex-row bg-white shadow-md rounded-lg mb-4">
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <label htmlFor="Q7_ve" className={poppins.className + " text-gray-900 text-md mb-4"}>
                                What are your favourite movie scenes and why?
                                <span className="text-md text-red-600 pl-1">*</span>
                            </label>
                            <input
                                className="border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400"
                                placeholder="Your Answer"
                                type="text"
                                id="Q7_ve"
                                {...register("Q7_ve", { required: true })}
                            />
                            {errors.Q7_ve && <span className="text-red-500 text-xs">This field is required.</span>}
                        </div>
                    </div>

                    {/* Q8: Suggested videos for Instagram */}
                    <div className="flex flex-row bg-white shadow-md rounded-lg mb-4">
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <label htmlFor="Q8_ve" className={poppins.className + " text-gray-900 text-md mb-4"}>
                                What videos do you suggest we can start creating to put up on our Instagram page?
                                <span className="text-md text-red-600 pl-1">*</span>
                            </label>
                            <textarea
                                className="border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 py-1 px-2 focus:placeholder-purple-400"
                                placeholder="Your Suggestions"
                                id="Q8_ve"
                                {...register("Q8_ve")}
                            />
                            {errors.Q8_ve && <span className="text-red-500 text-xs">This field is required.</span>}
                        </div>
                    </div>

                    {/* Q9: Favourite YouTuber or channel */}
                    <div className="flex flex-row bg-white shadow-md rounded-lg mb-4">
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <label htmlFor="Q9_ve" className={poppins.className + " text-gray-900 text-md mb-4"}>
                                Who is your favourite YouTuber or YouTube channel and why?
                                <span className="text-md text-red-600 pl-1">*</span>
                            </label>
                            <input
                                className="border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400"
                                placeholder="Your Answer"
                                type="text"
                                id="Q9_ve"
                                {...register("Q9_ve", { required: true })}
                            />
                            {errors.Q9_ve && <span className="text-red-500 text-xs">This field is required.</span>}
                        </div>
                    </div>

                    {/* Q10: Experience in short film/video making */}
                    <div className="flex flex-row bg-white shadow-md rounded-lg mb-4">
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <label htmlFor="Q10_ve" className={poppins.className + " text-gray-900 text-md mb-4"}>
                                Do you hold any experience in short film making or video making? If yes, specify the software you use for final editing and production.
                                <span className="text-md text-red-600 pl-1">*</span>
                            </label>
                            <textarea
                                className="border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 py-1 px-2 focus:placeholder-purple-400"
                                placeholder="Your Experience and Software"
                                id="Q10_ve"
                                {...register("Q10_ve", { required: true })}
                            />
                            {errors.Q10_ve && <span className="text-red-500 text-xs">This field is required.</span>}
                        </div>
                    </div>

                    {/* Q11: Upload Original Works */}
                    <div className="flex flex-row bg-white shadow-md rounded-lg mb-4">
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <label htmlFor="Q11_ve" className={poppins.className + " text-gray-900 text-md mb-4"}>
                                If you want to share any of your original works, feel free to share the link here.
                            </label>
                            <input
                                className="border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400"
                                placeholder="Your Video Link"
                                type="url"
                                id="Q11_ve"
                                {...register("Q11_ve")}
                            />
                        </div>
                    </div>

                    {/* Submit and Loading State */}
                    {
                        isSubmitted ?
                            <div className="flex flex-row justify-start pb-6">
                                <div className="bg-purple-500 py-1 px-8 rounded-lg">
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-6 h-6 text-purple-400 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="flex flex-row justify-between pb-6">
                                <button
                                    className="bg-purple-500 py-1 px-5 rounded-md text-white"
                                    type="submit"
                                    disabled={isSubmitted}
                                >
                                    Submit
                                </button>
                                <div
                                    onClick={refreshPage}
                                    className={poppins.className + ' text-purple-800 text-md hover:cursor-pointer'}
                                    role="button"
                                    tabIndex={0}
                                    onKeyPress={(e) => { if (e.key === 'Enter') refreshPage(); }}
                                >
                                    Clear form
                                </div>
                            </div>
                    }
                </form>
            </div>
        </div>
    )
}