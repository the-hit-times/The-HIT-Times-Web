import dbConnect from "@/lib/dbConnect";
import CartoonistForms from "@/models/Roles/CartoonistForms";
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
    const formData = await CartoonistForms.find({});
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
      { label: "Fav Anime/Cartoon/comic", value: "Q1_cartoon" },
      { label: "Graph theory Opinion", value: "Q2_cartoon" },
      { label: "Suggestions in the paper", value: "Q3_cartoon" },
      { label: "Why like making Art", value: "Q4_cartoon" },
      { label: "Like cartooning or Doodling", value: "Q5_cartoon" },
      { label: "ArtWork_1", value: "Q6_cartoon" },
      { label: "ArtWork_2", value: "Q7_cartoon" },
      { label: "ArtWork_3", value: "Q8_cartoon" },
      { label: "ArtWork_4", value: "Q9_cartoon" },
      { label: "ArtWork_5", value: "Q10_cartoon" },
    ];

    const csvParser = new Parser({ fields: csvFields });
    const csvData = csvParser.parse(formData);

    const fileName = "cartoonist_form_Data_2024.csv";
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
