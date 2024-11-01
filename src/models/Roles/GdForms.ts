// File: src/models/Roles/GdForms.ts

import mongoose from "mongoose";

type gdData = {
    _id: mongoose.Types.ObjectId;

    // Common Fields
    name: string;              //1
    roll: string;              //2
    position: string;          //3
    other_position: string;    //4
    dept: string;              //5
    year: string;              //6
    phone: string;             //7
    email: string;             //8
    hobbies: string;           //9
    qualities: string;         //10
    ragging_opinion: string;   //11
    why_join_THT: string;      //12

    // GD Specific Questions
    Q5_gd: string;             // What editing software are you familiar with?
    Q6_gd: string;             // Comment for Other
    Q7_gd: string;             // Rating graphics designing skills (1-10)
    Q8_gd: string;             // Comfort with learning new design software (1-10)
    Q9_gd: string;             // Create designs from scratch or use online resources
    Q10_gd: string;            // Best designed brand logos, websites, apps etc and why
    Q11_gd: string;            // Feedback on The HIT Times design and formatting
    Q12_gd: string;            // Motivation to be a graphic designer
    Q13_gd: string;            // Upload original works

    createdAt: Date;
    updatedAt: Date;
}

const gdSchema = new mongoose.Schema<gdData>(
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
            required: true
            // enum: ["AEIE","Agriculture",...]
        },
        year: {
            type: String,
            required: true
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
        Q5_gd: {
            type: String,
            required: true
        },
        Q6_gd: {
            type: String,
        },
        Q7_gd: {
            type: String,
            required: true
        },
        Q8_gd: {
            type: String,
            required: true
        },
        Q9_gd: {
            type: String,
            required: true
        },
        Q10_gd: {
            type: String,
            required: true
        },
        Q11_gd: {
            type: String,
            required: false
        },
        Q12_gd: {
            type: String,
            required: true
        },
        Q13_gd: {
            type: String,
            required: false
        },
    },
    { timestamps: true },
);

const GdForms = mongoose.models.GdForms || mongoose.model<gdData>("GdForms", gdSchema);

export default GdForms;