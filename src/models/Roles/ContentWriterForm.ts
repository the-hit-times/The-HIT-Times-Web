import mongoose from "mongoose"

type contentwriterData = {
    _id: mongoose.Types.ObjectId

    name: string
    roll: string
    position: string
    other_position: string
    dept: string
    year: string
    phone: string
    email: string
    hobbies: string
    qualities: string
    ragging_opinion: string
    why_join_THT: string

    Q1_cw: string               
    Q2_cw: string           
    Q3_cw: any            
    Q4_cw: string          
    Q5_cw: string          
    Q6_cw: string           
    Q7_cw: string           
    Q8_cw: string          
    Q9_cw: string           
    Q10_cw: string          
    Q11_cw: string          
    Q12_cw: string
    Q13_cw: any

    createdAt: Date
    updatedAt: Date

}

const contentWriterSchema = new mongoose.Schema<contentwriterData>(
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
        Q1_cw: {
            type: String,
        },
        Q2_cw: {
            type: String,
        },
        Q3_cw: {
            type: String,
        },
        Q4_cw: {
            type: String,
        },
        Q5_cw: {
            type: String,
        },
        Q6_cw: {
            type: String,
        },
        Q7_cw: {
            type: String,
        },
        Q8_cw: {
            type: String,
        },
        Q9_cw: {
            type: String,
        },
        Q10_cw: {
            type: String,
        },
        Q11_cw: {
            type: String,
        },
        Q12_cw: {
            type: String,
        },
       
    }, {timestamps:true},
);

const ContentWriterForms = mongoose.models.ContentWriters || mongoose.model<contentwriterData>("ContentWriters",contentWriterSchema);

export default ContentWriterForms;