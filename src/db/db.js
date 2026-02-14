import dotenv from 'dotenv';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

dotenv.config();

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/websockets_db';

const pool = new Pool({ connectionString });

export const db = drizzle(pool);
