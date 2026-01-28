import { s as sql } from '../../../chunks/index_CzpMtbfQ.mjs';
import { i as isAuthenticated } from '../../../chunks/auth_BmMsmkeW.mjs';
export { renderers } from '../../../renderers.mjs';

const NEGATIVE_WORDS = [
  "sedih",
  "takut",
  "marah",
  "benci",
  "sakit",
  "susah",
  "sulit",
  "buruk",
  "gagal",
  "bodoh",
  "jelek",
  "jahat",
  "mati",
  "bunuh",
  "sendirian",
  "kesepian",
  "ditinggal",
  "dibuang",
  "dipukul",
  "dimarahi",
  "trauma",
  "kecewa",
  "putus asa",
  "menyesal",
  "menderita",
  "menangis",
  "nangis",
  "gelap",
  "hopeless",
  "tidak berguna",
  "tidak berharga",
  "tidak ada gunanya",
  "bosan",
  "capek",
  "lelah",
  "stress",
  "tertekan",
  "anxiety",
  "cemas",
  "khawatir",
  "panik",
  "ngeri",
  "horor",
  "mimpi buruk",
  "takut",
  "phobia",
  "depresi",
  "bunuh diri",
  "mau mati",
  "ingin mati",
  "tidak mau hidup"
];
const FIRST_PERSON_PRONOUNS = ["aku", "saya", "ku", "gue", "gw", "aq", "diriku"];
const THIRD_PERSON_PRONOUNS = ["dia", "ia", "mereka", "beliau", "nya"];
function analyzeText(texts) {
  const allText = texts.join(" ").toLowerCase();
  const words = allText.split(/\s+/);
  const sentences = allText.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const wordFrequency = {};
  for (const negWord of NEGATIVE_WORDS) {
    const regex = new RegExp(`\\b${negWord}\\b`, "gi");
    const matches = allText.match(regex);
    if (matches && matches.length > 0) wordFrequency[negWord] = matches.length;
  }
  const sortedFrequency = Object.fromEntries(Object.entries(wordFrequency).sort(([, a], [, b]) => b - a).slice(0, 10));
  const sentenceLengths = sentences.map((s) => s.trim().split(/\s+/).length);
  const avgLength = sentenceLengths.length > 0 ? sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length : 0;
  const shortSentences = sentenceLengths.filter((len) => len < 5).length;
  const shortPercentage = sentenceLengths.length > 0 ? shortSentences / sentenceLengths.length * 100 : 0;
  const fragmented = shortPercentage > 40 && avgLength < 8;
  const sentenceAnalysis = { avgLength, shortPercentage, fragmented, totalSentences: sentences.length };
  let firstPersonCount = 0, thirdPersonCount = 0;
  for (const word of words) {
    const cleanWord = word.replace(/[^a-zA-Z]/g, "");
    if (FIRST_PERSON_PRONOUNS.includes(cleanWord)) firstPersonCount++;
    if (THIRD_PERSON_PRONOUNS.includes(cleanWord)) thirdPersonCount++;
  }
  const totalPronouns = firstPersonCount + thirdPersonCount;
  const pronounAnalysis = {
    firstPerson: totalPronouns > 0 ? Math.round(firstPersonCount / totalPronouns * 100) : 0,
    thirdPerson: totalPronouns > 0 ? Math.round(thirdPersonCount / totalPronouns * 100) : 0,
    totalPronouns
  };
  const traumaIndicators = [];
  const negativeWordCount = Object.values(sortedFrequency).reduce((a, b) => a + b, 0);
  if (negativeWordCount > 5) traumaIndicators.push("Penggunaan kata negatif yang tinggi");
  if (fragmented) traumaIndicators.push("Pola narasi yang terputus-putus");
  if (pronounAnalysis.firstPerson > 80) traumaIndicators.push("Fokus berlebihan pada diri sendiri");
  let summary = "Berdasarkan analisis linguistik: ";
  if (Object.keys(sortedFrequency).length > 0) summary += `Dominan kata negatif: ${Object.keys(sortedFrequency).slice(0, 3).join(", ")}. `;
  else summary += "Tidak ditemukan kata negatif signifikan. ";
  if (fragmented) summary += "Struktur narasi terputus. ";
  return { wordFrequency: sortedFrequency, sentenceAnalysis, pronounAnalysis, traumaIndicators, summary };
}
const POST = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    const pendingRespondents = await sql`
      SELECT r.id 
      FROM respondents r
      LEFT JOIN analysis_results a ON r.id = a.respondent_id
      WHERE a.id IS NULL
    `;
    if (pendingRespondents.length === 0) {
      return new Response(JSON.stringify({ message: "Semua data sudah dianalisis", count: 0 }), { status: 200 });
    }
    let successCount = 0;
    for (const respondent of pendingRespondents) {
      const textResponses = await sql`
        SELECT answer, question_number 
        FROM responses 
        WHERE respondent_id = ${respondent.id}
      `;
      const relevantQuestions = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15];
      const texts = textResponses.filter((r) => relevantQuestions.includes(r.question_number)).map((r) => r.answer);
      if (texts.length > 0) {
        const analysis = analyzeText(texts);
        await sql`
          INSERT INTO analysis_results (
            respondent_id, word_frequency, sentence_analysis, pronoun_analysis, trauma_indicators, summary
          ) VALUES (
            ${respondent.id}, 
            ${JSON.stringify(analysis.wordFrequency)}, 
            ${JSON.stringify(analysis.sentenceAnalysis)}, 
            ${JSON.stringify(analysis.pronounAnalysis)}, 
            ${JSON.stringify(analysis.traumaIndicators)}, 
            ${analysis.summary}
          )
        `;
        successCount++;
      }
    }
    return new Response(
      JSON.stringify({ success: true, count: successCount, message: `Berhasil menganalisis ${successCount} data` }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Batch analysis error:", error);
    return new Response(JSON.stringify({ error: "Gagal melakukan analisis masal" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
