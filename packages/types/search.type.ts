interface Match {
  id: string | number;
  score: number;
  metadata?: Record<string, string | number | boolean | null>;
}

export type PictureMatch = {
  content: {
    title: string;
    description: string;
    src: string;
  };
} & Match;

export type PictureSearch = { id: string } & Omit<PictureMatch, "score">;
export type TagSearch = { id: string } & Omit<TagMatch, "score">;

export type UserMatch = {
  content: { name: string; avatar: string };
} & Match;

export type TagMatch = {
  content: { name: string };
} & Match;

export interface SearchResultType {
  pictures: PictureMatch[];
  tags: TagMatch[];
  users: UserMatch[];
}
