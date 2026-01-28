import type { APIRoute } from 'astro';
import { sql } from '../../../lib/db';
import { isAuthenticated } from '../../../lib/auth';

export const GET: APIRoute = async ({ request }) => {
    // Check authentication
    if (!isAuthenticated(request)) {
        return new Response(
            JSON.stringify({ error: 'Unauthorized' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        const allRespondents = await sql`
      SELECT id, session_id, age, gender, created_at 
      FROM respondents 
      ORDER BY created_at DESC
    `;

        // CamelCase keys
        const respondents = allRespondents.map((r: any) => ({
            id: r.id,
            sessionId: r.session_id,
            age: r.age,
            gender: r.gender,
            createdAt: r.created_at
        }));

        return new Response(
            JSON.stringify({ data: respondents }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error fetching responses:', error);
        return new Response(
            JSON.stringify({ error: 'Terjadi kesalahan' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

export const DELETE: APIRoute = async ({ request, url }) => {
    // Check authentication
    if (!isAuthenticated(request)) {
        return new Response(
            JSON.stringify({ error: 'Unauthorized' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const id = url.searchParams.get('id');

    if (!id) {
        return new Response(
            JSON.stringify({ error: 'ID diperlukan' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        // Delete respondent (CASCADE will handle related records if supported, 
        // but explicit delete is safer given raw SQL environment)
        await sql`DELETE FROM respondents WHERE id = ${id}`;

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error deleting response:', error);
        return new Response(
            JSON.stringify({ error: 'Gagal menghapus data' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
