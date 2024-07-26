import mongoose from "mongoose";

export interface MatchPosts {
  _id: mongoose.Schema.Types.ObjectId | string;
  firebase_match_id: string;
  team1: {
    team_code: string;
    team_score: string;
    team_penalty: string;
  };
  team2: {
    team_code: string;
    team_score: string;
    team_penalty: string;
  };
  is_live: boolean;
  match_status: string;
  match_type: string;
  match_date: Date;
  timeline: [
    {
      firebase_timeline_id: string;
      timeline_date: Date;
      msgHtml: string;
    }
  ];
}

const MatchPostSchema = new mongoose.Schema<MatchPosts>(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    firebase_match_id: {
      type: String,
      required: true,
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
      team_penalty: {
        type: String,
        default: "0",
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
      team_penalty: {
        type: String,
        default: "0",
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
        },
        msgHtml: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.MatchPosts ||
  mongoose.model<MatchPosts>("matchposts", MatchPostSchema);
