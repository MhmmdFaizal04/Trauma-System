import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, h as createAstro, n as defineScriptVars, k as renderComponent } from '../chunks/astro/server_BgSvE7da.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_C9uI10gY.mjs';
import { $ as $$Header, a as $$Footer } from '../chunks/Footer_6j0fvkXZ.mjs';
import 'clsx';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$QuestionCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$QuestionCard;
  const {
    number,
    question,
    type,
    options = [],
    hint,
    required = true
  } = Astro2.props;
  const inputName = `question_${number}`;
  return renderTemplate`${maybeRenderHead()}<div class="question-card" data-astro-cid-r364hnea> <div class="question-header" data-astro-cid-r364hnea> <span class="question-number" data-astro-cid-r364hnea>${number}</span> <h3 class="question-text" data-astro-cid-r364hnea>${question}</h3> </div> <div class="question-body" data-astro-cid-r364hnea> ${type === "text" && renderTemplate`<input type="text"${addAttribute(inputName, "name")}${addAttribute(inputName, "id")} class="input-field"${addAttribute(required, "required")} placeholder="Ketik jawaban Anda di sini..." data-astro-cid-r364hnea>`} ${type === "textarea" && renderTemplate`<textarea${addAttribute(inputName, "name")}${addAttribute(inputName, "id")} class="textarea-field"${addAttribute(required, "required")} placeholder="Ceritakan dengan detail..." rows="6" data-astro-cid-r364hnea></textarea>`} ${type === "radio" && options.length > 0 && renderTemplate`<div class="radio-group" data-astro-cid-r364hnea> ${options.map((option, idx) => renderTemplate`<label class="radio-option" data-astro-cid-r364hnea> <input type="radio"${addAttribute(inputName, "name")}${addAttribute(option, "value")}${addAttribute(required, "required")} data-astro-cid-r364hnea> <span class="radio-label" data-astro-cid-r364hnea>${option}</span> </label>`)} </div>`} ${hint && renderTemplate`<p class="form-hint" data-astro-cid-r364hnea> <i class="bi bi-info-circle" data-astro-cid-r364hnea></i> ${hint} </p>`} </div> </div> `;
}, "E:/Belajar/BU_DARNI/trauma_analisis/src/components/QuestionCard.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Kuisioner = createComponent(async ($$result, $$props, $$slots) => {
  const questions = [
    // Bagian 1: Data Demografi
    {
      number: 1,
      question: "Berapa usia kamu saat ini?",
      type: "radio",
      options: ["12 tahun", "13 tahun", "14 tahun", "15 tahun", "16 tahun"],
      category: "demografi"
    },
    {
      number: 2,
      question: "Apa jenis kelamin kamu?",
      type: "radio",
      options: ["Laki-laki", "Perempuan"],
      category: "demografi"
    },
    // Bagian 2: Pilihan Kata (Diksi)
    {
      number: 3,
      question: "Ceritakan pengalaman yang paling membekas dalam hidupmu. Tulislah dengan bebas dan sejujur mungkin.",
      type: "textarea",
      hint: "Tidak ada jawaban benar atau salah. Ceritakan dengan bahasamu sendiri.",
      category: "diksi"
    },
    {
      number: 4,
      question: "Ketika menghadapi masalah, perasaan apa yang biasanya kamu rasakan? Jelaskan dengan detail.",
      type: "textarea",
      category: "diksi"
    },
    {
      number: 5,
      question: "Tuliskan kata-kata yang sering muncul di pikiranmu ketika kamu sedang sendiri.",
      type: "textarea",
      hint: "Misalnya: tenang, gelisah, senang, takut, dll.",
      category: "diksi"
    },
    // Bagian 3: Struktur Narasi
    {
      number: 6,
      question: "Ceritakan tentang hari yang menurutmu paling berat yang pernah kamu alami. Apa yang terjadi dari awal sampai akhir?",
      type: "textarea",
      hint: "Ceritakan secara berurutan dengan detail.",
      category: "struktur"
    },
    {
      number: 7,
      question: "Bagaimana kamu biasanya menghabiskan waktu setelah pulang sekolah? Ceritakan aktivitasmu.",
      type: "textarea",
      category: "struktur"
    },
    // Bagian 4: Tema
    {
      number: 8,
      question: "Jika kamu bisa mengubah satu hal dalam hidupmu, apa yang akan kamu ubah dan mengapa?",
      type: "textarea",
      category: "tema"
    },
    {
      number: 9,
      question: "Apa yang membuatmu merasa aman dan nyaman? Jelaskan.",
      type: "textarea",
      category: "tema"
    },
    {
      number: 10,
      question: "Apa yang paling sering kamu khawatirkan? Ceritakan tentang kekhawatiranmu.",
      type: "textarea",
      category: "tema"
    },
    // Bagian 5: Sudut Pandang
    {
      number: 11,
      question: "Ceritakan tentang hubunganmu dengan orang-orang terdekat (keluarga atau teman).",
      type: "textarea",
      hint: "Fokus pada bagaimana kamu melihat hubungan tersebut.",
      category: "sudut_pandang"
    },
    {
      number: 12,
      question: "Ketika terjadi masalah dengan orang lain, siapa yang biasanya kamu salahkan? Dirimu sendiri atau orang lain? Jelaskan.",
      type: "textarea",
      category: "sudut_pandang"
    },
    // Bagian 6: Indikator Emosional
    {
      number: 13,
      question: "Seberapa sering kamu merasa sedih tanpa alasan yang jelas?",
      type: "radio",
      options: [
        "Tidak pernah",
        "Jarang",
        "Kadang-kadang",
        "Sering",
        "Sangat sering"
      ],
      category: "emosional"
    },
    {
      number: 14,
      question: "Apakah kamu sering mengalami mimpi buruk atau sulit tidur?",
      type: "radio",
      options: [
        "Tidak pernah",
        "Jarang",
        "Kadang-kadang",
        "Sering",
        "Sangat sering"
      ],
      category: "emosional"
    },
    {
      number: 15,
      question: "Bagaimana perasaanmu tentang masa depan? Jelaskan harapan atau kekhawatiranmu.",
      type: "textarea",
      category: "emosional"
    }
  ];
  const totalQuestions = questions.length;
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", '\n    document.addEventListener("DOMContentLoaded", () => {\n        const form = document.getElementById("questionnaire-form");\n        const progressFill = document.getElementById("progress-fill");\n        const progressText = document.getElementById("progress-text");\n\n        function updateProgress() {\n            const inputs = form.querySelectorAll("input, textarea");\n            let answered = 0;\n\n            const questionNames = new Set();\n            inputs.forEach((input) => {\n                if (input.name) questionNames.add(input.name);\n            });\n\n            questionNames.forEach((name) => {\n                const elements = form.querySelectorAll(`[name="${name}"]`);\n                let isAnswered = false;\n\n                elements.forEach((el) => {\n                    if (el.type === "radio" || el.type === "checkbox") {\n                        if (el.checked) isAnswered = true;\n                    } else if (el.value.trim() !== "") {\n                        isAnswered = true;\n                    }\n                });\n\n                if (isAnswered) answered++;\n            });\n\n            const percentage = (answered / totalQuestions) * 100;\n            progressFill.style.width = percentage + "%";\n            progressText.textContent = `${answered}/${totalQuestions}`;\n        }\n\n        form.addEventListener("input", updateProgress);\n        form.addEventListener("change", updateProgress);\n\n        // Form submission\n        form.addEventListener("submit", async (e) => {\n            e.preventDefault();\n\n            const submitBtn = document.getElementById("submit-btn");\n            submitBtn.disabled = true;\n            submitBtn.innerHTML =\n                \'<i class="bi bi-hourglass-split"></i> Mengirim...\';\n\n            const formData = new FormData(form);\n            const data = {};\n\n            for (const [key, value] of formData.entries()) {\n                data[key] = value;\n            }\n\n            try {\n                const response = await fetch("/api/kuisioner", {\n                    method: "POST",\n                    headers: {\n                        "Content-Type": "application/json",\n                    },\n                    body: JSON.stringify(data),\n                });\n\n                if (response.ok) {\n                    window.location.href = "/terima-kasih";\n                } else {\n                    const result = await response.json();\n                    alert(\n                        "Gagal mengirim: " +\n                            (result.error || "Terjadi kesalahan"),\n                    );\n                    submitBtn.disabled = false;\n                    submitBtn.innerHTML =\n                        \'<i class="bi bi-send"></i> Kirim Jawaban\';\n                }\n            } catch (error) {\n                alert(\n                    "Terjadi kesalahan saat mengirim data. Silakan coba lagi.",\n                );\n                submitBtn.disabled = false;\n                submitBtn.innerHTML =\n                    \'<i class="bi bi-send"></i> Kirim Jawaban\';\n            }\n        });\n    });\n})();<\/script> '], ["", " <script>(function(){", '\n    document.addEventListener("DOMContentLoaded", () => {\n        const form = document.getElementById("questionnaire-form");\n        const progressFill = document.getElementById("progress-fill");\n        const progressText = document.getElementById("progress-text");\n\n        function updateProgress() {\n            const inputs = form.querySelectorAll("input, textarea");\n            let answered = 0;\n\n            const questionNames = new Set();\n            inputs.forEach((input) => {\n                if (input.name) questionNames.add(input.name);\n            });\n\n            questionNames.forEach((name) => {\n                const elements = form.querySelectorAll(\\`[name="\\${name}"]\\`);\n                let isAnswered = false;\n\n                elements.forEach((el) => {\n                    if (el.type === "radio" || el.type === "checkbox") {\n                        if (el.checked) isAnswered = true;\n                    } else if (el.value.trim() !== "") {\n                        isAnswered = true;\n                    }\n                });\n\n                if (isAnswered) answered++;\n            });\n\n            const percentage = (answered / totalQuestions) * 100;\n            progressFill.style.width = percentage + "%";\n            progressText.textContent = \\`\\${answered}/\\${totalQuestions}\\`;\n        }\n\n        form.addEventListener("input", updateProgress);\n        form.addEventListener("change", updateProgress);\n\n        // Form submission\n        form.addEventListener("submit", async (e) => {\n            e.preventDefault();\n\n            const submitBtn = document.getElementById("submit-btn");\n            submitBtn.disabled = true;\n            submitBtn.innerHTML =\n                \'<i class="bi bi-hourglass-split"></i> Mengirim...\';\n\n            const formData = new FormData(form);\n            const data = {};\n\n            for (const [key, value] of formData.entries()) {\n                data[key] = value;\n            }\n\n            try {\n                const response = await fetch("/api/kuisioner", {\n                    method: "POST",\n                    headers: {\n                        "Content-Type": "application/json",\n                    },\n                    body: JSON.stringify(data),\n                });\n\n                if (response.ok) {\n                    window.location.href = "/terima-kasih";\n                } else {\n                    const result = await response.json();\n                    alert(\n                        "Gagal mengirim: " +\n                            (result.error || "Terjadi kesalahan"),\n                    );\n                    submitBtn.disabled = false;\n                    submitBtn.innerHTML =\n                        \'<i class="bi bi-send"></i> Kirim Jawaban\';\n                }\n            } catch (error) {\n                alert(\n                    "Terjadi kesalahan saat mengirim data. Silakan coba lagi.",\n                );\n                submitBtn.disabled = false;\n                submitBtn.innerHTML =\n                    \'<i class="bi bi-send"></i> Kirim Jawaban\';\n            }\n        });\n    });\n})();<\/script> '])), renderComponent($$result, "Layout", $$Layout, { "title": "Kuisioner", "data-astro-cid-hsvw352w": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-wrapper" data-astro-cid-hsvw352w> ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-hsvw352w": true })} <main class="main-content" data-astro-cid-hsvw352w> <div class="container container-md" data-astro-cid-hsvw352w> <div class="intro-section" data-astro-cid-hsvw352w> <h1 data-astro-cid-hsvw352w> <i class="bi bi-clipboard2-check" data-astro-cid-hsvw352w></i> Kuisioner Deteksi Trauma
</h1> <p class="text-muted" data-astro-cid-hsvw352w>
Jawablah semua pertanyaan di bawah ini dengan jujur.
                        Tidak ada jawaban benar atau salah. Jawabanmu akan
                        membantu kami memahami kondisimu dengan lebih baik.
</p> <div class="progress-section" data-astro-cid-hsvw352w> <div class="progress-info" data-astro-cid-hsvw352w> <span data-astro-cid-hsvw352w>Progres Pengisian</span> <span id="progress-text" data-astro-cid-hsvw352w>0/${totalQuestions}</span> </div> <div class="progress-bar" data-astro-cid-hsvw352w> <div class="progress-bar-fill" id="progress-fill" style="width: 0%" data-astro-cid-hsvw352w></div> </div> </div> </div> <form id="questionnaire-form" method="POST" action="/api/kuisioner" data-astro-cid-hsvw352w> <!-- Bagian Demografi --> <div class="section-header" data-astro-cid-hsvw352w> <i class="bi bi-person-badge" data-astro-cid-hsvw352w></i> <h2 data-astro-cid-hsvw352w>Data Diri</h2> </div> ${questions.filter((q) => q.category === "demografi").map((q) => renderTemplate`${renderComponent($$result2, "QuestionCard", $$QuestionCard, { ...q, "data-astro-cid-hsvw352w": true })}`)} <!-- Bagian Pilihan Kata --> <div class="section-header" data-astro-cid-hsvw352w> <i class="bi bi-chat-quote" data-astro-cid-hsvw352w></i> <h2 data-astro-cid-hsvw352w>Pilihan Kata</h2> </div> ${questions.filter((q) => q.category === "diksi").map((q) => renderTemplate`${renderComponent($$result2, "QuestionCard", $$QuestionCard, { ...q, "data-astro-cid-hsvw352w": true })}`)} <!-- Bagian Struktur Narasi --> <div class="section-header" data-astro-cid-hsvw352w> <i class="bi bi-text-paragraph" data-astro-cid-hsvw352w></i> <h2 data-astro-cid-hsvw352w>Struktur Cerita</h2> </div> ${questions.filter((q) => q.category === "struktur").map((q) => renderTemplate`${renderComponent($$result2, "QuestionCard", $$QuestionCard, { ...q, "data-astro-cid-hsvw352w": true })}`)} <!-- Bagian Tema --> <div class="section-header" data-astro-cid-hsvw352w> <i class="bi bi-journal-text" data-astro-cid-hsvw352w></i> <h2 data-astro-cid-hsvw352w>Tema dan Perasaan</h2> </div> ${questions.filter((q) => q.category === "tema").map((q) => renderTemplate`${renderComponent($$result2, "QuestionCard", $$QuestionCard, { ...q, "data-astro-cid-hsvw352w": true })}`)} <!-- Bagian Sudut Pandang --> <div class="section-header" data-astro-cid-hsvw352w> <i class="bi bi-person-lines-fill" data-astro-cid-hsvw352w></i> <h2 data-astro-cid-hsvw352w>Sudut Pandang</h2> </div> ${questions.filter((q) => q.category === "sudut_pandang").map((q) => renderTemplate`${renderComponent($$result2, "QuestionCard", $$QuestionCard, { ...q, "data-astro-cid-hsvw352w": true })}`)} <!-- Bagian Indikator Emosional --> <div class="section-header" data-astro-cid-hsvw352w> <i class="bi bi-emoji-smile" data-astro-cid-hsvw352w></i> <h2 data-astro-cid-hsvw352w>Indikator Emosional</h2> </div> ${questions.filter((q) => q.category === "emosional").map((q) => renderTemplate`${renderComponent($$result2, "QuestionCard", $$QuestionCard, { ...q, "data-astro-cid-hsvw352w": true })}`)} <div class="submit-section" data-astro-cid-hsvw352w> <div class="alert alert-info" data-astro-cid-hsvw352w> <i class="bi bi-shield-check" data-astro-cid-hsvw352w></i> <span data-astro-cid-hsvw352w>Data yang kamu isi akan dijaga kerahasiaannya
                                dan hanya digunakan untuk keperluan analisis.</span> </div> <button type="submit" class="btn btn-primary btn-lg" id="submit-btn" data-astro-cid-hsvw352w> <i class="bi bi-send" data-astro-cid-hsvw352w></i>
Kirim Jawaban
</button> </div> </form> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-hsvw352w": true })} </div> ` }), defineScriptVars({ totalQuestions }));
}, "E:/Belajar/BU_DARNI/trauma_analisis/src/pages/kuisioner.astro", void 0);

const $$file = "E:/Belajar/BU_DARNI/trauma_analisis/src/pages/kuisioner.astro";
const $$url = "/kuisioner";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Kuisioner,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
