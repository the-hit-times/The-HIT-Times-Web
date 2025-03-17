import dbConnect from "@/lib/dbConnect";
import TspModel from "@/models/TspModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const data = await request.json();
        console.log("Received request data:", data);

        if (!data.email) {
            return NextResponse.json(
                { success: false, msg: "Email is required!" },
                { status: 400 }
            );
        }

        const existingForm = await TspModel.findOne({ email: data.email });

        if (!existingForm) {
            console.log("Email not found:", data.email);
            return NextResponse.json(
                { success: false },
                { status: 404 }
            );
        }

        console.log("Email found, fetching details:", existingForm);

        const getInterestsNo = () => {
            let interestParams = "";
            if (existingForm?.writing === "yes") interestParams += "0";
            if (existingForm?.drawing === "yes") interestParams += "1";
            if (existingForm?.designing === "yes") interestParams += "2";
            if (existingForm?.videoEditing === "yes") interestParams += "3";
            if (existingForm?.technology === "yes") interestParams += "4";
            if (existingForm?.photography === "yes") interestParams += "5";
            return interestParams;
        };

        const interestParams = getInterestsNo();

        return NextResponse.json(
            {
                success: true,
                redirectUrl: `/forms/tsp-form/${interestParams}`,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error in API:", error);
        return NextResponse.json(
            { success: false, msg: error.message },
            { status: 500 }
        );
    }
}