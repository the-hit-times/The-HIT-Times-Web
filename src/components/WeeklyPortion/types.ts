// types.ts

export interface Article {
  title: string;
  description: string;
  image: string;
}

export interface Section {
  heading: string;
  articles: Article[];
}

export interface DaySections {
  [day: string]: Section[];
}