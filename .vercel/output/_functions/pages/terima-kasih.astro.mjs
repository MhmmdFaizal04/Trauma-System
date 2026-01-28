import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BgSvE7da.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_C9uI10gY.mjs';
import { $ as $$Header, a as $$Footer } from '../chunks/Footer_6j0fvkXZ.mjs';
/* empty css                                        */
export { renderers } from '../renderers.mjs';

const $$TerimaKasih = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Terima Kasih", "data-astro-cid-ziybghba": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-wrapper" data-astro-cid-ziybghba> ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-ziybghba": true })} <main class="main-content" data-astro-cid-ziybghba> <div class="container" data-astro-cid-ziybghba> <div class="thank-you-card" data-astro-cid-ziybghba> <div class="success-icon" data-astro-cid-ziybghba> <i class="bi bi-check-circle" data-astro-cid-ziybghba></i> </div> <h1 data-astro-cid-ziybghba>Terima Kasih!</h1> <p class="message" data-astro-cid-ziybghba>
Jawaban kamu telah berhasil dikirim. Terima kasih sudah
                        meluangkan waktu untuk mengisi kuisioner ini.
</p> <div class="info-box" data-astro-cid-ziybghba> <i class="bi bi-info-circle" data-astro-cid-ziybghba></i> <div data-astro-cid-ziybghba> <strong data-astro-cid-ziybghba>Apa selanjutnya?</strong> <p data-astro-cid-ziybghba>
Data yang kamu berikan akan dianalisis oleh tim
                                kami untuk membantu memahami kondisi emosional
                                dan psikologis remaja saat ini.
</p> </div> </div> <div class="actions" data-astro-cid-ziybghba> <a href="/" class="btn btn-primary" data-astro-cid-ziybghba> <i class="bi bi-house" data-astro-cid-ziybghba></i>
Kembali ke Beranda
</a> </div> <div class="support-note" data-astro-cid-ziybghba> <i class="bi bi-heart-fill" data-astro-cid-ziybghba></i> <p data-astro-cid-ziybghba>
Jika kamu merasa membutuhkan seseorang untuk
                            berbicara, jangan ragu untuk menghubungi guru BK
                            atau orang dewasa yang kamu percaya.
</p> </div> </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-ziybghba": true })} </div> ` })} `;
}, "E:/Belajar/BU_DARNI/trauma_analisis/src/pages/terima-kasih.astro", void 0);

const $$file = "E:/Belajar/BU_DARNI/trauma_analisis/src/pages/terima-kasih.astro";
const $$url = "/terima-kasih";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$TerimaKasih,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
