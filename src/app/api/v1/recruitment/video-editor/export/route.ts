    // File: src/app/api/v1/recruitment/video-editor/export/route.ts

import dbConnect from "@/lib/dbConnect";
import VideoEditorForms from "@/models/Roles/VideoEditorForms";
import { Parser } from "@json2csv/plainjs";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


export async function GET(request: NextRequest) {
        const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        });

        if (token === null || token?.role !== "admin") {
        return Response.json(
            { success: false, msg: "Unauthorized" },
            { status: 401 }
        );
        }
    try {
        await dbConnect();
        const formData = await VideoEditorForms.find().lean();

        const csvFields = [
            // Common Fields
            { label: "ID", value: "_id" },
            { label: "Full Name", value: "name" },
            { label: "Roll Number", value: "roll" },
            { label: "Applied Position", value: "position" },
            { label: "Other Positions", value: "other_position" },
            { label: "Email Address", value: "email" },
            { label: "Phone Number", value: "phone" },
            { label: "Department", value: "dept" },
            { label: "Year", value: "year" },
            { label: "Hobbies", value: "hobbies" },
            { label: "Qualities", value: "qualities" },
            { label: "Opinion about Ragging", value: "ragging_opinion" },
            { label: "Why Joining THT", value: "why_join_THT" },

            // Video Editor Specific Questions
            { label: "What software do you use?", value: "Q5_ve" },
            { label: "Other editing softwares", value: "Q5_ve_other" },
            { label: "What is your favourite editing style/effect in video editing?", value: "Q6_ve" },
            { label: "What are your favourite movie scenes and why?", value: "Q7_ve" },
            { label: "What videos do you suggest we can start creating to put up on our Instagram page?", value: "Q8_ve" },
            { label: "Who is your favourite YouTuber or YouTube channel and why?", value: "Q9_ve" },
            { label: "Do you hold any experience in short film making or video making? If yes, specify the software you use for final editing and production.", value: "Q10_ve" },
            { label: "If you want to share any of your original works, feel free to share the link here", value: "Q11_ve" },
        ];

        const csvParser = new Parser({ fields: csvFields });
        const csvData = csvParser.parse(formData);

        const fileName = "video_editors_form_Data_2024.csv";
        return new NextResponse(csvData, {
            status: 200,
            headers: {
                "Content-Disposition": `attachment; filename="${fileName}"`,
                "Content-Type": "text/csv",
            },
        });
    } catch (error: any) {
        console.error("Error exporting CSV:", error);
        return NextResponse.json(
            { success: false, msg: "Internal Server Error" },
            { status: 500 }
        );
    }
}