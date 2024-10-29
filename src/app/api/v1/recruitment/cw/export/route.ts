import dbConnect from "@/lib/dbConnect";
import ContentWriterForms from "@/models/Roles/ContentWriterForm";
import { Parser } from "@json2csv/plainjs";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { lazy } from "react";


export async function GET(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });
    if (token === null || token?.role !== "admin") {
        return Response.json(
            { succes: false, msg: "Unauthorized" },
            { status: 401 }
        );
    }
    try {
        await dbConnect();
        const formData = await ContentWriterForms.find({})
        const csvFields = [
            { label: "ID", value: 'id' },
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

            //according to role
            { label: "rate your english language ability", value: "Q1_cw" },
            { label: "rate your creativityw", value: "Q2_cw" },
            { label: "one essay Informal Formal", value: "Q3_cw" },
            { label: "inspired you to start writing ", value: "Q4_cw" },
            { label: "importance to hobbies", value: "Q5_cw" },
            { label: "favourite authors and favourite books", value: "Q6_cw" },
            { label: "change in your perception or mentality(Book,Movies)", value: "Q7_cw" },
            { label: "favorite quote", value: "Q8_cw" },
            { label: "comfortable researching and writing articles", value: "Q9_cw" },
            { label: "How do you think, as a content writer", value: "Q10_cw" },
            { label: "If you were a THT member, what new content would you suggest", value: "Q11_cw" },
            { label: "share any of your original writings", value: "Q12_cw" },
        ];
        const csvParser = new Parser({ fields: csvFields });
        const csvData = csvParser.parse(formData);
    
        const fileName = "Content_Writer_form_Data_2024.csv";
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