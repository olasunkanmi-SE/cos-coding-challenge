import winston, { format } from "winston";

export function initLogger(): winston.Logger {
  const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    transports: [
      new winston.transports.Console({ level: "info" }),
      new winston.transports.File({
        filename: "combined.log",
        level: "debug",
      }),
    ],
    format: format.combine(format.colorize(), format.splat(), format.simple(), format.align(), format.timestamp()),
  });
  return logger;
}
