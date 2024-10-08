"use client"
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});



function EventSection() {
    const eventNames: string[] = ["Join TSP 24-25",]

    if (eventNames.length != 0) {
        return (
            <div>
                <header className={poppins.className + " text-lg text-black font-semibold"}>
                    Events
                </header>
                <div className='flex flex-row gap-3 mb-6'>
                    <Link href={'/forms/tsp-form'} >
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

export default EventSection