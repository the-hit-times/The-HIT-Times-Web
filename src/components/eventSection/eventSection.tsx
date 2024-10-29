"use client"
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { signIn, useSession } from "next-auth/react";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});



function EventSection() {
    const eventNames: string[] = ["Recruitment Form 2025",]
    const { data: session } = useSession(); 

    if(session){
        if (eventNames.length != 0) {
            return (
                <div>
                    <header className={poppins.className + " text-lg text-black font-semibold"}>
                    </header>
                    <div className='flex flex-row gap-3 mb-auto'>
                        <Link href={'/recruitment'} >
                        <button
                            className='bg-purple-500 text-white px-6 py-1 rounded-2xl shadow-black shadow-sm hover:bg-orange-600'
                        >
                            {eventNames[0]}
                        </button>
                        </Link>
                    </div>
                </div>
            )
        }
    }
    //else{return(signIn())}
}

export default EventSection
