interface Match {
  id: string | number;
  rank: number | null;
  sim: number;
}

export type PictureMatch = {
  title: string;
  src: string;
} & Match;

export type UserMatch = {
  name: string;
  avatar: string;
} & Match;

export type TagMatch = {
  name: string;
} & Match;

export interface SearchResultType {
  pictures: PictureMatch[];
  tags: TagMatch[];
  users: UserMatch[];
}
