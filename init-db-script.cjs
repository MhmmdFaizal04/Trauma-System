const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');

// Hardcoded for initialization only - based on user input
const DATABASE_URL = 'postgresql://neondb_owner:npg_UrSqNKg2Tw3m@ep-gentle-sun-ah4yk3a7-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require';
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

const sql = neon(DATABASE_URL);

async function init() {
    try {
        console.log('Connecting to Neon database...');
        console.log('Target: ' + DATABASE_URL.split('@')[1]); // Log safe part of URL

        console.log('Creating tables...');

        // Table: admins
        await sql`
      CREATE TABLE IF NOT EXISTS admins (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;
        console.log('✓ Table "admins" ready');

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
        console.log('✓ Table "respondents" ready');

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
        console.log('✓ Table "responses" ready');

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
        console.log('✓ Table "analysis_results" ready');

        // Seed admin
        const existingAdmins = await sql`SELECT id FROM admins LIMIT 1`;

        if (existingAdmins.length === 0) {
            console.log(`Seeding default admin (${ADMIN_USERNAME})...`);
            const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

            await sql`
        INSERT INTO admins (username, password_hash)
        VALUES (${ADMIN_USERNAME}, ${hashedPassword})
      `;
            console.log('✓ Default admin created');
        } else {
            console.log('✓ Admin already exists, skipping seed');
        }

        console.log('\nDatabase initialization completed successfully! 🚀');

    } catch (error) {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }
}

init();
