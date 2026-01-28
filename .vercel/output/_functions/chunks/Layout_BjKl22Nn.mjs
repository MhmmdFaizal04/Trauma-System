import { e as createComponent, g as addAttribute, o as renderHead, p as renderSlot, r as renderTemplate, h as createAstro } from './astro/server_C4W-8AKg.mjs';
import 'piccolore';
import 'clsx';
/* empty css                        */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Sistem deteksi trauma pada anak SMP berbasis aspek linguistik dan indikator emosional." } = Astro2.props;
  return renderTemplate`<html lang="id"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(description, "content")}><title>${title} | Trauma Analisis</title><link rel="icon" type="image/svg+xml" href="/favicon.svg">${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "E:/Belajar/BU_DARNI/trauma_analisis/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
