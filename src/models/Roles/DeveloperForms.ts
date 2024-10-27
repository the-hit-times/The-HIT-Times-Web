import mongoose from "mongoose";

type developersData = {
    _id: mongoose.Types.ObjectId

    name: string              //1
    roll: string              //2
    position: string          //3
    other_position: string    //4
    dept: string              //5
    year: string              //6
    phone: string             //7
    email: string             //8
    hobbies: string           //9
    qualities: string         //10
    ragging_opinion: string   //11
    why_join_THT: string      //12

    Q1_tech: string           // programming languages
    Q2_tech: string           // other programming languages
    Q3_tech: string           // technologies
    Q4_tech: string           // other technologies
    Q5_tech: string           //
    Q6_tech: string           //
    Q7_tech: string           //
    Q8_tech: string           //
    Q9_tech: string           //
    Q10_tech: string          //
    Q11_tech: string          //
    Q12_tech: any             // ppt/pdf/link
    
    createdAt: Date
    updatedAt: Date

}

const developerSchema = new mongoose.Schema<developersData>(
    {
        name: {
            type: String,
            required: true
        },
        roll: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        other_position: {
            type: String,
            required: true
        },
        dept: {
            type: String,
            required: true,
            // enum: ["AEIE","Agriculture",...]
        },
        year: {
            type: String,
            required: true,
            // enum: ["1st Year", "2nd Year"]
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },

        hobbies: {
            type: String,
        },
        qualities: {
            type: String,
        },
        ragging_opinion: {
            type: String,
        },
        why_join_THT: {
            type: String,
        },
        Q1_tech: {
            type: String,
        },
        Q2_tech: {
            type: String,
        },
        Q3_tech: {
            type: String,
        },
        Q4_tech: {
            type: String,
        },
        Q5_tech: {
            type: String,
        },
        Q6_tech: {
            type: String,
        },
        Q7_tech: {
            type: String,
        },
        Q8_tech: {
            type: String,
        },
        Q9_tech: {
            type: String,
        },
        Q10_tech: {
            type: String,
        },
        Q11_tech: {
            type: String,
        },
        Q12_tech: {
            type: String,
        },
    },
    { timestamps: true },
);

const DeveloperForms = mongoose.models.Developers || mongoose.model<developersData>("Developers", developerSchema);

export default DeveloperForms