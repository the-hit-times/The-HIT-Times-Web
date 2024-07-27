import mongoose from "mongoose";

export interface Alumni {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  linkedin: string;
  profile_image: string;
  position: string;
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
    profile_image: { type: String, default: "404.svg" },
    position: { type: String, default: "" },  
    linkedin: { type: String, default: "" },
    session_start: { type: Number, required: true },
    session_end: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Alumnus ||
  mongoose.model<Alumni>("Alumnus", AlumnusSchema);
