import { MouseEvent } from "react";

export const googleLoginHandler = (e: MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`;
};
