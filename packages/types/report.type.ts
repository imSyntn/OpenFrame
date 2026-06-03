import { SrcType } from "./picture.type";

export interface ReportType {
  id: string;
  pic_id: string;
  user_email: string;
  user_id: string;
  title: string;
  reason: string;
  status: ReportStatus;
  created_at: string;
  note: string | null;
  isAdmin?: boolean;
  picture: {
    src: SrcType[];
  };
}

export enum ReportStatus {
  PENDING = "PENDING",
  UNDER_REVIEW = "UNDER_REVIEW",
  REJECTED = "REJECTED",
  RESOLVED = "RESOLVED",
}
