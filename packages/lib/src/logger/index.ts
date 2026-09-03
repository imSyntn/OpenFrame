import winston from "winston";
const { printf, combine, timestamp, colorize, errors } = winston.format;

const logFormat = printf((info) => {
  const { timestamp, level, message, stack, ...meta } = info;

  const metaString =
    Object.keys(meta).length > 0
      ? ` ${Object.entries(meta)
          .map(([key, value]) => {
            if (value === undefined) return null;

            if (value instanceof Error) {
              return `error=${value.message}`;
            }

            const formattedValue =
              typeof value === "object" ? JSON.stringify(value) : String(value);

            return `${key}=${formattedValue}`;
          })
          .filter(Boolean)
          .join(" ")}`
      : "";

  const stackString = stack ? `\n${stack}` : "";

  return `[${timestamp}] ${level}: ${message}${metaString}${stackString}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: combine(
    errors({ stack: true }),
    colorize({ level: true }),
    timestamp(),
    logFormat,
  ),
  transports: [new winston.transports.Console()],
});
