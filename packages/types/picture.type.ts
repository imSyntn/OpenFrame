enum Resolution {
  ORIGINAL = "ORIGINAL",
  LARGE = "LARGE",
  MEDIUM = "MEDIUM",
  SMALL = "SMALL",
  THUMBNAIL = "THUMBNAIL",
}

export interface SrcType {
  resolution: Resolution;
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
  userId?: string;
}
