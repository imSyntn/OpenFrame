import { UserType } from "@workspace/types";

declare global {
  namespace Express {
    interface User extends UserType {}
    interface Request {
      apiKey?: string;
    }
  }
}
