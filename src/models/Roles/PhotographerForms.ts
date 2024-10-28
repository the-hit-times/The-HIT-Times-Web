import mongoose from "mongoose";

type photographersData = {
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

    Q1_photo: string            //
    Q2_photo: any              // 
    Q3_photo: string              // 
    Q4_photo: string           // Experience(1 to 5)
    Q5_photo: string           // 
    Q6_photo: string              // 
    Q7_photo: string           // 
    Q8_photo: string           //
    Q9_photo: any           //  ppt/pdf/link
    Q10_photo: any           //  ppt/pdf/link
    Q11_photo: any           //  ppt/pdf/link
    Q12_photo: any           //  ppt/pdf/link
    Q13_photo: any          //  ppt/pdf/link
    
    createdAt: Date
    updatedAt: Date

}

const photographerSchema = new mongoose.Schema<photographersData>(
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
        Q1_photo: {
            type: String,
        },
        Q2_photo: {
            type: String,
        },
        Q3_photo: {
            type: String,
        },
        Q4_photo: {
            type: String,
        },
        Q5_photo: {
            type: String,
        },
        Q6_photo: {
            type: String,
        },
        Q7_photo: {
            type: String,
        },
        Q8_photo: {
            type: String,
        },
        Q9_photo: {
            type: String,
        },
        Q10_photo: {
            type: String,
        },
        Q11_photo: {
            type: String,
        },
        Q12_photo: {
            type: String,
        },
        Q13_photo: {
            type: String,
        },
    },
    { timestamps: true },
);

const PhotographerForms = mongoose.models.Photographers || mongoose.model<photographersData>("Photographers", photographerSchema);

export default PhotographerForms