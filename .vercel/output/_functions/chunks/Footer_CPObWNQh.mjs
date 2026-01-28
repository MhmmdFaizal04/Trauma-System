import { e as createComponent, m as maybeRenderHead, r as renderTemplate } from './astro/server_C4W-8AKg.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="header" data-astro-cid-3ef6ksr2> <div class="container header-container" data-astro-cid-3ef6ksr2> <a href="/" class="logo" data-astro-cid-3ef6ksr2> <i class="bi bi-heart-pulse-fill" data-astro-cid-3ef6ksr2></i> <span data-astro-cid-3ef6ksr2>TraumaDeteksi</span> </a> <nav class="nav" data-astro-cid-3ef6ksr2> <a href="/" class="nav-link" data-astro-cid-3ef6ksr2>Beranda</a> <a href="/kuisioner" class="nav-link" data-astro-cid-3ef6ksr2>Kuisioner</a> <a href="/admin/login" class="btn btn-sm btn-primary" data-astro-cid-3ef6ksr2>Admin</a> </nav> </div> </header> `;
}, "E:/Belajar/BU_DARNI/trauma_analisis/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="footer" data-astro-cid-sz7xmlte> <div class="container footer-container" data-astro-cid-sz7xmlte> <div class="footer-content" data-astro-cid-sz7xmlte> <div class="footer-brand" data-astro-cid-sz7xmlte> <i class="bi bi-heart-pulse" data-astro-cid-sz7xmlte></i> <span data-astro-cid-sz7xmlte>TraumaDeteksi</span> </div> <p class="footer-text" data-astro-cid-sz7xmlte>
Membantu mendeteksi dini tanda-tanda trauma pada remaja melalui
                analisis linguistik.
</p> </div> <div class="footer-bottom" data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>&copy; ${currentYear} TraumaDeteksi. All rights reserved.</p> </div> </div> </footer> `;
}, "E:/Belajar/BU_DARNI/trauma_analisis/src/components/Footer.astro", void 0);

export { $$Header as $, $$Footer as a };
