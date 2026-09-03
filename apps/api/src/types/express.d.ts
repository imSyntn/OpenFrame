import { UserType } from "@workspace/types";

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends UserType {}
    interface Request {
      apiKey?: string;
    }
  }
}
