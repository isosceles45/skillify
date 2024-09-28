import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon("postgresql://skillify-db_owner:tm5yEBgi6oJW@ep-weathered-poetry-a16nvxcl.ap-southeast-1.aws.neon.tech/skillify-db?sslmode=require");

export const db = drizzle(sql, {schema});