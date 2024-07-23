import Link from "next/link";

interface Posts {
    _id: string;
    title: string;
    description: string;
    body: string;
    htmlBody: string;
    link: string;
    dropdown: string;
    c_image: string;
}

const PostsPage = async () => {

    const res = await fetch(
        'https://the-hit-times-web.vercel.app/api/v1/posts',
        { next: { revalidate: 60 } }
    );
    const posts: Posts[] = await res.json();

    return (
        <section className="pb-20 pt-6 pl-2 pr-2">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <ul className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {posts.map(post => <Link href={'posts/' + post._id} key={post._id}>
                        <div className="group relative">

                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                                <img
                                    src={post.link}
                                    alt="image"
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-md text-gray-900">{post.description}</h3>
                                </div>
                            </div>
                        </div>
                    </Link>)}
                </ul>
            </div>
        </section>
    )
}

export default PostsPage