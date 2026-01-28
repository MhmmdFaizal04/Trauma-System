import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_C4W-8AKg.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_BjKl22Nn.mjs';
import { i as isAuthenticated, g as getTokenFromRequest, v as verifyToken } from '../../chunks/auth_BmMsmkeW.mjs';
import { s as sql } from '../../chunks/index_CzpMtbfQ.mjs';
/* empty css                                        */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  if (!isAuthenticated(Astro2.request)) {
    return Astro2.redirect("/admin/login");
  }
  const token = getTokenFromRequest(Astro2.request);
  const user = token ? verifyToken(token) : null;
  let allRespondents = [];
  let stats = { total: 0, analyzed: 0, pending: 0 };
  let aggregateStats = {
    topNegativeWords: [],
    sentimentOverview: { negative: 0, neutral: 0 },
    avgSentenceLength: 0,
    dominantPronoun: "Seimbang"
  };
  try {
    const respondents = await sql`
    SELECT id, session_id, age, gender, created_at 
    FROM respondents 
    ORDER BY created_at DESC
  `;
    const analysisData = await sql`SELECT * FROM analysis_results`;
    const analyzedMap = /* @__PURE__ */ new Map();
    analysisData.forEach((a) => analyzedMap.set(a.respondent_id, a));
    allRespondents = respondents.map((r) => ({
      id: r.id,
      sessionId: r.session_id,
      age: r.age,
      gender: r.gender,
      createdAt: r.created_at,
      isAnalyzed: analyzedMap.has(r.id)
    }));
    stats.total = allRespondents.length;
    stats.analyzed = analysisData.length;
    stats.pending = stats.total - stats.analyzed;
    if (stats.analyzed > 0) {
      const wordCounts = {};
      let totalSentLen = 0;
      let firstPersonTotal = 0;
      analysisData.forEach((data) => {
        const wf = data.word_frequency || {};
        Object.entries(wf).forEach(([w, c]) => {
          wordCounts[w] = (wordCounts[w] || 0) + c;
        });
        const sa = data.sentence_analysis || {};
        totalSentLen += sa.avgLength || 0;
        const pa = data.pronoun_analysis || {};
        if (pa.firstPerson > pa.thirdPerson) firstPersonTotal++;
      });
      aggregateStats.topNegativeWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([word, count]) => ({ word, count }));
      aggregateStats.avgSentenceLength = totalSentLen / stats.analyzed;
      const negativeCount = analysisData.filter((a) => (a.trauma_indicators?.length || 0) > 0).length;
      aggregateStats.sentimentOverview = {
        negative: negativeCount,
        neutral: stats.analyzed - negativeCount
      };
      aggregateStats.dominantPronoun = firstPersonTotal > stats.analyzed / 2 ? "Dominan Orang Pertama" : "Dominan Orang Ketiga/Seimbang";
    }
  } catch (error) {
    console.error("Database error:", error);
  }
  function formatDate(date) {
    return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" }).format(new Date(date));
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dashboard Admin", "data-astro-cid-x6qnsptu": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-wrapper" data-astro-cid-x6qnsptu> <!-- Navbar simple for admin --> <nav class="admin-nav" data-astro-cid-x6qnsptu> <div class="nav-brand" data-astro-cid-x6qnsptu> <i class="bi bi-shield-lock-fill" data-astro-cid-x6qnsptu></i> Panel Admin
</div> <div class="user-menu" data-astro-cid-x6qnsptu> <span data-astro-cid-x6qnsptu>Halo, ${user?.username || "Admin"}</span> <button id="logout-btn" class="btn-logout" data-astro-cid-x6qnsptu><i class="bi bi-box-arrow-right" data-astro-cid-x6qnsptu></i></button> </div> </nav> <main class="dashboard-content" data-astro-cid-x6qnsptu> <div class="container" data-astro-cid-x6qnsptu> <!-- Header Section --> <header class="page-header" data-astro-cid-x6qnsptu> <div data-astro-cid-x6qnsptu> <h1 data-astro-cid-x6qnsptu>Dashboard Analisis</h1> <p class="subtitle" data-astro-cid-x6qnsptu>Overview data ${stats.total} responden siswa</p> </div> <div class="header-actions" data-astro-cid-x6qnsptu> <!-- Batch Action --> ${stats.pending > 0 && renderTemplate`<button id="batch-analyze-btn" class="btn btn-primary pulse-animation" data-astro-cid-x6qnsptu> <i class="bi bi-lightning-charge-fill" data-astro-cid-x6qnsptu></i>
Analisis ${stats.pending} Data Baru
</button>`} <a href="/api/admin/export" class="btn btn-secondary" target="_blank" data-astro-cid-x6qnsptu> <i class="bi bi-file-earmark-spreadsheet-fill" data-astro-cid-x6qnsptu></i> Export CSV
</a> <button id="init-db-btn" class="btn btn-sm btn-outline" title="Reset/Init DB" data-astro-cid-x6qnsptu> <i class="bi bi-database" data-astro-cid-x6qnsptu></i> </button> </div> </header> <!-- Stats Row --> <div class="stats-row" data-astro-cid-x6qnsptu> <div class="stat-card" data-astro-cid-x6qnsptu> <div class="stat-icon bg-blue" data-astro-cid-x6qnsptu><i class="bi bi-people-fill" data-astro-cid-x6qnsptu></i></div> <div class="stat-data" data-astro-cid-x6qnsptu> <h3 data-astro-cid-x6qnsptu>${stats.total}</h3> <span data-astro-cid-x6qnsptu>Total Responden</span> </div> </div> <div class="stat-card" data-astro-cid-x6qnsptu> <div class="stat-icon bg-green" data-astro-cid-x6qnsptu><i class="bi bi-check-lg" data-astro-cid-x6qnsptu></i></div> <div class="stat-data" data-astro-cid-x6qnsptu> <h3 data-astro-cid-x6qnsptu>${stats.analyzed}</h3> <span data-astro-cid-x6qnsptu>Sudah Dianalisis</span> </div> </div> <div class="stat-card" data-astro-cid-x6qnsptu> <div class="stat-icon bg-orange" data-astro-cid-x6qnsptu><i class="bi bi-hourglass-split" data-astro-cid-x6qnsptu></i></div> <div class="stat-data" data-astro-cid-x6qnsptu> <h3 data-astro-cid-x6qnsptu>${stats.pending}</h3> <span data-astro-cid-x6qnsptu>Menunggu</span> </div> </div> </div> <!-- Aggregate Analysis Section (Only if analyzed data exists) --> ${stats.analyzed > 0 && renderTemplate`<section class="aggregate-section" data-astro-cid-x6qnsptu> <div class="section-title" data-astro-cid-x6qnsptu> <h2 data-astro-cid-x6qnsptu><i class="bi bi-bar-chart-fill" data-astro-cid-x6qnsptu></i> Ringkasan Kolektif</h2> <span class="badge badge-info" data-astro-cid-x6qnsptu>Hasil dari ${stats.analyzed} data</span> </div> <div class="charts-grid" data-astro-cid-x6qnsptu> <!-- Top Words Card --> <div class="chart-card" data-astro-cid-x6qnsptu> <h3 data-astro-cid-x6qnsptu>Top 5 Kata Negatif Terdeteksi</h3> <div class="word-list" data-astro-cid-x6qnsptu> ${aggregateStats.topNegativeWords.map((item, idx) => renderTemplate`<div class="word-item" data-astro-cid-x6qnsptu> <span class="rank" data-astro-cid-x6qnsptu>#${idx + 1}</span> <span class="word" data-astro-cid-x6qnsptu>${item.word}</span> <div class="bar-container" data-astro-cid-x6qnsptu> <div class="bar"${addAttribute(`width: ${Math.min(100, item.count / stats.analyzed * 200)}%`, "style")} data-astro-cid-x6qnsptu></div> </div> <span class="count" data-astro-cid-x6qnsptu>${item.count}</span> </div>`)} ${aggregateStats.topNegativeWords.length === 0 && renderTemplate`<p class="empty-msg" data-astro-cid-x6qnsptu>Belum ada kata negatif signifikan.</p>`} </div> </div> <!-- Sentiment Summary Card --> <div class="chart-card" data-astro-cid-x6qnsptu> <h3 data-astro-cid-x6qnsptu>Deteksi Indikator</h3> <div class="sentiment-box" data-astro-cid-x6qnsptu> <div class="sentiment-item negative" data-astro-cid-x6qnsptu> <span class="number" data-astro-cid-x6qnsptu>${aggregateStats.sentimentOverview.negative}</span> <span class="label" data-astro-cid-x6qnsptu>Terindikasi Pola Emosional</span> </div> <div class="sentiment-item neutral" data-astro-cid-x6qnsptu> <span class="number" data-astro-cid-x6qnsptu>${aggregateStats.sentimentOverview.neutral}</span> <span class="label" data-astro-cid-x6qnsptu>Narasi Netral/Normal</span> </div> </div> <div class="mini-stat" data-astro-cid-x6qnsptu> <span data-astro-cid-x6qnsptu>Rata-rata Panjang Kalimat: <strong data-astro-cid-x6qnsptu>${aggregateStats.avgSentenceLength.toFixed(1)} kata</strong></span> </div> </div> </div> </section>`} <!-- Data Table --> <section class="table-section" data-astro-cid-x6qnsptu> <h2 data-astro-cid-x6qnsptu>Data Responden Terbaru</h2> <div class="table-responsive" data-astro-cid-x6qnsptu> <table class="data-table" data-astro-cid-x6qnsptu> <thead data-astro-cid-x6qnsptu> <tr data-astro-cid-x6qnsptu> <th data-astro-cid-x6qnsptu>User ID</th> <th data-astro-cid-x6qnsptu>Tanggal</th> <th data-astro-cid-x6qnsptu>Gender</th> <th data-astro-cid-x6qnsptu>Status</th> <th data-astro-cid-x6qnsptu>Aksi</th> </tr> </thead> <tbody data-astro-cid-x6qnsptu> ${allRespondents.slice(0, 50).map((r) => renderTemplate`<tr data-astro-cid-x6qnsptu> <td class="code-font" data-astro-cid-x6qnsptu>${r.sessionId.substring(0, 8)}...</td> <td data-astro-cid-x6qnsptu>${formatDate(r.createdAt)}</td> <td data-astro-cid-x6qnsptu>${r.gender || "-"}</td> <td data-astro-cid-x6qnsptu> ${r.isAnalyzed ? renderTemplate`<span class="status-pill success" data-astro-cid-x6qnsptu><i class="bi bi-check-circle-fill" data-astro-cid-x6qnsptu></i> Selesai</span>` : renderTemplate`<span class="status-pill warning" data-astro-cid-x6qnsptu><i class="bi bi-clock-fill" data-astro-cid-x6qnsptu></i> Pending</span>`} </td> <td data-astro-cid-x6qnsptu> <a${addAttribute(`/admin/analisis/${r.id}`, "href")} class="btn-icon" title="Lihat Detail" data-astro-cid-x6qnsptu> <i class="bi bi-eye-fill" data-astro-cid-x6qnsptu></i> </a> </td> </tr>`)} </tbody> </table> </div> ${allRespondents.length > 50 && renderTemplate`<p class="text-center mt-2 text-muted" data-astro-cid-x6qnsptu>Menampilkan 50 data terbaru...</p>`} </section> </div> </main> </div> ` })} ${renderScript($$result, "E:/Belajar/BU_DARNI/trauma_analisis/src/pages/admin/dashboard.astro?astro&type=script&index=0&lang.ts")} `;
}, "E:/Belajar/BU_DARNI/trauma_analisis/src/pages/admin/dashboard.astro", void 0);

const $$file = "E:/Belajar/BU_DARNI/trauma_analisis/src/pages/admin/dashboard.astro";
const $$url = "/admin/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
