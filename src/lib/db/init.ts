import { sql } from './index';
import { hashPassword } from '../auth';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function initDatabase() {
    try {
        console.log('Initializing database tables...');

        // Table: admins
        await sql`
      CREATE TABLE IF NOT EXISTS admins (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

        // Table: respondents
        await sql`
      CREATE TABLE IF NOT EXISTS respondents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id VARCHAR(100) UNIQUE NOT NULL,
        age INTEGER,
        gender VARCHAR(20),
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

        // Table: responses
        await sql`
      CREATE TABLE IF NOT EXISTS responses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        respondent_id UUID NOT NULL REFERENCES respondents(id) ON DELETE CASCADE,
        question_number INTEGER NOT NULL,
        answer TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

        // Table: analysis_results
        await sql`
      CREATE TABLE IF NOT EXISTS analysis_results (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        respondent_id UUID NOT NULL UNIQUE REFERENCES respondents(id) ON DELETE CASCADE,
        word_frequency JSONB,
        sentence_analysis JSONB,
        pronoun_analysis JSONB,
        trauma_indicators JSONB,
        summary TEXT,
        analyzed_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

        console.log('Tables created successfully.');

        // Seed admin if not exists
        const existingAdmins = await sql`SELECT id FROM admins LIMIT 1`;

        if (existingAdmins.length === 0) {
            console.log('Seeding default admin...');
            const hashedPassword = await hashPassword(ADMIN_PASSWORD);

            await sql`
        INSERT INTO admins (username, password_hash)
        VALUES (${ADMIN_USERNAME}, ${hashedPassword})
      `;
            console.log('Default admin created.');
        }

        return { success: true };
    } catch (error) {
        console.error('Database initialization failed:', error);
        return { success: false, error };
    }
}
