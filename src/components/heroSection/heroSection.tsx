import RealtedPostIcons from "@/components/post-components/realtedPostIcons";
import { Posts } from "@/models/Post";
import Link from "next/link";
import { MotionDiv } from "./MotionDiv";

const HeroSection = async () => {
    const res = await fetch(
        'https://the-hit-times-web.vercel.app/api/v1/posts',
        { next: { revalidate: 20 } }
    );
    const posts: Posts[] = await res.json();

    const postBody: string = (posts[0].body.length > 520) ? posts[0].body.substring(0, 500) : posts[0].body
    const latestNotice = "Summer recess starts from 2nd July to 17th July."

    return (
        <div className="mb-16">
            <div className="pb-4 lg:mb-2">
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-1/2 lg:p-12">
                        <MotionDiv
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex justify-center">
                            <img
                                src={posts[0].link}
                                alt="image"
                                className="rounded-md lg:rounded-2xl" />
                        </MotionDiv>
                    </div>
                    <div className="w-full p-2 lg:w-1/2 lg:p-12 my-auto">
                        <div className="flex flex-col">
                            <div className="flex flex-row items-center justify-between">
                                <MotionDiv
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 1 }}
                                    className="pb-8 pt-8 font-extrabold text-md text-red-600 tracking-tight">Featured</MotionDiv>
                                <MotionDiv 
                                    initial={{ y: -100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 2.5 }}>
                                    <RealtedPostIcons />
                                </MotionDiv>
                            </div>
                            <MotionDiv
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.5 }}
                                className="text-4xl tracking-tight font-serif">{posts[0].description}</MotionDiv>
                            <MotionDiv
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 2 }}
                                className="my-2 max-w-xl py-6 font-light">{postBody}...
                                <Link href={"/posts/" + posts[0]._id} className="underline text-blue-700">Read More</Link>
                            </MotionDiv>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-3 px-3 w-full bg-red-600 flex items-center justify-center">
                <h1 className="bg-white text-center text-red-600 font-semibold py-3 px-5 rounded-md">Latest Notice</h1>
                <p className="text-white font-sans ml-3 lg:ml-6">{latestNotice}
                    <Link href={""} className="underline text-sky-200">Learn More</Link>
                </p>
            </div>
        </div>
    )
}

export default HeroSection