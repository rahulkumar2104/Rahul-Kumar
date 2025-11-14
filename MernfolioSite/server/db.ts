import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

let db: any = null;

if (process.env.DATABASE_URL) {
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    console.warn("⚠️  Running in development mode without database");
  }
} else {
  console.warn("⚠️  DATABASE_URL not set. Database features will be disabled.");
}

export { db };
