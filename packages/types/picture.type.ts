export type LicenseType =
  | "ALL_RIGHTS_RESERVED"
  | "CC_BY_4_0"
  | "CC_BY_SA_4_0"
  | "CC_BY_NC_4_0"
  | "CC0_1_0";

enum Resolution {
  ORIGINAL = "ORIGINAL",
  LARGE = "LARGE",
  MEDIUM = "MEDIUM",
  SMALL = "SMALL",
  THUMBNAIL = "THUMBNAIL",
}

export interface LicenseObjType {
  identifier: string;
  key: string;
  name: string;
  officialUrl?: string;
  description: string;
  bestFor: string;
  permissions: Record<string, boolean>;
}

export interface SrcType {
  resolution: Resolution;
  url: string;
  width?: number;
  height?: number;
  size?: number;
}

export interface tagsType {
  id: number;
  name: string;
  url?: string;
}

interface MetadataType {
  others: Record<string, string>;
  blurhash: string;
  dominant_color: string;
  palette: string[];
}

export interface UnderProcessingPictureType {
  id: string;
  title: string;
  description: string;
  tags: tagsType[];
  src?: SrcType[];
  url: string;
  processing: "ongoing" | "ready" | "failed" | "done";
  created_at: string;
  stepsCompleted: string[];
  metadata?: MetadataType;
  userId?: string;
  error?: string;
  license: LicenseType;
}

export interface MetadataCacheType {
  metadata: MetadataType;
  stepsCompleted: string[];
  retry?: number;
  status: "done" | "failed";
}

export interface VariantsCacheType {
  src: SrcType[];
  stepsCompleted: string[];
  retry?: number;
  status: "done" | "failed";
}
