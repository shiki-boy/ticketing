import { config } from "dotenv";
config({ path: ".env" });

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const {
  NODE_ENV,
  PORT,
  DB_PORT,
  MONGO_HOST,
  MONGO_DBNAME,
  SECRET_KEY,
  LOG_FORMAT = 'dev',
  LOG_DIR = '../',
  ORIGIN,
  MONGO_USERNAME,
  MONGO_PASSWORD,
} = process.env;
