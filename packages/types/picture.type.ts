export interface UnderProcessingPictureType {
  id: string;
  title: string;
  description: string;
  tags: { id: number; name: string }[];
  url: string;
  processing: "ongoing" | "ready" | "failed";
  createdAt: string;
  stepsCompleted: string[];
}
