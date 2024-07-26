import mongoose from "mongoose";

export interface Alumni {
  name: string;
  position: string;
  quote: string;
  p_image: string;
  session_start: number;
  session_end: number;
}

const AlumnusSchema = new mongoose.Schema<Alumni>(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    quote: { type: String, required: true },
    p_image: { type: String, default: "404.svg" },
    session_start: { type: Number, required: true },
    session_end: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Alumnus ||
  mongoose.model<Alumni>("Alumnus", AlumnusSchema);
