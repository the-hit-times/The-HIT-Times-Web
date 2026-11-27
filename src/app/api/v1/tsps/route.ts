import dbConnect from "@/lib/dbConnect";
import TspModel from "@/models/TspModel";
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
        const tsps = await TspModel.find().exec();
        return NextResponse.json([...tsps]);
    } catch (error: any) {
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
        const data = await request.json();
        console.log(data);

        const existingForm = await TspModel.findOne({ email: data.email });
        if (existingForm) {
            console.log("Email already exists:", data.email);
            return NextResponse.json(
                {
                    success: false,
                    msg: "A submission with this email already exists!",
                },
                { status: 400 }
            );
        }

        const tsp = await TspModel.create(data);
        return NextResponse.json({
            success: true
        }, {
            status: 201
        });
    } catch (error: any) {

        return NextResponse.json({
            success: false,
            msg: error.message,
        }, {
            status: 400
        });
    }
}

export async function DELETE(request: NextRequest) {

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
        const data = await request.json();
        const id = data._id;
        if (!id) {
            return NextResponse.json({ success: false, msg: 'ID is required' }, { status: 400 });
        }

        const result = await TspModel.findByIdAndDelete(id);
        if (!result) {
            return NextResponse.json({ success: false, msg: 'TSP not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true
        }, {
            status: 200
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            msg: error.message,
        }, {
            status: 400
        });
    }
}

