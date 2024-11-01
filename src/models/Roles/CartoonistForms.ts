import mongoose from "mongoose";

type cartoonistData = {
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

    Q1_cartoon: string              // 
    Q2_cartoon: string           // 
    Q3_cartoon: string              // 
    Q4_cartoon: string           // 
    Q5_cartoon: string           //
    Q6_cartoon: any           //  ppt/pdf/link
    Q7_cartoon: any           //  ppt/pdf/link
    Q8_cartoon: any           //  ppt/pdf/link
    Q9_cartoon: any           //  ppt/pdf/link
    Q10_cartoon: any          //  ppt/pdf/link 
    
    createdAt: Date
    updatedAt: Date

}

const cartoonistSchema = new mongoose.Schema<cartoonistData>(
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
            required: false
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
            required: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
            unique: true,
            index: true
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
        Q1_cartoon: {
            type: String,
        },
        Q2_cartoon: {
            type: String,
        },
        Q3_cartoon: {
            type: String,
        },
        Q4_cartoon: {
            type: String,
        },
        Q5_cartoon: {
            type: String,
        },
        Q6_cartoon: {
            type: String,
        },
        Q7_cartoon: {
            type: String,
        },
        Q8_cartoon: {
            type: String,
        },
        Q9_cartoon: {
            type: String,
        },
        Q10_cartoon: {
            type: String,
        },

    },
    { timestamps: true },
);

const CartoonistForms = mongoose.models.Cartoonists || mongoose.model<cartoonistData>("Cartoonists", cartoonistSchema);

export default CartoonistForms