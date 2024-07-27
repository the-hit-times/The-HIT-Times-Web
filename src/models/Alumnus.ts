import mongoose from "mongoose";

export interface Alumni {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  linkedin: string;
  session_start: number;
  session_end: number;
}

const AlumnusSchema = new mongoose.Schema<Alumni>(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    name: { type: String, required: true },
    linkedin: { type: String, default: "" },
    session_start: { type: Number, required: true },
    session_end: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Alumnus ||
  mongoose.model<Alumni>("Alumnus", AlumnusSchema);
