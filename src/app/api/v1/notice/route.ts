import dbConnect from "@/lib/dbConnect";
import NoticeModel from "@/models/Notices";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const notices = await NoticeModel.find().exec();
        return NextResponse.json([...notices]);
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
        console.log(data);

        const tsp = await NoticeModel.create(data);
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
        const tsp = await NoticeModel.deleteMany({});
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

