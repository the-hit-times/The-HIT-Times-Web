import dbConnect from "@/lib/dbConnect";
import PRForms from "@/models/Roles/PRForms";
import { Parser } from "@json2csv/plainjs";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

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
        const formData = await PRForms.find({});
        const csvFields = [
            //common
            { label: "ID", value: "id" },
            { label: "Full Name", value: "name" },
            { label: "Roll Number", value: "roll" },
            { label: "Applied Position", value: "position" },
            { label: "Other positions", value: "other_position" },
            { label: "Email Address", value: "email" },
            { label: "Phone Number", value: "phone" },
            { label: "Department", value: "dept" },
            { label: "Year", value: "year" },
            { label: "Hobbies", value: "hobbies" },
            { label: "Ideals and Qualities", value: "qualities" },
            { label: "Opinion about Ragging", value: "ragging_opinion" },
            { label: "Why Joining THT", value: "why_join_THT" },

            //specific fields for public-relations
            { label: "Public Speaking Skills(1 to 5)", value: "Q1_pr" },
            { label: "How will you contribute to the team as a PR?", value: "Q2_pr" },
            { label: "When doing PR work, what are the key features you have that will come in handy?", value: "Q3_pr" },
            { label: "As a PR at THT, how you can influence the atmosphere of the college?", value: "Q4_pr" },
        ];

        const csvParser = new Parser({ fields: csvFields });
        const csvData = csvParser.parse(formData);

        const fileName = "PR_form_Data_2024.csv";
        return new NextResponse(csvData, {
        status: 200,
        headers: {
            "Content-Disposition": `attachment; filename="${fileName}"`,
            "Content-Type": "text/csv",
        },
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 400,
        });
    }
}
