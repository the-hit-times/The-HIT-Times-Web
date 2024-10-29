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

        //specific fields for developer
      { label: "Programming languages", value: "Q1_tech" },
      { label: "Other Programming languages", value: "Q2_tech" },
      { label: "Technologies", value: "Q3_tech" },
      { label: "Other Technologies", value: "Q4_tech" },
      { label: "Familiar with Git and GitHub", value: "Q5_tech" },
      { label: "GitHub link", value: "Q6_tech" },
      { label: "Opinions on best Website/Application", value: "Q7_tech" },
      { label: "Coding competency(1 to 5)", value: "Q8_tech" },
      { label: "A website is a better option for THT or an application", value: "Q9_tech" },
      { label: "Why do you like to code", value: "Q10_tech" },
      { label: "Project link", value: "Q11_tech" },
      { label: "Resume", value: "Q12_tech" },
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
