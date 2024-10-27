import dbConnect from "@/lib/dbConnect";
import DeveloperForms from "@/models/Roles/DeveloperForms";
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
    const formData = await DeveloperForms.find({});
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

        //according to role
      { label: "Programming languages", value: "Q1_tech" },
      { label: "Q2_tech", value: "Q2_tech" },
      { label: "Q3_tech", value: "Q3_tech" },
      { label: "Q4_tech", value: "Q4_tech" },
      { label: "Q5_tech", value: "Q5_tech" },
      { label: "Q6_tech", value: "Q6_tech" },
      { label: "Q7_tech", value: "Q7_tech" },
      { label: "Q8_tech", value: "Q8_tech" },
      { label: "Q9_tech", value: "Q9_tech" },
      { label: "Q10_tech", value: "Q10_tech" },
      { label: "Q11_tech", value: "Q11_tech" },
      { label: "Q12_tech", value: "Q12_tech" },
    ];

    const csvParser = new Parser({ fields: csvFields });
    const csvData = csvParser.parse(formData);

    const fileName = "developers_form_Data_2024.csv";
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
