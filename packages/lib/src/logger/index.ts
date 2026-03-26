import winston from "winston";
const { printf, combine, timestamp, colorize } = winston.format;

const logFormat = printf((info) => {
  const { timestamp, level, message, ...meta } = info;

  const metaString =
    Object.keys(meta).length > 0
      ? " " +
        Object.entries(meta)
          .map(
            ([k, v]) => `${k}=${typeof v === "object" ? JSON.stringify(v) : v}`,
          )
          .join(" ")
      : "";

  return `[${timestamp}] ${level}: ${message}${metaString}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: combine(colorize({ all: true }), timestamp(), logFormat),
  transports: [new winston.transports.Console()],
});
