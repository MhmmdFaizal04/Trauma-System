import type { APIRoute } from 'astro';
import { initDatabase } from '../../lib/db/init';

export const GET: APIRoute = async () => {
    try {
        const result = await initDatabase();

        if (result.success) {
            return new Response(
                JSON.stringify({ message: 'Database initialized successfully' }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        } else {
            return new Response(
                JSON.stringify({ error: 'Database initialization failed', details: result.error }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
