import Redis from "ioredis";
import { logger } from "@workspace/lib/logger";

if (!process.env.REDIS_OTP_DB_URL) {
  throw new Error("REDIS_OTP_DB_URL - env is not set.");
}

export const otpStore = new Redis(process.env.REDIS_OTP_DB_URL);

otpStore.on("connect", () => {
  logger.info("Connected to Redis OTP store successfully!");
});

otpStore.on("error", (error) => {
  logger.error("Redis otp store connection error:", error);
});
