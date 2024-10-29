// File: src/app/recruitment/graphic-designer/page.tsx

"use client";
import CommonFields from '@/components/formcomponents/CommonFields';
import FormInput from '@/components/formcomponents/FormInput';
import FileUploader from '@/components/formcomponents/FileUploader';
import uploadFile from '@/lib/uploadFile';
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

type GdSheetData = {
    name: string;
    roll: string;
    position: string;
    other_position: string;
    dept: string;
    year: string;
    phone: string;
    email: string;

    Q5_gd: string[];      // Editing software as an array
    Q6_gd: string;        // Comment for Other
    Q7_gd: string;        // Rating graphics designing skills (1-10)
    Q8_gd: string;        // Comfort with learning new design software (1-10)
    Q9_gd: string;        // Create designs from scratch or use online resources
    Q10_gd: string;       // Best designed brand logos, websites, apps etc and why
    Q11_gd: string;       // Feedback on The HIT Times design and formatting
    Q12_gd: string;       // Motivation to be a graphic designer
    Q13_gd: any;          // Upload original works
};

type GdSheetDataToSend = Omit<GdSheetData, 'Q5_gd'> & {
    Q5_gd: string; // Convert array to string
};

export default function GdForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm<GdSheetData>({
        defaultValues: {
            Q5_gd: [],
        }
    });

    const watchedQ5_gd = watch("Q5_gd");

    const onSubmit = async (formData: GdSheetData) => {
        setIsSubmitted(true);

        // Set common fields
        formData.name = searchParams.get('name') || '';
        formData.roll = searchParams.get('roll') || '';
        formData.position = "graphic-designer";
        formData.other_position = searchParams.get('other') || '';

        // Convert Q5_gd array to string
        const Q5_gd_string = formData.Q5_gd?.join('|') || '';

        // Handle file upload for Q13_gd (Upload original works)
        const Q13_gd_link = formData.Q13_gd ? await uploadFile(formData.Q13_gd) : '';

        // Prepare data to send to backend
        const dataToSend: GdSheetDataToSend = {
            ...formData,
            Q5_gd: Q5_gd_string,
            Q13_gd: Q13_gd_link,
        };

        console.log("Data to send to backend:", dataToSend);

        // Post form data
        const isUploaded = await postSheet(dataToSend);

        if(isUploaded) {
            router.push(`./success/${formData.position}`)
            console.log("form submitted", formData)
        }
        setIsSubmitted(false);
    };

    const postSheet = async (formData: GdSheetDataToSend): Promise<boolean> => {
        const url = '/api/v1/recruitment/gd';
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
        toast.success("Kindly Fill Again");
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const currentValues = getValues("Q5_gd") || [];
        const updatedValues = event.target.checked
            ? [...currentValues, value]
            : currentValues.filter((item) => item !== value);

        setValue("Q5_gd", updatedValues, { shouldValidate: true });
    };

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
                            Graphic Designer Section
                        </p>
                    </div>
                    <div className="py-5 px-6 sm:px-6 lg:px-8 flex flex-col">
                        <p className={poppins.className + ' text-sm'}>
                            Answer all questions as truthfully as possible so that we can help you better. A graphic designer's ability to adapt to the needs of a project depends very much on their awareness of the world around them and their ability to understand what will work and if it won't, why it will not. We want to figure out what level you are at.
                        </p>
                    </div>
                </div>

                <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <CommonFields register={register} />

                    {/* Q5: Editing Software */}
                    <div className="flex flex-row bg-white shadow-md rounded-lg mb-4">
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <span className={poppins.className + " text-gray-900 text-md mb-4"}>
                                What editing software are you familiar with?
                                <span className="text-md text-red-600 pl-1">*</span>
                            </span>
                            {["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Figma", "Canva", "Other"].map((software, index) => (
                                <label key={index} htmlFor={`Q5_gd_${index}`} className="flex items-center mb-3 text-sm">
                                    <input
                                        className="form-checkbox h-4 w-4 text-purple-600"
                                        value={software}
                                        type="checkbox"
                                        id={`Q5_gd_${index}`}
                                        onChange={handleCheckboxChange}
                                        checked={watchedQ5_gd?.includes(software) || false}
                                    />
                                    <span className="ml-2">{software}</span>
                                </label>
                            ))}
                            <label htmlFor="Q6_gd" className="text-gray-700 text-sm mb-1">
                                Other: (Please specify)
                            </label>
                            <input
                                className="border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400"
                                placeholder="Your Answer"
                                type="text"
                                id="Q6_gd"
                                {...register("Q6_gd")}
                            />
                            {errors.Q5_gd && <span className="text-red-500 text-xs">Please select at least one editing software.</span>}
                        </div>
                    </div>

                    {/* Q7: Rating Graphics Designing Skills */}
                    <div className="flex flex-row bg-white shadow-md rounded-lg mb-4">
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <span className={poppins.className + " text-gray-900 text-md mb-1"}>
                                How do you rate your graphics designing skills?
                                <span className="text-md text-red-600 pl-1">*</span>
                            </span>
                            <div className="flex flex-col gap-2 my-3 text-sm">
                                {Array.from({ length: 10 }, (_, i) => (
                                    <label key={i} htmlFor={`Q7_gd_${i + 1}`} className="flex items-center mr-2">
                                        <input
                                            className="form-radio h-4 w-4 text-purple-600"
                                            value={(i + 1).toString()}
                                            type="radio"
                                            id={`Q7_gd_${i + 1}`}
                                            {...register("Q7_gd", { required: true })}
                                        />
                                        <span className="ml-2"></span>{i + 1}
                                    </label>
                                ))}
                            </div>
                            {errors.Q7_gd && <span className="text-red-500 text-xs">Please select a rating.</span>}
                        </div>
                    </div>

                    {/* Q8: Comfort with Learning New Design Software */}
                    <div className="flex flex-row bg-white shadow-md rounded-lg mb-4">
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <span className={poppins.className + " text-gray-900 text-md mb-1"}>
                                On a scale of 1-10, how comfortable are you with learning to use a new design software?
                                <span className="text-md text-red-600 pl-1">*</span>
                            </span>
                            <div className="flex flex-col gap-2 my-3 text-sm">
                                {Array.from({ length: 10 }, (_, i) => (
                                    <label key={i} htmlFor={`Q8_gd_${i + 1}`} className="flex items-center mr-2">
                                        <input
                                            className="form-radio h-4 w-4 text-purple-600"
                                            value={(i + 1).toString()}
                                            type="radio"
                                            id={`Q8_gd_${i + 1}`}
                                            {...register("Q8_gd", { required: true })}
                                        />
                                        <span className="ml-2"></span>{i + 1}
                                    </label>
                                ))}
                            </div>
                            {errors.Q8_gd && <span className="text-red-500 text-xs">Please select a rating.</span>}
                        </div>
                    </div>

                    {/* Q9: Create Designs from Scratch or Use Online Resources */}
                    <div className="flex flex-row bg-white shadow-md rounded-lg mb-4">
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <label htmlFor="Q9_gd" className={poppins.className + " text-gray-900 text-md mb-4"}>
                                Do you create designs from scratch or do you use online resources, and if so, from which website?
                                <span className="text-md text-red-600 pl-1">*</span>
                            </label>
                            <input
                                className="border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400"
                                placeholder="Your Answer"
                                type="text"
                                id="Q9_gd"
                                {...register("Q9_gd", { required: true })}
                            />
                            {errors.Q9_gd && <span className="text-red-500 text-xs">This field is required.</span>}
                        </div>
                    </div>

                    {/* Q10: Best Designed Brand Logos, Websites, Apps etc */}
                    <div className="flex flex-row bg-white shadow-md rounded-lg mb-4">
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <label htmlFor="Q10_gd" className={poppins.className + " text-gray-900 text-md mb-4"}>
                                In your opinion, what are some of the best designed brand logos, websites, apps etc and why?
                                <span className="text-md text-red-600 pl-1">*</span>
                            </label>
                            <p className={poppins.className + " text-gray-900 text-sm mb-4"}>
                                We want to gauge your insight and your ability to understand trends in the world, and this question will help us do it.
                            </p>
                            <input
                                className="border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400"
                                placeholder="Your Answer"
                                type="text"
                                id="Q10_gd"
                                {...register("Q10_gd", { required: true })}
                            />
                            {errors.Q10_gd && <span className="text-red-500 text-xs">This field is required.</span>}
                        </div>
                    </div>

                    {/* Q11: Feedback on The HIT Times Design and Formatting */}
                    <div className="flex flex-row bg-white shadow-md rounded-lg mb-4">
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <label htmlFor="Q11_gd" className={poppins.className + " text-gray-900 text-md mb-4"}>
                                What do you have to say about the design and formatting of The HIT Times and the media posted on the page?
                                <span className="text-md text-red-600 pl-1">*</span>
                            </label>
                            <p className={poppins.className + " text-gray-900 text-sm mb-4"}>
                                Be absolutely honest, we pride ourselves on accepting and improving with feedback. If you tell us something that you can make better, that will be a bonus point to you.
                            </p>
                            <input
                                className="border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400"
                                placeholder="Your Answer (optional)"
                                type="text"
                                id="Q11_gd"
                                {...register("Q11_gd")}
                            />
                        </div>
                    </div>

                    {/* Q12: Motivation to be a Graphic Designer */}
                    <div className="flex flex-row bg-white shadow-md rounded-lg mb-4">
                        <div className="py-5 px-6 lg:px-8 flex flex-col">
                            <label htmlFor="Q12_gd" className={poppins.className + " text-gray-900 text-md mb-4"}>
                                Tell us what motivated you to be a graphic designer
                                <span className="text-md text-red-600 pl-1">*</span>
                            </label>
                            <input
                                className="border-b border-gray-300 focus:outline-none focus:border-purple-600 focus:border-b-2 py-1 focus:placeholder-purple-400"
                                placeholder="Your Answer"
                                type="text"
                                id="Q12_gd"
                                {...register("Q12_gd", { required: true })}
                            />
                            {errors.Q12_gd && <span className="text-red-500 text-xs">This field is required.</span>}
                        </div>
                    </div>

                    {/* Q13: Upload Original Works */}
                    <FileUploader title='If you want to share any of your original works, feel free to upload it here.' id='Q13_gd' register={register} />

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
                               
                                <div onClick={refreshPage} className={poppins.className +' text-purple-800 text-md hover:cursor-pointer'}>Clear form</div>
                            </div>
                    }
                </form>
            </div>
        </div>
    )
}