import { MouseEvent } from "react";

export const googleLoginHandler = (e: MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  window.location.href = "http://localhost:4000/api/auth/google";
};
