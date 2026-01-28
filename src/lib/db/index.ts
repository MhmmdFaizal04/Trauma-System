import { neon } from '@neondatabase/serverless';

const getDbUrl = () => {
    const url = import.meta.env.DATABASE_URL;
    if (!url || url === 'undefined') {
        console.warn("DATABASE_URL is not defined");
        return undefined;
    }
    return url;
};

const dbUrl = getDbUrl();
let sql;

if (dbUrl) {
    sql = neon(dbUrl);
} else {
    // Safe fallback that throws only when called
    sql = (strings, ...values) => {
        throw new Error("Database not configured: DATABASE_URL is missing");
    };
}

export { sql };
