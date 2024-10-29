import dbConnect from "@/lib/dbConnect";
import PhotographerForms from "@/models/Roles/PhotographerForms";
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
    const formData = await PhotographerForms.find({});
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

        //specific fields for Photographer
      { label: "Camera model", value: "Q1_photo" },
      { label: "Softwares for Editing", value: "Q2_photo" },
      { label: "Other Softwares for Editing", value: "Q3_photo" },
      { label: "Experience(years)", value: "Q4_photo" },
      { label: "Tell us in brief what you like most about photography", value: "Q5_photo" },
      { label: "Any photographers you follow or those who inspire you.", value: "Q6_photo" },
      { label: "How do you think, as a photographer at THT, you can influence the atmosphere of the college?", value: "Q7_photo" },
      { label: "Do you hold any experience in short film making or video making? If yes, specify the software you use for final editing and production.", value: "Q8_photo" },
      { label: "photo", value: "Q9_photo" },
      { label: "photo", value: "Q10_photo" },
      { label: "photo", value: "Q11_photo" },
      { label: "photo", value: "Q12_photo" },
      { label: "photo", value: "Q13_photo" },
    ];

    const csvParser = new Parser({ fields: csvFields });
    const csvData = csvParser.parse(formData);

    const fileName = "photographers_form_Data_2025.csv";
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
