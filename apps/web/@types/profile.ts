export interface PictureType {
  id: string;
  title: string;
  alt: string;
  description: string;
  created_at: string;

  user: {
    id: string;
    name: string;
    avatar: string;
  };

  src: {
    resolution: "SMALL" | "MEDIUM" | "LARGE" | "ORIGINAL";
    url: string;
    type: "JPG" | "PNG" | "WEBP";
    width?: number;
    height?: number;
    size: number;
  }[];

  metadata: {
    blurhash: string;
    camera?: string;
    lens?: string;
    iso?: string;
    shutter?: string;
    aperture?: string;
    focal_length?: string;
  };

  tags: string[];
}

export interface ProfileType {
  id: string;
  name: string;
  email: string;
  joined_at: string;
  avatar: string;
  bio: string;
  is_verified: boolean;
  location: string;
  _count: {
    pictures: number;
  } | null;
  metrics: {
    follower: number;
    following: number;
    total_downloads: number;
    total_likes: number;
  } | null;
  links:
    | {
        name: string;
        url: string;
      }[]
    | null;
  pictures: PictureType[] | null;
}
export interface ProfileStore extends ProfileType {
  isLoading: boolean;
  setData: (data: Partial<ProfileStore>) => void;
}
