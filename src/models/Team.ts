import mongoose from "mongoose";

export interface Player {
  player_name: string;
  player_description: string;
  player_image: string;
}

export interface Teams  {
  _id: string;
  team_code: string;
  dept_name: string;
  football: {
    team_name: string;
    team_logo: string;
    players: Player[];
  };
  cricket: {
    team_name: string;
    team_logo: string;
    players: Player[];
  };
}

const TeamSchema = new mongoose.Schema<Teams>(
  {
    _id: {
      type: String,
      auto: true,
    },
    team_code: {
      type: String,
      required: true,
      unique: true,
    },
    dept_name: {
      type: String,
      required: true,
    },
    football: {
      team_name: {
        type: String,
        required: true,
      },
      team_logo: {
        type: String,
        required: true,
      },
      players: [
        {
          player_name: {
            type: String,
            required: true,
          },
          player_description: {
            type: String,
            required: true,
          },
          player_image: {
            type: String,
            required: true,
          },
        },
      ],
    },
    cricket: {
      team_name: {
        type: String,
        required: true,
      },
      team_logo: {
        type: String,
        required: true,
      },
      players: [
        {
          player_name: {
            type: String,
            required: true,
          },
          player_description: {
            type: String,
            required: true,
          },
          player_image: {
            type: String,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Team ||
  mongoose.model<Teams>("Team", TeamSchema);
