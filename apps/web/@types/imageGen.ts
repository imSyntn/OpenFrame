export interface GenerationResult {
  id: string;
  prompt: string;
  negativePrompt?: string;
  styleName: string;
  createdAt: string;
  model: string;
  public: boolean;
  image: string;
}
