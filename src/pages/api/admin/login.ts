import type { APIRoute } from 'astro';
import { sql } from '../../../lib/db';
import { verifyPassword, generateToken, hashPassword } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return new Response(
                JSON.stringify({ error: 'Username dan password diperlukan' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Find admin by username
        const adminData = await sql`
      SELECT * FROM admins WHERE username = ${username} LIMIT 1
    `;

        let admin = adminData[0];

        // If no admin exists and trying to login with default credentials, check env
        if (!admin && username === (import.meta.env.ADMIN_USERNAME || 'admin')) {
            const defaultPassword = import.meta.env.ADMIN_PASSWORD || 'admin123';

            if (password === defaultPassword) {
                // Create default admin on the fly
                const hashedPassword = await hashPassword(defaultPassword);
                const [newAdmin] = await sql`
          INSERT INTO admins (username, password_hash)
          VALUES (${username}, ${hashedPassword})
          RETURNING *
        `;

                admin = newAdmin;
            }
        }

        if (!admin) {
            return new Response(
                JSON.stringify({ error: 'Username atau password salah' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Verify password
        // Note: column name in DB is password_hash (snake_case)
        const isValid = await verifyPassword(password, admin.password_hash);

        if (!isValid) {
            return new Response(
                JSON.stringify({ error: 'Username atau password salah' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Generate JWT token
        const token = generateToken({ id: admin.id, username: admin.username });

        // Set cookie
        cookies.set('auth_token', token, {
            httpOnly: true,
            secure: import.meta.env.PROD,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Login error:', error);
        return new Response(
            JSON.stringify({ error: 'Terjadi kesalahan saat login' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
