
import RealtedPostIcons from "@/components/post-components/realtedPostIcons";
import Image from "next/image";

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
    let relatedPosts:Posts[] = await posts.filter((post) => (post.title==postinfo[0]?.title)&&(post._id!=postinfo[0]?._id))
    const extraPosts:Posts[] =await posts.filter((post) => (post._id!=postinfo[0]?._id)&&(post.title!=relatedPosts[0]?.title));
    relatedPosts = relatedPosts.concat(extraPosts);


    return (
        <div className="bg-gray-100 min-h-screen">
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 lg:py-12">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6 text-3xl font-bold">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                            {postinfo[0].title}
                        </span>
                    </div>
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-xl font-medium leading-6 text-gray-900">{postinfo[0].description}</h3>
                        <br/>
                        {
                        <Image
                            src={postinfo[0].link}
                            alt="image"
                            width={1200}
                            height={400}
                            className="rounded-md border-2 border-transparent bg-gradient-to-r from-pink-500 to-violet-500"/>
                        }
                        <div className="px-4 py-5 sm:px-6">
                            <p className="text-sm text-gray-500">{postinfo[0].body}</p>
                        </div>
                    </div>
                    <div className="sticky top-full">
                        <hr/>
                        <RealtedPostIcons/>
                    </div>
                </div>
                <div className="mt-8">
                <h3 className="text-sm underline font-medium leading-6 text-red-600">Related posts</h3>
                </div>
                <div className="mt-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <Image
                                    src={relatedPosts[0]?.link}
                                    alt="loading image"
                                    width={300}
                                    height={150}
                                    className="rounded-md"
                                />
                                <h5 className="text-md font-medium leading-6 text-gray-600">{relatedPosts[0]?.description}</h5>
                            </div>
                            <div className="sticky top-full">
                                <hr/>
                                <RealtedPostIcons/>
                            </div>
                        </div>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <Image
                                    src={relatedPosts[1]?.link}
                                    alt="loading image"
                                    width={300}
                                    height={150}
                                    className="rounded-md"
                                />
                                <h5 className="text-md font-medium leading-6 text-gray-600">{relatedPosts[1]?.description}</h5>
                            </div>
                            <div className="sticky top-full">
                                <hr/>
                                <RealtedPostIcons/>
                            </div>
                        </div>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <Image
                                    src={relatedPosts[2]?.link}
                                    alt="loading image"
                                    width={300}
                                    height={150}
                                    className="rounded-md"
                                />
                                <h5 className="text-md font-medium leading-6 text-gray-600">{relatedPosts[2]?.description}</h5>
                            </div>
                            <div className="sticky top-full">
                                <hr/>
                                <RealtedPostIcons/>
                            </div>
                        </div>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <Image
                                    src={relatedPosts[3]?.link}
                                    alt="loading image"
                                    width={300}
                                    height={150}
                                    className="rounded-md"
                                />
                                <h5 className="text-md font-medium leading-6 text-gray-600">{relatedPosts[3]?.description}</h5>
                            </div>
                            <div className="sticky top-full">
                                <hr/>
                                <RealtedPostIcons/>
                            </div>
                        </div>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <Image
                                    src={relatedPosts[4]?.link}
                                    alt="loading image"
                                    width={300}
                                    height={150}
                                    className="rounded-md"
                                />
                                <h5 className="text-md font-medium leading-6 text-gray-600">{relatedPosts[4]?.description}</h5>
                            </div>
                            <div className="sticky top-full">
                                <hr/>
                                <RealtedPostIcons/>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PostInfoPage