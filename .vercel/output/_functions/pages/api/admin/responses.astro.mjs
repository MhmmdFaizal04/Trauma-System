import { s as sql } from '../../../chunks/index_CzpMtbfQ.mjs';
import { i as isAuthenticated } from '../../../chunks/auth_BmMsmkeW.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    const allRespondents = await sql`
      SELECT id, session_id, age, gender, created_at 
      FROM respondents 
      ORDER BY created_at DESC
    `;
    const respondents = allRespondents.map((r) => ({
      id: r.id,
      sessionId: r.session_id,
      age: r.age,
      gender: r.gender,
      createdAt: r.created_at
    }));
    return new Response(
      JSON.stringify({ data: respondents }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching responses:", error);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const DELETE = async ({ request, url }) => {
  if (!isAuthenticated(request)) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  const id = url.searchParams.get("id");
  if (!id) {
    return new Response(
      JSON.stringify({ error: "ID diperlukan" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    await sql`DELETE FROM respondents WHERE id = ${id}`;
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting response:", error);
    return new Response(
      JSON.stringify({ error: "Gagal menghapus data" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    DELETE,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
