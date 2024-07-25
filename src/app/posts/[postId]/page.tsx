import MainPostIcons from "@/components/post-components/mainPostIcons";
import RealtedPostIcons from "@/components/post-components/realtedPostIcons";
import Image from "next/image";
import Link from "next/link";

interface Posts {
    _id: string;
    title: string;
    description: string;
    body: string;
    link: string;
}

const PostInfoPage = async ({ params }: { params: { postId: string } }) => {

    const res = await fetch(
        'https://the-hit-times-web.vercel.app/api/v1/posts');
    const posts: Posts[] = await res.json();
    const postinfo: Posts[] = await posts.filter((post) => post._id == params.postId)
    let relatedPosts: Posts[] = await posts.filter((post) => (post.title == postinfo[0]?.title) && (post._id != postinfo[0]?._id))
    const extraPosts: Posts[] = await posts.filter((post) => (post._id != postinfo[0]?._id) && (post.title != relatedPosts[0]?.title));
    relatedPosts = relatedPosts.concat(extraPosts);


    return (
        <div className="flex flex-col items-center justify-between min-h-screen">
            <div className="absolute -z-10 w-full h-40 bg-indigo-950 sm:h-44 md:h-48 lg:h-52"></div>
            <main className="mx-4 py-8 px-4 sm:px-10 md:px-20 lg:px-32 lg:py-12">
                <h1 className="bg-transparent font-mono text-2xl text-center text-white sm:text-4xl pb-2">
                    {postinfo[0].description}
                </h1>
                <div className="bg-white shadow overflow-hidden lg:mx-16">
                    {
                        <Image
                            src={postinfo[0]?.link}
                            alt="image"
                            width={1200}
                            height={675}
                            className="max-h-[65vh]" />
                    }
                </div>
                <div className="lg:flex lg:items-center">
                    <div className="">
                        <MainPostIcons />
                    </div>
                    <div className="">
                        <div className="px-4 py-5 sm:px-6 text-3xl font-bold">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                                {postinfo[0].title}
                            </span>
                        </div>
                        <div className="px-4 py-5 sm:px-6">
                            <p className="text-sm text-gray-500">{postinfo[0].body}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-sm underline font-medium leading-6 text-red-600">Related posts</h3>
                </div>
                <div className="mt-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <Link href={relatedPosts[0]?._id}>
                                <div className="px-4 py-5 sm:px-2 sm:py-2">
                                    <div className="overflow-hidden rounded-md ">
                                        <Image
                                            src={relatedPosts[0]?.link}
                                            alt="loading image"
                                            width={500}
                                            height={150}
                                            className="hover:scale-125 hover:opacity-85 duration-1000"
                                        />
                                    </div>
                                    <h5 className="text-md font-medium leading-6 text-gray-600">{relatedPosts[0]?.description}</h5>
                                </div>
                            </Link>
                            <div className="sticky top-full">
                                <hr />
                                <RealtedPostIcons />
                            </div>
                        </div>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <Link href={relatedPosts[1]?._id}>
                                <div className="px-4 py-5 sm:px-2 sm:py-2">
                                    <div className="overflow-hidden rounded-md ">
                                        <Image
                                            src={relatedPosts[1]?.link}
                                            alt="loading image"
                                            width={500}
                                            height={150}
                                            className="hover:scale-125 hover:opacity-85 duration-1000"
                                        />
                                    </div>
                                    <h5 className="text-md font-medium leading-6 text-gray-600">{relatedPosts[1]?.description}</h5>
                                </div>
                            </Link>
                            <div className="sticky top-full">
                                <hr />
                                <RealtedPostIcons />
                            </div>
                        </div>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <Link href={relatedPosts[2]?._id}>
                                <div className="px-4 py-5 sm:px-2 sm:py-2">
                                    <div className="overflow-hidden rounded-md ">
                                        <Image
                                            src={relatedPosts[2]?.link}
                                            alt="loading image"
                                            width={500}
                                            height={150}
                                            className="hover:scale-125 hover:opacity-85 duration-1000"
                                        />
                                    </div>
                                    <h5 className="text-md font-medium leading-6 text-gray-600">{relatedPosts[2]?.description}</h5>
                                </div>
                            </Link>
                            <div className="sticky top-full">
                                <hr />
                                <RealtedPostIcons />
                            </div>
                        </div>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <Link href={relatedPosts[3]?._id}>
                                <div className="px-4 py-5 sm:px-2 sm:py-2">
                                    <div className="overflow-hidden rounded-md ">
                                        <Image
                                            src={relatedPosts[3]?.link}
                                            alt="loading image"
                                            width={500}
                                            height={150}
                                            className="hover:scale-125 hover:opacity-85 duration-1000"
                                        />
                                    </div>
                                    <h5 className="text-md font-medium leading-6 text-gray-600">{relatedPosts[3]?.description}</h5>
                                </div>
                            </Link>
                            <div className="sticky top-full">
                                <hr />
                                <RealtedPostIcons />
                            </div>
                        </div>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <Link href={relatedPosts[4]?._id}>
                                <div className="px-4 py-5 sm:px-2 sm:py-2">
                                    <div className="overflow-hidden rounded-md ">
                                        <Image
                                            src={relatedPosts[4]?.link}
                                            alt="loading image"
                                            width={500}
                                            height={150}
                                            className="hover:scale-125 hover:opacity-85 duration-1000"
                                        />
                                    </div>
                                    <h5 className="text-md font-medium leading-6 text-gray-600">{relatedPosts[4]?.description}</h5>
                                </div>
                            </Link>
                            <div className="sticky top-full">
                                <hr />
                                <RealtedPostIcons />
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default PostInfoPage