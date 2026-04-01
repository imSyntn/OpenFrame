export interface EngagementEventType {
  type: "like" | "view" | "download";
  userID: string;
  pictureID: string;
}
