import { generateApiKey } from "@/utils";
import { prisma, cache } from "@workspace/lib";

export const createApiKey = async (payload: {
  userId: string;
  name: string;
}) => {
  const apiKey = generateApiKey();

  const newApiKey = await prisma.apiKey.create({
    data: {
      key: apiKey,
      user_id: payload.userId,
      name: payload.name,
    },
  });

  const pipeline = cache.pipeline();
  pipeline.del(`api:user:${payload.userId}:keys`);
  pipeline.set(
    `api:key:${newApiKey.key}`,
    JSON.stringify(newApiKey),
    "EX",
    60 * 60 * 24 * 7,
  );
  await pipeline.exec();

  return newApiKey;
};

export const getUserApiKeys = async (
  userId: string,
  options?: { isActive?: boolean },
) => {
  const cacheKey = `api:user:${userId}:keys`;

  const apiKeysInCache = await cache.get(cacheKey);

  if (apiKeysInCache) {
    const res = JSON.parse(apiKeysInCache);
    return res.filter((key: any) => {
      if (options?.isActive) {
        return key.isActive;
      }
      return true;
    });
  }

  const apiKeys = await prisma.apiKey.findMany({
    where: { user_id: userId, ...options },
    orderBy: { created_at: "desc" },
  });

  await cache.set(cacheKey, JSON.stringify(apiKeys), "EX", 60 * 60 * 24 * 7);

  return apiKeys;
};

export const getApiKeyData = async (keyId: string) => {
  const cacheKey = `api:key:${keyId}`;

  const apiKeyInCache = await cache.get(cacheKey);
  if (apiKeyInCache) {
    return JSON.parse(apiKeyInCache);
  }

  const apiKey = await prisma.apiKey.findUnique({
    where: { key: keyId },
  });

  if (apiKey) {
    await cache.set(cacheKey, JSON.stringify(apiKey), "EX", 60 * 60 * 24 * 7);
  }

  return apiKey;
};

export const disableApiKey = async (id: number) => {
  const disabledApiKey = await prisma.apiKey.update({
    where: { id },
    data: { isActive: false },
  });

  const pipeline = cache.pipeline();
  pipeline.del(`api:user:${disabledApiKey.user_id}:keys`);
  pipeline.set(
    `api:key:${disabledApiKey.key}`,
    JSON.stringify(disabledApiKey),
    "EX",
    60 * 60 * 24 * 7,
  );

  await pipeline.exec();

  return disabledApiKey;
};
