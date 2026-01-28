import type { APIRoute } from 'astro';
import { sql } from '../../lib/db';
import { v4 as uuidv4 } from 'uuid';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();

        // Extract demographic data
        const ageAnswer = data['question_1'];
        const genderAnswer = data['question_2'];

        // Parse age from answer
        let age: number | null = null;
        if (ageAnswer) {
            const match = ageAnswer.match(/\d+/);
            if (match) {
                age = parseInt(match[0]);
            }
        }

        // Create a unique session ID
        const sessionId = uuidv4();

        // Insert respondent
        const [newRespondent] = await sql`
      INSERT INTO respondents (session_id, age, gender)
      VALUES (${sessionId}, ${age}, ${genderAnswer || null})
      RETURNING id
    `;

        // Insert all responses
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
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Error saving questionnaire:', error);
        return new Response(
            JSON.stringify({ error: 'Gagal menyimpan data' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
