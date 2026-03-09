import { OTP_CHAR_LIMIT } from "@workspace/constants";

export const generateOtp = () => {
  const otp = Math.floor(
    Math.pow(10, OTP_CHAR_LIMIT - 1) +
      Math.random() * Math.pow(9, OTP_CHAR_LIMIT - 1),
  );
  return otp.toString();
};

export const verifyOtp = () => {};
