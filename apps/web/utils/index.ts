import { MouseEvent } from "react";
import { toast } from "sonner";

export const googleLoginHandler = (e: MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/google`;
};

export const copyToClipboard = async (
  textToCopy: string,
  successMessage?: string,
  errorMessage?: string,
) => {
  try {
    await navigator.clipboard.writeText(textToCopy);
    toast.success(successMessage || "Successfully copied to clipboard.");
  } catch {
    toast.error(errorMessage || "Failed to copy to clipboard.");
  }
};

export const getBlurImage = (url: string) =>
  url.replace("/upload/", "/upload/w_50,e_blur:1000,q_1,f_auto/");
