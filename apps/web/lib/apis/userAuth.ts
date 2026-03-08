import { UserLoginType, UserTypeUnregistered } from "@workspace/types";
import axios from "axios";

export const userSignup = (data: UserTypeUnregistered) => {
  return axios.post("http://localhost:4000/api/auth/signup", data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
export const userLogin = (data: UserLoginType) => {
  return axios.post("http://localhost:4000/api/auth/signin", data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
