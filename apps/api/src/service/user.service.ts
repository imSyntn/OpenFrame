import { generateApiKey } from "@/utils";
import { prisma, cache, Prisma, usersIndex } from "@workspace/lib";
import { GoogleUserType, UserTypeUnregistered } from "@workspace/types";

type GetUserPayload =
  | {
      email: string;
    }
  | {
      id: string;
    };

type cacheType = "auth" | "profile";

export const getUser = async (
  user: GetUserPayload,
  cacheKey: cacheType,
  include?: Prisma.UserInclude,
  omit?: Prisma.UserOmit,
) => {
  try {
    const isAuth = cacheKey === "auth";

    let key = "email" in user ? user.email : user.id;

    if (!isAuth) {
      const userInCache = await cache.get(`user:${cacheKey}:${key}`);
      if (userInCache) {
        return JSON.parse(userInCache);
      }
    }

    const userInDb = await prisma.user.findFirst({
      where: user,
      include,
      omit: isAuth ? undefined : omit,
    });

    if (userInDb && !isAuth) {
      await cache.set(
        `user:${cacheKey}:${key}`,
        JSON.stringify(userInDb),
        "EX",
        60 * 60 * 2,
      );
    }

    return userInDb;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (
  user: GoogleUserType | UserTypeUnregistered,
) => {
  try {
    const obj: any = {};

    if ("_json" in user) {
      obj.google_id = user._json.sub;
      obj.name = user._json.name;
      obj.email = user._json.email;
      obj.avatar = user._json.picture;
      obj.is_verified = user._json.email_verified;
    } else {
      obj.name = user.name;
      obj.email = user.email;
      obj.password = user.password;
    }

    const newUser = await prisma.user.create({ data: obj });

    await usersIndex.upsert({
      id: newUser.id,
      content: {
        name: newUser.name,
        avatar: newUser.avatar,
      },
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};

interface UpdateUserPayload {
  name?: string;
  password?: string;
  avatar?: string;
  bio?: string;
  is_verified?: boolean;
  location?: string;
  links?: {
    name: string;
    url: string;
  }[];
  api_key?: string;
}

export const updateUser = async (
  user: GetUserPayload,
  payload: UpdateUserPayload,
  include?: Prisma.UserInclude,
  omit?: Prisma.UserOmit,
) => {
  try {
    const updates: any = { ...payload };

    if ("links" in updates) {
      updates.links = {
        deleteMany: {},
        create: updates.links,
      };
    }
    const updatedUser = await prisma.user.update({
      where: user,
      data: updates,
      include: include,
      omit: omit,
    });

    await cache.set(
      "user:profile:" + updatedUser.id,
      JSON.stringify(updatedUser),
    );

    await usersIndex.upsert({
      id: updatedUser.id,
      content: {
        name: updatedUser.name,
        avatar: updatedUser.avatar,
      },
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    const pipeline = cache.pipeline();
    pipeline.del("user:profile:" + deletedUser.id);

    await pipeline.exec();
    await usersIndex.delete(deletedUser.id);

    return deletedUser;
  } catch (error) {
    throw error;
  }
};

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
    return JSON.parse(apiKeysInCache);
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
