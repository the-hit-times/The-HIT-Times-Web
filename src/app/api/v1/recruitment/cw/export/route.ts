import dbConnect from "@/lib/dbConnect";
import ContentWriterForms from "@/models/Roles/ContentWriterForm";
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
            { label: "Rate your English language ability(1 to 10)", value: "Q1_cw" },
            { label: "Rate your Creativity(1 to 10)", value: "Q2_cw" },
            { label: "One essay Informal/Formal", value: "Q3_cw" },
            { label: "What inspired you to start writing and why?", value: "Q4_cw" },
            { label: "Why do you think one should give importance to hobbies?", value: "Q5_cw" },
            { label: "Favorite authors and Favorite books", value: "Q6_cw" },
            { label: "A change in your perception or mentality as a whole?(Book,Movies,Series/Story line/Characterization)", value: "Q7_cw" },
            { label: "Favorite Quote", value: "Q8_cw" },
            { label: "Are you comfortable researching and writing articles on subjects you do not know very well?", value: "Q9_cw" },
            { label: "As a content writer at THT, how you can influence the atmosphere of the college?", value: "Q10_cw" },
            { label: "If you were a THT member, what new content would you suggest we publish?", value: "Q11_cw" },
            { label: "Share any of your Original Writings", value: "Q12_cw" },
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