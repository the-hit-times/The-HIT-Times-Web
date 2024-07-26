import mongoose from "mongoose";

export interface Users {
  userId: string;
  email: string;
  role: "admin" | "user";
}

const UserSchema = new mongoose.Schema<Users>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true },
);

export default mongoose.models.User ||
  mongoose.model<Users>("User", UserSchema);
