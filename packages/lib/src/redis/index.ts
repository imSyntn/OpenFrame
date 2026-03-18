import Redis from "ioredis";

if (!process.env.REDIS_USER_CACHE_URL) {
  throw new Error("REDIS_USER_CACHE_URL - env is not set.");
}
export const cache = new Redis(process.env.REDIS_USER_CACHE_URL);

cache.on("connect", () => {
  console.log("Connected to cache successfully!");
});

cache.on("error", (error) => {
  console.error("Redis cache connection error:", error);
});
