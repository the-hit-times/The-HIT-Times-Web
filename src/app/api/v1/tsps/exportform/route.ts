import dbConnect from "@/lib/dbConnect";
import TspModel from "@/models/TspModel";
import { Parser } from '@json2csv/plainjs';
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
        let forms: any[] = [];
        const formData = await TspModel.find({});
        formData.forEach((form) => {
            const {
                id,
                name,
                roll,
                email,
                phone,
                dept,
                year,
                writing,
                drawing,
                designing,
                videoEditing,
                technology,
                photography,
                suggestion } = form;
            forms.push({
                id,
                name,
                roll,
                email,
                phone,
                dept,
                year,
                writing,
                drawing,
                designing,
                videoEditing,
                technology,
                photography,
                suggestion
            });
        })

        const csvFields = [
            'id',
            'name',
            'roll',
            'email',
            'phone',
            'dept',
            'year',
            'writing',
            'drawing',
            'designing',
            'videoEditing',
            'technology',
            'photography',
            'suggestion'
        ];

        const csvParser = new Parser({ fields: csvFields });
        const csvData = csvParser.parse(formData);
        // console.log(csvData);


        const fileName = 'tspFormData.csv';
        return new NextResponse(csvData, {
            status: 200,
            headers: {
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Content-Type': 'text/csv',
            },
        });



    } catch (error: any) {
        return NextResponse.json({
            status: 400,
        });

    }
}
