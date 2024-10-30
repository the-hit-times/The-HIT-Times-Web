import dbConnect from "@/lib/dbConnect";
import ContentWriterForms from "@/models/Roles/ContentWriterForm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try {
        await dbConnect();
        const forms = await ContentWriterForms.find().exec();
        return NextResponse.json([...forms]);
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            msg: error.message,
        }, {
            status: 400
        });
    }
}

export async function POST(request: NextRequest){
    try {
        await dbConnect();
        const  data = await request.json();
        console.log(data);

        // Check if email already exists
        const existingForm = await ContentWriterForms.findOne({ email: data.email });
        if (existingForm) {
            console.log("Email already exists:", data.email);
            return NextResponse.json(
                {
                    success: false,
                    msg: "A form with this email already exists. "
                },
                { status: 400 }
            );
        }

        const form = await ContentWriterForms.create(data);
        return NextResponse.json({
            success: true
        }, {
            status: 201
        })
    } catch (error: any){
        return NextResponse.json({
            success: false,
            msg: error.message,
        }, {
            status: 400
        })
    }
}


export async function DELETE(request:NextRequest){
    try {
        await dbConnect();
        const data = await request.json();
        const id = data._id;
        if(!id){
            return NextResponse.json({success: false, msg: 'ID is requied' }, {status: 400});
        }
        const result = await ContentWriterForms.findByIdAndDelete(id);
        if(!result){
            return NextResponse.json({ success: false,msg: 'Form not found'},{ status: 404})
        }
        return NextResponse.json({
            success: true
        }, {
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            msg: error.message,
        },{
            status: 400
        })
    }
}