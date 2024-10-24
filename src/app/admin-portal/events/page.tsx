"use client"
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { IBM_Plex_Serif, Nunito_Sans, Poppins } from "next/font/google";
import Link from "next/link";

const formUrl = "/api/v1/tsps/exportform";

const ibmPlexSerif = IBM_Plex_Serif({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
    subsets: ["latin"],
    weight: ["200", "300", "400", "600", "700", "800", "900"],
});


const EventsPage = () => {

    function publishTSP(): void {
        
    }

    function removeTSP(): void {
        
    }


    return (
        <div>
            <div className="my-5">
                <h2 className={ibmPlexSerif.className + " text-zinc-800 text-5xl font-semibold py-8"}>Control event forms</h2>
                <div className="grid grid-flow-row grid-cols-2 gap-4">

                    <button
                        onClick={publishTSP}
                        className={
                            nunitoSans.className +
                            " bg-white rounded-lg py-8 text-3xl font-bold text-center"
                        }
                    >
                        Publish TSP-form
                    </button>

                    <button
                        onClick={removeTSP}
                        className={
                            nunitoSans.className +
                            " bg-white rounded-lg py-8 text-3xl font-bold text-center"
                        }
                    >
                        Remove TSP-form
                    </button>
                </div>
            </div>
            <Link href={formUrl}>
                <button>
                    <span className="flex flex-row bg-slate-200 p-5 rounded-xl mb-96">
                        <div className={poppins.className +
                            " text-xl font-bold text-emerald-500 text-center pr-2"
                        }>
                            Submitted data
                        </div>
                        <div>
                            <ArrowDownCircleIcon width={30} className="text-emerald-500" />
                        </div>
                    </span>
                </button>
            </Link>
        </div>
    )
}

export default EventsPage