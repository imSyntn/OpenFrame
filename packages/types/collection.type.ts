import type { SrcType } from "./picture.type";

export type CollectionVisibility = "PUBLIC" | "PRIVATE";

export interface Collection {
  id: string;
  title: string;
  description?: string;
  visibility: CollectionVisibility;
  cover_image: string;
  creator_id: string;
  created_at: string;
  updated_at: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
  items: CollectionItem[];
}

export interface CollectionItem {
  collection_id: string;
  pic_id: string;
  picture: {
    src: SrcType[];
    id: string;
    title: string;
    user_id: string;
  };
}
