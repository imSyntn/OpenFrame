import { cache } from "@workspace/lib";
import RedisStore, { type RedisReply } from "rate-limit-redis";

export const RateLimitStore = (prefix: string) =>
  new RedisStore({
    prefix,
    sendCommand: (command: string, ...args: string[]) =>
      cache.call(command, ...args) as Promise<RedisReply>,
  });
