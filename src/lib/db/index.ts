import { neon } from '@neondatabase/serverless';

const dbUrl = import.meta.env.DATABASE_URL;

if (!dbUrl) {
    console.error('CRITICAL ERROR: DATABASE_URL is not defined in environment variables.');
    throw new Error('DATABASE_URL is not defined');
}

const sql = neon(dbUrl);

export { sql };
