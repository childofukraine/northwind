"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
dotenv_1.default.config();
const pool = new pg_1.Pool({
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: true,
});
const connector = (0, node_postgres_1.drizzle)(pool);
exports.default = {
    database: connector,
};
