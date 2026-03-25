export interface SrcType {
  resolution: string;
  url: string;
  width: number;
  height: number;
  size: number;
}

export interface tagsType {
  id: number;
  name: string;
}

export interface UnderProcessingPictureType {
  id: string;
  title: string;
  description: string;
  tags: tagsType[];
  src?: SrcType[];
  url: string;
  processing: "ongoing" | "ready" | "failed";
  created_at: string;
  stepsCompleted: string[];
  metadata?: Record<string, string>;
}
