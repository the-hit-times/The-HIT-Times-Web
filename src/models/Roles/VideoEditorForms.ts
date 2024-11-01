// File: src/models/Roles/VideoEditorForms.ts

import mongoose from "mongoose";

type videoEditorData = {
    _id: mongoose.Types.ObjectId;

    // Common Fields
    name: string;
    roll: string;
    position: string;
    other_position: string;
    dept: string;
    year: string;
    phone: string;
    email: string;
    hobbies: string;
    qualities: string;
    ragging_opinion: string;
    why_join_THT: string;

    // Video Editor Specific Questions
    Q5_ve: string;             // What software do you use?
    Q5_ve_other: string;         // other softwares
    Q6_ve: string;               // What is your favourite editing style/effect in video editing?
    Q7_ve: string;               // What are your favourite movie scenes and why?
    Q8_ve: string;               // What videos do you suggest we can start creating to put up on our Instagram page?
    Q9_ve: string;               // Who is your favourite YouTuber or YouTube channel and why?
    Q10_ve: string;              // Do you hold any experience in short film making or video making? If yes, specify the software you use for final editing and production.
    Q11_ve: string;              // If you want to share any of your original works, feel free to share the link here

    createdAt: Date;
    updatedAt: Date;
}

const videoEditorSchema = new mongoose.Schema<videoEditorData>(
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
        Q5_ve: {
            type: String,
            required: true
        },
        Q5_ve_other: {
            type: String,
            required: false
        },
        Q6_ve: {
            type: String,
            required: true
        },
        Q7_ve: {
            type: String,
            required: true
        },
        Q8_ve: {
            type: String,
            required: false
        },
        Q9_ve: {
            type: String,
            required: false
        },
        Q10_ve: {
            type: String,
            required: false
        },
        Q11_ve: {
            type: String,
            required: false
        },
    },
    { timestamps: true },
);

const VideoEditorForms = mongoose.models.VideoEditorForms || mongoose.model<videoEditorData>("VideoEditorForms", videoEditorSchema);

export default VideoEditorForms;