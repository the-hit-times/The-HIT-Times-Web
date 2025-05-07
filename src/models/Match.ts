import mongoose from "mongoose";

// Define the Timeline interface
export interface Timeline {
  firebase_timeline_id: string;
  timeline_date: Date;
  msgHtml: string;
}

// Define the MatchPosts interface with team_name included
export interface MatchPosts {
  _id: mongoose.Schema.Types.ObjectId;
  firebase_match_id: string;
  team1: {
    team_code: string;
    team_score: string;
    team_name: string; // Added team_name
    team_penalty?: string; // Optional, defaults to "0"
  };
  team2: {
    team_code: string;
    team_score: string;
    team_name: string; // Added team_name
    team_penalty?: string; // Optional, defaults to "0"
  };
  is_live: boolean;
  match_status: string;
  match_type: string;
  match_date: Date;
  timeline: Timeline[];
  createdAt?: Date; // Added by timestamps
  updatedAt?: Date; // Added by timestamps
}

// Define the Mongoose schema for MatchPosts
const MatchPostSchema = new mongoose.Schema<MatchPosts>(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    firebase_match_id: {
      type: String,
      required: true,
      unique: true, // Ensure uniqueness for firebase_match_id
    },
    team1: {
      team_code: {
        type: String,
        required: true,
      },
      team_score: {
        type: String,
        required: true,
      },
      team_name: {
        type: String,
        required: true, // Make team_name required since it's used in notifications
      },
      team_penalty: {
        type: String,
        default: "0", // Default value as string "0"
      },
    },
    team2: {
      team_code: {
        type: String,
        required: true,
      },
      team_score: {
        type: String,
        required: true,
      },
      team_name: {
        type: String,
        required: true, // Make team_name required
      },
      team_penalty: {
        type: String,
        default: "0", // Default value as string "0"
      },
    },
    is_live: {
      type: Boolean,
      required: true,
    },
    match_status: {
      type: String,
      required: true,
    },
    match_type: {
      type: String,
      required: true,
      enum: ["football", "cricket"], // Restrict to valid match types
    },
    match_date: {
      type: Date,
      required: true,
    },
    timeline: [
      {
        firebase_timeline_id: {
          type: String,
          required: true,
        },
        timeline_date: {
          type: Date,
          default: Date.now, // Default to current time if not provided
        },
        msgHtml: {
          type: String,
          required: true, // Ensure msgHtml is provided
        },
      },
    ],
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Export the model, ensuring it’s only created once
export default mongoose.models.MatchPosts ||
  mongoose.model<MatchPosts>("MatchPosts", MatchPostSchema);