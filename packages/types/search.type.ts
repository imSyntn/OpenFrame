interface Match {
  id: string | number;
  score: number;
  metadata?: Record<string, string | number | boolean | null>;
}

export type PictureMatch = {
  content: {
    blurhash: string;
    description: string;
    height: number;
    src: string;
    title: string;
    width: number;
  };
  user: {
    id: string;
    name: string;
    avatar: string;
  };
} & Match;

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
