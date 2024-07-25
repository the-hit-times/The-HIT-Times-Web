// types.ts

import { Posts } from "@/models/Post";

export interface Section {
  heading: string;
  articles: Posts[];
}
