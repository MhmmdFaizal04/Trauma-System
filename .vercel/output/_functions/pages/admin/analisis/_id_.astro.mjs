import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../../chunks/astro/server_C4W-8AKg.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../../chunks/Layout_BjKl22Nn.mjs';
import { i as isAuthenticated, g as getTokenFromRequest, v as verifyToken } from '../../../chunks/auth_BmMsmkeW.mjs';
import { s as sql } from '../../../chunks/index_CzpMtbfQ.mjs';
/* empty css                                      */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  if (!isAuthenticated(Astro2.request)) {
    return Astro2.redirect("/admin/login");
  }
  const token = getTokenFromRequest(Astro2.request);
  const user = token ? verifyToken(token) : null;
  const { id } = Astro2.params;
  if (!id) {
    return Astro2.redirect("/admin/dashboard");
  }
  let respondent = null;
  let allResponses = [];
  let analysis = null;
  try {
    const respondentData = await sql`
    SELECT id, session_id, age, gender, created_at
    FROM respondents
    WHERE id = ${id}
    LIMIT 1
  `;
    if (respondentData.length > 0) {
      respondent = {
        id: respondentData[0].id,
        sessionId: respondentData[0].session_id,
        age: respondentData[0].age,
        gender: respondentData[0].gender,
        createdAt: respondentData[0].created_at
      };
      const responsesData = await sql`
      SELECT id, question_number, answer
      FROM responses
      WHERE respondent_id = ${id}
      ORDER BY question_number ASC
    `;
      allResponses = responsesData.map((r) => ({
        id: r.id,
        questionNumber: r.question_number,
        answer: r.answer
      }));
      const analysisData = await sql`
      SELECT * FROM analysis_results
      WHERE respondent_id = ${id}
      LIMIT 1
    `;
      if (analysisData.length > 0) {
        analysis = {
          wordFrequency: analysisData[0].word_frequency,
          sentenceAnalysis: analysisData[0].sentence_analysis,
          pronounAnalysis: analysisData[0].pronoun_analysis,
          traumaIndicators: analysisData[0].trauma_indicators,
          summary: analysisData[0].summary
        };
      }
    }
  } catch (error) {
    console.error("Database error:", error);
  }
  if (!respondent) {
    return Astro2.redirect("/admin/dashboard");
  }
  function formatDate(date) {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(date));
  }
  const questionLabels = {
    1: "Usia",
    2: "Jenis Kelamin",
    3: "Pengalaman membekas",
    4: "Perasaan saat menghadapi masalah",
    5: "Kata-kata yang sering muncul di pikiran",
    6: "Hari yang paling berat",
    7: "Aktivitas setelah pulang sekolah",
    8: "Hal yang ingin diubah",
    9: "Yang membuat aman dan nyaman",
    10: "Kekhawatiran",
    11: "Hubungan dengan orang terdekat",
    12: "Siapa yang biasanya disalahkan",
    13: "Frekuensi sedih tanpa alasan",
    14: "Frekuensi mimpi buruk / sulit tidur",
    15: "Perasaan tentang masa depan"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Detail Analisis", "data-astro-cid-lihpohrn": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-wrapper" data-astro-cid-lihpohrn> <!-- Navbar (Same as Dashboard) --> <nav class="admin-nav" data-astro-cid-lihpohrn> <div class="nav-brand" data-astro-cid-lihpohrn> <i class="bi bi-shield-lock-fill" data-astro-cid-lihpohrn></i> <span data-astro-cid-lihpohrn>Panel Admin</span> </div> <div class="user-menu" data-astro-cid-lihpohrn> <span data-astro-cid-lihpohrn>Halo, ${user?.username || "Admin"}</span> <button id="logout-btn" class="btn-logout" title="Keluar" data-astro-cid-lihpohrn> <i class="bi bi-box-arrow-right" data-astro-cid-lihpohrn></i> </button> </div> </nav> <main class="dashboard-content" data-astro-cid-lihpohrn> <div class="container" data-astro-cid-lihpohrn> <!-- Breadcrumb / Header --> <header class="page-header" data-astro-cid-lihpohrn> <a href="/admin/dashboard" class="back-btn" data-astro-cid-lihpohrn> <i class="bi bi-arrow-left" data-astro-cid-lihpohrn></i> Kembali ke Dashboard
</a> <div class="header-main" data-astro-cid-lihpohrn> <div class="title-group" data-astro-cid-lihpohrn> <h1 data-astro-cid-lihpohrn><i class="bi bi-file-earmark-person-fill text-primary" data-astro-cid-lihpohrn></i> Detail Responden</h1> <span class="session-badge" title="Session ID" data-astro-cid-lihpohrn>#${respondent.sessionId.substring(0, 8)}</span> </div> <p class="subtitle" data-astro-cid-lihpohrn>Disubmit pada ${formatDate(respondent.createdAt)}</p> </div> </header> <div class="content-grid" data-astro-cid-lihpohrn> <!-- Left Column: Info & Status --> <aside class="left-col" data-astro-cid-lihpohrn> <!-- Info Card --> <div class="card info-card" data-astro-cid-lihpohrn> <div class="card-header-sm" data-astro-cid-lihpohrn> <h3 data-astro-cid-lihpohrn><i class="bi bi-person-vcard" data-astro-cid-lihpohrn></i> Informasi Dasar</h3> </div> <div class="info-list" data-astro-cid-lihpohrn> <div class="info-item" data-astro-cid-lihpohrn> <span class="label" data-astro-cid-lihpohrn><i class="bi bi-calendar-event" data-astro-cid-lihpohrn></i> Tanggal</span> <span class="value" data-astro-cid-lihpohrn>${formatDate(respondent.createdAt)}</span> </div> <div class="info-item" data-astro-cid-lihpohrn> <span class="label" data-astro-cid-lihpohrn><i class="bi bi-person" data-astro-cid-lihpohrn></i> Usia</span> <span class="value" data-astro-cid-lihpohrn>${respondent.age ? `${respondent.age} Tahun` : "-"}</span> </div> <div class="info-item" data-astro-cid-lihpohrn> <span class="label" data-astro-cid-lihpohrn><i class="bi bi-gender-ambiguous" data-astro-cid-lihpohrn></i> Gender</span> <span class="value" data-astro-cid-lihpohrn>${respondent.gender || "-"}</span> </div> </div> </div> <!-- Status Card --> ${analysis ? renderTemplate`<div class="card status-card success" data-astro-cid-lihpohrn> <div class="status-icon" data-astro-cid-lihpohrn> <i class="bi bi-check-circle-fill" data-astro-cid-lihpohrn></i> </div> <div class="status-content" data-astro-cid-lihpohrn> <h4 data-astro-cid-lihpohrn>Analisis Selesai</h4> <p data-astro-cid-lihpohrn>Data telah diproses oleh sistem.</p> </div> </div>` : renderTemplate`<div class="card status-card warning" data-astro-cid-lihpohrn> <div class="status-icon" data-astro-cid-lihpohrn> <i class="bi bi-exclamation-circle-fill" data-astro-cid-lihpohrn></i> </div> <div class="status-content" data-astro-cid-lihpohrn> <h4 data-astro-cid-lihpohrn>Belum Dianalisis</h4> <p data-astro-cid-lihpohrn>Lakukan analisis untuk melihat hasil.</p> <button id="analyze-btn" class="btn btn-primary btn-sm btn-block mt-2"${addAttribute(id, "data-id")} data-astro-cid-lihpohrn> <i class="bi bi-lightning-charge-fill" data-astro-cid-lihpohrn></i> Proses Sekarang
</button> </div> </div>`} <!-- Summary Card --> ${analysis?.summary && renderTemplate`<div class="card summary-card" data-astro-cid-lihpohrn> <div class="card-header-sm" data-astro-cid-lihpohrn> <h3 data-astro-cid-lihpohrn><i class="bi bi-stars text-warning" data-astro-cid-lihpohrn></i> Ringkasan AI</h3> </div> <div class="summary-body" data-astro-cid-lihpohrn> <p data-astro-cid-lihpohrn>${analysis.summary}</p> ${analysis.traumaIndicators && analysis.traumaIndicators.length > 0 && renderTemplate`<div class="indicators" data-astro-cid-lihpohrn> <strong data-astro-cid-lihpohrn><i class="bi bi-flag-fill text-danger" data-astro-cid-lihpohrn></i> Terindikasi:</strong> <ul data-astro-cid-lihpohrn> ${analysis.traumaIndicators.map((ind) => renderTemplate`<li data-astro-cid-lihpohrn>${ind}</li>`)} </ul> </div>`} </div> </div>`} </aside> <!-- Right Column: Results & Answers --> <div class="right-col" data-astro-cid-lihpohrn> <!-- Analysis Visuals (If available) --> ${analysis && renderTemplate`<div class="card analysis-result-card" data-astro-cid-lihpohrn> <div class="card-header" data-astro-cid-lihpohrn> <h2 data-astro-cid-lihpohrn><i class="bi bi-bar-chart-line-fill text-primary" data-astro-cid-lihpohrn></i> Hasil Analisis Linguistik</h2> </div> <div class="card-body" data-astro-cid-lihpohrn> <div class="metrics-row" data-astro-cid-lihpohrn> <!-- Word Freq --> <div class="metric-box" data-astro-cid-lihpohrn> <h4 data-astro-cid-lihpohrn><i class="bi bi-chat-quote-fill text-muted" data-astro-cid-lihpohrn></i> Kata Negatif Dominan</h4> <div class="tags" data-astro-cid-lihpohrn> ${analysis.wordFrequency && Object.entries(analysis.wordFrequency).length > 0 ? Object.entries(analysis.wordFrequency).slice(0, 5).map(([w, c]) => renderTemplate`<span class="tag" data-astro-cid-lihpohrn>${w} <span class="count" data-astro-cid-lihpohrn>${c}</span></span>`) : renderTemplate`<span class="text-muted empty-text" data-astro-cid-lihpohrn>Tidak ada kata negatif signifikan</span>`} </div> </div> <!-- Pronouns --> <div class="metric-box" data-astro-cid-lihpohrn> <h4 data-astro-cid-lihpohrn><i class="bi bi-person-bounding-box text-muted" data-astro-cid-lihpohrn></i> Sudut Pandang</h4> <div class="pronoun-stats" data-astro-cid-lihpohrn> <div class="stat-row" data-astro-cid-lihpohrn> <span data-astro-cid-lihpohrn>Aku/Saya</span> <strong data-astro-cid-lihpohrn>${analysis.pronounAnalysis?.firstPerson || 0}%</strong> </div> <div class="progress-mini" data-astro-cid-lihpohrn> <div class="progress-fill"${addAttribute(`width:${analysis.pronounAnalysis?.firstPerson || 0}%`, "style")} data-astro-cid-lihpohrn></div> </div> </div> </div> </div> </div> </div>`} <!-- Q&A List --> <div class="card qa-card" data-astro-cid-lihpohrn> <div class="card-header" data-astro-cid-lihpohrn> <h2 data-astro-cid-lihpohrn><i class="bi bi-file-text-fill text-primary" data-astro-cid-lihpohrn></i> Jawaban Lengkap Kuisioner</h2> </div> <div class="qa-list" data-astro-cid-lihpohrn> ${allResponses.map((r, index) => renderTemplate`<div class="qa-item" data-astro-cid-lihpohrn> <div class="q-badge" data-astro-cid-lihpohrn> <span class="q-num" data-astro-cid-lihpohrn>${r.questionNumber}</span> </div> <div class="q-content" data-astro-cid-lihpohrn> <p class="question" data-astro-cid-lihpohrn>${questionLabels[r.questionNumber] || `Pertanyaan ${r.questionNumber}`}</p> <div class="answer-box" data-astro-cid-lihpohrn> <p data-astro-cid-lihpohrn>${r.answer || "-"}</p> </div> </div> </div>`)} </div> </div> </div> </div> </div> </main> </div> ` })} ${renderScript($$result, "E:/Belajar/BU_DARNI/trauma_analisis/src/pages/admin/analisis/[id].astro?astro&type=script&index=0&lang.ts")} `;
}, "E:/Belajar/BU_DARNI/trauma_analisis/src/pages/admin/analisis/[id].astro", void 0);

const $$file = "E:/Belajar/BU_DARNI/trauma_analisis/src/pages/admin/analisis/[id].astro";
const $$url = "/admin/analisis/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
