import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
  host: process.env.DATABASE_HOST as string,
  port: +(process.env.DATABASE_PORT as string),
  user: process.env.DATABASE_USER as string,
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE_NAME as string,
  ssl: true,
});

const connector = drizzle(pool);

export default {
  database: connector,
};
