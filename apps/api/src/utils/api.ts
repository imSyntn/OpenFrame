import crypto from "crypto";

export const generateApiKey = () => {
  return "openframe_" + crypto.randomBytes(20).toString("hex");
};
