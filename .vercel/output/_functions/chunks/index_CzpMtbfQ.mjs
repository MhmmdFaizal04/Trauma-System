import { neon } from '@neondatabase/serverless';

const sql = neon("postgresql://neondb_owner:npg_UrSqNKg2Tw3m@ep-gentle-sun-ah4yk3a7-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require");

export { sql as s };
