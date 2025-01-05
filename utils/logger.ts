import winston from "winston";

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: "readnow-web" },
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...metadata }) => {
          let msg = `${timestamp} [${level}] : ${message}`;
          if (
            Object.keys(metadata).length > 0 &&
            metadata.service === undefined
          ) {
            msg += ` ${JSON.stringify(metadata)}`;
          }
          return msg;
        })
      ),
    }),
    // File transport for production
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
});

// Create a stream object with a write function that will be used by Morgan
export const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export default logger;
