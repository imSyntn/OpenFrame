import { PictureType } from "./picture";

export interface ProfileType {
  id: string;
  name: string;
  email: string;
  joined_at: string;
  avatar: string;
  bio: string | null;
  is_verified: boolean;
  location: string | null;
  _count: {
    pictures: number;
  } | null;
  metrics: {
    total_downloads: number;
    total_likes: number;
    follower: number;
    following: number;
  } | null;
  links:
    | {
        name: string;
        url: string;
      }[]
    | null;
  pictures: PictureType[] | null;
  nextCursor: string | null;
}
export interface ProfileStore extends ProfileType {
  isLoading: boolean;
  setData: (data: Partial<ProfileStore>) => void;
  addPictures: (data: PictureType[], nextCursor?: string) => void;
}
