import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ cookies }) => {
    // Delete the auth_token cookie
    cookies.delete('auth_token', {
        path: '/',
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'lax',
    });

    return new Response(JSON.stringify({ message: 'Logged out successfully' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
