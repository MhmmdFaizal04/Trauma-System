import { s as sql } from '../../../../chunks/index_CzpMtbfQ.mjs';
import { i as isAuthenticated } from '../../../../chunks/auth_BmMsmkeW.mjs';
export { renderers } from '../../../../renderers.mjs';

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
    if (matches && matches.length > 0) {
      wordFrequency[negWord] = matches.length;
    }
  }
  const sortedFrequency = Object.fromEntries(
    Object.entries(wordFrequency).sort(([, a], [, b]) => b - a).slice(0, 10)
  );
  const sentenceLengths = sentences.map((s) => s.trim().split(/\s+/).length);
  const avgLength = sentenceLengths.length > 0 ? sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length : 0;
  const shortSentences = sentenceLengths.filter((len) => len < 5).length;
  const shortPercentage = sentenceLengths.length > 0 ? shortSentences / sentenceLengths.length * 100 : 0;
  const fragmented = shortPercentage > 40 && avgLength < 8;
  const sentenceAnalysis = {
    avgLength,
    shortPercentage,
    fragmented,
    totalSentences: sentences.length
  };
  let firstPersonCount = 0;
  let thirdPersonCount = 0;
  for (const word of words) {
    const cleanWord = word.replace(/[^a-zA-Z]/g, "");
    if (FIRST_PERSON_PRONOUNS.includes(cleanWord)) {
      firstPersonCount++;
    }
    if (THIRD_PERSON_PRONOUNS.includes(cleanWord)) {
      thirdPersonCount++;
    }
  }
  const totalPronouns = firstPersonCount + thirdPersonCount;
  const pronounAnalysis = {
    firstPerson: totalPronouns > 0 ? Math.round(firstPersonCount / totalPronouns * 100) : 0,
    thirdPerson: totalPronouns > 0 ? Math.round(thirdPersonCount / totalPronouns * 100) : 0,
    totalPronouns
  };
  const traumaIndicators = [];
  const negativeWordCount = Object.values(sortedFrequency).reduce((a, b) => a + b, 0);
  if (negativeWordCount > 5) {
    traumaIndicators.push("Penggunaan kata negatif yang tinggi");
  }
  if (fragmented) {
    traumaIndicators.push("Pola narasi yang terputus-putus");
  }
  if (pronounAnalysis.firstPerson > 80) {
    traumaIndicators.push("Fokus berlebihan pada diri sendiri");
  }
  const concerningPatterns = ["bunuh diri", "mau mati", "ingin mati", "tidak mau hidup"];
  for (const pattern of concerningPatterns) {
    if (allText.includes(pattern)) {
      traumaIndicators.push("Pola pikiran yang perlu perhatian khusus");
      break;
    }
  }
  let summary = "Berdasarkan analisis linguistik: ";
  if (Object.keys(sortedFrequency).length > 0) {
    const topWords = Object.keys(sortedFrequency).slice(0, 3).join(", ");
    summary += `Kata-kata negatif yang sering muncul: ${topWords}. `;
  } else {
    summary += "Tidak ditemukan kata negatif yang signifikan. ";
  }
  if (fragmented) {
    summary += "Struktur narasi cenderung terputus dengan kalimat-kalimat pendek. ";
  } else {
    summary += "Struktur narasi cukup koheren. ";
  }
  if (pronounAnalysis.firstPerson > pronounAnalysis.thirdPerson) {
    summary += `Sudut pandang dominan orang pertama (${pronounAnalysis.firstPerson}%).`;
  } else if (pronounAnalysis.thirdPerson > pronounAnalysis.firstPerson) {
    summary += `Sudut pandang cenderung menggunakan orang ketiga (${pronounAnalysis.thirdPerson}%).`;
  }
  return {
    wordFrequency: sortedFrequency,
    sentenceAnalysis,
    pronounAnalysis,
    traumaIndicators,
    summary
  };
}
const POST = async ({ params, request }) => {
  if (!isAuthenticated(request)) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  const { id } = params;
  if (!id) {
    return new Response(
      JSON.stringify({ error: "ID diperlukan" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    const existingAnalysis = await sql`
      SELECT id FROM analysis_results WHERE respondent_id = ${id} LIMIT 1
    `;
    if (existingAnalysis.length > 0) {
      return new Response(
        JSON.stringify({ error: "Data sudah dianalisis" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const textResponses = await sql`
      SELECT answer, question_number 
      FROM responses 
      WHERE respondent_id = ${id}
    `;
    const relevantQuestions = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15];
    const texts = textResponses.filter((r) => relevantQuestions.includes(r.question_number)).map((r) => r.answer);
    if (texts.length === 0) {
      return new Response(
        JSON.stringify({ error: "Tidak ada teks untuk dianalisis" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const analysis = analyzeText(texts);
    await sql`
      INSERT INTO analysis_results (
        respondent_id, word_frequency, sentence_analysis, pronoun_analysis, trauma_indicators, summary
      ) VALUES (
        ${id}, 
        ${JSON.stringify(analysis.wordFrequency)}, 
        ${JSON.stringify(analysis.sentenceAnalysis)}, 
        ${JSON.stringify(analysis.pronounAnalysis)}, 
        ${JSON.stringify(analysis.traumaIndicators)}, 
        ${analysis.summary}
      )
    `;
    return new Response(
      JSON.stringify({ success: true, analysis }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Analysis error:", error);
    return new Response(
      JSON.stringify({ error: "Gagal melakukan analisis" }),
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
