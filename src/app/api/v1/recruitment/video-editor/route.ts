// File: src/app/api/v1/recruitment/video-editor/route.ts

import dbConnect from "@/lib/dbConnect";
import VideoEditorForms from "@/models/Roles/VideoEditorForms";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        console.log("Database connected successfully (GET)");
        const forms = await VideoEditorForms.find().exec();
        return NextResponse.json({ success: true, data: forms }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching forms:", error);
        return NextResponse.json({
            success: false,
            msg: error.message,
        }, {
            status: 400
        });
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        console.log("Database connected successfully (POST)");

        const data = await request.json();
        console.log("Form data received:", data);

        // Validate required fields
        const requiredFields = [
            "name",
            "roll",
            "position",
            "dept",
            "year",
            "phone",
            "email",
            "Q5_ve",
            "Q6_ve",
            "Q7_ve"
        ];

        for (const field of requiredFields) {
            if (
                !data[field] ||
                (Array.isArray(data[field]) && data[field].length === 0)
            ) {
                return NextResponse.json(
                    {
                        success: false,
                        msg: `Field ${field} is required.`,
                    },
                    { status: 400 }
                );
            }
        }

        // Check if email already exists
        const existingForm = await VideoEditorForms.findOne({ email: data.email });
        if (existingForm) {
            console.log("Email already exists:", data.email);
            return NextResponse.json(
                {
                    success: false,
                    msg: "A form with this email already exists.",
                },
                { status: 400 }
            );
        }

        const form = await VideoEditorForms.create(data);
        return NextResponse.json(
            {
                success: true,
                data: form,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error creating form:", error);
        return NextResponse.json(
            { success: false, msg: error.message },
            { status: 400 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        console.log("Database connected successfully (DELETE)");

        const data = await request.json();
        const id = data._id;
        if (!id) {
            return NextResponse.json({ success: false, msg: "ID is required" }, { status: 400 });
        }

        const result = await VideoEditorForms.findByIdAndDelete(id);
        if (!result) {
            return NextResponse.json({ success: false, msg: "Form not found" }, { status: 404 });
        }

        return NextResponse.json(
            { success: true },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error deleting form:", error);
        return NextResponse.json(
            { success: false, msg: error.message },
            { status: 400 }
        );
    }
}