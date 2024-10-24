import mongoose from "mongoose";

type Tsp = {
    _id: mongoose.Types.ObjectId;
    name: string
    roll: string
    email: string
    phone: string
    dept: string
    year: string
    writing: string
    drawing: string
    designing: string
    videoEditing: string
    technology: string
    photography: string
    suggestion: string
    createdAt: Date;
    updatedAt: Date;
}

const TspSchema = new mongoose.Schema<Tsp>(
    {
        name: {
            type: String,
            required: true
        },
        roll: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
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
            enum: ["1st Year", "2nd Year"]
        },
        writing: {
            type: String,
        },
        drawing: {
            type: String,
        },
        designing: {
            type: String,
        },
        videoEditing: {
            type: String,
        },
        technology: {
            type: String,
        },
        photography: {
            type: String,
        },
        suggestion: {
            type: String,
        },
    },
    { timestamps: true },
);

const TspModel = mongoose.models.Tsp || mongoose.model<Tsp>("Tsp", TspSchema);

export default TspModel