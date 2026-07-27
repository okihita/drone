import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

const client = new Client({
  connectionString,
  connectionTimeoutMillis: 10_000,
});

// pg.Client auto-connects on first query when not explicitly connected
export const db = drizzle(client, { schema });
