// File: src/app/api/v1/recruitment/gd/export/route.ts

import dbConnect from "@/lib/dbConnect";
import GdForms from "@/models/Roles/GdForms";
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
        const formData = await GdForms.find().lean();

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

            // GD Specific Questions
            { label: "What editing software are you familiar with?", value: "Q5_gd" },
            { label: "Comment for Other editing software", value: "Q6_gd" },
            { label: "Rating graphics designing skills (1-10)", value: "Q7_gd" },
            { label: "Comfort with learning new design software (1-10)", value: "Q8_gd" },
            { label: "Create designs from scratch or use online resources", value: "Q9_gd" },
            { label: "Best designed brand logos, websites, apps, etc.", value: "Q10_gd" },
            { label: "Feedback on The HIT Times design and formatting", value: "Q11_gd" },
            { label: "Motivation to be a graphic designer", value: "Q12_gd" },
            { label: "Upload original works link", value: "Q13_gd" },
        ];

        const csvParser = new Parser({ fields: csvFields });
        const csvData = csvParser.parse(formData);

        const fileName = "graphics_designers_form_Data_2024.csv";
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