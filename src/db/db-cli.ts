// src/db/db-cli.ts
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

// Local dummy DB file just for schema generation
const sqlite = new Database("better-auth-schema.sqlite");

export const db = drizzle(sqlite);