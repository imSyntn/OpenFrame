import { prisma } from "@/db";
import { GoogleUserType, UserTypeUnregistered } from "@workspace/types";

type GetUserPayload =
  | {
      email: string;
    }
  | {
      id: string;
    };

export const getUser = async (data: GetUserPayload) => {
  try {
    const user = await prisma.user.findFirst({ where: data });
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
