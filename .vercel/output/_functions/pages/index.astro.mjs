import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BgSvE7da.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_C9uI10gY.mjs';
import { $ as $$Header, a as $$Footer } from '../chunks/Footer_6j0fvkXZ.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Beranda", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-wrapper" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-j7pv25f6": true })} <main class="hero" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <div class="hero-content" data-astro-cid-j7pv25f6> <div class="hero-icon" data-astro-cid-j7pv25f6> <i class="bi bi-clipboard2-heart" data-astro-cid-j7pv25f6></i> </div> <h1 data-astro-cid-j7pv25f6>Sistem Deteksi Trauma</h1> <p class="hero-subtitle" data-astro-cid-j7pv25f6>
Kuisioner berbasis analisis linguistik untuk membantu
						mengidentifikasi tanda-tanda trauma pada anak usia SMP
</p> <div class="hero-features" data-astro-cid-j7pv25f6> <div class="feature" data-astro-cid-j7pv25f6> <i class="bi bi-chat-quote" data-astro-cid-j7pv25f6></i> <span data-astro-cid-j7pv25f6>Analisis Pilihan Kata</span> </div> <div class="feature" data-astro-cid-j7pv25f6> <i class="bi bi-text-paragraph" data-astro-cid-j7pv25f6></i> <span data-astro-cid-j7pv25f6>Struktur Narasi</span> </div> <div class="feature" data-astro-cid-j7pv25f6> <i class="bi bi-person-lines-fill" data-astro-cid-j7pv25f6></i> <span data-astro-cid-j7pv25f6>Sudut Pandang</span> </div> <div class="feature" data-astro-cid-j7pv25f6> <i class="bi bi-emoji-smile" data-astro-cid-j7pv25f6></i> <span data-astro-cid-j7pv25f6>Indikator Emosional</span> </div> </div> <a href="/kuisioner" class="btn btn-primary btn-lg" data-astro-cid-j7pv25f6> <i class="bi bi-play-circle" data-astro-cid-j7pv25f6></i>
Mulai Kuisioner
</a> <p class="hero-note" data-astro-cid-j7pv25f6> <i class="bi bi-shield-check" data-astro-cid-j7pv25f6></i>
Jawaban Anda akan dijaga kerahasiaannya dan hanya digunakan
						untuk keperluan analisis.
</p> </div> </div> </main> <section class="info-section" data-astro-cid-j7pv25f6> <div class="container container-md" data-astro-cid-j7pv25f6> <h2 class="text-center" data-astro-cid-j7pv25f6> <i class="bi bi-question-circle" data-astro-cid-j7pv25f6></i> Tentang Sistem Ini
</h2> <div class="info-cards" data-astro-cid-j7pv25f6> <div class="info-card" data-astro-cid-j7pv25f6> <div class="info-icon" data-astro-cid-j7pv25f6> <i class="bi bi-bullseye" data-astro-cid-j7pv25f6></i> </div> <h3 data-astro-cid-j7pv25f6>Tujuan</h3> <p data-astro-cid-j7pv25f6>
Membantu mengidentifikasi tanda-tanda trauma pada
							anak SMP melalui analisis bahasa dan ekspresi
							emosional dalam tulisan mereka.
</p> </div> <div class="info-card" data-astro-cid-j7pv25f6> <div class="info-icon" data-astro-cid-j7pv25f6> <i class="bi bi-gear" data-astro-cid-j7pv25f6></i> </div> <h3 data-astro-cid-j7pv25f6>Cara Kerja</h3> <p data-astro-cid-j7pv25f6>
Sistem menganalisis jawaban menggunakan teknik
							linguistik seperti frekuensi kata, panjang kalimat,
							dan penggunaan kata ganti.
</p> </div> <div class="info-card" data-astro-cid-j7pv25f6> <div class="info-icon" data-astro-cid-j7pv25f6> <i class="bi bi-clock-history" data-astro-cid-j7pv25f6></i> </div> <h3 data-astro-cid-j7pv25f6>Durasi</h3> <p data-astro-cid-j7pv25f6>
Kuisioner membutuhkan waktu sekitar 10-15 menit
							untuk diselesaikan dengan menjawab secara jujur dan
							lengkap.
</p> </div> </div> </div> </section> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-j7pv25f6": true })} </div> ` })} `;
}, "E:/Belajar/BU_DARNI/trauma_analisis/src/pages/index.astro", void 0);

const $$file = "E:/Belajar/BU_DARNI/trauma_analisis/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
