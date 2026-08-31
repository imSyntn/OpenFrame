export type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "21:9";

export interface StyleOption {
  id: string;
  name: string;
  category: string;
  gradient: string;
  promptSuffix: string;
}

export interface AspectRatioOption {
  id: AspectRatio;
  label: string;
  ratioText: string;
  width: number;
  height: number;
  iconAspect: string;
}
