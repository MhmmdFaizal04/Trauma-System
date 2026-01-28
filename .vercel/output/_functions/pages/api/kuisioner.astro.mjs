import { s as sql } from '../../chunks/index_CzpMtbfQ.mjs';
import { v4 } from 'uuid';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const ageAnswer = data["question_1"];
    const genderAnswer = data["question_2"];
    let age = null;
    if (ageAnswer) {
      const match = ageAnswer.match(/\d+/);
      if (match) {
        age = parseInt(match[0]);
      }
    }
    const sessionId = v4();
    const [newRespondent] = await sql`
      INSERT INTO respondents (session_id, age, gender)
      VALUES (${sessionId}, ${age}, ${genderAnswer || null})
      RETURNING id
    `;
    for (let i = 1; i <= 15; i++) {
      const answer = data[`question_${i}`];
      if (answer) {
        await sql`
          INSERT INTO responses (respondent_id, question_number, answer)
          VALUES (${newRespondent.id}, ${i}, ${answer.toString()})
        `;
      }
    }
    return new Response(
      JSON.stringify({ success: true, id: newRespondent.id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error saving questionnaire:", error);
    return new Response(
      JSON.stringify({ error: "Gagal menyimpan data" }),
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
