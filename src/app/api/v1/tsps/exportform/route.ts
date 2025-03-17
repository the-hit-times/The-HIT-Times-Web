import dbConnect from "@/lib/dbConnect";
import TspModel from "@/models/TspModel";
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
    const formData = await TspModel.find({});
    const csvFields = [
      { label: "ID", value: "id" },
      { label: "Full Name", value: "name" },
      { label: "Roll Number", value: "roll" },
      { label: "Email Address", value: "email" },
      { label: "Phone Number", value: "phone" },
      { label: "Department", value: "dept" },
      { label: "Year", value: "year" },
      { label: "Content Writing", value: "writing" },
      { label: "Digital Art", value: "drawing" },
      { label: "Graphic Designing", value: "designing" },
      { label: "Video Editing", value: "videoEditing" },
      { label: "Web Development", value: "technology" },
      { label: "Photography", value: "photography" },
      { label: "Suggestions", value: "suggestion" },
    ];

    const csvParser = new Parser({ fields: csvFields });
    const csvData = csvParser.parse(formData);

    const fileName = "tspFormData_2024.csv";
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
