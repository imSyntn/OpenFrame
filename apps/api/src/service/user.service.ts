import { prisma, userCacheStore } from "@/db";
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
  Links?: boolean;
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

export const getUser = async (
  data: GetUserPayload,
  include?: includeOptions,
  omit?: omitOptions,
) => {
  try {
    let key;

    if ("email" in data) {
      key = data.email;
    } else {
      key = data.id;
    }

    const userInCache = await userCacheStore.hget("user", key);
    if (userInCache) {
      return JSON.parse(userInCache);
    }

    const user = await prisma.user.findFirst({
      where: data,
      include,
      omit,
    });

    if (user) {
      await userCacheStore.hset("user", key, JSON.stringify(user));
    }

    return user;
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

type updateUsingEmail = { email: string };
type updateUsingId = { id: string };

interface UpdateUserPayload {
  where: updateUsingEmail | updateUsingId;
  data: {
    name?: string;
    password?: string;
    avatar?: string;
    bio?: string;
    is_verified?: boolean;
    location?: string;
  };
}

export const updateUser = async (payload: UpdateUserPayload) => {
  try {
    const user = await prisma.user.update({
      where: payload.where,
      data: payload.data,
    });
    return user;
  } catch (error) {
    throw error;
  }
};
