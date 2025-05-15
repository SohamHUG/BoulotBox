import { createLogger, format, transports } from "winston"

// Configuration du logger
export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.colorize(),
        format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ level: 'error', filename: 'logs/errors.log' }),
        new transports.File({ filename: 'logs/combined.log' })
    ]
});