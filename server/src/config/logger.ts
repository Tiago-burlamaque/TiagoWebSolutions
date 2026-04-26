import { createLogger, format, transports } from "winston";
import { env } from "./env.js";

export const logger = createLogger({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  defaultMeta: { service: "contact-api" },
  transports: [
    new transports.Console({
      format:
        env.NODE_ENV === "production"
          ? format.json()
          : format.combine(format.colorize(), format.simple()),
    }),
  ],
});
