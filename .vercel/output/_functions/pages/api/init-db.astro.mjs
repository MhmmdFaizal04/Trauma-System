import { s as sql } from '../../chunks/index_CzpMtbfQ.mjs';
import { h as hashPassword } from '../../chunks/auth_BmMsmkeW.mjs';
export { renderers } from '../../renderers.mjs';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
async function initDatabase() {
  try {
    console.log("Initializing database tables...");
    await sql`
      CREATE TABLE IF NOT EXISTS admins (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS respondents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id VARCHAR(100) UNIQUE NOT NULL,
        age INTEGER,
        gender VARCHAR(20),
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS responses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        respondent_id UUID NOT NULL REFERENCES respondents(id) ON DELETE CASCADE,
        question_number INTEGER NOT NULL,
        answer TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;
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
    console.log("Tables created successfully.");
    const existingAdmins = await sql`SELECT id FROM admins LIMIT 1`;
    if (existingAdmins.length === 0) {
      console.log("Seeding default admin...");
      const hashedPassword = await hashPassword(ADMIN_PASSWORD);
      await sql`
        INSERT INTO admins (username, password_hash)
        VALUES (${ADMIN_USERNAME}, ${hashedPassword})
      `;
      console.log("Default admin created.");
    }
    return { success: true };
  } catch (error) {
    console.error("Database initialization failed:", error);
    return { success: false, error };
  }
}

const GET = async () => {
  try {
    const result = await initDatabase();
    if (result.success) {
      return new Response(
        JSON.stringify({ message: "Database initialized successfully" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Database initialization failed", details: result.error }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
