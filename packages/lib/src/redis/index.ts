import Redis from "ioredis";

if (!process.env.REDIS_OTP_DB_URL) {
  throw new Error("REDIS_OTP_DB_URL - env is not set.");
}
if (!process.env.REDIS_USER_CACHE_URL) {
  throw new Error("REDIS_USER_CACHE_URL - env is not set.");
}

export const otpStore = new Redis(process.env.REDIS_OTP_DB_URL);
export const cache = new Redis(process.env.REDIS_USER_CACHE_URL);

otpStore.on("connect", () => {
  console.log("Connected to Redis OTP store successfully!");
});

otpStore.on("error", (error) => {
  console.error("Redis otp store connection error:", error);
});

cache.on("connect", () => {
  console.log("Connected to cache successfully!");
});

cache.on("error", (error) => {
  console.error("Redis cache connection error:", error);
});
