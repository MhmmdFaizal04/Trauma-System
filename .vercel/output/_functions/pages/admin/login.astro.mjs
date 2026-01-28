import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_BgSvE7da.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_C9uI10gY.mjs';
import { i as isAuthenticated } from '../../chunks/auth_BmMsmkeW.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  if (isAuthenticated(Astro2.request)) {
    return Astro2.redirect("/admin/dashboard");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Login Admin", "data-astro-cid-rf56lckb": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="login-page" data-astro-cid-rf56lckb> <div class="login-container" data-astro-cid-rf56lckb> <div class="login-card" data-astro-cid-rf56lckb> <div class="login-header" data-astro-cid-rf56lckb> <div class="brand-logo" data-astro-cid-rf56lckb> <i class="bi bi-heart-pulse-fill" data-astro-cid-rf56lckb></i> <span data-astro-cid-rf56lckb>TraumaDeteksi</span> </div> <h1 data-astro-cid-rf56lckb>Selamat Datang</h1> <p data-astro-cid-rf56lckb>Silakan masuk untuk mengakses dashboard admin</p> </div> <form id="login-form" data-astro-cid-rf56lckb> <div id="error-message" class="alert alert-error" style="display: none;" data-astro-cid-rf56lckb> <i class="bi bi-exclamation-circle-fill" data-astro-cid-rf56lckb></i> <span id="error-text" data-astro-cid-rf56lckb></span> </div> <div class="form-group" data-astro-cid-rf56lckb> <label for="username" class="form-label" data-astro-cid-rf56lckb>Username</label> <div class="input-wrapper" data-astro-cid-rf56lckb> <i class="bi bi-person input-icon" data-astro-cid-rf56lckb></i> <input type="text" id="username" name="username" class="form-input" placeholder="Masukkan username" required autocomplete="username" data-astro-cid-rf56lckb> </div> </div> <div class="form-group" data-astro-cid-rf56lckb> <label for="password" class="form-label" data-astro-cid-rf56lckb>Password</label> <div class="input-wrapper" data-astro-cid-rf56lckb> <i class="bi bi-lock input-icon" data-astro-cid-rf56lckb></i> <input type="password" id="password" name="password" class="form-input" placeholder="Masukkan password" required autocomplete="current-password" data-astro-cid-rf56lckb> </div> </div> <button type="submit" class="btn btn-primary btn-block" id="login-btn" data-astro-cid-rf56lckb>
Masuk Dashboard
</button> </form> <div class="login-footer" data-astro-cid-rf56lckb> <a href="/" class="back-link" data-astro-cid-rf56lckb> <i class="bi bi-arrow-left" data-astro-cid-rf56lckb></i> Kembali ke Beranda
</a> </div> </div> <p class="copyright" data-astro-cid-rf56lckb>
&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} TraumaDeteksi System
</p> </div> </div> ` })} ${renderScript($$result, "E:/Belajar/BU_DARNI/trauma_analisis/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")} `;
}, "E:/Belajar/BU_DARNI/trauma_analisis/src/pages/admin/login.astro", void 0);

const $$file = "E:/Belajar/BU_DARNI/trauma_analisis/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Login,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
