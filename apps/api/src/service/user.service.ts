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

    await usersIndex.delete(deletedUser.id);

    return deletedUser;
  } catch (error) {
    throw error;
  }
};
