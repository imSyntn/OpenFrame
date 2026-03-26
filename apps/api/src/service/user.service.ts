import { prisma, cache, Prisma } from "@workspace/lib";
import { logger } from "@workspace/lib/logger";
import { GoogleUserType, UserTypeUnregistered } from "@workspace/types";

type GetUserPayload =
  | {
      email: string;
    }
  | {
      id: string;
    };

interface includeOptions {
  pictures?: boolean;
  _count?: boolean;
  collection?: boolean;
  followers?: boolean;
  following?: boolean;
  likes?: boolean;
  links?: boolean;
  metrics?: boolean;
}

interface omitOptions {
  avatar?: boolean;
  bio?: boolean;
  email?: boolean;
  google_id?: boolean;
  id?: boolean;
  is_verified?: boolean;
  joined_at?: boolean;
  location?: boolean;
  name?: boolean;
  password?: boolean;
}

type cacheType = "auth" | "profile";

export const getUser = async (
  user: GetUserPayload,
  cacheKey: cacheType,
  include?: Prisma.UserInclude,
  omit?: Prisma.UserOmit,
) => {
  try {
    let key;

    if ("email" in user) {
      key = user.email;
    } else {
      key = user.id;
    }

    const userInCache = await cache.hget(`user:${cacheKey}`, key);
    if (userInCache) {
      return JSON.parse(userInCache);
    }

    const userInDb = await prisma.user.findFirst({
      where: user,
      include,
      omit,
    });

    if (userInDb) {
      await cache.hset("user", key, JSON.stringify(userInDb));
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
}

export const updateUser = async (
  user: GetUserPayload,
  payload: UpdateUserPayload,
  include?: includeOptions,
  omit?: omitOptions,
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

    const pipeline = cache.pipeline();
    pipeline.hset("user:profile", updatedUser.id, JSON.stringify(updatedUser));
    pipeline.hset("user:auth", updatedUser.email, JSON.stringify(updatedUser));

    const res = await pipeline.exec();
    if (!res) {
      logger.error("Failed to update user in cache");
    }
    return updatedUser;
  } catch (error) {
    throw error;
  }
};
