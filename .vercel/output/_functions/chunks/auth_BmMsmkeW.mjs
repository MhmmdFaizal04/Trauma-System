import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "mTVAGI7lEueBm65zLUDZzO99EkdMaYm6JBHadWfEkg8";
async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}
async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
function getTokenFromRequest(request) {
  const cookies = request.headers.get("cookie");
  if (cookies) {
    const match = cookies.match(/auth_token=([^;]+)/);
    if (match) return match[1];
  }
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  return null;
}
function isAuthenticated(request) {
  const token = getTokenFromRequest(request);
  if (!token) return false;
  return verifyToken(token) !== null;
}

export { verifyPassword as a, generateToken as b, getTokenFromRequest as g, hashPassword as h, isAuthenticated as i, verifyToken as v };
