import rateLimit from "express-rate-limit";
import { RateLimitStore } from "@/lib";

export const apiLimiter = rateLimit({
  store: RateLimitStore("rl:api"),
  windowMs: 60 * 1000,
  max: 100,
  message: { message: "Too many requests" },
});

export const authLimiter = rateLimit({
  store: RateLimitStore("rl:auth"),
  windowMs: 60 * 1000,
  max: 5,
  message: { message: "Too many login attempts" },
});

export const pollingLimiter = rateLimit({
  store: RateLimitStore("rl:polling"),
  windowMs: 60 * 1000,
  max: 40,
  message: { message: "Too many polling requests" },
});

export const uploadLimiter = rateLimit({
  store: RateLimitStore("rl:upload"),
  windowMs: 60 * 1000,
  max: 10,
  message: { message: "Too many upload requests" },
});

export const collectionLimiter = rateLimit({
  store: RateLimitStore("rl:collection"),
  windowMs: 60 * 1000,
  max: 20,
  message: { message: "Too many collection requests" },
});
