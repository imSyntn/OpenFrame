import crypto from "crypto";

export const generateApiKey = () => {
  return "openframe_" + crypto.randomBytes(20).toString("hex");
};

export const generateInternalToken = () => {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", process.env.INTERNAL_SECRET!)
    .update(timestamp)
    .digest("hex");

  return `${timestamp}.${signature}`;
};
