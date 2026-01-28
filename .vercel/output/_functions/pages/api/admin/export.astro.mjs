import { s as sql } from '../../../chunks/index_BfitU03A.mjs';
import { i as isAuthenticated } from '../../../chunks/auth_BmMsmkeW.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const respondents = await sql`
      SELECT r.id, r.session_id, r.age, r.gender, r.created_at,
             ar.summary as analysis_summary, ar.trauma_indicators
      FROM respondents r
      LEFT JOIN analysis_results ar ON r.id = ar.respondent_id
      ORDER BY r.created_at DESC
    `;
    const responses = await sql`SELECT * FROM responses ORDER BY question_number`;
    const responseMap = {};
    responses.forEach((res) => {
      if (!responseMap[res.respondent_id]) responseMap[res.respondent_id] = {};
      responseMap[res.respondent_id][res.question_number] = res.answer;
    });
    const csvRows = [];
    const headers = [
      "Session ID",
      "Tanggal",
      "Usia",
      "Gender",
      "Status Analisis",
      "Ringkasan Analisis",
      "Indikator Trauma",
      "Q1",
      "Q2",
      "Q3",
      "Q4",
      "Q5",
      "Q6",
      "Q7",
      "Q8",
      "Q9",
      "Q10",
      "Q11",
      "Q12",
      "Q13",
      "Q14",
      "Q15"
    ];
    csvRows.push(headers.join(","));
    for (const r of respondents) {
      const row = [
        r.session_id,
        new Date(r.created_at).toISOString().split("T")[0],
        r.age || "",
        r.gender || "",
        r.analysis_summary ? "Selesai" : "Pending",
        r.analysis_summary ? `"${r.analysis_summary.replace(/"/g, '""')}"` : "",
        r.trauma_indicators ? `"${JSON.stringify(r.trauma_indicators).replace(/"/g, '""')}"` : ""
      ];
      const answers = responseMap[r.id] || {};
      for (let i = 1; i <= 15; i++) {
        const ans = answers[i] || "";
        row.push(`"${ans.replace(/"/g, '""').replace(/\n/g, " ")}"`);
      }
      csvRows.push(row.join(","));
    }
    const csvContent = csvRows.join("\n");
    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="data_trauma_analisis_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv"`
      }
    });
  } catch (error) {
    console.error("Export error:", error);
    return new Response("Error exporting data", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
