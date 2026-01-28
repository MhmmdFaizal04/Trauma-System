import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = import.meta.env.JWT_SECRET || 'fallback-secret-key';

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export function generateToken(payload: { id: string; username: string }): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): { id: string; username: string } | null {
    try {
        return jwt.verify(token, JWT_SECRET) as { id: string; username: string };
    } catch {
        return null;
    }
}

export function getTokenFromRequest(request: Request): string | null {
    // Check cookie first
    const cookies = request.headers.get('cookie');
    if (cookies) {
        const match = cookies.match(/auth_token=([^;]+)/);
        if (match) return match[1];
    }

    // Check Authorization header
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
        return authHeader.slice(7);
    }

    return null;
}

export function isAuthenticated(request: Request): boolean {
    const token = getTokenFromRequest(request);
    if (!token) return false;
    return verifyToken(token) !== null;
}
