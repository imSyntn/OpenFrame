import Redis from "ioredis";

if (!process.env.REDIS_OTP_DB_URL) {
  throw new Error("REDIS_OTP_DB_URL - env is not set.");
}

export const otpStore = new Redis(process.env.REDIS_OTP_DB_URL);

otpStore.on("connect", () => {
  console.log("Connected to Redis OTP store successfully!");
});

otpStore.on("error", (error) => {
  console.error("Redis otp store connection error:", error);
});
