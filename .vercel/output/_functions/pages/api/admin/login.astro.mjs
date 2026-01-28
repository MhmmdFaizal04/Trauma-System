import { s as sql } from '../../../chunks/index_BfitU03A.mjs';
import { h as hashPassword, a as verifyPassword, b as generateToken } from '../../../chunks/auth_BmMsmkeW.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies }) => {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: "Username dan password diperlukan" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const adminData = await sql`
      SELECT * FROM admins WHERE username = ${username} LIMIT 1
    `;
    let admin = adminData[0];
    if (!admin && username === "admin") {
      const defaultPassword = "admin123";
      if (password === defaultPassword) {
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
        JSON.stringify({ error: "Username atau password salah" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    const isValid = await verifyPassword(password, admin.password_hash);
    if (!isValid) {
      return new Response(
        JSON.stringify({ error: "Username atau password salah" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    const token = generateToken({ id: admin.id, username: admin.username });
    cookies.set("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24
      // 24 hours
    });
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan saat login" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
