import mongoose from "mongoose";

type Notice = {
    _id: mongoose.Types.ObjectId;
    noticeTitle: string;
    noticeLink: string
    createdAt: Date;
    updatedAt: Date;
}

const noticeSchema = new mongoose.Schema<Notice>(
    {
        noticeTitle: {
            type: String,
            required: true
        },
        noticeLink: {
            type: String,
            required: true
        },
        
    },
    { timestamps: true },
);

const NoticeModel = mongoose.models.Notices || mongoose.model<Notice>("Notices", noticeSchema);

export default NoticeModel