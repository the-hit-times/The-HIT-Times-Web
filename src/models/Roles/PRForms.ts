import mongoose from "mongoose";

type PRData = {
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

    Q1_pr: string             // public speaking skills(1 to 5)
    Q2_pr: string             // How will you contribute to the team as a PR?
    Q3_pr: string             // When doing PR work, what are the key features you have that will come in handy?
    Q4_pr: string             // How do you think, as a PR at THT, you can influence the atmosphere of the college?

    createdAt: Date
    updatedAt: Date

}

const prSchema = new mongoose.Schema<PRData>(
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
        Q1_pr: {
            type: String,
        },
        Q2_pr: {
            type: String,
        },
        Q3_pr: {
            type: String,
        },
        Q4_pr: {
            type: String,
        },
    },
    { timestamps: true },
);

const PRForms = mongoose.models.PublicRelations || mongoose.model<PRData>("PublicRelations", prSchema);

export default PRForms