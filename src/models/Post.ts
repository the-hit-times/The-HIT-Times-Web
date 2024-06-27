import mongoose from "mongoose";

export interface Posts extends mongoose.Document {
  _id: string;
  title: string;
  description: string;
  body: string;
  htmlBody: string;
  link: string;
  dropdown: string;
  c_image: string;
}

const PostSchema = new mongoose.Schema<Posts>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
    htmlBody: { type: String, required: true },
    link: { type: String, required: true },
    dropdown: { type: String, required: true },
    c_image: { type: String, default: "noimage.jpg" },
  },
  { timestamps: true },
);

export default mongoose.models.Post ||
  mongoose.model<Posts>("Post", PostSchema);
