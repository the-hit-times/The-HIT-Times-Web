"use client";

import dynamic from "next/dynamic";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Game = dynamic(() => import("@/components/games/Games"), {
    ssr: false,
});

export default function GamePage() {
    return (
        <div className="relative w-full h-full">
            <Link 
                href="/" 
                className="fixed top-4 left-4 z-50 flex items-center gap-2 rounded-md bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-black/80"
            >
                <ArrowLeft className="h-4 w-4" />
                Exit
            </Link>
            <Game />
        </div>
    );
}